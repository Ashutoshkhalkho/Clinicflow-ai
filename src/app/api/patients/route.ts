import { adminDb } from '@/lib/firebase/admin';
import { Patient } from '@/types';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    // Auto-generate Token Number (e.g., get count of patients today)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Simple way to generate token: count documents in a 'daily_tokens' collection or similar
    // For simplicity, we query today's patients
    const patientsRef = adminDb.collection('patients');
    const snapshot = await patientsRef.where('visitTimestamp', '>=', today.toISOString()).get();
    
    const tokenNumber = snapshot.size + 1;
    
    const newPatient: Omit<Patient, 'id'> = {
      fullName: data.fullName,
      age: data.age,
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      symptoms: data.symptoms || '',
      visitTimestamp: new Date().toISOString(),
      tokenNumber: tokenNumber,
      status: 'waiting',
      estimatedWaitTime: tokenNumber * 15 // Assuming 15 mins per patient
    };

    const docRef = await patientsRef.add(newPatient);
    
    return NextResponse.json({ id: docRef.id, ...newPatient }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // Return all waiting patients by default, or filter based on query params
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const phone = searchParams.get('phoneNumber');

    let query: FirebaseFirestore.Query = adminDb.collection('patients');

    if (status) {
      query = query.where('status', '==', status);
    }
    if (phone) {
      query = query.where('phoneNumber', '==', phone);
    }

    const snapshot = await query.get();
    const patients: Patient[] = [];
    
    snapshot.forEach(doc => {
      patients.push({ id: doc.id, ...doc.data() } as Patient);
    });

    return NextResponse.json(patients, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
