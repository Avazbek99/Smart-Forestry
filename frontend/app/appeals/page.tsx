"use client";

import { useEffect, useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import {
    AlertTriangle,
    Clock,
    MapPin,
    CheckCircle2,
    Plus,
    X,
    Camera,
    Send,
    ChevronRight,
    ShieldAlert,
    Flame,
    Axe,
    Trash2
} from 'lucide-react';

const MiniMap = dynamic(() => import('@/components/MiniMap'), { ssr: false });

export default function AppealsPage() {
    const [appeals, setAppeals] = useState<any[]>([]);
    const [showWizard, setShowWizard] = useState(false);
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    // Wizard state
    const [formData, setFormData] = useState({
        type: '',
        location: null,
        description: '',
        severity: 'medium'
    });

    useEffect(() => {
        fetchAppeals();
    }, []);

    const fetchAppeals = () => {
        fetch('http://127.0.0.1:8000/api/appeals/')
            .then(res => res.json())
            .then(data => setAppeals(data))
            .catch(err => console.error("Error fetching appeals:", err));
    };

    const handleCreate = () => {
        setLoading(true);
        // Simulation of API call
        setTimeout(() => {
            fetchAppeals();
            setShowWizard(false);
            setStep(1);
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="flex-1 flex flex-col h-full relative">
            <div className="p-8 overflow-y-auto flex-1">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-4xl font-black tracking-tight text-[var(--text-main)]">Murojaatlar Markazi</h1>
                        <p className="text-[var(--text-muted)] mt-2 font-medium">O'rmon muhofazasi va tezkor xizmatlar monitoringi</p>
                    </div>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => {
                                // UTF-8 BOM for Excel compatibility with Uzbek characters
                                const headers = ["ID", "Turi", "Holati", "Sana"];
                                const rows = appeals.map(a => [
                                    a.id,
                                    a.type === 'fire' ? "Yong'in" : a.type === 'illegal_cutting' ? "Noqonuniy Kesish" : "Chiqindi",
                                    a.is_resolved ? "Hal Etildi" : "Jarayonda",
                                    new Date(a.created_at).toLocaleString('uz-UZ')
                                ]);

                                const csvContent = "\uFEFF" + [headers, ...rows].map(e => e.join(",")).join("\n");
                                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `appeals_log_${new Date().toISOString().split('T')[0]}.xls`;
                                a.click();
                                URL.revokeObjectURL(url);
                            }}
                            className="px-8 py-4 glass hover:bg-white/10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 text-[var(--text-main)]"
                        >
                            Export (XLS)
                        </button>
                        <button
                            onClick={() => setShowWizard(true)}
                            className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black shadow-xl shadow-emerald-500/20 transition-all flex items-center space-x-3 group"
                        >
                            <Plus size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                            <span>Murojaat Yuborish</span>
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
                    <StatMiniCard label="Aktiv Xavflar" value="12" color="text-rose-500" />
                    <StatMiniCard label="Hal Etilgan" value="142" color="text-emerald-500" />
                    <StatMiniCard label="O'rtacha Reaksiya" value="3.2 min" color="text-sapphire-400" />
                </div>

                <div className="space-y-4">
                    <h2 className="text-xl font-bold px-2 mb-6 text-[var(--text-main)]">Oxirgi hodisalar</h2>
                    {appeals.map((appeal) => (
                        <div key={appeal.id} className="glass p-8 rounded-[35px] flex items-center justify-between hover:bg-white/5 transition-all group relative overflow-hidden">
                            <div className="flex items-center space-x-8">
                                <div className={`w-16 h-16 rounded-[22px] flex items-center justify-center shadow-lg ${appeal.type === 'fire' ? 'bg-rose-500/10 text-rose-500 shadow-rose-500/5' :
                                    appeal.type === 'illegal_cutting' ? 'bg-amber-500/10 text-amber-500 shadow-amber-500/5' :
                                        'bg-blue-500/10 text-blue-500 shadow-blue-500/5'
                                    }`}>
                                    {appeal.type === 'fire' ? <Flame size={32} /> :
                                        appeal.type === 'illegal_cutting' ? <Axe size={32} /> : <Trash2 size={32} />}
                                </div>
                                <div>
                                    <div className="flex items-center space-x-4 mb-2">
                                        <h3 className="text-xl font-bold capitalize text-[var(--text-main)]">
                                            {appeal.type === 'fire' ? "Yong'in Xavfi" :
                                                appeal.type === 'illegal_cutting' ? "Noqonuniy Daraxt Kesish" :
                                                    appeal.type === 'waste' ? "Chiqindi To'planishi" : appeal.type}
                                        </h3>
                                        <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${appeal.is_resolved ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-[var(--glass-bg)] text-[var(--text-muted)] border-[var(--glass-border)]'
                                            }`}>
                                            {appeal.is_resolved ? 'Hal Etildi' : 'Jarayonda'}
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-5 text-sm font-bold text-[var(--text-muted)]">
                                        <div className="flex items-center space-x-1.5 hover:text-emerald-500 cursor-pointer transition-colors">
                                            <MapPin size={14} className="text-emerald-500" />
                                            <span>41.311°N, 69.240°E</span>
                                        </div>
                                        <div className="flex items-center space-x-1.5">
                                            <Clock size={14} />
                                            <span>{new Date(appeal.created_at).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <button className="px-6 py-2.5 glass hover:bg-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all text-[var(--text-main)]">
                                    Batafsil
                                </button>
                                {!appeal.is_resolved && (
                                    <button className="p-3 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white rounded-xl transition-all border border-emerald-500/20 group">
                                        <CheckCircle2 size={22} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reporting Wizard Modal */}
            {showWizard && (
                <div className="absolute inset-0 z-[2000] bg-[var(--bg-main)]/80 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="glass w-full max-w-4xl rounded-[45px] shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col max-h-[90vh]">
                        <div className="p-10 border-b border-[var(--glass-border)] flex justify-between items-center bg-white/3">
                            <div>
                                <h2 className="text-3xl font-black uppercase tracking-tighter text-[var(--text-main)]">Murojaat Yuborish</h2>
                                <p className="text-[var(--text-muted)] font-bold mt-1 uppercase text-xs tracking-widest">Qadam {step} dan 3</p>
                            </div>
                            <button onClick={() => setShowWizard(false)} className="p-3 glass hover:bg-rose-500 text-white rounded-2xl transition-all">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="flex-1 p-10 overflow-y-auto">
                            {step === 1 && (
                                <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-xl font-bold text-[var(--text-main)]">Hodisa turini tanlang</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <TypeCard
                                            icon={<Flame size={40} />}
                                            label="Yong'in Xavfi"
                                            desc="Olov va tutun"
                                            active={formData.type === 'fire'}
                                            onClick={() => { setFormData({ ...formData, type: 'fire' }); setStep(2); }}
                                        />
                                        <TypeCard
                                            icon={<Axe size={40} />}
                                            label="Noqonuniy Kesish"
                                            desc="Daraxt kesilishi"
                                            active={formData.type === 'cutting'}
                                            onClick={() => { setFormData({ ...formData, type: 'cutting' }); setStep(2); }}
                                        />
                                        <TypeCard
                                            icon={<Trash2 size={40} />}
                                            label="Chiqindi"
                                            desc="Atrof-muhit ekologiyasi"
                                            active={formData.type === 'waste'}
                                            onClick={() => { setFormData({ ...formData, type: 'waste' }); setStep(2); }}
                                        />
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-xl font-bold text-[var(--text-main)]">Joylashuvni tanlang</h3>
                                    <div className="h-[350px] rounded-[30px] overflow-hidden border border-[var(--glass-border)] shadow-inner relative">
                                        <MiniMap />
                                        <div className="absolute top-4 right-4 z-[3000]">
                                            <div className="p-3 glass rounded-2xl flex items-center space-x-2 text-xs font-bold text-emerald-500 shadow-2xl">
                                                <MapPin size={16} />
                                                <span>GPS faollashtirildi</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <button onClick={() => setStep(1)} className="px-8 py-3 glass hover:bg-white/5 rounded-2xl font-bold transition-all text-[var(--text-main)]">Orqaga</button>
                                        <button onClick={() => setStep(3)} className="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black shadow-lg shadow-emerald-500/20 transition-all flex items-center space-x-2">
                                            <span>Davom Etish</span>
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
                                    <h3 className="text-xl font-bold text-[var(--text-main)]">Batafsil ma'lumot va Foto</h3>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black text-[var(--text-muted)] uppercase tracking-widest ml-2">Hodisa Tavsifi</label>
                                            <textarea
                                                className="w-full h-32 bg-[var(--bg-main)]/60 border border-[var(--glass-border)] focus:border-emerald-500/50 outline-none p-6 rounded-[30px] text-sm transition-all resize-none shadow-inner text-[var(--text-main)]"
                                                placeholder="Vaziyatni qisqacha tushuntiring..."
                                            ></textarea>
                                        </div>
                                        <div className="flex items-center space-x-6">
                                            <div className="flex-1 p-8 glass border-dashed border-[var(--glass-border)] rounded-[30px] flex flex-col items-center justify-center text-[var(--text-muted)] hover:border-emerald-500/30 transition-all cursor-pointer">
                                                <Camera size={32} className="mb-2 opacity-50" />
                                                <span className="text-xs font-bold uppercase tracking-widest">Foto biriktirish</span>
                                            </div>
                                            <div className="w-48 space-y-3">
                                                <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-tighter">Xavf Darajasi</p>
                                                <div className="flex space-x-2">
                                                    <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                                                    <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                                                    <div className="w-4 h-4 rounded-full bg-rose-500 outline outline-offset-2 outline-rose-500/50"></div>
                                                </div>
                                                <p className="text-xs font-bold text-rose-500 uppercase italic">Kritik Xavf</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-10">
                                        <button onClick={() => setStep(2)} className="px-8 py-3 glass hover:bg-white/5 rounded-2xl font-bold transition-all text-[var(--text-main)]">Orqaga</button>
                                        <button
                                            onClick={handleCreate}
                                            disabled={loading}
                                            className="px-12 py-5 bg-rose-500 hover:bg-rose-400 text-white rounded-3xl font-black shadow-xl shadow-rose-500/30 transition-all flex items-center space-x-3 disabled:opacity-50"
                                        >
                                            {loading ? <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={24} />}
                                            <span>Tezkor Yuborish</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatMiniCard({ label, value, color }: any) {
    return (
        <div className="glass p-6 rounded-[30px] flex flex-col items-center justify-center text-center">
            <span className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mb-1">{label}</span>
            <span className={`text-4xl font-black tracking-tighter ${color}`}>{value}</span>
        </div>
    );
}

function TypeCard({ icon, label, desc, active, onClick }: any) {
    return (
        <div
            onClick={onClick}
            className={`
        p-8 rounded-[35px] border cursor-pointer transition-all flex flex-col items-center justify-center text-center space-y-4
        ${active ? 'bg-emerald-500 border-emerald-500 text-white shadow-2xl shadow-emerald-500/30' : 'glass border-white/5 text-[var(--text-muted)] hover:bg-white/5'}
      `}
        >
            <div className={active ? 'text-white' : 'text-emerald-500'}>{icon}</div>
            <div>
                <h4 className="font-black text-lg text-[var(--text-main)]">{label}</h4>
                <p className={`text-xs ${active ? 'text-white/70' : 'text-[var(--text-muted)]'} font-medium`}>{desc}</p>
            </div>
        </div>
    );
}
