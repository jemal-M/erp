import { create   } from  "zustand";
export interface Report{
    id:number;
    reportType:string;
    generatedDate:Date;
    data:any;           
}
export interface ReportState{
    reports:Report[];
    isLoading:boolean;
    error:string|null;
    addReport:(report:Report)=>void;
    generateReport:(reportType:string)=>void;
}
export const useReportStore = create<ReportState>((set) => ({
    reports:[],
    isLoading:false,
    error:null,
    addReport:(report) => set((state) => ({
        reports:[...state.reports, report]
    })),
    generateReport:(reportType) => {
        const newReport:Report={
            id:Date.now(),
            reportType,
            generatedDate:new Date(),
            data:{}
        };
        set((state) => ({
            reports:[...state.reports, newReport]
        }));
    }
}));