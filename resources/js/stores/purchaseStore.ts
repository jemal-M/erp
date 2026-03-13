import { create} from 'zustand';

export interface Purchaseorder{
     id:number;
    supplierId:number;
    productId:number;
    quantity:number;
    orderDate:Date;
    status:string;
}
export interface PurchaseState{
    purchases:Purchaseorder[];
    currentPurchase:Purchaseorder | null;
    isLoading:boolean;
    error:string | null;
    isAuthenticated:boolean;

    setPurchases:(purchases:Purchaseorder[]) => void;
    setCurrentPurchase:(purchase:Purchaseorder | null) => void;
    addPurchase:(purchase:Purchaseorder) => void;
    updatePurchase:(id:number, updates:Partial<Purchaseorder>) => void;
    removePurchase:(id:number) => void;
    setLoading:(isLoading:boolean) => void;
    setError:(error:string | null) => void;
    logout:() => void;
    fetchPurchases:() => Promise<void>;
    createPurchase:(purchaseData:Partial<Purchaseorder>) => Promise<void>;
    updatePurchaseById:(id:number, purchaseData:Partial<Purchaseorder>) => Promise<void>;
    deletePurchase:(id:number) => Promise<void>;
}
export const usePurchaseStore = create<PurchaseState>((set) => ({
    purchases:[],
    currentPurchase:null,
    isLoading:false,
    error:null,
    isAuthenticated:false,

    setPurchases:(purchases) => set({ purchases }),
    setCurrentPurchase:(currentPurchase) => set({ currentPurchase }),
    addPurchase:(purchase) => set((state) => ({ purchases:[...state.purchases, purchase] })),
    updatePurchase:(id, updates) => set((state) => ({
        purchases:state.purchases.map((purchase) => 
            purchase.id === id ? { ...purchase, ...updates } : purchase
        ),
        currentPurchase:state.currentPurchase?.id === id 
            ? { ...state.currentPurchase, ...updates }
            : state.currentPurchase
    })),
    removePurchase:(id) => set((state) => ({
        purchases:state.purchases.filter((purchase) => purchase.id !== id)
    })),
    setLoading:(isLoading) => set({ isLoading }),
    setError:(error) => set({ error }),
    logout:() => {
        set({ 
            purchases:[],
            currentPurchase:null,
            isAuthenticated:false
        });
    },
    fetchPurchases:async () => {
        set({ isLoading:true, error:null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            set({ isLoading:false });
        } catch (error) {
            set({ isLoading:false, error:'Failed to fetch purchases' });
        }
    },
    createPurchase:async (purchaseData) => {
        set({ isLoading:true, error:null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            const newPurchase = { ...purchaseData, id: Date.now() };
            set((state) => ({ purchases:[...state.purchases, newPurchase], isLoading:false }));
        } catch (error) {
            set({ isLoading:false, error:'Failed to create purchase' });
        }
    },
   updatePurchaseById:async (id, purchaseData) => {
        set({ isLoading:true, error:null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            set((state) => ({
                purchases:state.purchases.map((purchase) =>
                    purchase.id === id ? { ...purchase, ...purchaseData } : purchase
                ),
                currentPurchase:state.currentPurchase?.id === id
                    ? { ...state.currentPurchase, ...purchaseData }
                    : state.currentPurchase,
                isLoading:false
            }));
        } catch (error) {
            set({ isLoading:false, error:'Failed to update purchase' });
        }
    },
    deletePurchase:async (id) => {
        set({ isLoading:true, error:null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            set((state) => ({ purchases:state.purchases.filter((purchase) => purchase.id !== id), isLoading:false }));
        } catch (error) {
            set({ isLoading:false, error:'Failed to delete purchase' });
            throw error;
        }
    },

}));
              