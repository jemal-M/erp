import {create} from "zustand";
export interface Supplier {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    created_at?: string;
    updated_at?: string;
}
 export interface SupplierState {
    suppliers: Supplier[];
    currentSupplier: Supplier | null;
    isLoading: boolean;
    error: string | null;
    fetchSuppliers: () => Promise<void>;
    fetchSupplierById: (id: number) => Promise<Supplier | undefined>;
    createSupplier: (supplierData: Omit<Supplier, 'id' | 'created_at' | 'updated_at'>) => Promise<void>;
    updateSupplierById: (id: number, supplierData: Partial<Supplier>) => Promise<void>;
    deleteSupplierById: (id: number) => Promise<void>;
}

export const useSupplierStore = create<SupplierState>((set) => ({
    suppliers: [],
    currentSupplier: null,
    isLoading: false,
    error: null,

    fetchSuppliers: async () => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch('/api/suppliers');
            if (!response.ok) {
                throw new Error('Failed to fetch suppliers');
            }
            const data = await response.json();
            set({ suppliers: data, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchSupplierById: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`/api/suppliers/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch supplier');
            }
            const data = await response.json();
            set({ currentSupplier: data, isLoading: false });
            return data;
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
            return undefined;
        }
    },

    createSupplier: async (supplierData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch('/api/suppliers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(supplierData),
            });
            if (!response.ok) {
                throw new Error('Failed to create supplier');
            }
            const newSupplier = await response.json();
            set((state) => ({ suppliers: [...state.suppliers, newSupplier], isLoading: false }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
    updateSupplierById: async (id, supplierData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`/api/suppliers/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(supplierData),
            });
            if (!response.ok) {
                throw new Error('Failed to update supplier');
            }
            const updatedSupplier = await response.json();
            set((state) => ({
                suppliers: state.suppliers.map((supplier) =>
                    supplier.id === id ? updatedSupplier : supplier
                ),
                currentSupplier: state.currentSupplier?.id === id ? updatedSupplier : state.currentSupplier,
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    deleteSupplierById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await fetch(`/api/suppliers/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete supplier');
            }
            set((state) => ({
                suppliers: state.suppliers.filter((supplier) => supplier.id !== id),
                currentSupplier: state.currentSupplier?.id === id ? null : state.currentSupplier,
                isLoading: false
            }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));