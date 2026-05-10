"use client";

import { Bell, Search, UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  
  const getTitle = () => {
    switch (pathname) {
      case "/": return "Dashboard Overview";
      case "/patients": return "Patient Records";
      case "/queue": return "Queue Management";
      case "/consultation": return "Active Consultations";
      case "/billing": return "Billing & Invoices";
      default: return "ClinicFlow AI";
    }
  };

  return (
    <header className="h-20 flex items-center justify-between px-8 border-b border-border/50 bg-card/30 backdrop-blur-md sticky top-0 z-30">
      <div>
        <h1 className="text-2xl font-display font-semibold text-foreground tracking-tight">
          {getTitle()}
        </h1>
        <p className="text-sm text-foreground/50">Today is {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative group">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-blue-500 transition-colors" />
          <input 
            type="text" 
            placeholder="Search patients, tokens..." 
            className="pl-10 pr-4 py-2.5 rounded-full bg-foreground/5 border-none focus:ring-2 focus:ring-blue-500/50 outline-none w-64 text-sm transition-all focus:bg-background"
          />
        </div>

        <button className="relative p-2 rounded-full hover:bg-foreground/5 transition-colors">
          <Bell className="w-5 h-5 text-foreground/70" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-background"></span>
        </button>

        <div className="flex items-center space-x-3 pl-4 border-l border-border/50">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium">Dr. Sarah Connor</p>
            <p className="text-xs text-foreground/50">Head Physician</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-400 p-[2px]">
            <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
              <UserCircle className="w-8 h-8 text-foreground/80" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
