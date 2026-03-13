import {create} from "zustand";
export interface Transaction{
    id:number;
    date:Date;
    amount:number;
    description:string;
    type:string;
}
export interface TransactionState{
    transactions:Transaction[];
    isLoading:boolean;
    error:string|null;
    addTransaction:(transaction:Transaction)=>void;
    updateTransaction:(id:number,transaction:Partial<Transaction>)=>void;
    deleteTransaction:(id:number)=>void;
}
export const useTransactionStore = create<TransactionState>((set) => ({
    transactions:[],
    isLoading:false,
    error:null,
    addTransaction:(transaction) => set((state) => ({
        transactions:[...state.transactions, transaction]
    })),
    updateTransaction:(id,transaction) => set((state) => ({
        transactions:state.transactions.map(t => 
            t.id === id ? {...t, ...transaction} : t
        )
    })),
    deleteTransaction:(id) => set((state) => ({
        transactions:state.transactions.filter(t => t.id !== id)
    }))
}));