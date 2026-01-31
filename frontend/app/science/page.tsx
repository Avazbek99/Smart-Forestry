"use client";

import { useState } from 'react';
import { BookOpen, Search, Filter, Share2, Download, Star, FileText, FlaskConical, Microscope } from 'lucide-react';

export default function SciencePage() {
    const [activeTab, setActiveTab] = useState('research');

    const papers = [
        {
            title: "O'zbekiston janubiy hududlarida sho'rxok tuproqlarda o'rmon barpo qilish metodikasi",
            author: "Prof. Ahmedov S.T.",
            date: "2025-01-12",
            tags: ["Tuproq", "Sho'rxok", "Metodika"],
            downloads: 1240,
            rating: 4.8
        },
        {
            title: "Juniperus (Archa) o'rmonlarining iqlim o'zgarishiga chidamlilik tahlili",
            author: "Dr. Karimov J.M.",
            date: "2024-11-20",
            tags: ["Iqlim", "Archa", "Ekologiya"],
            downloads: 856,
            rating: 4.9
        },
        {
            title: "Daraxtlarning genetik modifikatsiyasi: O'rmon xo'jaligida yangi istiqbollar",
            author: "F. Olimova",
            date: "2025-02-01",
            tags: ["Genetika", "Innovatsiya"],
            downloads: 432,
            rating: 4.7
        }
    ];

    return (
        <div className="flex-1 p-10 overflow-y-auto">
            <div className="flex justify-between items-start mb-12 animate-in fade-in duration-1000">
                <div>
                    <div className="flex items-center space-x-3 mb-2">
                        <span className="bg-sapphire-500/20 text-sapphire-400 text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-sapphire-500/20">Science Hub</span>
                    </div>
                    <h1 className="text-4xl font-black tracking-tight text-[var(--text-main)]">Ilmiy-Ma'rifiy Markaz</h1>
                    <p className="text-[var(--text-muted)] mt-2 font-medium max-w-xl italic">Ilmiy tadqiqotlar, o'rmon genetikasi va zamonaviy o'rmon xo'jaligi metodologiyalari kutubxonasi.</p>
                </div>
                <div className="flex space-x-4">
                    <div className="glass px-6 py-4 rounded-3xl flex items-center space-x-6">
                        <div className="text-center">
                            <p className="text-3xl font-black text-[var(--text-main)]">1.2K</p>
                            <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase">Maqolalar</p>
                        </div>
                        <div className="w-[1px] h-10 bg-[var(--glass-border)]"></div>
                        <div className="text-center">
                            <p className="text-3xl font-black text-[var(--text-main)]">450</p>
                            <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase">Olimlar</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
                {/* Navigation / Filters */}
                <div className="xl:col-span-1 space-y-8">
                    <div className="glass p-4 rounded-[35px] space-y-1">
                        <TabItem active={activeTab === 'research'} onClick={() => setActiveTab('research')} icon={<Microscope size={18} />} label="Tadqiqotlar" count="842" />
                        <TabItem active={activeTab === 'genetic'} onClick={() => setActiveTab('genetic')} icon={<FlaskConical size={18} />} label="Genetik Bank" count="124" />
                        <TabItem active={activeTab === 'education'} onClick={() => setActiveTab('education')} icon={<BookOpen size={18} />} label="O'quv Modullari" count="56" />
                    </div>

                    <div className="glass p-8 rounded-[35px] space-y-6">
                        <h3 className="text-sm font-black uppercase tracking-widest text-[var(--text-muted)]">Filtrlar</h3>
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                <Tag label="Ekologiya" active />
                                <Tag label="Daraxtlar" />
                                <Tag label="Suv" />
                                <Tag label="Fizika" />
                                <Tag label="Iqlim" active />
                            </div>
                            <div className="pt-4 border-t border-[var(--glass-border)]">
                                <p className="text-[10px] font-bold text-[var(--text-muted)] mb-3 uppercase tracking-tighter">Yil bo'yicha</p>
                                <input type="range" className="w-full accent-emerald-500" />
                                <div className="flex justify-between text-[10px] font-bold text-[var(--text-muted)] mt-2">
                                    <span>2010</span>
                                    <span>2026</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Papers List */}
                <div className="xl:col-span-3 space-y-6">
                    <div className="glass px-8 py-5 rounded-[25px] flex items-center space-x-4">
                        <Search size={20} className="text-[var(--text-muted)]" />
                        <input type="text" placeholder="Ilmiy maqolalarni izlash..." className="bg-transparent border-none outline-none flex-1 font-medium text-[var(--text-main)] placeholder:text-[var(--text-muted)]/40" />
                        <Filter size={18} className="text-[var(--text-muted)] cursor-pointer hover:text-[var(--text-main)]" />
                    </div>

                    {papers.map((paper, idx) => (
                        <div key={idx} className="glass p-8 rounded-[40px] hover:border-emerald-500/20 transition-all group animate-in slide-in-from-right-4 duration-500" style={{ animationDelay: `${idx * 150}ms` }}>
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        {paper.tags.map(tag => (
                                            <span key={tag} className="text-[9px] font-black uppercase tracking-widest text-emerald-500/80 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">{tag}</span>
                                        ))}
                                    </div>
                                    <h2 className="text-2xl font-black leading-snug group-hover:text-emerald-400 transition-colors text-[var(--text-main)]">{paper.title}</h2>
                                </div>
                                <div className="flex items-center space-x-1 glass px-3 py-1.5 rounded-xl">
                                    <Star size={14} className="text-amber-500 fill-amber-500" />
                                    <span className="text-sm font-black text-[var(--text-main)]">{paper.rating}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-8 border-t border-[var(--glass-border)]">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 rounded-2xl bg-[var(--bg-main)]/60 flex items-center justify-center border border-[var(--glass-border)]">
                                        <FileText size={20} className="text-emerald-500" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[var(--text-main)]">{paper.author}</p>
                                        <p className="text-[10px] text-[var(--text-muted)] font-medium">{paper.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="text-right mr-4">
                                        <p className="text-xs font-black text-[var(--text-main)]">{paper.downloads}</p>
                                        <p className="text-[9px] text-[var(--text-muted)] font-bold uppercase tracking-tighter">Yuklangan</p>
                                    </div>
                                    <button className="p-3 glass hover:bg-white/10 rounded-2xl transition-all text-[var(--text-main)]"><Share2 size={18} /></button>
                                    <button
                                        onClick={() => {
                                            const blob = new Blob([`Ilmiy Maqola: ${paper.title}\nMuallif: ${paper.author}`], { type: 'text/plain' });
                                            const url = URL.createObjectURL(blob);
                                            const a = document.createElement('a');
                                            a.href = url;
                                            a.download = `${paper.title.substring(0, 20)}.pdf`;
                                            a.click();
                                        }}
                                        className="px-6 py-3 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all border border-emerald-500/20 flex items-center space-x-2"
                                    >
                                        <Download size={16} />
                                        <span>PDF Yuklash</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function TabItem({ active, onClick, icon, label, count }: any) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center justify-between p-4 rounded-2xl cursor-pointer transition-all ${active ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'text-[var(--text-muted)] hover:bg-white/3'}`}
        >
            <div className="flex items-center space-x-4">
                {icon}
                <span className="font-bold text-sm">{label}</span>
            </div>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded ${active ? 'bg-white/20 text-white' : 'bg-white/5 text-[var(--text-muted)] opacity-60'}`}>{count}</span>
        </div>
    );
}

function Tag({ label, active = false }: any) {
    return (
        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider cursor-pointer transition-all ${active ? 'bg-emerald-500 text-white' : 'bg-white/5 text-[var(--text-muted)] hover:bg-white/10'}`}>
            {label}
        </span>
    );
}
