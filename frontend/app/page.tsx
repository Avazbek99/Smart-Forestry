"use client";

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import {
    Search,
    Bell,
    Activity,
    ShieldCheck,
    AlertTriangle,
    FileText,
    Zap,
    TrendingUp
} from 'lucide-react';
import { useState, useEffect } from 'react';

const Map = dynamic(() => import('../components/Map'), {
    ssr: false,
    loading: () => <div className="w-full h-full bg-[var(--bg-main)] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
            <span className="text-[var(--text-muted)] font-medium tracking-widest text-[10px] uppercase">GIS Ma'lumotlari yuklanmoqda...</span>
        </div>
    </div>
});

export default function Dashboard() {
    const [stats, setStats] = useState<any[]>([]);
    const [activities, setActivities] = useState<any[]>([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/forest-compartments/')
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(err => console.error(err));

        setActivities([
            { id: 1, type: 'task', title: "Zomin hududida nazorat yakunlandi", user: "Inspektor #12", time: "2 daqiqa oldin" },
            { id: 2, type: 'appeal', title: "Yangi yong'in xavfi aniqlandi (Bo'stonliq)", user: "Fuqaro", time: "15 daqiqa oldin" },
            { id: 3, type: 'lease', title: "M-12 konturi uchun ijara shartnomasi imzolandi", user: "E-Ijara", time: "1 soat oldin" },
        ]);
    }, []);

    return (
        <div className="flex-1 relative flex flex-col h-full">
            <header className="h-20 glass border-b border-[var(--glass-border)] flex items-center justify-between px-10 z-10">
                <div className="flex items-center flex-1 max-w-xl">
                    <div className="w-full relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-emerald-500 transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Hududlar, turlar yoki xaritalarni qidirish..."
                            className="w-full bg-white/5 border border-[var(--glass-border)] group-focus-within:border-emerald-500/50 outline-none pl-12 pr-4 py-3 rounded-2xl text-sm transition-all shadow-inner text-[var(--text-main)] placeholder:text-[var(--text-muted)]/40"
                        />
                    </div>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="relative p-2.5 glass hover:bg-white/10 rounded-xl cursor-pointer transition-all text-[var(--text-main)]">
                        <Bell size={20} />
                        <div className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-[var(--bg-main)] animate-pulse" />
                    </div>
                    <div className="h-10 w-[1px] bg-[var(--glass-border)]" />
                    <div className="flex items-center space-x-3">
                        <div className="text-right">
                            <p className="text-xs font-black uppercase text-[var(--text-main)]">Admin</p>
                            <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-tighter">Super Admin</p>
                        </div>
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-emerald-500/20">
                            A
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-1 relative flex">
                <div className="flex-1 relative">
                    <Map />
                    <div className="absolute top-8 left-8 space-y-4 z-[1000] pointer-events-none">
                        <QuickStat label="Umumiy Hudud" value="4.2M Ha" trend="+2.4%" />
                        <QuickStat label="Aktiv Konturlar" value={stats.length.toString()} trend="Live" />
                    </div>
                </div>

                <aside className="w-[450px] bg-[var(--bg-main)]/50 backdrop-blur-xl border-l border-[var(--glass-border)] flex flex-col p-8 z-10 overflow-hidden">
                    <h3 className="text-xl font-black mb-8 flex items-center space-x-3 text-[var(--text-main)]">
                        <Activity className="text-emerald-500" size={24} />
                        <span>Jonli faoliyat</span>
                    </h3>

                    <div className="flex-1 space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                        {activities.map((act) => (
                            <div key={act.id} className="p-6 glass rounded-3xl hover:border-emerald-500/20 transition-all group cursor-pointer relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-16 h-16 bg-white/[0.02] rounded-bl-[60px]" />
                                <div className="flex items-center space-x-4 mb-4">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${act.type === 'task' ? 'bg-emerald-500/10 text-emerald-500' : act.type === 'appeal' ? 'bg-rose-500/10 text-rose-500' : 'bg-sapphire-500/10 text-sapphire-400'}`}>
                                        {act.type === 'task' ? <ShieldCheck size={18} /> : act.type === 'appeal' ? <AlertTriangle size={18} /> : <FileText size={18} />}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">{act.user}</p>
                                        <p className="text-xs font-medium text-[var(--text-muted)] italic">{act.time}</p>
                                    </div>
                                </div>
                                <h4 className="font-bold text-sm leading-relaxed group-hover:text-emerald-400 transition-colors text-[var(--text-main)]">{act.title}</h4>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 p-8 glass-emerald rounded-[35px] border-emerald-500/10 relative overflow-hidden">
                        <Zap className="absolute -bottom-4 -right-4 text-emerald-500/10 w-32 h-32" />
                        <h4 className="text-emerald-500 font-black text-sm uppercase mb-2 tracking-widest">AI Forecast</h4>
                        <p className="text-xs font-bold leading-relaxed text-[var(--text-main)]">Kelasi haftada Bo'stonliq tumanida yog'ingarchilik miqdori 15% ortishi kutilmoqda. Daraxt ekish uchun qulay sharoit.</p>
                    </div>
                </aside>
            </div>
        </div>
    );
}

function QuickStat({ label, value, trend }: any) {
    return (
        <div className="glass px-6 py-4 rounded-2xl shadow-3xl pointer-events-auto hover:scale-105 transition-all">
            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">{label}</p>
            <div className="flex items-center space-x-3 text-[var(--text-main)]">
                <span className="text-2xl font-black">{value}</span>
                <span className="text-[9px] font-black bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded uppercase">{trend}</span>
            </div>
        </div>
    );
}
