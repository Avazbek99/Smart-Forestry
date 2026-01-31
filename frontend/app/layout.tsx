"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeProvider, useTheme } from "../context/ThemeContext";
import {
  Map as MapIcon,
  AlertTriangle,
  Zap,
  BarChart3,
  ShieldCheck,
  User as UserIcon,
  Search,
  Bell,
  LogOut,
  BookOpen,
  TreePine,
  Settings,
  FileText,
  Sun,
  Moon
} from 'lucide-react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <html lang="uz">
      <body className={`${inter.className} selection:bg-emerald-500/30`}>
        <ThemeProvider>
          <LayoutContent pathname={pathname}>{children}</LayoutContent>
        </ThemeProvider>
      </body>
    </html>
  );
}

function LayoutContent({ children, pathname }: { children: React.ReactNode, pathname: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex h-screen w-full relative">

      {/* Sidebar */}
      <aside className="w-72 glass border-r border-white/5 flex flex-col z-50">
        <div className="p-8">
          <div className="flex items-center justify-between space-x-3">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <TreePine className="text-white w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">SMART</h1>
                <p className="text-[10px] font-medium text-emerald-500 tracking-[0.2em] uppercase -mt-1">Forestry</p>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="p-3 glass rounded-xl hover:bg-emerald-500/10 transition-all text-emerald-500"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <NavItem href="/" icon={<MapIcon size={20} />} label="Interaktiv Xarita" active={pathname === "/"} />
          <NavItem href="/appeals" icon={<AlertTriangle size={20} />} label="Tezkor Murojaatlar" active={pathname === "/appeals"} />
          <NavItem href="/planting" icon={<Zap size={20} />} label="AI Daraxt Ekish" active={pathname === "/planting"} />
          <NavItem href="/analytics" icon={<BarChart3 size={20} />} label="Tahliliy Dashboard" active={pathname === "/analytics"} />
          <NavItem href="/control" icon={<ShieldCheck size={20} />} label="Nazorat va Taftish" active={pathname === "/control"} />
          <NavItem href="/science" icon={<BookOpen size={20} />} label="Ilmiy Markaz" active={pathname === "/science"} />
          <NavItem href="/contracts" icon={<FileText size={20} />} label="Shartnomalar" active={pathname === "/contracts"} />
        </nav>

        <div className="p-4 border-t border-white/5 space-y-4">
          <Link href="/settings" className="flex items-center space-x-3 p-3 glass-emerald rounded-2xl cursor-pointer hover:bg-emerald-500/20 transition-all">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
              <UserIcon size={20} className="text-slate-400" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold truncate">admin_forestry</p>
              <p className="text-[10px] text-emerald-500/80 uppercase font-bold tracking-wider">Super Administrator</p>
            </div>
          </Link>
          <button className="w-full py-3 px-4 glass hover:bg-white/5 rounded-xl text-sm font-medium transition-all flex items-center justify-center space-x-2">
            <Settings size={18} />
            <span className="text-[var(--text-main)]">Sozlamalar</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {children}
      </main>
    </div>
  );
}

function NavItem({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <Link href={href} className={`
      flex items-center space-x-3 px-4 py-3 rounded-2xl cursor-pointer transition-all group
      ${active ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'hover:bg-[var(--sidebar-item-hover)] text-[var(--text-muted)] hover:text-[var(--text-main)]'}
    `}>
      <span className={active ? 'text-white' : 'group-hover:text-emerald-400 transition-colors'}>{icon}</span>
      <span className="text-sm font-medium">{label}</span>
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
    </Link>
  );
}
