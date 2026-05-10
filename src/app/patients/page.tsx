"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Search, Plus, Filter, MoreVertical, FileText } from "lucide-react";

export default function Patients() {
  const [patients] = useState([
    { id: "PT-001", name: "Esther Howard", age: 42, gender: "Female", phone: "+1 234-567-890", lastVisit: "Oct 24, 2026", status: "Active" },
    { id: "PT-002", name: "Cameron Williamson", age: 28, gender: "Male", phone: "+1 234-567-891", lastVisit: "Oct 22, 2026", status: "Active" },
    { id: "PT-003", name: "Brooklyn Simmons", age: 55, gender: "Female", phone: "+1 234-567-892", lastVisit: "Sep 15, 2026", status: "Inactive" },
    { id: "PT-004", name: "Leslie Alexander", age: 34, gender: "Female", phone: "+1 234-567-893", lastVisit: "Oct 24, 2026", status: "Active" },
    { id: "PT-005", name: "Guy Hawkins", age: 45, gender: "Male", phone: "+1 234-567-894", lastVisit: "Aug 10, 2026", status: "Inactive" },
  ]);

  return (
    <>
      <Header />
      <div className="p-8 max-w-7xl mx-auto w-full">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-display font-semibold">Patient Directory</h2>
            <p className="text-sm text-foreground/50 mt-1">Manage and view all registered patients.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-card border border-border/50 hover:bg-foreground/5 transition-colors text-sm font-medium">
              <Filter className="w-4 h-4 text-foreground/70" />
              <span>Filter</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white transition-colors shadow-lg shadow-blue-500/20 text-sm font-medium">
              <Plus className="w-4 h-4" />
              <span>New Patient</span>
            </button>
          </div>
        </div>

        {/* Table Area */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl overflow-hidden border border-border/50"
        >
          <div className="p-4 border-b border-border/50 flex items-center justify-between bg-card/30">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
              <input 
                type="text" 
                placeholder="Search by ID, name or phone..." 
                className="pl-9 pr-4 py-1.5 rounded-lg bg-background border border-border/50 focus:ring-2 focus:ring-blue-500/50 outline-none w-72 text-sm transition-all"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-foreground/5 text-foreground/60 text-xs uppercase tracking-wider font-medium">
                  <th className="px-6 py-4">Patient ID</th>
                  <th className="px-6 py-4">Patient Name</th>
                  <th className="px-6 py-4">Age / Gender</th>
                  <th className="px-6 py-4">Phone</th>
                  <th className="px-6 py-4">Last Visit</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {patients.map((patient, idx) => (
                  <motion.tr 
                    key={patient.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-foreground/[0.02] transition-colors"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-foreground/70">{patient.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-xs">
                          {patient.name.charAt(0)}
                        </div>
                        <span className="font-medium">{patient.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{patient.age} y/o • {patient.gender}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{patient.phone}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{patient.lastVisit}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-md text-xs font-medium ${
                        patient.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-foreground/10 text-foreground/50'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors" title="View History">
                          <FileText className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-foreground/50 hover:text-foreground hover:bg-foreground/5 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-border/50 text-xs text-foreground/50 flex justify-between items-center">
            <span>Showing 1 to 5 of 142 entries</span>
            <div className="flex space-x-1">
              <button className="px-3 py-1 rounded bg-card border border-border/50 text-foreground/50 hover:bg-foreground/5">Prev</button>
              <button className="px-3 py-1 rounded bg-blue-500 text-white">1</button>
              <button className="px-3 py-1 rounded bg-card border border-border/50 hover:bg-foreground/5">2</button>
              <button className="px-3 py-1 rounded bg-card border border-border/50 hover:bg-foreground/5">Next</button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
