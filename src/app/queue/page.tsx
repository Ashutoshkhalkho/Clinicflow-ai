"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import { User, Clock, CheckCircle2, XCircle, Volume2, ArrowRight } from "lucide-react";

export default function Queue() {
  const [activeTab, setActiveTab] = useState("Waiting");
  
  const currentPatient = {
    name: "Jane Cooper",
    token: "A-104",
    timeStarted: "10:15 AM",
    doctor: "Dr. Sarah Connor",
    room: "Room 03",
    symptoms: "Fever, cough"
  };

  const queue = [
    { name: "Eleanor Pena", token: "A-105", estWait: "5 mins", urgent: false },
    { name: "Cody Fisher", token: "A-106", estWait: "15 mins", urgent: true },
    { name: "Ralph Edwards", token: "A-107", estWait: "25 mins", urgent: false },
    { name: "Albert Flores", token: "A-108", estWait: "35 mins", urgent: false },
  ];

  return (
    <>
      <Header />
      <div className="p-8 max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Current & Actions */}
        <div className="w-full lg:w-1/3 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl p-8 border border-blue-500/20 shadow-2xl shadow-blue-500/5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
            
            <div className="flex items-center space-x-2 text-blue-500 mb-6 relative z-10">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              <span className="text-sm font-medium uppercase tracking-wider">Now Consulting</span>
            </div>

            <div className="text-center relative z-10 mb-8">
              <h1 className="text-6xl font-display font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/60 mb-2">
                {currentPatient.token}
              </h1>
              <p className="text-xl font-medium">{currentPatient.name}</p>
              <div className="flex justify-center items-center gap-2 mt-2 text-foreground/60 text-sm">
                <span>{currentPatient.doctor}</span>
                <span>•</span>
                <span className="font-medium text-foreground">{currentPatient.room}</span>
              </div>
            </div>

            <div className="space-y-3 relative z-10">
              <button className="w-full py-4 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group">
                Call Next Patient
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <div className="grid grid-cols-2 gap-3">
                <button className="py-3 rounded-xl bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 font-medium transition-colors flex items-center justify-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Complete
                </button>
                <button className="py-3 rounded-xl bg-red-500/10 text-red-600 hover:bg-red-500/20 font-medium transition-colors flex items-center justify-center gap-2 text-sm">
                  <XCircle className="w-4 h-4" /> Skip/No Show
                </button>
              </div>
            </div>
          </motion.div>

          <div className="glass rounded-2xl p-6">
             <button className="w-full py-3 border border-border/50 rounded-xl hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-foreground/70">
                <Volume2 className="w-4 h-4" /> Announce Token
             </button>
          </div>
        </div>

        {/* Right Side: The Queue List */}
        <div className="w-full lg:w-2/3 glass rounded-2xl border border-border/50 overflow-hidden flex flex-col h-[calc(100vh-140px)]">
          <div className="flex border-b border-border/50">
            {["Waiting", "Completed", "Skipped"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-medium relative transition-colors ${
                  activeTab === tab ? "text-blue-500" : "text-foreground/60 hover:bg-foreground/5"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
                )}
              </button>
            ))}
          </div>

          <div className="p-6 flex-1 overflow-y-auto">
            {activeTab === "Waiting" && (
              <div className="space-y-4">
                <AnimatePresence>
                  {queue.map((q, i) => (
                    <motion.div 
                      key={q.token}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between p-4 rounded-xl bg-card border border-border/50 hover:border-blue-500/30 transition-all group"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl bg-foreground/5 flex items-center justify-center font-display font-bold text-lg text-foreground/80 group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-colors">
                          {q.token}
                        </div>
                        <div>
                          <h4 className="font-medium flex items-center gap-2">
                            {q.name}
                            {q.urgent && <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-red-500/10 text-red-500">Urgent</span>}
                          </h4>
                          <p className="text-xs text-foreground/50 flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3" /> Est. wait: {q.estWait}
                          </p>
                        </div>
                      </div>
                      <button className="text-sm font-medium text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity pr-4">
                        Move to Top
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
            {activeTab !== "Waiting" && (
              <div className="flex flex-col items-center justify-center h-full text-foreground/40">
                <p>No records for {activeTab}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  );
}
