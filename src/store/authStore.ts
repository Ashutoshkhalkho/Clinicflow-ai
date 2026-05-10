import { create } from 'zustand';
import { User } from 'firebase/auth';

type Role = 'admin' | 'receptionist' | 'doctor' | null;

interface AuthState {
  user: User | null;
  role: Role;
  loading: boolean;
  setUser: (user: User | null) => void;
  setRole: (role: Role) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  role: null,
  loading: true,
  setUser: (user) => set({ user }),
  setRole: (role) => set({ role }),
  setLoading: (loading) => set({ loading }),
  logout: () => set({ user: null, role: null }),
}));
