import { adminDb } from '@/lib/firebase/admin';
import { NextRequest, NextResponse } from 'next/server';
import { Consultation } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    const newConsultation: Omit<Consultation, 'id'> = {
      patientId: data.patientId,
      doctorId: data.doctorId,
      diagnosis: data.diagnosis,
      prescription: data.prescription || [],
      status: 'completed',
      timestamp: new Date().toISOString()
    };

    const docRef = await adminDb.collection('consultations').add(newConsultation);
    
    // Also update patient status to 'completed'
    await adminDb.collection('patients').doc(data.patientId).update({
      status: 'completed'
    });

    return NextResponse.json({ id: docRef.id, ...newConsultation }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get('patientId');
    const doctorId = searchParams.get('doctorId');

    let query: FirebaseFirestore.Query = adminDb.collection('consultations');

    if (patientId) {
      query = query.where('patientId', '==', patientId);
    }
    if (doctorId) {
      query = query.where('doctorId', '==', doctorId);
    }

    const snapshot = await query.get();
    const consultations: Consultation[] = [];
    
    snapshot.forEach(doc => {
      consultations.push({ id: doc.id, ...doc.data() } as Consultation);
    });

    return NextResponse.json(consultations, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
