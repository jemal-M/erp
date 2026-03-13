import {create} from "zustand";
export interface Employee {
    id: number;
    name: string;
    email: string;
    position: string;
    department: string;
    salary: number;
}

export interface EmployeeState{
     
    employees: Employee[];
    currentEmployee: Employee | null;
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;
    setCurrentEmployee: (employee: Employee | null) => void;
    setEmployees: (employees: Employee[]) => void;
    addEmployee: (employee: Employee) => void;
    updateEmployee: (id: number, updates: Partial<Employee>) => void;
    removeEmployee: (id: number) => void;
    setLoading: (isLoading: boolean) => void;
    setError: (error: string | null) => void;
    fetchEmployees: () => Promise<void>;
    fetchEmployeeById: (id: number) => Promise<Employee | undefined>;
    createEmployee: (employeeData: Omit<Employee, 'id'>) => Promise<void>;
    updateEmployeeById: (id: number, employeeData: Partial<Employee>) => Promise<void>;
    deleteEmployeeById: (id: number) => Promise<void>;

}

export const useEmployeeStore = create<EmployeeState>((set) => ({

    employees: [],
    currentEmployee: null,
    isLoading: false,
    error: null,
    isAuthenticated: false,

    setCurrentEmployee: (employee) => set({ currentEmployee: employee }),

    setEmployees: (employees) => set({ employees }),

    addEmployee: (employee) => set((state) => ({ employees: [...state.employees, employee] })),

    updateEmployee: (id, updates) => set((state) => ({
        employees: state.employees.map((employee) =>
            employee.id === id ? { ...employee, ...updates } : employee
        )
    })),

    removeEmployee: (id) => set((state) => ({
        employees: state.employees.filter((employee) => employee.id !== id)
    })),

    setLoading: (isLoading) => set({ isLoading }),

    setError: (error) => set({ error }),

    fetchEmployees: async () => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            set({ isLoading: false });
        } catch (error) {
            set({ isLoading: false, error: 'Failed to fetch employees' });
        }
    },

    fetchEmployeeById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            const employee = useEmployeeStore.getState().employees.find(e => e.id === id);
            set({ isLoading: false, currentEmployee: employee || null });
            return employee;
        } catch (error) {
            set({ isLoading: false, error: 'Failed to fetch employee' });
            return undefined;
        }
    },

    createEmployee: async (employeeData) => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            const newEmployee = { ...employeeData, id: Date.now() };
            set((state) => ({ employees: [...state.employees, newEmployee], isLoading: false }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to create employee' });
        }
    },

    updateEmployeeById: async (id, employeeData) => {
        set({ isLoading: true, error: null });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            set((state) => ({
                employees: state.employees.map((employee) =>
                    employee.id === id ? { ...employee, ...employeeData } : employee
                ),
                isLoading: false
            }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to update employee' });
        }
    },

    deleteEmployeeById: async (id) => {
        set({
            isLoading: true, error: null 
        });
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 500));
            set((state) => ({ employees: state.employees.filter((employee) => employee.id !== id), isLoading: false }));
        } catch (error) {
            set({ isLoading: false, error: 'Failed to delete employee' });
            throw error;
        }
    },

}));