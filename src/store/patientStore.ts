import { create } from 'zustand';
import { Patient } from '../types';

interface PatientState {
  patients: Patient[];
  loading: boolean;
  setPatients: (patients: Patient[]) => void;
  addPatient: (patient: Patient) => void;
  updatePatient: (id: string, updates: Partial<Patient>) => void;
}

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  loading: false,
  setPatients: (patients) => set({ patients }),
  addPatient: (patient) => set((state) => ({ patients: [...state.patients, patient] })),
  updatePatient: (id, updates) => set((state) => ({
    patients: state.patients.map((p) => p.id === id ? { ...p, ...updates } : p)
  }))
}));
