import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: NextRequest) {
  try {
    const { symptoms } = await req.json();
    
    if (!symptoms) {
      return NextResponse.json({ error: 'Symptoms are required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `You are a medical AI assistant for a clinic. 
    Analyze the following patient symptoms and provide a concise 1-sentence summary of possible basic conditions. 
    Do not provide a definitive diagnosis. 
    Symptoms: ${symptoms}`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();

    return NextResponse.json({ summary: response.trim() }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
