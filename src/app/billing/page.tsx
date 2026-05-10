"use client";

import { motion } from "framer-motion";
import Header from "@/components/Header";
import { Receipt, Search, Download, CreditCard, Printer, Check } from "lucide-react";

export default function Billing() {
  const bills = [
    { id: "INV-2026-001", patient: "Esther Howard", date: "Oct 24, 2026", amount: 1250, status: "Paid", method: "UPI" },
    { id: "INV-2026-002", patient: "Cameron Williamson", date: "Oct 24, 2026", amount: 800, status: "Pending", method: "-" },
    { id: "INV-2026-003", patient: "Jane Cooper", date: "Oct 24, 2026", amount: 2100, status: "Paid", method: "Card" },
    { id: "INV-2026-004", patient: "Brooklyn Simmons", date: "Oct 23, 2026", amount: 500, status: "Paid", method: "Cash" },
  ];

  return (
    <>
      <Header />
      <div className="p-8 max-w-7xl mx-auto w-full">
        
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6 border border-border/50"
          >
            <p className="text-sm font-medium text-foreground/60 mb-1">Today's Revenue</p>
            <h3 className="text-3xl font-display font-bold text-emerald-500">₹42,500</h3>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass rounded-2xl p-6 border border-border/50"
          >
            <p className="text-sm font-medium text-foreground/60 mb-1">Pending Payments</p>
            <h3 className="text-3xl font-display font-bold text-amber-500">₹3,400</h3>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass rounded-2xl p-6 border border-border/50"
          >
            <p className="text-sm font-medium text-foreground/60 mb-1">Invoices Generated</p>
            <h3 className="text-3xl font-display font-bold text-blue-500">142</h3>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Table */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-2/3 glass rounded-2xl border border-border/50 overflow-hidden"
          >
            <div className="p-5 border-b border-border/50 bg-card/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-foreground/60" />
                <h3 className="font-display font-medium">Recent Invoices</h3>
              </div>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
                <input 
                  type="text" 
                  placeholder="Search invoice..." 
                  className="pl-9 pr-4 py-1.5 rounded-lg bg-background border border-border/50 focus:ring-2 focus:ring-blue-500/50 outline-none w-48 text-sm"
                />
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-foreground/5 text-foreground/60 text-xs uppercase tracking-wider font-medium">
                    <th className="px-6 py-4">Invoice ID</th>
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {bills.map((bill) => (
                    <tr key={bill.id} className="hover:bg-foreground/[0.02] transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-foreground/70">{bill.id}</td>
                      <td className="px-6 py-4 font-medium">{bill.patient}</td>
                      <td className="px-6 py-4 font-display font-bold">₹{bill.amount}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium ${
                          bill.status === 'Paid' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                        }`}>
                          {bill.status === 'Paid' && <Check className="w-3 h-3" />}
                          {bill.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-foreground/50 hover:text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Generate Invoice Action */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/3 space-y-6"
          >
            <div className="glass rounded-2xl p-6 border border-blue-500/20 bg-gradient-to-b from-blue-500/5 to-transparent relative overflow-hidden">
              <h3 className="font-display font-semibold mb-6">Generate New Invoice</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-foreground/60 mb-1 block">Patient ID / Name</label>
                  <input type="text" className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/50 outline-none focus:ring-2 focus:ring-blue-500/50" placeholder="e.g. PT-001" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-foreground/60 mb-1 block">Consultation Fee</label>
                    <input type="number" defaultValue="500" className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/50 outline-none focus:ring-2 focus:ring-blue-500/50 font-display" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-foreground/60 mb-1 block">Medicine Charges</label>
                    <input type="number" defaultValue="0" className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/50 outline-none focus:ring-2 focus:ring-blue-500/50 font-display" />
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50 flex items-center justify-between">
                  <span className="font-medium text-foreground/70">Total Amount</span>
                  <span className="text-2xl font-display font-bold text-blue-500">₹500</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <button className="flex-1 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20">
                    <CreditCard className="w-4 h-4" /> Process
                  </button>
                  <button className="p-3 bg-card border border-border/50 hover:bg-foreground/5 rounded-xl transition-colors">
                    <Printer className="w-5 h-5 text-foreground/70" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </>
  );
}
