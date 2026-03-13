import { create } from 'zustand';
export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
}
interface ProductState {
    products: Product[];
    addProduct: (product: Product) => void;
    updateProduct: (id: number, updates: Partial<Product>) => void;
    deleteProduct: (id: number) => void;
    isLoading: boolean;
    setError: (error: string | null) => void;
    error: string | null;
    setLoading: (loading: boolean) => void;
    setProducts: (products: Product[]) => void;
    setCurrentProduct: (product: Product | null) => void;
    currentProduct: Product | null;
    fetchProducts: () => Promise<void>;
    fetchProductById: (id: number) => Promise<Product | undefined>;
    createProduct: (productData: Omit<Product, 'id'>) => Promise<void>;
    updateProductById: (id: number, productData: Omit<Product, 'id'>) => Promise<void>;
    deleteProductById: (id: number) => Promise<void>;
    
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    currentProduct: null,
    isLoading: false,
    error: null,
    setProducts: (products) => set({ products }),
    setCurrentProduct: (currentProduct) => set({ currentProduct }),
    addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
    updateProduct: (id, updates) => set((state) => ({
        products: state.products.map((product) =>
            product.id === id ? { ...product, ...updates } : product
        )
    })),
    deleteProduct: (id) => set((state) => ({
        products: state.products.filter((product) => product.id !== id)
    })),
    setLoading: (isLoading) => set({ isLoading }),
    setError: (error) => set({ error }),
    fetchProducts: async () => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            set({ isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: 'Failed to fetch products' });
        }
    },
    fetchProductById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            const product = useProductStore.getState().products.find(p => p.id === id);
            set({ isLoading: false, currentProduct: product || null });
            return product;
        } catch (error) {
            set({ isLoading: false, error: 'Failed to fetch product' });
            return undefined;
        }
    },
    createProduct: async (productData) => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            const newProduct = { ...productData, id: Date.now() };
            set((state) => ({ products: [...state.products, newProduct], isLoading: false }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to create product' });
        }
    },
    updateProductById: async (id, productData) => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            set((state) => ({
                products: state.products.map((product) =>
                    product.id === id ? { ...product, ...productData } : product
                ),
                isLoading: false
            }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to update product' });
        }
    },
    deleteProductById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            set((state) => ({ products: state.products.filter((product) => product.id !== id), isLoading: false }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to delete product' });
            throw error;
            

}));