export interface Expense {
  id: string
  amount: number
  description: string
  category: string
  date: Date
  created_at?: string
  updated_at?: string
}

export interface NewExpense {
  amount: string
  description: string
  category: string
  date: Date
} 