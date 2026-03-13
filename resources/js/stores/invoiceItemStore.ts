import {create} from "zustand";
export interface InvoiceItem{
    id:number;
    invoiceId:number;
    productId:number;
    quantity:number;
    price:number;
    totalAmount:number;
}
interface InvoiceItemStore {
    invoiceItems: InvoiceItem[];
    loading: boolean;
    error: string | null;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    fetchInvoiceItems: () => Promise<void>;
    createInvoiceItem: (invoiceItemData: Omit<InvoiceItem, 'id'>) => Promise<void>;
    updateInvoiceItemById: (id: number, invoiceItemData: Partial<InvoiceItem>) => Promise<void>;
    deleteInvoiceItemById: (id: number) => Promise<void>;
    invoiceItem: InvoiceItem | null;

  }
  
export const useInvoiceItemStore = create<InvoiceItemStore>((set) => ({
    invoiceItems: [],
    invoiceItem:null,

    loading: false,
    error: null,
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    fetchInvoiceItems: async () => {
        set({ loading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            set({ loading: false });
        } catch (error) {
            set({ loading: false, error: 'Failed to fetch invoice items' });
        }
    },
    createInvoiceItem: async (invoiceItemData) => {
        set({ loading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            const newInvoiceItem = { ...invoiceItemData, id: Date.now() };
            set((state) => ({ invoiceItems: [...state.invoiceItems, newInvoiceItem], loading: false }));
        } catch (error) {
            set({ loading: false, error: 'Failed to create invoice item' });
        }
    },
    updateInvoiceItemById: async (id, invoiceItemData) => {
        set({ loading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            set((state) => ({
                invoiceItems: state.invoiceItems.map((invoiceItem) =>
                    invoiceItem.id === id ? { ...invoiceItem, ...invoiceItemData } : invoiceItem
                ),
                loading: false
            }));
        } catch (error) {
            set({ loading: false, error: 'Failed to update invoice item' });
        }
    },
    deleteInvoiceItemById: async (id) => {
        set({ loading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            set((state) => ({ invoiceItems: state.invoiceItems.filter((invoiceItem) => invoiceItem.id !== id), loading: false }));
        } catch (error) {
            set({ loading: false, error: 'Failed to delete invoice item' });
            throw error;
        }
    },

}));