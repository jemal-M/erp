import { create} from "zustand";
export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    quantity: number;
    price: number;
}
interface OrderItemState {
    orderItems: OrderItem[];
    addOrderItem: (orderItem: OrderItem) => void;
    updateOrderItem: (id: number, updates: Partial<OrderItem>) => void;
    deleteOrderItem: (id: number) => void;
    loading: boolean;
    error: string | null;
    fetchOrderItems: () => Promise<void>;
    fetchOrderItemById: (id: number) => Promise<OrderItem | undefined>;
    createOrderItem: (orderItemData: Omit<OrderItem, 'id'>) => Promise<void>;
}
export const useOrderItemStore = create<OrderItemState>((set) => ({
    orderItems: [],
    loading: false,
    error: null,
    addOrderItem: (orderItem) => set((state) => ({ orderItems: [...state.orderItems, orderItem] })),
    updateOrderItem: (id, updates) => set((state) => ({
        orderItems: state.orderItems.map((item) =>
            item.id === id ? { ...item, ...updates } : item
        ),
    })),
    deleteOrderItem: (id) => set((state) => ({
        orderItems: state.orderItems.filter((item) => item.id !== id),
    })),
    fetchOrderItems: async () => {
        set({ loading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            set({ loading: false });
        } catch (error) {
            set({ loading: false, error: 'Failed to fetch order items' });
        }
    },
    fetchOrderItemById: async (id) => {
        set({ loading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            const orderItem = useOrderItemStore.getState().orderItems.find(p => p.id === id);
            set({ loading: false });
            return orderItem;
        } catch (error) {
            set({ loading: false, error: 'Failed to fetch order item' });
            return undefined;
        }
    },
    createOrderItem: async (orderItemData) => {
        set({ loading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            const newOrderItem = { ...orderItemData, id: Date.now() };
            set((state) => ({ orderItems: [...state.orderItems, newOrderItem], loading: false }));
        } catch (error) {
            set({ loading: false, error: 'Failed to create order item' });
        }
    },
}));