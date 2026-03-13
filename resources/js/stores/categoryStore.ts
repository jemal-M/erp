import { create} from "zustand";
export interface Category{
    id:number;
    name:string;
    description?:string;
    created_at?:string;
    updated_at?:string;
}
export interface CategoryState{
    categories:Category[];
    currentCategory:Category|null;
    isLoading:boolean;
    error:string|null;
    isAuthenticated:boolean;
    setCategories:(categories:Category[])=>void;
    setCurrentCategory:(category:Category|null)=>void;
    addCategory:(category:Category)=>void;
    updateCategory:(id:number,updates:Partial<Category>)=>void;
    removeCategory:(id:number)=>void;
    setLoading:(isLoading:boolean)=>void;
    setError:(error:string|null)=>void;
    logout:()=>void;
}
export const useCategoryStore=create<CategoryState>((set)=>({
    categories:[],
    currentCategory:null,
    isLoading:false,
    error:null,
    isAuthenticated:false,
    setCategories:(categories)=>set({categories}),
    setCurrentCategory:(currentCategory)=>set({currentCategory}),
    addCategory:(category)=>set((state)=>({categories:[...state.categories,category]})),
    updateCategory:(id,updates)=>set((state)=>({
        categories:state.categories.map((cat)=>
        cat.id===id?{...cat,...updates}:cat)
    })),
    removeCategory:(id)=>set((state)=>({
        categories:state.categories.filter((cat)=>cat.id!==id)
    })),
    setLoading:(isLoading)=>set({isLoading}),
    setError:(error)=>set({error}),
    logout:()=>set({isAuthenticated:false,token:null})
}));