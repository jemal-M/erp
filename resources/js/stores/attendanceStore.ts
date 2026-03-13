import {create} from "zustand";
export interface Attendance{
    id:number;
    employeeId:number;
    checkIn:Date;
    checkOut:Date;
    date:Date;
    status:string;
}
export interface AttendanceState{
    attendances:Attendance[];
    currentAttendance:Attendance|null;
    isAuthenticated:boolean;
    isLoading:boolean;
    error:string|null;
    addAttendance:(attendance:Attendance)=>void;
    updateAttendance:(id:number,attendance:Partial<Attendance>)=>void;
    deleteAttendance:(id:number)=>void;
    setCurrentAttendance:(attendance:Attendance|null)=>void;
}
export const useAttendanceStore = create<AttendanceState>((set) => ({
    attendances:[],
    currentAttendance:null,
    isAuthenticated:true,
    isLoading:false,
    error:null,
    addAttendance:(attendance) => set((state) => ({
        attendances:[...state.attendances, attendance]
    })),
    updateAttendance:(id, attendance) => set((state) => ({
        attendances:state.attendances.map(a => 
            a.id === id ? {...a, ...attendance} : a
        ),
        currentAttendance:state.currentAttendance?.id === id ? {...state.currentAttendance, ...attendance} : state.currentAttendance
    })),
    deleteAttendance:(id) => set((state) => ({
        attendances:state.attendances.filter(a => a.id !== id)
    })),
    setCurrentAttendance:(attendance) => set({currentAttendance:attendance})
}));