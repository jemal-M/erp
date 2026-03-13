import {create} from "zustand";
export interface Salary{
    id:number;
    employeeId:number;
    basicSalary:number;
    allowance:number;
    deduction:number;
    netSalary:number;
    salaryDate:Date;
}
interface SalaryState{
    salaries:Salary[];
    currentSalary:Salary | null;
    isLoading:boolean;
    error:string | null;
    isAuthenticated:boolean;

    setSalaries:(salaries:Salary[]) => void;
    setCurrentSalary:(salary:Salary | null) => void;
    addSalary:(salary:Salary) => void;
    updateSalaryById:(id:number,salary:Partial<Salary>) => void;
    deleteSalary:(id:number) => void;
    setLoading:(isLoading:boolean) => void;
    setError:(error:string | null) => void;
    logout:() => void;
}
export const useSalaryStore = create<SalaryState>((set) => ({
    salaries:[],
    currentSalary:null,
    isLoading:false,
    error:null,
    isAuthenticated:true,
    setSalaries:(salaries) => set({salaries}),
    setCurrentSalary:(salary) => set({currentSalary:salary}),
    addSalary:(salary) => set((state) => ({salaries:[...state.salaries, salary]})),
    updateSalaryById:(id, salary) => set((state) => ({
        salaries:state.salaries.map((s) => s.id === id ? {...s, ...salary} : s),
        currentSalary:state.currentSalary?.id === id ? {...state.currentSalary, ...salary} : state.currentSalary
    })),
    deleteSalary:(id) => set((state) => ({salaries:state.salaries.filter((s) => s.id !== id)})),
    setLoading:(isLoading) => set({isLoading}),
    setError:(error) => set({error}),
    logout:() => set({
        salaries:[],
        currentSalary:null,
        isAuthenticated:false
    })
}));