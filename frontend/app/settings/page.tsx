"use client";

import { Settings, Shield, User, Bell, Palette, Database, Lock, Globe } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="flex-1 p-10 overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
            <div className="mb-12 animate-in fade-in duration-1000">
                <div className="flex items-center space-x-3 mb-2">
                    <span className="bg-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-emerald-500/20">System Config</span>
                </div>
                <h1 className="text-4xl font-black tracking-tight">Sozlamalar</h1>
                <p className="text-slate-400 mt-2 font-medium">Platforma konfiguratsiyasi va shaxsiy va xavfsizlik sozlamalari</p>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
                {/* Sidebar Tabs */}
                <div className="xl:col-span-1 space-y-6">
                    <div className="glass p-4 rounded-[35px] space-y-2">
                        <SettingsTab active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={<User size={18} />} label="Profil Ma'lumotlari" />
                        <SettingsTab active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} icon={<Bell size={18} />} label="Bildirishnomalar" />
                        <SettingsTab active={activeTab === 'security'} onClick={() => setActiveTab('security')} icon={<Lock size={18} />} label="Xavfsizlik" />
                        <SettingsTab active={activeTab === 'appearance'} onClick={() => setActiveTab('appearance')} icon={<Palette size={18} />} label="Tashqi Ko'rinish" />
                        <SettingsTab active={activeTab === 'system'} onClick={() => setActiveTab('system')} icon={<Database size={18} />} label="Tizim & Ma'lumotlar" />
                    </div>
                </div>

                {/* Content Area */}
                <div className="xl:col-span-3">
                    <div className="glass p-10 rounded-[45px] border-white/5 shadow-2xl space-y-10">
                        {activeTab === 'profile' && (
                            <div className="space-y-10 animate-in slide-in-from-right-4 duration-500">
                                <div className="flex items-center space-x-8">
                                    <div className="w-24 h-24 bg-emerald-500 rounded-[30px] flex items-center justify-center text-white text-3xl font-black shadow-2xl">A</div>
                                    <div>
                                        <h3 className="text-2xl font-bold">Admin Forestry</h3>
                                        <p className="text-slate-500 font-medium">Bosh Administrator (Level 10)</p>
                                        <button className="mt-4 text-xs font-black text-emerald-500 uppercase tracking-widest hover:text-white transition-colors">Rasmni o'zgartirish</button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8 pt-10 border-t border-white/5">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Foydalanuvchi nomi</label>
                                        <input type="text" defaultValue="admin_forestry" className="w-full bg-white/5 border border-white/10 outline-none p-4 rounded-2xl text-sm transition-all focus:border-emerald-500/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Email</label>
                                        <input type="email" defaultValue="admin@smartforestry.uz" className="w-full bg-white/5 border border-white/10 outline-none p-4 rounded-2xl text-sm transition-all focus:border-emerald-500/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Telefon</label>
                                        <input type="text" defaultValue="+998 90 123 45 67" className="w-full bg-white/5 border border-white/10 outline-none p-4 rounded-2xl text-sm transition-all focus:border-emerald-500/50" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Lavozimi</label>
                                        <input type="text" defaultValue="Super Administrator" className="w-full bg-white/5 border border-white/10 outline-none p-4 rounded-2xl text-sm transition-all focus:border-emerald-500/50" />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-6">
                                    <button className="px-10 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black shadow-lg shadow-emerald-500/20 transition-all active:scale-95">
                                        Saqlash
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function SettingsTab({ active, onClick, icon, label }: any) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center space-x-4 p-4 rounded-2xl cursor-pointer transition-all ${active ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'text-slate-400 hover:bg-white/5 hover:text-white'}`}
        >
            {icon}
            <span className="text-sm font-bold">{label}</span>
        </div>
    );
}
