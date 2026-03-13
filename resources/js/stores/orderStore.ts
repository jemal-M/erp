import { create } from 'zustand';
import { router } from '@inertiajs/react';

// Define Order type locally since it's not exported from auth.ts
export interface Order {
    id: number;
    order_number?: string;
    customer_id?: number;
    customer_name?: string;
    status?: string;
    total_amount?: number;
    subtotal?: number;
    tax_amount?: number;
    discount_amount?: number;
    shipping_fee?: number;
    notes?: string;
    order_date?: string;
    shipping_address?: string;
    billing_address?: string;
    payment_method?: string;
    payment_status?: string;
    created_at?: string;
    updated_at?: string;
    [key: string]: unknown;
}

// Selector types for optimized re-renders
export type OrderSelector<T> = (state: OrderState) => T;

interface OrderState {
    // State
    orders: Order[];
    currentOrder: Order | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;

    // Actions
    setOrders: (orders: Order[]) => void;
    setCurrentOrder: (order: Order | null) => void;
    addOrder: (order: Order) => void;
    updateOrder: (id: number, updates: Partial<Order>) => void;
    removeOrder: (id: number) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    logout: () => void;
    
    // Async actions
    fetchCurrentOrder: () => Promise<void>;
    fetchOrders: () => Promise<void>;
    createOrder: (orderData: Partial<Order>) => Promise<void>;
    updateOrderById: (id: number, orderData: Partial<Order>) => Promise<void>;
    deleteOrder: (id: number) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set, get) => ({
    // Initial state
    orders: [],
    currentOrder: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,

    // Synchronous actions
    setOrders: (orders) => set({ orders }),
    
    setCurrentOrder: (order) => set({ currentOrder: order }),
    
    addOrder: (order) => set((state) => ({ 
        orders: [...state.orders, order] 
    })),
    
    updateOrder: (id, updates) => set((state) => ({
        orders: state.orders.map((order) => 
            order.id === id ? { ...order, ...updates } : order
        ),
        currentOrder: state.currentOrder?.id === id 
            ? { ...state.currentOrder, ...updates }
            : state.currentOrder
    })),
    
    removeOrder: (id) => set((state) => ({
        orders: state.orders.filter((order) => order.id !== id)
    })),
    
    setLoading: (isLoading) => set({ isLoading }),
    
    setError: (error) => set({ error }),
    
    logout: () => {
        router.post('/logout', {}, {
            onSuccess: () => {
                set({ 
                    orders: [],
                    currentOrder: null,
                    isAuthenticated: false
                });
            }
        });
    },

    // Async actions
    fetchCurrentOrder: async () => {
        set({ isLoading: true, error: null });
        try {
            await router.get('/order', {}, {
                onSuccess: (page: any) => {
                    const order = page.props?.auth?.order as Order | undefined;
                    set({ 
                        currentOrder: order || null,
                        isAuthenticated: !!order,
                        isLoading: false 
                    });
                },
                onError: (errors: any) => {
                    set({ 
                        isLoading: false, 
                        error: errors?.message || 'Failed to fetch current order',
                        isAuthenticated: false 
                    });
                }
            });
        } catch (error) {
            set({ 
                isLoading: false, 
                error: error instanceof Error ? error.message : 'An error occurred',
                isAuthenticated: false
            });
        }
    },

    fetchOrders: async () => {
        set({ isLoading: true, error: null });
        try {
            await router.get('/orders', {}, {
                onSuccess: (page: any) => {
                    const orders = page.props?.orders as Order[] | undefined;
                    set({ 
                        orders: orders || [], 
                        isLoading: false 
                    });
                },
                onError: (errors: any) => {
                    set({ 
                        isLoading: false, 
                        error: errors?.message || 'Failed to fetch orders'
                    });
                }
            });
        } catch (error) {
            set({ 
                isLoading: false, 
                error: error instanceof Error ? error.message : 'An error occurred'
            });
        }
    },

    createOrder: async (orderData: any) => {
        set({ isLoading: true, error: null });
        try {
            await router.post('/orders', orderData, {
                onSuccess: (page: any) => {
                    const newOrder = page.props?.order as Order | undefined;
                    if (newOrder) {
                        set((state) => ({ 
                            orders: [...state.orders, newOrder],
                            isLoading: false 
                        }));
                    } else {
                        set({ isLoading: false });
                    }
                },
                onError: (errors: any) => {
                    set({ 
                        isLoading: false, 
                        error: errors?.message || 'Failed to create order'
                    });
                }
            });
        } catch (error) {
            set({ 
                isLoading: false, 
                error: error instanceof Error ? error.message : 'An error occurred'
            });
        }
    },

    updateOrderById: async (id: number, orderData: any) => {
        set({ isLoading: true, error: null });
        try {
            await router.put(`/orders/${id}`, orderData, {
                onSuccess: (page: any) => {
                    const updatedOrder = page.props?.order as Order | undefined;
                    if (updatedOrder) {
                        set((state) => ({
                            orders: state.orders.map((order) => 
                                order.id === id ? updatedOrder : order
                            ),
                            currentOrder: state.currentOrder?.id === id 
                                ? updatedOrder 
                                : state.currentOrder,
                            isLoading: false
                        }));
                    } else {
                        set({ isLoading: false });
                    }
                },
                onError: (errors: any) => {
                    set({ 
                        isLoading: false, 
                        error: errors?.message || 'Failed to update order'
                    });
                }
            });
        } catch (error) {
            set({ 
                isLoading: false, 
                error: error instanceof Error ? error.message : 'An error occurred'
            });
        }
    },

    deleteOrder: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
            await router.delete(`/orders/${id}`, {
                onSuccess: () => {
                    set((state) => ({
                        orders: state.orders.filter((order) => order.id !== id),
                        currentOrder: state.currentOrder?.id === id ? null : state.currentOrder,
                        isLoading: false
                    }));
                },
                onError: (errors: any) => {
                    set({ 
                        isLoading: false, 
                        error: errors?.message || 'Failed to delete order'
                    });
                }
            });
        } catch (error) {
            set({ 
                isLoading: false, 
                error: error instanceof Error ? error.message : 'An error occurred'
            });
        }
    },
}));
