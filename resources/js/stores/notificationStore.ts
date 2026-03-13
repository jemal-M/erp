import {create} from "zustand";
export interface Notification{
    id:number;
    message:string;
    type:string;
    read:boolean;
    created_at:string;
}
interface NotificationState{
    notifications:Notification[];
    addNotification:(notification:Notification)=>void;
    markAsRead:(id:number)=>void;
    removeNotification:(id:number)=>void;
}
export const useNotificationStore=create<NotificationState>((set)=>({
    notifications:[],
    addNotification:(notification)=>set((state)=>({
        notifications:[notification,...state.notifications]
    })),
    markAsRead:(id)=>set((state)=>({
        notifications:state.notifications.map((notification)=>
            notification.id===id?{...notification,read:true}:notification
        )
    })),
    removeNotification:(id)=>set((state)=>({
        notifications:state.notifications.filter((notification)=>notification.id!==id)
    }))
}));