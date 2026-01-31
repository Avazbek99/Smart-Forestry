"use client";

import { useState } from 'react';
import { TreePine, Zap, Thermometer, Droplets, Mountain, Search, FileText, Database, FlaskConical, Share2, Download, Clock, ChevronRight, Map as MapIcon } from 'lucide-react';

export default function PlantingPage() {
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const [result, setResult] = useState<any>(null);

    const analysisSteps = [
        "Tuproq tarkibi tahlillari yuklanmoqda...",
        "NASA Landsat-8 ma'lumotlari bilan solishtirilmoqda...",
        "NDVI vegetatsiya indeksi hisoblanmoqda (0.64)...",
        "Gidrologik qatlamlar tekshirilmoqda...",
        "Optimal biologik turlar tanlanmoqda..."
    ];

    const handleAIAnalyze = () => {
        setLoading(true);
        setResult(null);
        let currentStep = 0;

        const interval = setInterval(() => {
            if (currentStep < analysisSteps.length) {
                setStep(currentStep);
                currentStep++;
            } else {
                clearInterval(interval);
                setResult({
                    species: "Sharq Chinori (Platanus orientalis) 'Luxe Edition'",
                    reason: "Ushbu hududda tuproqning ishqoriyligi (pH 7.5) va azot miqdori yuqoriligi sababli Chinor daraxti 15-20% tezroq o'sish imkoniyatiga ega. Gidrologik tahlillar yer osti suvlari 2.4 metr chuqurlikda ekanligini ko'rsatmoqda, bu esa daraxtning ildiz tizimi uchun juda qulay.",
                    probability: "97.4%",
                    yield_est: "120 m3/ha (25 yildan so'ng)",
                    carbon_seq: "4.2 tonna/yil",
                    time: "20-martdan 15-aprelgacha"
                });
                setLoading(false);
            }
        }, 800);
    };

    return (
        <div className="flex-1 p-8 overflow-y-auto">
            <div className="mb-10 animate-in fade-in duration-1000">
                <div className="flex items-center space-x-4 mb-2">
                    <div className="p-2 glass-emerald rounded-lg">
                        <Zap className="text-emerald-500 w-5 h-5" />
                    </div>
                    <span className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-[10px]">AI Core v4.0</span>
                </div>
                <h1 className="text-4xl font-black tracking-tight text-[var(--text-main)]">Ekotizim Analizatori</h1>
                <p className="text-[var(--text-muted)] mt-2 max-w-2xl font-medium leading-relaxed">
                    O'zbekistonning iqlim va tuproq xususiyatlarini inobatga olgan holda, hududga mos daraxt turlarini yuqori aniqlikda tavsiya etuvchi intellektual tizim.
                </p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
                {/* Advanced Form Section */}
                <div className="xl:col-span-4 space-y-8">
                    <div className="glass p-8 rounded-[40px] shadow-2xl space-y-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-[var(--text-main)]">
                            <Database size={80} />
                        </div>

                        <h3 className="text-xl font-bold flex items-center space-x-3 text-[var(--text-main)]">
                            <FlaskConical className="text-emerald-500" size={24} />
                            <span>Bio-Parametrlar</span>
                        </h3>

                        <div className="space-y-6">
                            <InputGroup label="Hudud (Kordinata/Nomi)" placeholder="Zomin Davlat Qo'riqxonasi, KV-12" />

                            <div className="grid grid-cols-2 gap-6">
                                <InputGroup label="Tuproq pH" placeholder="7.5" />
                                <InputGroup label="Azot (N)" placeholder="12 mg/kg" />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <InputGroup label="Namlik" icon={<Droplets size={14} />} placeholder="45%" />
                                <InputGroup label="Tashqi Harorat" icon={<Thermometer size={14} />} placeholder="+28°C" />
                            </div>

                            <div className="p-4 glass-emerald rounded-2xl border border-emerald-500/10">
                                <p className="text-[10px] text-emerald-500 font-black uppercase mb-2 tracking-widest">Lidar Scanning</p>
                                <div className="flex items-center justify-between text-xs font-bold">
                                    <span className="text-[var(--text-muted)]">Topografik tahlil:</span>
                                    <span className="text-[var(--text-main)]">Faol</span>
                                </div>
                                <div className="mt-2 h-1 w-full bg-emerald-500/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 animate-pulse w-3/4" />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleAIAnalyze}
                            disabled={loading}
                            className="w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-[24px] font-black text-lg shadow-xl shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3 disabled:opacity-50"
                        >
                            {loading ? <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" /> : <Zap size={22} className="animate-pulse" />}
                            <span>Tahlilni Ishga Tushirish</span>
                        </button>
                    </div>
                </div>

                {/* Scientific Result Section */}
                <div className="xl:col-span-8 flex flex-col min-h-[600px]">
                    {loading ? (
                        <div className="flex-1 glass rounded-[40px] flex flex-col items-center justify-center space-y-8 p-12 text-center border-emerald-500/30">
                            <div className="relative">
                                <div className="w-32 h-32 border-[6px] border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin" />
                                <Database className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500 animate-pulse" size={40} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-[var(--text-main)] mb-2 italic">"{analysisSteps[step]}"</h3>
                                <p className="text-[var(--text-muted)] font-medium">Katta ma'lumotlar bazasi (Big Data) tahlil qilinmoqda...</p>
                            </div>
                        </div>
                    ) : result ? (
                        <div className="flex-1 glass p-10 rounded-[40px] animate-in zoom-in-95 duration-700 flex flex-col shadow-2xl relative">
                            <div className="absolute top-10 right-10 flex space-x-3">
                                <button className="p-3 glass hover:bg-white/10 rounded-2xl transition-all shadow-xl text-[var(--text-main)]"><Share2 size={20} /></button>
                                <button
                                    onClick={() => {
                                        const blob = new Blob([`AI TAHLIL HISOBOTI\nTur: ${result.species}\nAniqllik: ${result.probability}\nSabab: ${result.reason}`], { type: 'text/plain' });
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement('a');
                                        a.href = url;
                                        a.download = `planting_analysis_${result.species.substring(0, 10)}.pdf`;
                                        a.click();
                                    }}
                                    className="p-3 bg-emerald-500 text-white rounded-2xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-400 transition-all"
                                >
                                    <Download size={20} />
                                </button>
                            </div>

                            <div className="flex items-start space-x-8 mb-10">
                                <div className="w-28 h-28 bg-emerald-500 rounded-[35px] flex items-center justify-center shadow-3xl shadow-emerald-500/40 relative group cursor-help text-white">
                                    <TreePine size={50} className="group-hover:scale-110 transition-transform" />
                                    <div className="absolute -bottom-2 -right-2 bg-[var(--bg-main)] border border-emerald-500 text-[10px] font-black px-2 py-1 rounded-lg text-emerald-500">AI 97%</div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <span className="bg-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/20">Flora Optimal</span>
                                        <span className="text-[var(--text-muted)] text-xs font-bold italic">ID: #AI-TR-2026</span>
                                    </div>
                                    <h2 className="text-5xl font-black text-[var(--text-main)] leading-tight uppercase">{result.species}</h2>
                                    <p className="text-[var(--text-muted)] font-medium mt-1 flex items-center space-x-2">
                                        <MapIcon size={14} className="text-emerald-500" />
                                        <span>Markaziy Osiyo sharoiti uchun moslashtirilgan genotip</span>
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                                <MetricCard label="Samaradorlik" value={result.probability} sub="Aniqlik darajasi" color="text-emerald-500" />
                                <MetricCard label="Uglerod yutilishi" value={result.carbon_seq} sub="Har bir daraxt uchun" color="text-sapphire-400" />
                                <MetricCard label="Yog'och zaxirasi" value={result.yield_est} sub="Kutilayotgan hosil" color="text-amber-400" />
                            </div>

                            <div className="flex-1 space-y-6">
                                <div className="p-8 glass-emerald rounded-[30px] border-emerald-500/10 leading-relaxed text-lg font-medium text-[var(--text-main)]">
                                    <span className="text-emerald-500 font-black mr-2 text-2xl font-serif">"</span> {result.reason}
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="p-6 glass rounded-[24px]">
                                        <h4 className="text-xs font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-4 flex items-center space-x-2">
                                            <Clock size={14} />
                                            <span>Ekish Grafigi</span>
                                        </h4>
                                        <p className="text-xl font-bold text-[var(--text-main)]">{result.time}</p>
                                    </div>
                                    <div className="p-6 glass rounded-[24px] bg-white/5 cursor-pointer hover:bg-white/10 transition-all group">
                                        <h4 className="text-xs font-black text-emerald-500 uppercase tracking-[0.2em] mb-4 flex items-center space-x-2">
                                            <FileText size={14} />
                                            <span>Ilmiy bayonnoma</span>
                                        </h4>
                                        <p className="text-sm font-bold text-[var(--text-muted)] group-hover:text-[var(--text-main)] transition-colors">7 varoqli tahliliy hisobot tayyor <ChevronRight size={14} className="inline ml-1" /></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 glass rounded-[40px] border-dashed border-[var(--glass-border)] flex flex-col items-center justify-center text-[var(--text-muted)] p-20 text-center group hover:border-emerald-500/20 transition-all">
                            <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                                <Zap size={60} className="opacity-10 group-hover:opacity-30 text-emerald-500 transition-all" />
                            </div>
                            <h3 className="text-2xl font-bold text-[var(--text-main)] mb-4">Sizning tahlilingiz kutilyapti</h3>
                            <p className="max-w-md font-medium text-[var(--text-muted)]">
                                Tuproq pH qiymati, azot miqdori va gidrologik ma'lumotlarni kiriting. AI ekotizimni modellashtiradi va eng mos daraxt turini tavsiya qiladi.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function MetricCard({ label, value, sub, color }: any) {
    return (
        <div className="p-6 glass rounded-3xl transition-all">
            <p className="text-[10px] text-[var(--text-muted)] font-black uppercase tracking-widest mb-1">{label}</p>
            <p className={`text-4xl font-black ${color} tracking-tighter`}>{value}</p>
            <p className="text-[10px] text-[var(--text-muted)] font-bold mt-1 uppercase tracking-tighter opacity-60">{sub}</p>
        </div>
    );
}

function InputGroup({ label, placeholder, icon }: { label: string, placeholder: string, icon?: React.ReactNode }) {
    return (
        <div className="space-y-2 group">
            <label className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1 flex items-center space-x-2 group-focus-within:text-emerald-500 transition-colors">
                {icon}
                <span>{label}</span>
            </label>
            <input
                type="text"
                placeholder={placeholder}
                className="w-full bg-[var(--bg-main)]/60 border border-[var(--glass-border)] focus:border-emerald-500/50 outline-none p-4 rounded-[18px] text-sm transition-all focus:ring-4 focus:ring-emerald-500/10 placeholder:text-[var(--text-muted)]/40 font-medium text-[var(--text-main)]"
            />
        </div>
    );
}
