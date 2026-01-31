"use client";

import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, PieChart, Activity, Download, TreePine, Map as MapIcon, Zap, Leaf, ChevronRight } from 'lucide-react';

export default function AnalyticsPage() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/forest-compartments/')
            .then(res => res.json())
            .then(d => {
                setData(d);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const totalArea = data.reduce((acc, curr) => acc + curr.area_ha, 0);
    const leasedCount = data.filter(c => c.status === 'leased').length;

    return (
        <div className="flex-1 p-10 overflow-y-auto">
            <div className="mb-12 flex justify-between items-start animate-in fade-in duration-1000">
                <div>
                    <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-emerald-500/20">Data Intelligence</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight">Tahliliy Dashboard</h1>
                    <p className="text-[var(--text-muted)] mt-2 font-medium">Barcha o'rmon fondlari va biologik zahiralarning real vaqtdagi statistikasi</p>
                </div>
                <button
                    onClick={() => {
                        // UTF-8 BOM for Excel compatibility with Uzbek characters
                        const headers = ["ID", "Hudud Nomi", "Maydon (ga)", "Himoya Holati", "Yog'och Zahirasi (m3)"];
                        const rows = data.map(d => [
                            d.id,
                            `"${d.name}"`,
                            d.total_area,
                            d.is_protected ? "Himoyada" : "Ochiq",
                            d.timber_volume
                        ]);

                        const csvContent = "\uFEFF" + [headers, ...rows].map(e => e.join(",")).join("\n");
                        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `smart_forest_analytics_${new Date().toISOString().split('T')[0]}.xls`;
                        a.click();
                        URL.revokeObjectURL(url);
                    }}
                    className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 theme-button"
                >
                    Hisobot Yuklash (XLS)
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                <StatCard icon={<TreePine className="text-emerald-500" />} label="Umumiy Hudud" value={`${Math.round(totalArea / 1000)}K Ha`} sub="Aktiv nazoratda" />
                <StatCard icon={<MapIcon className="text-sapphire-400" />} label="Konturlar" value={data.length.toString()} sub="GIS poligonlar" />
                <StatCard icon={<Zap className="text-amber-400" />} label="Ijara xajmi" value={`${Math.round((leasedCount / data.length) * 100 || 0)}%`} sub="Auksion orqali" />
                <StatCard icon={<Leaf className="text-rose-500" />} label="NDVI Index" value="0.74" sub="Yuqori mahsuldor" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="glass p-10 rounded-[45px] relative overflow-hidden h-[450px]">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-xl font-bold flex items-center space-x-3">
                            <BarChart3 className="text-emerald-500" size={24} />
                            <span>Hududlar kesimida tahlil</span>
                        </h3>
                        <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Daraxt soni (mln)</span>
                    </div>
                    <div className="absolute inset-x-10 bottom-10 top-32 flex items-end space-x-6">
                        <Bar h="85%" label="Zomin" color="bg-emerald-500" />
                        <Bar h="45%" label="Ugam" color="bg-sapphire-500" />
                        <Bar h="65%" label="Kitob" color="bg-amber-500" />
                        <Bar h="30%" label="Orol" color="bg-rose-500" />
                        <Bar h="55%" label="Farg'ona" color="bg-emerald-400" />
                    </div>
                </div>

                <div className="glass p-10 rounded-[45px] flex flex-col">
                    <h3 className="text-xl font-bold mb-10 flex items-center space-x-3">
                        <TrendingUp className="text-emerald-500" size={24} />
                        <span>Kutilayotgan O'sish (2026)</span>
                    </h3>
                    <div className="flex-1 space-y-10">
                        <ProgressItem label="Yangi ekishlar" value={78} color="emerald" />
                        <ProgressItem label="Auksion savdolari" value={92} color="sapphire" />
                        <ProgressItem label="Nazorat tadbirlari" value={64} color="amber" />
                    </div>
                    <button className="w-full mt-10 py-5 glass hover:bg-white/5 rounded-3xl font-black text-sm uppercase tracking-[0.2em] transition-all flex items-center justify-center space-x-3 group">
                        <span className="text-[var(--text-main)]">Batafsil Dinamika</span>
                        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, label, value, sub }: any) {
    return (
        <div className="glass p-8 rounded-[40px] hover:border-emerald-500/20 transition-all group">
            <div className="w-12 h-12 glass rounded-[18px] flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mb-1">{label}</p>
            <p className="text-4xl font-black tracking-tighter mb-1 text-[var(--text-main)]">{value}</p>
            <p className="text-[10px] text-emerald-500 font-black uppercase tracking-tighter">{sub}</p>
        </div>
    );
}

function Bar({ h, label, color }: any) {
    return (
        <div className="flex-1 flex flex-col items-center group h-full justify-end">
            <div
                className={`w-full ${color} rounded-t-2xl shadow-2xl transition-all duration-1000 group-hover:brightness-125 relative`}
                style={{ height: h }}
            >
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[var(--bg-main)] border border-[var(--glass-border)] px-2 py-1 rounded text-[10px] font-black opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {h}
                </div>
            </div>
            <span className="text-[10px] font-black text-[var(--text-muted)] mt-4 uppercase tracking-tighter">{label}</span>
        </div>
    );
}

function ProgressItem({ label, value, color }: any) {
    const colors: any = {
        emerald: 'bg-emerald-500',
        sapphire: 'bg-sapphire-500',
        amber: 'bg-amber-500'
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <span className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)]">{label}</span>
                <span className="text-sm font-black text-[var(--text-main)]">{value}%</span>
            </div>
            <div className="h-2 w-full bg-[var(--text-main)]/5 rounded-full overflow-hidden shadow-inner">
                <div
                    className={`h-full ${colors[color]} shadow-xl transition-all duration-1000`}
                    style={{ width: `${value}%` }}
                />
            </div>
        </div>
    );
}
