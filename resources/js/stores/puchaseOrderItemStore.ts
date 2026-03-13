import {create} from "zustand";
export interface PurchaseOrderItem{
        id:number;
    purchaseOrderId:number;
    productId:number;
    quantity:number;
    price:number;
}
export interface PurchaseOrderItemState{
    purchaseOrderItems:PurchaseOrderItem[];
    loading:boolean;
    error:string|null;
    fetchPurchaseOrderItems:()=>Promise<void>;
    fetchPurchaseOrderItemById:(id:number)=>Promise<PurchaseOrderItem|undefined>;
    createPurchaseOrderItem:(purchaseOrderItemData:Omit<PurchaseOrderItem,'id'>)=>Promise<void>;
    updatePurchaseOrderItemById:(id:number,purchaseOrderItemData:Partial<PurchaseOrderItem>)=>Promise<void>;
    deletePurchaseOrderItemById:(id:number)=>Promise<void>;
}

export const usePurchaseOrderItemStore = create<PurchaseOrderItemState>((set) => ({
    purchaseOrderItems:[],
    loading:false,
    error:null,
    fetchPurchaseOrderItems:async () => {
        set({ loading:true, error:null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            set({ loading:false });
        } catch (error) {
            set({ loading:false, error:'Failed to fetch purchase order items' });
        }
    },
    fetchPurchaseOrderItemById:async (id) => {
        set({ loading:true, error:null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            const purchaseOrderItem = usePurchaseOrderItemStore.getState().purchaseOrderItems.find(p => p.id === id);
            set({ loading:false, currentPurchaseOrderItem:purchaseOrderItem || null });
            return purchaseOrderItem;
        } catch (error) {
            set({ loading:false, error:'Failed to fetch purchase order item' });
            return undefined;
        }
    },
    createPurchaseOrderItem:async (purchaseOrderItemData) => {
        set({ loading:true, error:null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            const newPurchaseOrderItem = { ...purchaseOrderItemData, id: Date.now() };
            set((state) => ({ purchaseOrderItems:[...state.purchaseOrderItems, newPurchaseOrderItem], loading:false }));
        } catch (error) {
            set({ loading:false, error:'Failed to create purchase order item' });
        }
    },
    updatePurchaseOrderItemById:async (id, purchaseOrderItemData) => {
        set({ loading:true, error:null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            set((state) => ({
                purchaseOrderItems:state.purchaseOrderItems.map((purchaseOrderItem) =>
                    purchaseOrderItem.id === id ? { ...purchaseOrderItem, ...purchaseOrderItemData } : purchaseOrderItem
                ),
                loading:false
            }));
        } catch (error) {
            set({ loading:false, error:'Failed to update purchase order item' });
        }
    },
    deletePurchaseOrderItemById:async (id) => {
        set({ loading:true, error:null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            set((state) => ({ purchaseOrderItems:state.purchaseOrderItems.filter((purchaseOrderItem) => purchaseOrderItem.id !== id), loading:false }));
        } catch (error) {
            set({ loading:false, error:'Failed to delete purchase order item' });
            throw error;
        }
    },

}));