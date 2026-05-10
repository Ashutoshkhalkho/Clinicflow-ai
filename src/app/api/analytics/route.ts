import { adminDb } from '@/lib/firebase/admin';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const patientsRef = adminDb.collection('patients');
    const billingRef = adminDb.collection('billing');
    const consultationsRef = adminDb.collection('consultations');

    // 1. Patients per day
    const patientsTodaySnapshot = await patientsRef.where('visitTimestamp', '>=', today.toISOString()).get();
    const patientsToday = patientsTodaySnapshot.size;

    // 2. Consultation count today
    const consultationsTodaySnapshot = await consultationsRef.where('timestamp', '>=', today.toISOString()).get();
    const consultationCount = consultationsTodaySnapshot.size;

    // 3. Total revenue today
    const billingTodaySnapshot = await billingRef.where('timestamp', '>=', today.toISOString()).get();
    let totalRevenue = 0;
    billingTodaySnapshot.forEach(doc => {
      totalRevenue += doc.data().totalBill || 0;
    });

    // 4. Average waiting time (simplified calculation based on completed consultations)
    // In a real scenario, we would calculate completion time - visitTimestamp
    let avgWaitTime = patientsToday > 0 ? patientsToday * 10 : 0; // rough estimation in minutes for demo

    return NextResponse.json({
      patientsToday,
      consultationCount,
      totalRevenue,
      averageWaitTime: `${avgWaitTime} mins`
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
