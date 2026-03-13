import {create} from "zustand";
export interface ActivityLog{
    id:number;
    userId:number;
    action:string;
    description:string;
    timestamp:Date;
}
export interface ActivityLogState{
    logs:ActivityLog[];
    isLoading:boolean;
    error:string|null;
    addLog:(log:ActivityLog)=>void;
    clearLogs:()=>void;
    setLogs:(logs:ActivityLog[])=>void;
}
export const useActivityLogStore = create<ActivityLogState>((set) => ({
    logs:[],
    isLoading:false,
    error:null,
    addLog:(log) => set((state) => ({
        logs:[...state.logs, log]
    })),
    clearLogs:() => set({logs:[]}),
    setLogs:(logs) => set({logs}),
}));