import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Expense, NewExpense } from "@/lib/types"

export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch expenses from Supabase
  const fetchExpenses = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false })

      if (error) throw error

      const formattedExpenses = data.map(expense => ({
        ...expense,
        date: new Date(expense.date)
      }))

      setExpenses(formattedExpenses)
    } catch (error) {
      console.error('Error fetching expenses:', error)
      setError('Failed to load expenses')
    } finally {
      setLoading(false)
    }
  }

  // Add expense to Supabase
  const addExpense = async (newExpense: NewExpense) => {
    if (newExpense.amount && newExpense.description && newExpense.category) {
      try {
        const { data, error } = await supabase
          .from('expenses')
          .insert([
            {
              amount: Number.parseFloat(newExpense.amount),
              description: newExpense.description,
              category: newExpense.category,
              date: newExpense.date.toISOString().split('T')[0], // Format as YYYY-MM-DD
            }
          ])
          .select()

        if (error) throw error

        // Refresh the expenses list
        await fetchExpenses()
        return true
      } catch (error) {
        console.error('Error adding expense:', error)
        setError('Failed to add expense')
        return false
      }
    }
    return false
  }

  // Load expenses on component mount
  useEffect(() => {
    fetchExpenses()
  }, [])

  return {
    expenses,
    loading,
    error,
    setError,
    addExpense,
    fetchExpenses
  }
} 