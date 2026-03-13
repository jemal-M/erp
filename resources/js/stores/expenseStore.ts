import {create} from "zustand";
export interface Expense {
    id: number;
    amount: number;
    description: string;
    date: string;
    category: string;
}
export interface ExpenseState {
    expenses: Expense[];
    currentExpense: Expense | null;
    isLoading: boolean;
    error: string | null;
    fetchExpenses: () => Promise<void>;
    fetchExpenseById: (id: number) => Promise<Expense | undefined>;
    createExpense: (expenseData: Omit<Expense, 'id'>) => Promise<void>;
    updateExpenseById: (id: number, expenseData: Partial<Expense>) => Promise<void>;
    deleteExpenseById: (id: number) => Promise<void>;
}

export const useExpenseStore = create<ExpenseState>((set) => ({
    expenses: [],
    currentExpense: null,
    isLoading: false,
    error: null,
    fetchExpenses: async () => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            set({ isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: 'Failed to fetch expenses' });
        }
    },
    fetchExpenseById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            const expense = useExpenseStore.getState().expenses.find(e => e.id === id);
            set({ isLoading: false, currentExpense: expense || null });
            return expense;
        } catch (error) {
            set({ isLoading: false, error: 'Failed to fetch expense' });
            return undefined;
        }
    },
    createExpense: async (expenseData) => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            const newExpense = { ...expenseData, id: Date.now() };
            set((state) => ({ expenses: [...state.expenses, newExpense], isLoading: false }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to create expense' });
        }
    },
    updateExpenseById: async (id, expenseData) => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            set((state) => ({
                expenses: state.expenses.map((expense) =>
                    expense.id === id ? { ...expense, ...expenseData } : expense
                ),
                isLoading: false
            }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to update expense' });
        }
    },
    deleteExpenseById: async (id) => {
        set({
            isLoading: true, error: null 
        });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            set((state) => ({ expenses: state.expenses.filter((expense) => expense.id !== id), isLoading: false }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to delete expense' });
            throw error;
        }
    },

}));
      