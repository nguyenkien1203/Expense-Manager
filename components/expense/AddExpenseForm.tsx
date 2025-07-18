import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { NewExpense } from "@/lib/types"
import { categories } from "@/lib/constants"

interface AddExpenseFormProps {
  onAddExpense: (expense: NewExpense) => Promise<boolean>
}

export function AddExpenseForm({ onAddExpense }: AddExpenseFormProps) {
  const [newExpense, setNewExpense] = useState<NewExpense>({
    amount: "",
    description: "",
    category: "",
    date: new Date(),
  })

  const handleSubmit = async () => {
    const success = await onAddExpense(newExpense)
    if (success) {
      // Reset form
      setNewExpense({
        amount: "",
        description: "",
        category: "",
        date: new Date(),
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Expense</CardTitle>
        <CardDescription>Record a new expense transaction</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (VND)</Label>
            <Input
              id="amount"
              type="number"
              step="1000"
              placeholder="50,000"
              value={newExpense.amount}
              onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={newExpense.category}
              onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="What did you spend on?"
            value={newExpense.description}
            onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !newExpense.date && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {newExpense.date ? format(newExpense.date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={newExpense.date}
                onSelect={(date) => date && setNewExpense({ ...newExpense, date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button onClick={handleSubmit} className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Expense
        </Button>
      </CardContent>
    </Card>
  )
} 