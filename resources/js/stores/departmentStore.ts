import {create} from "zustand";
export interface Department{
     
    id: number;
    name: string;
    description: string;

}
export interface DepartmentState{
    departments: Department[];
    addDepartment: (department: Department) => void;
    removeDepartment: (id: number) => void;
    updateDepartment: (id: number, updatedDepartment: Partial<Department>) => void;
    fetchDepartments: () => void;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSelectedDepartment: (department: Department | null) => void;
    selectedDepartment: Department | null;
     

}
export const useDepartmentStore = create<DepartmentState>()((set) => ({
    departments: [],
    selectedDepartment: null,
    addDepartment: (department) => set((state) => ({departments: [...state.departments, department]})),
    removeDepartment: (id) => set((state) => ({departments: state.departments.filter(department => department.id !== id)})),
    updateDepartment: (id, updatedDepartment) => set((state) => ({
        departments: state.departments.map(department => 
            department.id === id ? {...department, ...updatedDepartment} : department
        )
    })),
    fetchDepartments: () => set({departments: [
            {id: 1, name: "IT", description: "Information Technology"},
            {id: 2, name: "HR", description: "Human Resources"},
            {id: 3, name: "Finance", description: "Financial Department"}
        ]}),
        setSelectedDepartment: (selectedDepartment) => set({selectedDepartment}),

}));