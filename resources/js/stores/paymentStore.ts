import {create} from 'zustand';
export interface Payment{
    id:number;
    orderId:number;
    amount:number;
    paymentDate:Date;
    paymentMethod:string;
    status:string;
}
export interface PaymentState{
    payments:Payment[];
    isLoading:boolean;
    error:string|null;
    addPayment:(payment:Payment)=>void;
    updatePayment:(id:number,payment:Partial<Payment>)=>void;
    deletePayment:(id:number)=>void;
}
export const usePaymentStore = create<PaymentState>((set) => ({
    payments:[],
    isLoading:false,
    error:null,
    addPayment:(payment) => set((state) => ({
        payments:[...state.payments, payment]
    })),
    updatePayment:(id, payment) => set((state) => ({
        payments:state.payments.map(p => 
            p.id === id ? {...p, ...payment} : p
        )
    })),
    deletePayment:(id) => set((state) => ({
        payments:state.payments.filter(p => p.id !== id)
    }))
}));