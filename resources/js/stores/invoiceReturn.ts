import {create} from "zustand";
export interface InvoiceReturn{
    id:number;
    invoiceId:number;
    returnDate:Date;
    totalAmount:number;
    reason:string;
}
export interface InvoiceReturnState{
    invoiceReturns:InvoiceReturn[];
    isLoading:boolean;
    error:string|null;
    addInvoiceReturn:(invoiceReturn:InvoiceReturn)=>void;
    updateInvoiceReturn:(id:number,invoiceReturn:Partial<InvoiceReturn>)=>void;
    deleteInvoiceReturn:(id:number)=>void;
    fetchInvoiceReturns:()=>Promise<void>;
    setLoading:(isLoading:boolean)=>void;
}
export const useInvoiceReturnStore = create<InvoiceReturnState>((set) => ({
    invoiceReturns:[],
    isLoading:false,
    error:null,
    addInvoiceReturn:(invoiceReturn)=>set((state)=>({
        invoiceReturns:[...state.invoiceReturns,invoiceReturn]
    })),
    updateInvoiceReturn:(id,invoiceReturn)=>set((state)=>({
        invoiceReturns:state.invoiceReturns.map((ir)=>
            ir.id===id?{...ir,...invoiceReturn}:ir
        )
    })),
    deleteInvoiceReturn:(id)=>set((state)=>({
        invoiceReturns:state.invoiceReturns.filter((ir)=>ir.id!==id)
    })),
    setLoading:(isLoading)=>set({isLoading}),
    fetchInvoiceReturns:async ()=>{
        set({isLoading:true,error:null});
        try{
            //await api.fetchInvoiceReturns();
            set({isLoading:false});
        }catch(error){
            set({isLoading:false,error:error?.message||"Failed to fetch invoice returns"});
        }
    }
}));