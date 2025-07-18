# 💰 Expense Manager

A modern, full-stack expense tracking application built with Next.js and Supabase. Track your personal expenses with Vietnamese Dong (VND) currency support, beautiful analytics, and real-time data persistence.

![Expense Manager](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)

## ✨ Features

### 📊 **Dashboard & Analytics**
- **Real-time Statistics** - Total expenses, monthly spending, transaction count
- **Category Breakdown** - Visual breakdown of spending by category
- **Quick Stats** - Average per transaction, highest expense, most frequent category

### 💸 **Expense Management**
- **Add Expenses** - Easy form with amount, description, category, and date
- **Expense List** - View all expenses with search and filter functionality
- **Categories** - 8 predefined categories: Food & Dining, Transportation, Shopping, Entertainment, Bills & Utilities, Healthcare, Travel, Other
- **Date Picker** - Intuitive calendar interface for selecting expense dates

### 🇻🇳 **Vietnamese Dong (VND) Support**
- **Native VND Formatting** - Proper Vietnamese locale formatting
- **VND Symbol (₫)** - Authentic currency display
- **Large Number Support** - Optimized for VND amounts (no decimals)

### 🔍 **Search & Filter**
- **Text Search** - Search expenses by description
- **Category Filter** - Filter by specific expense categories
- **Real-time Results** - Instant filtering as you type

### 💾 **Data Persistence**
- **Supabase Integration** - Real-time database with PostgreSQL
- **Automatic Sync** - Changes are saved and synced automatically
- **Error Handling** - Graceful error messages and retry functionality

## 🛠️ Tech Stack

### **Frontend**
- **[Next.js 15.2.4](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible UI components
- **[Lucide React](https://lucide.dev/)** - Beautiful SVG icons
- **[date-fns](https://date-fns.org/)** - Modern JavaScript date utility library

### **Backend & Database**
- **[Supabase](https://supabase.com/)** - Open source Firebase alternative
- **PostgreSQL** - Robust relational database
- **Row Level Security (RLS)** - Secure data access

### **Development Tools**
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.0 or later
- **pnpm** (recommended) or npm
- **Supabase Account** - [Sign up here](https://supabase.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/expense-manager.git
cd expense-manager
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Supabase

1. **Create a new project** at [Supabase Dashboard](https://supabase.com/dashboard)
2. **Get your credentials** from Settings → API
3. **Create environment variables**:

```bash
# Create .env.local file
cp .env.example .env.local
```

Add your Supabase credentials to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Set Up Database

1. **Go to SQL Editor** in your Supabase dashboard
2. **Run the following SQL** to create the expenses table:

```sql
-- Create the expenses table
CREATE TABLE IF NOT EXISTS expenses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_expenses_updated_at 
    BEFORE UPDATE ON expenses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations
CREATE POLICY "Allow all operations on expenses" ON expenses
FOR ALL USING (true);

-- Insert sample data (optional)
INSERT INTO expenses (amount, description, category, date) VALUES
(45500, 'Lunch at restaurant', 'Food & Dining', '2024-01-15'),
(120000, 'Grocery shopping', 'Food & Dining', '2024-01-14'),
(25000, 'Gas station', 'Transportation', '2024-01-13'),
(89000, 'Monthly phone bill', 'Bills & Utilities', '2024-01-12');
```

### 5. Run the Application

```bash
# Development mode
pnpm dev

# Production build and start
pnpm build
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
expense-manager/
├── app/
│   └── page.tsx                 # Main page component
├── components/
│   ├── expense/
│   │   ├── AddExpenseForm.tsx   # Add expense form
│   │   ├── Analytics.tsx        # Analytics dashboard
│   │   ├── ExpenseList.tsx      # Expense list with filters
│   │   └── StatsCards.tsx       # Statistics cards
│   └── ui/
│       ├── ErrorMessage.tsx     # Error display component
│       ├── LoadingState.tsx     # Loading state component
│       └── ...                  # shadcn/ui components
├── hooks/
│   └── useExpenses.ts           # Custom hook for expense operations
├── lib/
│   ├── constants.ts             # App constants (categories, colors)
│   ├── currency.ts              # VND formatting utilities
│   ├── supabase.ts              # Supabase client configuration
│   ├── types.ts                 # TypeScript type definitions
│   └── utils.ts                 # Utility functions
├── styles/
│   └── globals.css              # Global styles
├── .env.local                   # Environment variables (create this)
├── .env.example                 # Environment variables example
├── package.json                 # Dependencies and scripts
└── README.md                    # This file
```

## 🎯 Usage

### Adding Expenses
1. Navigate to the **"Add Expense"** tab
2. Fill in the amount (in VND), description, and category
3. Select a date using the calendar picker
4. Click **"Add Expense"** to save

### Viewing Expenses
1. Go to the **"Expenses"** tab
2. Use the search bar to find specific expenses
3. Filter by category using the dropdown
4. View expense details including date, category, and amount

### Analytics
1. Visit the **"Analytics"** tab
2. View spending breakdown by category
3. Check quick stats for insights into your spending patterns

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add some amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### Code Style

- Use **TypeScript** for type safety
- Follow **ESLint** and **Prettier** configurations
- Write **descriptive commit messages**
- Add **comments** for complex logic

## 🐛 Troubleshooting

### Common Issues

**Database Connection Error**
- Verify your Supabase credentials in `.env.local`
- Check if your Supabase project is active
- Ensure the expenses table is created

**Build Errors**
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && pnpm install`
- Check for TypeScript errors: `pnpm build`

**Environment Variables Not Loading**
- Ensure `.env.local` is in the project root
- Restart the development server after adding variables
- Variables must start with `NEXT_PUBLIC_` for client-side access

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **[shadcn/ui](https://ui.shadcn.com/)** for the beautiful UI components
- **[Supabase](https://supabase.com/)** for the excellent backend service
- **[Lucide](https://lucide.dev/)** for the clean, modern icons
- **Vietnamese Community** for inspiration on VND formatting

---

**Built with ❤️ for expense tracking in Vietnam** 🇻🇳 