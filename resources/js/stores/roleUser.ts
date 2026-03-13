import {create} from "zustand";
export interface Role{
    id:number;
    name:string;
    created_at?:string;
    updated_at?:string;
    permissions?:any;

}
export interface RoleState{
     roles:Role[];
     currentRole:Role|null;
    setRoles:(roles:Role[])=>void;
    addRole:(role:Role)=>void;
    updateRole:(id:number,updates:Partial<Role>)=>void;
    removeRole:(id:number)=>void;
}
export const useRoleStore=create<RoleState>((set)=>({
    roles:[],
    currentRole:null,
    setRoles:(roles)=>set({roles}),
    addRole:(role)=>set((state=>({roles:[...state.roles,role]}))),
    updateRole:(id,updates)=>set((state)=>({
        roles:state.roles.map((r)=>
        r.id===id?{...r,...updates}:r)
    })),
    removeRole:(id)=>set((state)=>({
        roles:state.roles.filter((r)=>r.id!==id)
    })),
}));