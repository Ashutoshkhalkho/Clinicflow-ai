import { adminDb } from '@/lib/firebase/admin';
import { NextRequest, NextResponse } from 'next/server';
import { Billing } from '@/types';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    const consultationFee = Number(data.consultationFee) || 0;
    const medicineCharges = Number(data.medicineCharges) || 0;
    const testCharges = Number(data.testCharges) || 0;
    
    const totalBill = consultationFee + medicineCharges + testCharges;

    const newBill: Omit<Billing, 'id'> = {
      patientId: data.patientId,
      consultationFee,
      medicineCharges,
      testCharges,
      totalBill,
      paymentStatus: data.paymentStatus || 'pending',
      paymentMethod: data.paymentMethod,
      timestamp: new Date().toISOString()
    };

    const docRef = await adminDb.collection('billing').add(newBill);
    
    return NextResponse.json({ id: docRef.id, ...newBill }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const patientId = searchParams.get('patientId');

    let query: FirebaseFirestore.Query = adminDb.collection('billing');

    if (patientId) {
      query = query.where('patientId', '==', patientId);
    }

    const snapshot = await query.get();
    const bills: Billing[] = [];
    
    snapshot.forEach(doc => {
      bills.push({ id: doc.id, ...doc.data() } as Billing);
    });

    return NextResponse.json(bills, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
