import { create } from 'zustand';
import { router } from '@inertiajs/react';
import type { User } from '@/types/auth';

// Selector types for optimized re-renders
export type UserSelector<T> = (state: UserState) => T;

interface Role {
    id: number;
    name: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserWithRole extends User {
    role?: Role;
    role_id?: number;
}

interface UserState {
    // State
    currentUser: UserWithRole | null;
    users: UserWithRole[];
    isLoading: boolean;
    error: string | null;
    isAuthenticated: boolean;

    // Actions
    setCurrentUser: (user: UserWithRole | null) => void;
    setUsers: (users: UserWithRole[]) => void;
    addUser: (user: UserWithRole) => void;
    updateUser: (id: number, updates: Partial<UserWithRole>) => void;
    removeUser: (id: number) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    logout: () => void;
    
    // Async actions
    fetchCurrentUser: () => Promise<void>;
    fetchUsers: () => Promise<void>;
    createUser: (userData: Partial<UserWithRole>) => Promise<void>;
    updateUserById: (id: number, userData: Partial<UserWithRole>) => Promise<void>;
    deleteUser: (id: number) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
    // Initial state
    currentUser: null,
    users: [],
    isLoading: false,
    error: null,
    isAuthenticated: false,

    // Synchronous actions
    setCurrentUser: (user) => set({ 
        currentUser: user, 
        isAuthenticated: !!user 
    }),
    
    setUsers: (users) => set({ users }),
    
    addUser: (user) => set((state) => ({ 
        users: [...state.users, user] 
    })),
    
    updateUser: (id, updates) => set((state) => ({
        users: state.users.map((user) => 
            user.id === id ? { ...user, ...updates } : user
        ),
        currentUser: state.currentUser?.id === id 
            ? { ...state.currentUser, ...updates }
            : state.currentUser
    })),
    
    removeUser: (id) => set((state) => ({
        users: state.users.filter((user) => user.id !== id)
    })),
    
    setLoading: (isLoading) => set({ isLoading }),
    
    setError: (error) => set({ error }),
    
    logout: () => {
        router.post('/logout', {}, {
            onSuccess: () => {
                set({ 
                    currentUser: null, 
                    isAuthenticated: false,
                    users: [] 
                });
            }
        });
    },

    // Async actions
    fetchCurrentUser: async () => {
        set({ isLoading: true, error: null });
        try {
            await router.get('/user', {}, {
                onSuccess: (page: any) => {
                    const user = page.props?.auth?.user as UserWithRole | undefined;
                    set({ 
                        currentUser: user || null, 
                        isAuthenticated: !!user,
                        isLoading: false 
                    });
                },
                onError: (errors: any) => {
                    set({ 
                        isLoading: false, 
                        error: errors?.message || 'Failed to fetch current user',
                        isAuthenticated: false 
                    });
                }
            });
        } catch (error) {
            set({ 
                isLoading: false, 
                error: error instanceof Error ? error.message : 'An error occurred',
                isAuthenticated: false
            });
        }
    },

    fetchUsers: async () => {
        set({ isLoading: true, error: null });
        try {
            await router.get('/users', {}, {
                onSuccess: (page: any) => {
                    const users = page.props?.users as UserWithRole[] | undefined;
                    set({ 
                        users: users || [], 
                        isLoading: false 
                    });
                },
                onError: (errors: any) => {
                    set({ 
                        isLoading: false, 
                        error: errors?.message || 'Failed to fetch users'
                    });
                }
            });
        } catch (error) {
            set({ 
                isLoading: false, 
                error: error instanceof Error ? error.message : 'An error occurred'
            });
        }
    },

    createUser: async (userData: any) => {
        set({ isLoading: true, error: null });
        try {
            await router.post('/users', userData, {
                onSuccess: (page: any) => {
                    const newUser = page.props?.user as UserWithRole | undefined;
                    if (newUser) {
                        set((state) => ({ 
                            users: [...state.users, newUser],
                            isLoading: false 
                        }));
                    } else {
                        set({ isLoading: false });
                    }
                },
                onError: (errors: any) => {
                    set({ 
                        isLoading: false, 
                        error: errors?.message || 'Failed to create user'
                    });
                }
            });
        } catch (error) {
            set({ 
                isLoading: false, 
                error: error instanceof Error ? error.message : 'An error occurred'
            });
        }
    },

    updateUserById: async (id: number, userData: any) => {
        set({ isLoading: true, error: null });
        try {
            await router.put(`/users/${id}`, userData, {
                onSuccess: (page: any) => {
                    const updatedUser = page.props?.user as UserWithRole | undefined;
                    if (updatedUser) {
                        set((state) => ({
                            users: state.users.map((user) => 
                                user.id === id ? updatedUser : user
                            ),
                            currentUser: state.currentUser?.id === id 
                                ? updatedUser 
                                : state.currentUser,
                            isLoading: false
                        }));
                    } else {
                        set({ isLoading: false });
                    }
                },
                onError: (errors: any) => {
                    set({ 
                        isLoading: false, 
                        error: errors?.message || 'Failed to update user'
                    });
                }
            });
        } catch (error) {
            set({ 
                isLoading: false, 
                error: error instanceof Error ? error.message : 'An error occurred'
            });
        }
    },

    deleteUser: async (id: number) => {
        set({ isLoading: true, error: null });
        try {
            await router.delete(`/users/${id}`, {
                onSuccess: () => {
                    set((state) => ({
                        users: state.users.filter((user) => user.id !== id),
                        isLoading: false
                    }));
                },
                onError: (errors: any) => {
                    set({ 
                        isLoading: false, 
                        error: errors?.message || 'Failed to delete user'
                    });
                }
            });
        } catch (error) {
            set({ 
                isLoading: false, 
                error: error instanceof Error ? error.message : 'An error occurred'
            });
        }
    },
}));
