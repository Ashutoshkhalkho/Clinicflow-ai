"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Users, 
  CalendarClock, 
  Stethoscope, 
  Receipt,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity
} from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Users, label: "Patients", href: "/patients" },
  { icon: CalendarClock, label: "Queue", href: "/queue" },
  { icon: Stethoscope, label: "Consultation", href: "/consultation" },
  { icon: Receipt, label: "Billing", href: "/billing" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={{ width: 280 }}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="h-screen sticky top-0 border-r border-border bg-card/50 backdrop-blur-xl flex flex-col justify-between"
    >
      <div>
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-border/50">
          <Activity className="w-8 h-8 text-blue-500 shrink-0" />
          {!collapsed && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="ml-3 font-display font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400"
            >
              ClinicFlow<span className="font-light text-foreground/70">.ai</span>
            </motion.span>
          )}
        </div>

        {/* Menu Items */}
        <nav className="p-4 space-y-2 mt-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={cn(
                    "flex items-center px-3 py-3 rounded-xl cursor-pointer transition-all duration-200 group relative",
                    isActive 
                      ? "bg-blue-500/10 text-blue-500" 
                      : "text-foreground/70 hover:bg-foreground/5 hover:text-foreground"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav"
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent border-l-2 border-blue-500 rounded-xl"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className={cn("w-5 h-5 shrink-0 relative z-10", isActive ? "text-blue-500" : "")} />
                  {!collapsed && (
                    <span className="ml-3 font-medium relative z-10">{item.label}</span>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Toggle */}
      <div className="p-4 border-t border-border/50">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-3 rounded-xl hover:bg-foreground/5 text-foreground/60 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </motion.aside>
  );
}
