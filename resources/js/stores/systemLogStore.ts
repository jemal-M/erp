import {create} from "zustand";
export interface SystemLog{
     id:number;
    action:string;
    timestamp:Date;
    userId:number;
    description:string;
}
export interface SystemLogState{
    logs:SystemLog[];
    isLoading:boolean;
    error:string|null;
    addLog:(log:SystemLog)=>void;
    loadLogs:()=>void;
}
export const useSystemLogStore = create<SystemLogState>((set) => ({
    logs:[],
    isLoading:false,
    error:null,
    addLog:(log) => set((state) => ({
        logs:[...state.logs, log]
    })),
    loadLogs:() => set((state) => ({
        logs:[...state.logs]
    })),
}));