import {create} from 'zustand';
export interface InventoryAdjustment{
       
    id?:number;
    productId:number;
    quantity:number;
    reason:string;
    adjustmentDate:Date;
}
export interface InventoryAdjustmentState{
    
    inventoryAdjustments:InventoryAdjustment[];
    addInventoryAdjustment:(inventoryAdjustment:InventoryAdjustment) => void;
    removeInventoryAdjustment:(id:number) => void;
    updateInventoryAdjustment:(updatedInventoryAdjustment:InventoryAdjustment) => void;
    setInventoryAdjustments:(inventoryAdjustments:InventoryAdjustment[]) => void;
    getInventoryAdjustmentById:(id:number) => InventoryAdjustment | undefined;
    getInventoryAdjustmentsByProductId:(productId:number) => InventoryAdjustment[] | undefined;
    getInventoryAdjustmentsByReason:(reason:string) => InventoryAdjustment[] | undefined;
    getInventoryAdjustmentsByDateRange:(startDate:Date,endDate:Date) => InventoryAdjustment[] | undefined;
    getInventoryAdjustmentsByQuantity:(quantity:number) => InventoryAdjustment[] | undefined;
     getInventoryAdjustmentsByDate:(date:Date) => InventoryAdjustment[] | undefined;
      getInventoryAdjustmentsByQuantityRange:(minQuantity:number, maxQuantity:number) => InventoryAdjustment[] | undefined;
       getTotalAdjustmentQuantity:() => number;
       getTotalAdjustmentQuantityByProductId:(productId:number) => number;
       getTotalAdjustmentQuantityByReason:(reason:string) => number;
       getTotalAdjustmentQuantityByDate:(date:Date) => number;
        getTotalAdjustmentQuantityByDateRange:(startDate:Date, endDate:Date) => number;
         
}
export const useInventoryAdjustmentStore = create<InventoryAdjustmentState>()((set,get) =>({
    inventoryAdjustments:[],
    addInventoryAdjustment:(inventoryAdjustment) => set((state) =>({
        inventoryAdjustments:[...state.inventoryAdjustments, inventoryAdjustment]
    })),
    removeInventoryAdjustment:(id) => set((state) =>({
        inventoryAdjustments:state.inventoryAdjustments.filter(inventoryAdjustment => inventoryAdjustment.id !== id)
    })),
    updateInventoryAdjustment:(updatedInventoryAdjustment) => set((state) =>({
        inventoryAdjustments:state.inventoryAdjustments.map(inventoryAdjustment => inventoryAdjustment.id === updatedInventoryAdjustment.id ? updatedInventoryAdjustment : inventoryAdjustment)
    })),
    setInventoryAdjustments:(inventoryAdjustments) => set(() =>({
        inventoryAdjustments
    })),
    getInventoryAdjustmentById:(id) => get().inventoryAdjustments.find(inventoryAdjustment => inventoryAdjustment.id === id),
    getInventoryAdjustmentsByProductId:(productId) => get().inventoryAdjustments.filter(inventoryAdjustment => inventoryAdjustment.productId === productId),
    getInventoryAdjustmentsByReason:(reason) => get().inventoryAdjustments.filter(inventoryAdjustment => inventoryAdjustment.reason === reason),
    getInventoryAdjustmentsByDateRange:(startDate, endDate) => get().inventoryAdjustments.filter(inventoryAdjustment => inventoryAdjustment.adjustmentDate >= startDate && inventoryAdjustment.adjustmentDate <= endDate),
     getInventoryAdjustmentsByQuantity:(quantity) => get().inventoryAdjustments.filter(inventoryAdjustment => inventoryAdjustment.quantity === quantity),
     getInventoryAdjustmentsByDate:(date) => get().inventoryAdjustments.filter(inventoryAdjustment => inventoryAdjustment.adjustmentDate.toDateString() === date.toDateString()),
      getInventoryAdjustmentsByQuantityRange:(minQuantity, maxQuantity) => get().inventoryAdjustments.filter(inventoryAdjustment => inventoryAdjustment.quantity >= minQuantity && inventoryAdjustment.quantity <= maxQuantity),
       getTotalAdjustmentQuantity:() => get().inventoryAdjustments.reduce((total, inventoryAdjustment) => total + inventoryAdjustment.quantity, 0),
       getTotalAdjustmentQuantityByProductId:(productId) => get().inventoryAdjustments.filter(inventoryAdjustment => inventoryAdjustment.productId === productId).reduce((total, inventoryAdjustment) => total + inventoryAdjustment.quantity, 0),
       getTotalAdjustmentQuantityByReason:(reason) => get().inventoryAdjustments.filter(inventoryAdjustment => inventoryAdjustment.reason === reason).reduce((total, inventoryAdjustment) => total + inventoryAdjustment.quantity, 0),
       getTotalAdjustmentQuantityByDate:(date) => get().inventoryAdjustments.filter(inventoryAdjustment => inventoryAdjustment.adjustmentDate.toDateString() === date.toDateString()).reduce((total, inventoryAdjustment) => total + inventoryAdjustment.quantity, 0),
        getTotalAdjustmentQuantityByDateRange:(startDate, endDate) => get().inventoryAdjustments.filter(inventoryAdjustment => inventoryAdjustment.adjustmentDate >= startDate && inventoryAdjustment.adjustmentDate <= endDate).reduce((total, inventoryAdjustment) => total + inventoryAdjustment.quantity, 0),

}));