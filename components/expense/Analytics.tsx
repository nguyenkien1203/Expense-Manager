import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Expense } from "@/lib/types"
import { categories, categoryColors } from "@/lib/constants"
import { formatVND } from "@/lib/currency"

interface AnalyticsProps {
  expenses: Expense[]
}

export function Analytics({ expenses }: AnalyticsProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  const expensesByCategory = categories
    .map((category) => ({
      category,
      amount: expenses
        .filter((expense) => expense.category === category)
        .reduce((sum, expense) => sum + expense.amount, 0),
    }))
    .filter((item) => item.amount > 0)

  const averagePerTransaction = expenses.length > 0 ? totalExpenses / expenses.length : 0
  const highestExpense = expenses.length > 0 ? Math.max(...expenses.map((e) => e.amount)) : 0
  const mostFrequentCategory = expensesByCategory.length > 0
    ? expensesByCategory.reduce((a, b) => (a.amount > b.amount ? a : b)).category
    : "None"

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
          <CardDescription>Breakdown of your expenses by category</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expensesByCategory.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Badge className={categoryColors[item.category]}>{item.category}</Badge>
                </div>
                <div className="font-semibold">{formatVND(item.amount)}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
          <CardDescription>Overview of your spending patterns</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Average per transaction</span>
            <span className="font-semibold">{formatVND(averagePerTransaction)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Highest expense</span>
            <span className="font-semibold">{formatVND(highestExpense)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Most frequent category</span>
            <span className="font-semibold">{mostFrequentCategory}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 