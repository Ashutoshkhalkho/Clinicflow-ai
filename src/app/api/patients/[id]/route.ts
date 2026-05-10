import { adminDb } from '@/lib/firebase/admin';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await req.json();
    const patientRef = adminDb.collection('patients').doc(params.id);
    
    await patientRef.update(data);
    
    const updated = await patientRef.get();
    return NextResponse.json({ id: updated.id, ...updated.data() }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const patientRef = adminDb.collection('patients').doc(params.id);
    const snapshot = await patientRef.get();
    
    if (!snapshot.exists) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }
    
    return NextResponse.json({ id: snapshot.id, ...snapshot.data() }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
