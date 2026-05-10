"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Activity, Thermometer, HeartPulse, Sparkles, FileText, Pill, Save } from "lucide-react";

export default function Consultation() {
  const patient = {
    name: "Jane Cooper",
    age: 28,
    gender: "Female",
    token: "A-104",
    symptoms: "High fever, continuous dry cough, extreme fatigue, body ache",
    vitals: { bp: "120/80", temp: "102°F", hr: "88 bpm" }
  };

  return (
    <>
      <Header />
      <div className="p-8 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Patient Details & Vitals */}
        <div className="w-full lg:w-1/3 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 border border-border/50"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-display font-semibold">Active Patient</h2>
              <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-lg text-sm font-bold font-display">{patient.token}</span>
            </div>
            
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5">
                <div className="w-full h-full rounded-full bg-card flex items-center justify-center font-display font-bold text-xl">
                  {patient.name.charAt(0)}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium">{patient.name}</h3>
                <p className="text-sm text-foreground/50">{patient.age} years • {patient.gender}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-foreground/70 mb-2">Reported Symptoms</h4>
                <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl text-sm leading-relaxed text-foreground/80">
                  {patient.symptoms}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-foreground/70 mb-2">Vitals</h4>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 bg-foreground/5 rounded-xl text-center">
                    <Activity className="w-4 h-4 mx-auto text-blue-500 mb-1" />
                    <p className="text-[10px] uppercase text-foreground/50 font-bold mb-0.5">BP</p>
                    <p className="text-sm font-medium">{patient.vitals.bp}</p>
                  </div>
                  <div className="p-3 bg-foreground/5 rounded-xl text-center">
                    <Thermometer className="w-4 h-4 mx-auto text-amber-500 mb-1" />
                    <p className="text-[10px] uppercase text-foreground/50 font-bold mb-0.5">Temp</p>
                    <p className="text-sm font-medium">{patient.vitals.temp}</p>
                  </div>
                  <div className="p-3 bg-foreground/5 rounded-xl text-center">
                    <HeartPulse className="w-4 h-4 mx-auto text-rose-500 mb-1" />
                    <p className="text-[10px] uppercase text-foreground/50 font-bold mb-0.5">HR</p>
                    <p className="text-sm font-medium">{patient.vitals.hr}</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6 border border-blue-500/20 bg-gradient-to-b from-blue-500/5 to-transparent relative overflow-hidden"
          >
             <div className="flex items-center gap-2 mb-3">
               <Sparkles className="w-5 h-5 text-blue-500" />
               <h3 className="font-display font-semibold">AI Assistant</h3>
             </div>
             <p className="text-sm text-foreground/70 mb-4">Based on symptoms and vitals, AI suggests checking for:</p>
             <div className="flex flex-wrap gap-2">
               <span className="px-3 py-1 bg-background border border-border/50 rounded-full text-xs font-medium">Viral Influenza</span>
               <span className="px-3 py-1 bg-background border border-border/50 rounded-full text-xs font-medium">Upper RTI</span>
             </div>
          </motion.div>
        </div>

        {/* Right Side: Notes & Prescription */}
        <div className="w-full lg:w-2/3 flex flex-col gap-6 h-[calc(100vh-140px)]">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-2xl flex-1 flex flex-col border border-border/50 overflow-hidden"
          >
            <div className="p-4 border-b border-border/50 bg-card/30 flex items-center gap-2">
              <FileText className="w-5 h-5 text-foreground/60" />
              <h3 className="font-display font-medium">Clinical Notes & Diagnosis</h3>
            </div>
            <textarea 
              className="flex-1 w-full p-6 bg-transparent resize-none outline-none text-foreground leading-relaxed placeholder:text-foreground/30 focus:bg-background/50 transition-colors"
              placeholder="Enter diagnosis, observations, and clinical notes here..."
              defaultValue="Patient presents with high grade fever since 2 days. Accompanied by dry cough..."
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl flex-1 flex flex-col border border-border/50 overflow-hidden"
          >
            <div className="p-4 border-b border-border/50 bg-card/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Pill className="w-5 h-5 text-foreground/60" />
                <h3 className="font-display font-medium">Prescription & Advice</h3>
              </div>
              <button className="text-sm text-blue-500 hover:underline">Browse Templates</button>
            </div>
            <textarea 
              className="flex-1 w-full p-6 bg-transparent resize-none outline-none text-foreground leading-relaxed placeholder:text-foreground/30 focus:bg-background/50 transition-colors"
              placeholder="Rx&#10;1. Tab. Paracetamol 500mg SOS&#10;2. Syp. Ascoril D 10ml TDS"
            />
            <div className="p-4 border-t border-border/50 bg-card/30 flex justify-end">
              <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors shadow-lg shadow-blue-500/20">
                <Save className="w-4 h-4" /> Save & Complete
              </button>
            </div>
          </motion.div>
        </div>

      </div>
    </>
  );
}
