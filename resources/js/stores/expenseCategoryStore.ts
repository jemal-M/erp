import {create} from "zustand";
export interface ExpenseCategory{
     
    id?: number;
    name: string;
    color: string;
    icon: string;
    expenseValue: number;
}
export interface ExpenseCategoryState{
     
    expenseCategories: ExpenseCategory[];
    addExpenseCategory: (expenseCategory: ExpenseCategory) => void;
    removeExpenseCategory: (id: number) => void;
    updateExpenseCategory: (updatedExpenseCategory: ExpenseCategory) => void;
    setExpenseCategories: (expenseCategories: ExpenseCategory[]) => void;
    getExpenseCategoryById: (id: number) => ExpenseCategory | undefined;
     getExpenseCategoriesByValue:(value: number) => ExpenseCategory[] | undefined;
     getExpenseCategoryByName: (name: string) => ExpenseCategory | undefined;
      getExpenseCategoriesByColor:(color: string) => ExpenseCategory[] | undefined;
      getExpenseCategoriesByIcon:(icon: string) => ExpenseCategory[] | undefined;
      getExpenseCategoriesByValueRange:(minValue: number, maxValue: number) => ExpenseCategory[] | undefined;

}
export const useExpenseCategoryStore = create<ExpenseCategoryState>()((set, get) => ({
    expenseCategories: [],
    addExpenseCategory: (expenseCategory) => set((state) => ({
        expenseCategories: [...state.expenseCategories, expenseCategory]
    })),
    removeExpenseCategory: (id) => set((state) => ({
        expenseCategories: state.expenseCategories.filter(expenseCategory => expenseCategory.id !== id)
    })),
    updateExpenseCategory: (updatedExpenseCategory) => set((state) => ({
        expenseCategories: state.expenseCategories.map(expenseCategory => expenseCategory.id === updatedExpenseCategory.id ? updatedExpenseCategory : expenseCategory)
    })),
    setExpenseCategories: (expenseCategories) => set(() => ({
        expenseCategories
    })),
    getExpenseCategoryById: (id) => get().expenseCategories.find(expenseCategory => expenseCategory.id === id),
    getExpenseCategoriesByValue:(value) => get().expenseCategories.filter(expenseCategory => expenseCategory.expenseValue === value),
    getExpenseCategoryByName: (name) => get().expenseCategories.find(expenseCategory => expenseCategory.name === name),
    getExpenseCategoriesByColor:(color) => get().expenseCategories.filter(expenseCategory => expenseCategory.color === color),
    getExpenseCategoriesByIcon:(icon) => get().expenseCategories.filter(expenseCategory => expenseCategory.icon === icon),
    getExpenseCategoriesByValueRange:(minValue, maxValue) => get().expenseCategories.filter(expenseCategory => expenseCategory.expenseValue >= minValue && expenseCategory.expenseValue <= maxValue),

}));