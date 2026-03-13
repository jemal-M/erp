import {create } from "zustand"
export interface Account{
    id:number;
    name:string;
    balance:number;
}
export interface AcountState{
     accounts:Account[];
     addAccount:(account:Account)=>void;
     updateAccount:(id:number,updates:Partial<Account>)=>void;
     deleteAccount:(id:number)=>void;
     loading:boolean;
     error:string|null;
     fetchAccounts:()=>Promise<void>;
     fetchAccountById:(id:number)=>Promise<Account|undefined>;
     createAccount:(accountData:Omit<Account,'id'>)=>Promise<void>;

}
export const useAccountStore = create<AcountState>((set) => ({
    accounts:[],
    loading:false,
    error:null,
    fetchAccounts:async()=>{
        set({loading:true,error:null});
        try{
            const response=await fetch('/api/accounts');
            const accounts=await response.json();
            set({accounts});
        }catch(error){
            set({error:'Failed to fetch accounts'});
        }finally{
            set({loading:false});
        }
    },
    fetchAccountById:async(id)=>{
        set({loading:true,error:null});
        try{
            const response=await fetch(`/api/accounts/${id}`);
            if(!response.ok)throw new Error('Account not found');
            const account=await response.json();
            return account;
        }catch(error){
            set({error:'Failed to fetch account'});
            return undefined;
        }finally{
            set({loading:false});
        }
    },
    createAccount:async(accountData)=>{
        set({loading:true,error:null});
        try{
            const response=await fetch('/api/accounts',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(accountData),
            });
            const newAccount=await response.json();
            set((state)=>({
                accounts:[...state.accounts,newAccount]
            }));
        }catch(error){
            set({error:'Failed to create account'});
        }finally{
            set({loading:false});
        }
    },
    addAccount:(account)=>set((state)=>({
        accounts:[...state.accounts,account]
    })),
    updateAccount:(id,updates)=>set((state)=>({
        accounts:state.accounts.map((account)=>
        account.id===id?{...account,...updates}:account
        )
    })),
    deleteAccount:(id)=>set((state)=>({
        accounts:state.accounts.filter((account)=>account.id!==id)
    })),
}));
