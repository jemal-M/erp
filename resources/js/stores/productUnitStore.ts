import {create} from "zustand";
export interface ProductUnit{
    id:number;
    name:string;
    description:string;
}
export interface ProductUnitState{
    units:ProductUnit[];
    currentUnit:ProductUnit|null;
    loading:boolean;
    isLoading:boolean;
    error:string|null;
    setUnits:(units:ProductUnit[])=>void;
    addUnit:(unit:ProductUnit)=>void;
    updateUnit:(id:number,updates:Partial<ProductUnit>)=>void;
    deleteUnit:(id:number)=>void;
    setLoading:(isLoading:boolean)=>void;
    setError:(error:string|null)=>void;
}
export const useProductUnitStore=create<ProductUnitState>()((set)=>({
    units:[],
    currentUnit:null,
    loading:false,
    isLoading:false,
    error:null,
    setUnits:(units)=>set({units}),
    addUnit:(unit)=>set((state)=>({units:[...state.units,unit]})),
    updateUnit:(id,updates)=>set((state)=>({
        units:state.units.map((u)=>
        u.id===id?{...u,...updates}:u)
    })),
    deleteUnit:(id)=>set((state)=>({
        units:state.units.filter((u)=>u.id!==id)
    })),
    setLoading:(isLoading)=>set({isLoading}),
    setError:(error)=>set({error}),
}));