import {create} from "zustand";
export interface Payrole{
    id:number;
    employeeId:number;
    basicSalary:number;
    allowance:number;
    deduction:number;
    netSalary:number;
    payDate:Date;
    status:string;
}
interface PayroleState{
    payroles:Payrole[];
    currentPayrole:Payrole | null;
    isLoading:boolean;
    error:string | null;
    isAuthenticated:boolean;

    setPayroles:(payroles:Payrole[]) => void;
    setCurrentPayrole:(payrole:Payrole | null) => void;
    addPayrole:(payrole:Payrole) => void;
    updatePayroleById:(id:number,payrole:Partial<Payrole>) => void;
    deletePayrole:(id:number) => void;
    setLoading:(isLoading:boolean) => void;
    setError:(error:string | null) => void;
    logout:() => void;
}
export const usePayroleStore = create<PayroleState>((set) => ({
    payroles:[],
    currentPayrole:null,
    isLoading:false,
    error:null,
    isAuthenticated:true,
    setPayroles:(payroles) => set({payroles}),
    setCurrentPayrole:(payrole) => set({currentPayrole:payrole}),
    addPayrole:(payrole) => set((state) => ({payroles:[...state.payroles, payrole]})),
    updatePayroleById:(id, payrole) => set((state) => ({
        payroles:state.payroles.map((p) => p.id === id ? {...p, ...payrole} : p),
        currentPayrole:state.currentPayrole?.id === id ? {...state.currentPayrole, ...payrole} : state.currentPayrole
    })),
    deletePayrole:(id) => set((state) => ({payroles:state.payroles.filter((p) => p.id !== id)})),
    setLoading:(isLoading) => set({isLoading}),
    setError:(error) => set({error}),
    logout:() => set({
        payroles:[],
        currentPayrole:null,
        isAuthenticated:false
    })
}));