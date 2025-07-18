"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useExpenses } from "@/hooks/useExpenses"
import { StatsCards } from "@/components/expense/StatsCards"
import { ExpenseList } from "@/components/expense/ExpenseList"
import { AddExpenseForm } from "@/components/expense/AddExpenseForm"
import { Analytics } from "@/components/expense/Analytics"
import { ErrorMessage } from "@/components/ui/ErrorMessage"
import { LoadingState } from "@/components/ui/LoadingState"

export default function ExpenseManager() {
  const { expenses, loading, error, setError, addExpense } = useExpenses()

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">Expense Manager</h1>
          <p className="text-gray-600">Track and manage your personal expenses</p>
        </div>

        {/* Error Message */}
        {error && (
          <ErrorMessage 
            message={error} 
            onDismiss={() => setError(null)} 
          />
        )}

        {/* Loading State */}
        {loading ? (
          <LoadingState message="Loading expenses..." />
        ) : (
          <>
            {/* Stats Cards */}
            <StatsCards expenses={expenses} />

            {/* Main Content Tabs */}
            <Tabs defaultValue="expenses" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
                <TabsTrigger value="add">Add Expense</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>

              <TabsContent value="expenses" className="space-y-6">
                <ExpenseList expenses={expenses} />
              </TabsContent>

              <TabsContent value="add">
                <AddExpenseForm onAddExpense={addExpense} />
              </TabsContent>

              <TabsContent value="analytics">
                <Analytics expenses={expenses} />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
} 