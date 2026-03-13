import {create} from "zustand";
export interface Seeting{
      id:number;
    name:string;
    value:string;
    description:string;
    created_at?:string;
}
export interface SettingState{
    settings:Seeting[];
    currentSetting:Seeting|null;
    isLoading:boolean;
    error:string|null;
    setSettings:(settings:Seeting[])=>void;
    setCurrentSetting:(setting:Seeting|null)=>void;
    addSetting:(setting:Seeting)=>void;
    updateSetting:(id:number,updates:Partial<Seeting>)=>void;
    removeSetting:(id:number)=>void;
    setLoading:(isLoading:boolean)=>void;
    setError:(error:string|null)=>void;
    
}
export const useSettingStore=create<SettingState>()((set)=>({
    settings:[],
    currentSetting:null,
    isLoading:false,
    error:null,
    setSettings:(settings)=>set({settings}),
    setCurrentSetting:(currentSetting)=>set({currentSetting}),
    addSetting:(setting)=>set((state)=>({settings:[...state.settings,setting]})),
    updateSetting:(id,updates)=>set((state)=>({
        settings:state.settings.map((cat)=>
        cat.id===id?{...cat,...updates}:cat)
    })),
    removeSetting:(id)=>set((state)=>({
        settings:state.settings.filter((cat)=>cat.id!==id)
    })),
    setLoading:(isLoading)=>set({isLoading}),
    setError:(error)=>set({error}),

}));