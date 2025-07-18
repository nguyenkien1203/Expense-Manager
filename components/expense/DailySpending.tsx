import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isSameMonth } from "date-fns"
import { Expense } from "@/lib/types"
import { formatVND } from "@/lib/currency"
import { categoryColors } from "@/lib/constants"

interface DailySpendingProps {
  expenses: Expense[]
}

export function DailySpending({ expenses }: DailySpendingProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Get all days in the current month
  const monthStart = startOfMonth(currentMonth)
  const monthEnd = endOfMonth(currentMonth)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Group expenses by day
  const getExpensesForDay = (day: Date) => {
    return expenses.filter(expense => isSameDay(expense.date, day))
  }

  const getDayTotal = (day: Date) => {
    return getExpensesForDay(day).reduce((sum, expense) => sum + expense.amount, 0)
  }

  // Navigation functions
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const goToCurrentMonth = () => {
    setCurrentMonth(new Date())
  }

  // Calculate monthly total
  const monthlyTotal = expenses
    .filter(expense => isSameMonth(expense.date, currentMonth))
    .reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="space-y-6">
      {/* Header with navigation */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl">Daily Spending</CardTitle>
              <CardDescription>View your expenses for each day of the month</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={goToCurrentMonth}>
                <CalendarIcon className="h-4 w-4 mr-2" />
                {format(currentMonth, "MMMM yyyy")}
              </Button>
              <Button variant="outline" size="sm" onClick={goToNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              Total for {format(currentMonth, "MMMM yyyy")}
            </span>
            <span className="text-lg font-bold">{formatVND(monthlyTotal)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Daily spending grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {daysInMonth.map((day) => {
          const dayExpenses = getExpensesForDay(day)
          const dayTotal = getDayTotal(day)
          const isToday = isSameDay(day, new Date())

          return (
            <Card 
              key={day.toISOString()} 
              className={`${isToday ? 'ring-2 ring-blue-500' : ''} ${dayTotal > 0 ? 'border-green-200' : 'border-gray-100'}`}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-sm font-medium">
                      {format(day, "dd")}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {format(day, "EEE")}
                    </div>
                  </div>
                  {dayTotal > 0 && (
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-600">
                        {formatVND(dayTotal)}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {dayExpenses.length} expense{dayExpenses.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              {dayExpenses.length > 0 && (
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {dayExpenses.slice(0, 3).map((expense) => (
                      <div 
                        key={expense.id} 
                        className="flex justify-between items-center text-xs"
                      >
                        <div className="flex-1 truncate pr-2">
                          <div className="font-medium truncate">{expense.description}</div>
                          <Badge 
                            className={`${categoryColors[expense.category]} text-xs`}
                            variant="secondary"
                          >
                            {expense.category}
                          </Badge>
                        </div>
                        <div className="font-semibold">
                          {formatVND(expense.amount)}
                        </div>
                      </div>
                    ))}
                    
                    {dayExpenses.length > 3 && (
                      <div className="text-xs text-muted-foreground text-center pt-1">
                        +{dayExpenses.length - 3} more...
                      </div>
                    )}
                  </div>
                </CardContent>
              )}
              
              {dayTotal === 0 && (
                <CardContent className="pt-0">
                  <div className="text-center text-xs text-muted-foreground py-4">
                    No expenses
                  </div>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      {/* Summary stats for the month */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Monthly Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{formatVND(monthlyTotal)}</div>
              <div className="text-sm text-muted-foreground">Total Spent</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {expenses.filter(expense => isSameMonth(expense.date, currentMonth)).length}
              </div>
              <div className="text-sm text-muted-foreground">Total Transactions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {formatVND(monthlyTotal / daysInMonth.length)}
              </div>
              <div className="text-sm text-muted-foreground">Average per Day</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 