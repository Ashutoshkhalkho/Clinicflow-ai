"use client";

import { motion, Variants } from "framer-motion";
import Header from "@/components/Header";
import { Users, Clock, TrendingUp, CalendarCheck, ArrowUpRight, Activity } from "lucide-react";

const stats = [
  { label: "Total Patients", value: "142", trend: "+12%", icon: Users, color: "text-blue-500", bg: "bg-blue-500/10" },
  { label: "Avg Wait Time", value: "14m", trend: "-2m", icon: Clock, color: "text-amber-500", bg: "bg-amber-500/10" },
  { label: "Consultations", value: "89", trend: "+5%", icon: CalendarCheck, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { label: "Daily Revenue", value: "₹42K", trend: "+18%", icon: TrendingUp, color: "text-indigo-500", bg: "bg-indigo-500/10" },
];

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function Dashboard() {
  return (
    <>
      <Header />
      <div className="p-8 max-w-7xl mx-auto w-full">
        {/* Stats Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <stat.icon className={`w-24 h-24 ${stat.color} -mt-8 -mr-8`} />
              </div>
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center space-x-1 text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-full text-xs font-medium">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>{stat.trend}</span>
                </div>
              </div>
              <div className="relative z-10">
                <h3 className="text-foreground/60 text-sm font-medium">{stat.label}</h3>
                <p className="text-3xl font-display font-bold mt-1 text-foreground">{stat.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Recent Queue */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 glass rounded-2xl p-6"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-display font-semibold">Live Queue</h2>
              <button className="text-sm text-blue-500 hover:text-blue-400 font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {[
                { name: "Eleanor Pena", token: "A-102", time: "10 mins wait", status: "Waiting", urgent: false },
                { name: "Cody Fisher", token: "A-103", time: "15 mins wait", status: "Waiting", urgent: true },
                { name: "Jane Cooper", token: "A-104", time: "In progress", status: "Consulting", urgent: false },
              ].map((patient, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-foreground/5 transition-colors border border-border/50">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center font-bold text-indigo-400">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-medium flex items-center gap-2">
                        {patient.name}
                        {patient.urgent && <span className="px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-red-500/10 text-red-500">Urgent</span>}
                      </h4>
                      <p className="text-xs text-foreground/50">{patient.time}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display font-bold text-lg">{patient.token}</p>
                    <p className={`text-xs ${patient.status === 'Consulting' ? 'text-blue-500' : 'text-amber-500'}`}>{patient.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* AI Insights Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="glass rounded-2xl p-6 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-6">
                <div className="p-2 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-lg text-white shadow-lg shadow-blue-500/20">
                  <Activity className="w-5 h-5" />
                </div>
                <h2 className="text-lg font-display font-semibold">AI Insights</h2>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20">
                  <h4 className="text-sm font-medium text-blue-400 mb-1">Peak Hours Alert</h4>
                  <p className="text-xs text-foreground/70 leading-relaxed">Queue time is expected to increase by 20% between 14:00 - 16:00. Consider opening Consultation Room 3.</p>
                </div>

                <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                  <h4 className="text-sm font-medium text-purple-400 mb-1">Symptom Trend</h4>
                  <p className="text-xs text-foreground/70 leading-relaxed">15% increase in "viral fever" related symptoms this week. Generating possible inventory restock recommendations.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
