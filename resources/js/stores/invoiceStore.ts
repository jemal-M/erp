import {create} from 'zustand';
export interface Invoice {
    id: number;
    invoice_number?: string;
    customer_id?: number;
    customer_name?: string;
    status?: string;
    total_amount?: number;
    invoice_date?: string;
    due_date?: string;
    notes?: string;
    created_at?: string;
    updated_at?: string;
    [key: string]: unknown;
}
export interface InvoiceState {
    invoices: Invoice[];
    currentInvoice: Invoice | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    setInvoices: (invoices: Invoice[]) => void;
    setCurrentInvoice: (invoice: Invoice | null) => void;
    addInvoice: (invoice: Invoice) => void;
    updateInvoice: (id: number, updates: Partial<Invoice>) => void;
    removeInvoice: (id: number) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    logout: () => void;
    fetchInvoices: () => Promise<void>;
    fetchInvoiceById: (id: number) => Promise<Invoice | undefined>;
    createInvoice: (invoiceData: Partial<Invoice>) => Promise<void>;
    updateInvoiceById: (id: number, invoiceData: Partial<Invoice>) => Promise<void>;
    deleteInvoice: (id: number) => Promise<void>;
}
export const useInvoiceStore = create<InvoiceState>((set, get) => ({
    // Initial state
    invoices: [],
    currentInvoice: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,

    // Synchronous actions
    setInvoices: (invoices) => set({ invoices }),
    
    setCurrentInvoice: (invoice) => set({ currentInvoice: invoice }),
    
    addInvoice: (invoice) => set((state) => ({ 
        invoices: [...state.invoices, invoice] 
    })),
    
    updateInvoice: (id, updates) => set((state) => ({
        invoices: state.invoices.map((invoice) => 
            invoice.id === id ? { ...invoice, ...updates } : invoice
        ),
        currentInvoice: state.currentInvoice?.id === id 
            ? { ...state.currentInvoice, ...updates }
            : state.currentInvoice
    })),
    
    removeInvoice: (id) => set((state) => ({
        invoices: state.invoices.filter((invoice) => invoice.id !== id)
    })),
    
    setLoading: (isLoading) => set({ isLoading }),
    
    setError: (error) => set({ error }),
    
    logout: () => {
        router.post('/logout', {}, {
            onSuccess: () => {
                set({ 
                    invoices: [],
                    currentInvoice: null,
                    isAuthenticated: false
                });
            }
        });
    },

    // Async actions
    fetchInvoices: async () => {
        set({ isLoading: true, error: null });
        try {
            await router.get('/api/invoices', {}, {
                onSuccess: (page: any) => {
                    set({ 
                        invoices: page.data,
                        isLoading: false 
                    });
                },
                onError: () => {
                    set({ 
                        error: 'Failed to fetch invoices',
                        isLoading: false 
                    });
                }
            });
        } catch (error) {
            set({ 
                error: 'Failed to fetch invoices',
                isLoading: false 
            });
        }
    },
    fetchInvoiceById: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
            await router.get(`/api/invoices/${id}`, {}, {
                onSuccess: (page: any) => {
                    const invoice = page.data;
                    set({
                        currentInvoice: invoice,
                        isLoading: false
                    });
                    return invoice;
                },
                onError: () => {
                    set({
                        error: 'Failed to fetch invoice',
                        isLoading: false
                    });
                }
            });
        } catch (error) {
            set({
                error: 'Failed to fetch invoice',
                isLoading: false
            });
            return undefined;
        }
    },

    createInvoice: async (invoiceData: Partial<Invoice>) => {
        set({ isLoading: true, error: null });
        try {
            await router.post('/api/invoices', invoiceData, {
                onSuccess: (page: any) => {
                    const newInvoice = page.data;
                    set((state) => ({
                        invoices: [...state.invoices, newInvoice],
                        isLoading: false
                    }));
                },
                onError: (errors: any) => {
                    set({
                        error: errors?.message || 'Failed to create invoice',
                        isLoading: false
                    });
                }
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'An error occurred',
                isLoading: false
            });
        }
    },

    updateInvoiceById: async (id: number, invoiceData: Partial<Invoice>) => {
        set({ isLoading: true, error: null });
        try {
            await router.put(`/api/invoices/${id}`, invoiceData, {
                onSuccess: (page: any) => {
                    const updatedInvoice = page.data;
                    set((state) => ({
                        invoices: state.invoices.map(invoice =>
                            invoice.id === id ? updatedInvoice : invoice
                        ),
                        currentInvoice: state.currentInvoice?.id === id ? updatedInvoice : state.currentInvoice,
                        isLoading: false
                    }));
                },
                onError: (errors: any) => {
                    set({
                        error: errors?.message || 'Failed to update invoice',
                        isLoading: false
                    });
                }
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'An error occurred',
                isLoading: false
            });
        }
    },
    deleteInvoice: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
            await router.delete(`/api/invoices/${id}`, {
                onSuccess: () => {
                    set((state) => ({
                        invoices: state.invoices.filter((invoice) => invoice.id !== id),
                        currentInvoice: state.currentInvoice?.id === id ? null : state.currentInvoice,
                        isLoading: false
                    }));
                },
                onError: (errors: any) => {
                    set({
                        error: errors?.message || 'Failed to delete invoice',
                        isLoading: false
                    });
                }
            });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : 'An error occurred',
                isLoading: false
            });
        }
    },
}));