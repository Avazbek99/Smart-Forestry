"use client";

import { useEffect, useState } from 'react';
import {
    ShieldCheck,
    MapPin,
    Users,
    Clock,
    AlertCircle,
    TrendingUp,
    Activity,
    LocateFixed,
    Filter,
    CheckCircle2,
    Download
} from 'lucide-react';

export default function ControlPage() {
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/tasks/')
            .then(res => res.json())
            .then(data => {
                setTasks(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching tasks:", err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="flex-1 p-8 overflow-y-auto">
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-rose-500/20 text-rose-500 text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-rose-500/20">Control Center</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight">Nazorat va Taftish</h1>
                    <p className="text-[var(--text-muted)] mt-2 font-medium max-w-xl">Hududiy inspektorlar faoliyati va topshiriqlar monitoringi</p>
                </div>
                <div className="flex space-x-4">
                    <button
                        onClick={() => {
                            // UTF-8 BOM for Excel compatibility with Uzbek characters
                            const headers = ["ID", "Vazifa", "Mas'ul", "Holati", "Sana"];
                            const rows = tasks.map(t => [
                                t.id,
                                `"${t.title}"`,
                                `"${t.inspector_name}"`,
                                t.status === 'completed' ? "Bajarildi" : "Jarayonda",
                                t.deadline
                            ]);

                            const csvContent = "\uFEFF" + [headers, ...rows].map(e => e.join(",")).join("\n");
                            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = `control_tasks_report_${new Date().toISOString().split('T')[0]}.xls`;
                            a.click();
                            URL.revokeObjectURL(url);
                        }}
                        className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-bold flex items-center space-x-2 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
                    >
                        <Download size={18} />
                        <span>Hisobot yuklash (XLS)</span>
                    </button>
                    <button className="px-6 py-3 glass hover:bg-white/10 rounded-2xl font-bold flex items-center space-x-2 transition-all">
                        <Filter size={18} />
                        <span className="text-[var(--text-main)]">Filtr</span>
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
                <ControlStatCard icon={<Users className="text-emerald-500" />} label="Aktiv Inspektorlar" value="24" sub="Hudud bo'ylab" />
                <ControlStatCard icon={<Activity className="text-sapphire-400" />} label="O'rtacha KPI" value="92%" sub="+4% o'sish" />
                <ControlStatCard icon={<Clock className="text-amber-400" />} label="Kutilayotgan" value={tasks.filter(t => !t.is_completed).length.toString()} sub="Vazifalar soni" />
                <ControlStatCard icon={<ShieldCheck className="text-rose-500" />} label="Nazorat Nuqtalari" value="156" sub="Barcha hudud" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                <div className="xl:col-span-2 space-y-6">
                    <h3 className="text-xl font-bold px-2 flex items-center space-x-3">
                        <Activity className="text-emerald-500" size={20} />
                        <span>Topshiriqlar Jurnali (Live)</span>
                    </h3>
                    <div className="space-y-4">
                        {loading ? (
                            <div className="h-40 glass rounded-3xl flex items-center justify-center animate-pulse">
                                <p className="text-[var(--text-muted)] font-bold uppercase tracking-widest">Ma'lumotlar yuklanmoqda...</p>
                            </div>
                        ) : tasks.length > 0 ? (
                            tasks.map(task => (
                                <LogItem key={task.id} {...task} />
                            ))
                        ) : (
                            <div className="h-40 glass rounded-3xl flex items-center justify-center border-dashed border-white/5">
                                <p className="text-[var(--text-muted)] font-medium">Hozircha topshiriqlar mavjud emas</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="space-y-8">
                    <h3 className="text-xl font-bold px-2 flex items-center space-x-3">
                        <TrendingUp className="text-emerald-500" size={20} />
                        <span>Samaradorlik</span>
                    </h3>
                    <div className="glass p-8 rounded-[40px] space-y-8">
                        <PerformanceItem label="Zomin hududi" value={85} />
                        <PerformanceItem label="Bo'stonliq" value={92} />
                        <PerformanceItem label="Kitob qatlamlari" value={78} />
                        <PerformanceItem label="Orol bo'yi" value={64} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ControlStatCard({ icon, label, value, sub }: any) {
    return (
        <div className="glass p-8 rounded-[35px] relative overflow-hidden group transition-all">
            <div className="absolute -top-4 -right-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-700">
                {icon}
            </div>
            <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                {icon}
            </div>
            <p className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">{label}</p>
            <p className="text-4xl font-black tracking-tighter mb-1 text-[var(--text-main)]">{value}</p>
            <p className="text-[10px] text-emerald-500 font-black uppercase tracking-tighter">{sub}</p>
        </div>
    );
}

function LogItem({ title, priority, created_at, is_completed }: any) {
    const priorityColors: any = {
        critical: 'text-rose-500 bg-rose-500/10 border-rose-500/20',
        high: 'text-amber-500 bg-amber-500/10 border-amber-500/20',
        medium: 'text-sapphire-400 bg-sapphire-400/10 border-sapphire-400/20',
        low: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
    };

    return (
        <div className="flex items-center justify-between p-6 glass rounded-[30px] group hover:border-emerald-500/20 transition-all">
            <div className="flex items-center space-x-6">
                <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-500 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-lg">
                    <LocateFixed size={20} />
                </div>
                <div>
                    <div className="flex items-center space-x-3 mb-1">
                        <h4 className="font-bold text-lg text-[var(--text-main)]">{title}</h4>
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${priorityColors[priority] || priorityColors.medium}`}>
                            {priority}
                        </span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs font-medium text-[var(--text-muted)]">
                        <span className="flex items-center space-x-1"><Clock size={12} /> <span>{new Date(created_at).toLocaleTimeString()}</span></span>
                        <span className="flex items-center space-x-1"><AlertCircle size={12} /> <span>Inspektor #12</span></span>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <span className={`text-[10px] font-black uppercase tracking-widest ${is_completed ? 'text-emerald-500' : 'text-[var(--text-muted)] animate-pulse'}`}>
                    {is_completed ? 'Tugallandi' : 'Jarayonda'}
                </span>
                <button className="p-3 glass hover:bg-emerald-500 hover:text-white rounded-xl transition-all shadow-xl">
                    <AlertCircle size={18} />
                </button>
            </div>
        </div>
    );
}

function PerformanceItem({ label, value }: any) {
    return (
        <div className="space-y-3">
            <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">{label}</span>
                <span className="text-sm font-black text-[var(--text-main)]">{value}%</span>
            </div>
            <div className="h-1.5 w-full bg-[var(--text-main)]/5 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000"
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}
