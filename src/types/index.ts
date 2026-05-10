export type PatientStatus = 'waiting' | 'in_consultation' | 'completed' | 'skipped';

export interface Patient {
  id: string; // Auto-generated ID
  fullName: string;
  age: number;
  gender: string;
  phoneNumber: string;
  symptoms: string;
  visitTimestamp: string;
  tokenNumber: number;
  status: PatientStatus;
  estimatedWaitTime?: number; // In minutes
}

export interface Consultation {
  id: string;
  patientId: string;
  doctorId: string;
  diagnosis: string;
  prescription: string[];
  status: 'pending' | 'completed';
  timestamp: string;
}

export interface Billing {
  id: string;
  patientId: string;
  consultationFee: number;
  medicineCharges: number;
  testCharges: number;
  totalBill: number;
  paymentStatus: 'pending' | 'paid';
  paymentMethod?: 'cash' | 'upi' | 'card';
  timestamp: string;
}
