import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, TrendingUp, Wallet } from "lucide-react"
import { Expense } from "@/lib/types"
import { formatVND } from "@/lib/currency"

interface StatsCardsProps {
  expenses: Expense[]
}

export function StatsCards({ expenses }: StatsCardsProps) {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  
  const thisMonthExpenses = expenses
    .filter((expense) => expense.date.getMonth() === new Date().getMonth())
    .reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatVND(totalExpenses)}</div>
          <p className="text-xs text-muted-foreground">All time</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatVND(thisMonthExpenses)}</div>
          <p className="text-xs text-muted-foreground">Current month spending</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
          <Wallet className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{expenses.length}</div>
          <p className="text-xs text-muted-foreground">Recorded expenses</p>
        </CardContent>
      </Card>
    </div>
  )
} 