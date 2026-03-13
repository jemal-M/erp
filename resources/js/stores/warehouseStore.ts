import {create} from "zustand";
export interface Warehouse{
       id:number;
    name:string;
    location:string;
    capacity:number;
    description:string;
}
export interface WarehouseState{
    warehouses:Warehouse[];
    currentWarehouse:Warehouse|null;
    isLoading:boolean;
    error:string|null;
    setWarehouses:(warehouses:Warehouse[])=>void;
    setCurrentWarehouse:(warehouse:Warehouse|null)=>void;
    addWarehouse:(warehouse:Warehouse)=>void;
    updateWarehouse:(id:number,updates:Partial<Warehouse>)=>void;
    removeWarehouse:(id:number)=>void;
    setLoading:(isLoading:boolean)=>void;
    setError:(error:string|null)=>void;
}
export const useWarehouseStore=create<WarehouseState>()((set)=>({
    warehouses:[],
    currentWarehouse:null,
    isLoading:false,
    error:null,
    setWarehouses:(warehouses)=>set({warehouses}),
    setCurrentWarehouse:(currentWarehouse)=>set({currentWarehouse}),
    addWarehouse:(warehouse)=>set((state)=>({warehouses:[...state.warehouses,warehouse]})),
    updateWarehouse:(id,updates)=>set((state)=>({
        warehouses:state.warehouses.map((war)=>
        war.id===id?{...war,...updates}:war)
    })),
    removeWarehouse:(id)=>set((state)=>({
        warehouses:state.warehouses.filter((war)=>war.id!==id)
    })),
    setLoading:(isLoading)=>set({isLoading}),
    setError:(error)=>set({error}),
}));