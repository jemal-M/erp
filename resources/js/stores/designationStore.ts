import {create} from "zustand";
export interface Designation{
    id:number;
    name:string;
    description:string;
    createdAt?:string;
    updatedAt?:string;
}
export interface DesignationState{
    designations:Designation[];
    currentDesignation:Designation|null;
    isLoading:boolean;
    error:string|null;
    isAuthenticated:boolean;
    setDesignations:(designations:Designation[])=>void;
    setCurrentDesignation:(designation:Designation|null)=>void;
    addDesignation:(designation:Designation)=>void;
    updateDesignation:(id:number,updates:Partial<Designation>)=>void;
    removeDesignation:(id:number)=>void;
    setLoading:(isLoading:boolean)=>void;
    setError:(error:string|null)=>void;
    logout:()=>void;
}
export const useDesignationStore=create<DesignationState>()((set)=>({
    designations:[],
    currentDesignation:null,
    isLoading:false,
    error:null,
    isAuthenticated:false,
    setDesignations:(designations)=>set({designations}),
    setCurrentDesignation:(currentDesignation)=>set({currentDesignation}),
    addDesignation:(designation)=>set((state)=>({designations:[...state.designations,designation]})),
    updateDesignation:(id,updates)=>set((state)=>({
        designations:state.designations.map((des)=>
        des.id===id?{...des,...updates}:des)
    })),
    removeDesignation:(id)=>set((state)=>({
        designations:state.designations.filter((des)=>des.id!==id)
    })),
    setLoading:(isLoading)=>set({isLoading}),
    setError:(error)=>set({error}),
    logout:()=>set({isAuthenticated:false,token:null})
}));