import {create} from "zustand";
export interface Customer {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
}
export interface CustomerState{
    customers: Customer[];
    currentCustomer: Customer | null;
    isLoading: boolean;
    error: string | null;
    fetchCustomers: () => Promise<void>;
    fetchCustomerById: (id: number) => Promise<Customer | undefined>;
    createCustomer: (customerData: Omit<Customer, 'id'>) => Promise<void>;
    updateCustomerById: (id: number, customerData: Partial<Customer>) => Promise<void>;
    deleteCustomerById: (id: number) => Promise<void>;
    setCustomers: (customers: Customer[]) => void;
    setCurrentCustomer: (customer: Customer | null) => void;
    setLoading: (isLoading: boolean) => void;

}
export const useCustomerStore = create<CustomerState>((set) => ({

    customers: [],
    currentCustomer: null,
    isLoading: false,
    error: null,

    setCustomers: (customers) => set({ customers }),
    
    setCurrentCustomer: (currentCustomer) => set({ currentCustomer }),
    
    setLoading: (isLoading) => set({ isLoading }),

    fetchCustomers: async () => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            set({ isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: 'Failed to fetch customers' });
        }
    },

    fetchCustomerById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            const customer = useCustomerStore.getState().customers.find(c => c.id === id);
            set({ isLoading: false, currentCustomer: customer || null });
            return customer;
        } catch (error) {
            set({ isLoading: false, error: 'Failed to fetch customer' });
            return undefined;
        }
    },

    createCustomer: async (customerData) => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            const newCustomer = { ...customerData, id: Date.now() };
            set((state) => ({ customers: [...state.customers, newCustomer], isLoading: false }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to create customer' });
        }
    },

    updateCustomerById: async (id, customerData) => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            set((state) => ({
                customers: state.customers.map((customer) =>
                    customer.id === id ? { ...customer, ...customerData } : customer
                ),
                isLoading: false
            }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to update customer' });
        }
    },

    deleteCustomerById: async (id) => {
        set({
            isLoading: true, error: null 
        });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            set((state) => ({ customers: state.customers.filter((customer) => customer.id !== id), isLoading: false }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to delete customer' });
            throw error;
        } 

    });