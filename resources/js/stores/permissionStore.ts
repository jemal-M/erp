import {create} from "zustand";
export interface Permission{
    id:number;
    name:string;
    guard_name:string;
    created_at?:string;
    updated_at?:string;
}
 interface PermissionState{
    permissions:Permission[];
    currentPermission:Permission | null;
    isLoading:boolean;
    error:string | null;
    setPermissions:(permissions:Permission[]) => void;
    setCurrentPermission:(permission:Permission | null) => void;
    addPermission:(permission:Permission) => void;
    updatePermissionById:(id:number,permission:Partial<Permission>) => void;
    deletePermission:(id:number) => void;
    fetchPermissions:() => Promise<Permission[] | undefined>;
    createPermission:(permissionData:Omit<Permission,'id'>) => Promise<void>;
    updatePermission:(id:number,permissionData:Partial<Permission>) => Promise<void>;
    deletePermissionById:(id:number) => Promise<void>;
}
 
export const usePermissionStore = create<PermissionState>((set, get) => ({
    permissions: [],
    currentPermission: null,
    isLoading: false,
    error: null,
    setPermissions: (permissions) => set({ permissions }),
    setCurrentPermission: (permission) => set({ currentPermission: permission }),
    addPermission: (permission) => set((state) => ({ permissions: [...state.permissions, permission] })),
    updatePermissionById: (id, updates) => set((state) => ({
        permissions: state.permissions.map((permission) =>
            permission.id === id ? { ...permission, ...updates } : permission
        ),
        currentPermission: state.currentPermission?.id === id
            ? { ...state.currentPermission, ...updates }
            : state.currentPermission
    })),
    deletePermission: (id) => set((state) => ({
        permissions: state.permissions.filter((permission) => permission.id !== id),
        currentPermission: state.currentPermission?.id === id ? null : state.currentPermission
    })),
    fetchPermissions: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch('/api/permissions');
            if (!response.ok) {
                throw new Error('Failed to fetch permissions');
            }
            const data = await response.json();
            set({ permissions: data, isLoading: false });
            return data;
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            return undefined;
        }
    },
    createPermission: async (permissionData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch('/api/permissions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(permissionData),
            });
            if (!response.ok) {
                throw new Error('Failed to create permission');
            }
            const newPermission = await response.json();
            set((state) => ({ permissions: [...state.permissions, newPermission], isLoading: false }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    updatePermission: async (id, permissionData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`/api/permissions/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(permissionData),
            });
            if (!response.ok) {
                throw new Error('Failed to update permission');
            }
            const updatedPermission = await response.json();
            set((state) => ({
                permissions: state.permissions.map((permission) =>
                    permission.id === id ? updatedPermission : permission
                ),
                currentPermission: state.currentPermission?.id === id ? updatedPermission : state.currentPermission,
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    deletePermissionById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`/api/permissions/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete permission');
            }
            set((state) => ({
                permissions: state.permissions.filter((permission) => permission.id !== id),
                currentPermission: state.currentPermission?.id === id ? null : state.currentPermission,
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));