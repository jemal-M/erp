import {create} from "zustand";
export interface StockMovement{
    id:number;
    productId:number;
    movementType:string;
    quantity:number;
    reference:string;
    date:Date;
    notes:string;
}
export interface StockMovementState{
    movements:StockMovement[];
    isLoading:boolean;
    error:string|null;
    addMovement:(movement:StockMovement)=>void;
    updateMovement:(id:number,movement:Partial<StockMovement>)=>void;
    deleteMovement:(id:number)=>void;
}
export const useStockMovementStore = create<StockMovementState>((set) => ({
    movements:[],
    isLoading:false,
    error:null,
    addMovement:(movement) => set((state) => ({
        movements:[...state.movements, movement]
    })),
    updateMovement:(id, movement) => set((state) => ({
        movements:state.movements.map(m => 
            m.id === id ? {...m, ...movement} : m
        )
    })),
    
    deleteMovement:(id) => set((state) => ({
        movements:state.movements.filter(m => m.id !== id)
    }))
}));