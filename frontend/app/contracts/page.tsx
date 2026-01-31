"use client";

import { useState, useEffect } from 'react';
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  ShieldCheck,
  X,
  Printer,
  ShieldAlert
} from 'lucide-react';

export default function ContractsPage() {
  const [contracts, setContracts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedContract, setSelectedContract] = useState<any>(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/contracts/')
      .then(res => res.json())
      .then(data => {
        setContracts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching contracts:", err);
        setLoading(false);
      });
  }, []);

  const handleDownload = (contract: any) => {
    const content = `
******************************************************************
          O'ZBEKISTON RESPUBLIKASI O'RMON XO'JALIGI
               ELEKTRON IJARA SHARTNOMASI #${contract.id}
******************************************************************

HUJJAT RAQAMI: SMART-FOREST-${contract.id}-${new Date().getFullYear()}
SANA: ${contract.created_at || new Date().toLocaleDateString()}

1. SHARTNOMA TOMONLARI:
   Ijaraga beruvchi: O'zbekiston Respublikasi O'rmon xo'jaligi agentligi.
   Ijarachi: ${contract.user_name || "Foydalanuvchi"} (ID: ${contract.user || "Noma'lum"})

2. IJARA OB'EKTI:
   Hudud: ${contract.compartment_name || "O'rmon fondi yerlari"}
   Shartnoma muddati: ${contract.start_date} dan ${contract.end_date} gacha.

3. MOLIYAVIY SHARTLAR:
   Yillik ijara to'lovi: ${contract.annual_price} so'm.
   To'lov holati: ${contract.is_paid ? "TO'LANGAN" : "KUTILMOQDA"}.

4. TASDIQLASH:
   ERI Imzosi holati: ${contract.is_signed_eri ? "TASDIQLANGAN" : "TASDIQLANMAGAN"}.
   ID: ${contract.id * 123456789} (Raqamli havola)

******************************************************************
Ushbu hujjat elektron ko'rinishda shakllantirilgan va qonuniy kuchga ega.
******************************************************************
`;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `shartnoma_${contract.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 p-10 overflow-y-auto relative">
      <div className="mb-12 flex justify-between items-start animate-in fade-in duration-1000">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <span className="bg-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border border-emerald-500/20">Legal & Lease</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-[var(--text-main)]">Elektron Shartnomalar</h1>
          <p className="text-[var(--text-muted)] mt-2 font-medium">Barcha ijara shartnomalari va ERI bilan imzolangan hujjatlar arxivi</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => {
              // UTF-8 BOM for Excel compatibility with Uzbek characters
              const headers = ["ID", "Hudud", "Boshlanish", "Yakunlanish", "Yillik Narx", "ERI Holati", "To'lov"];
              const rows = contracts.map(c => [
                c.id,
                `"${c.compartment_name}"`,
                c.start_date,
                c.end_date,
                c.annual_price,
                c.is_signed_eri ? "Imzolangan" : "Kutilmoqda",
                c.is_paid ? "To'langan" : "Kutilmoqda"
              ]);

              const csvContent = "\uFEFF" + [headers, ...rows].map(e => e.join(",")).join("\n");
              const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `contracts_master_report_${new Date().toISOString().split('T')[0]}.xls`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 active:scale-95 flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Export (XLS)</span>
          </button>
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-emerald-500 transition-colors" size={18} />
            <input
              type="text"
              placeholder="Shartnoma ID yoki Ism..."
              className="bg-[var(--glass-bg)] border border-[var(--glass-border)] outline-none pl-12 pr-6 py-3 rounded-2xl text-sm transition-all focus:border-emerald-500/50 w-64 text-[var(--text-main)]"
            />
          </div>
          <button className="px-6 py-3 glass hover:bg-white/10 rounded-2xl font-black text-xs uppercase tracking-widest transition-all flex items-center space-x-2 text-[var(--text-main)]">
            <Filter size={18} />
            <span>Saralash</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="h-64 glass rounded-[40px] flex items-center justify-center animate-pulse">
            <p className="text-[var(--text-muted)] font-black uppercase tracking-[0.5em]">Hujjatlar yuklanmoqda...</p>
          </div>
        ) : contracts.length > 0 ? (
          contracts.map(contract => (
            <ContractItem
              key={contract.id}
              contract={contract}
              onView={() => setSelectedContract(contract)}
              onDownload={() => handleDownload(contract)}
            />
          ))
        ) : (
          <div className="h-64 glass rounded-[40px] flex flex-col items-center justify-center border-dashed border-[var(--glass-border)]">
            <FileText size={48} className="text-slate-700 mb-4 opacity-20" />
            <p className="text-[var(--text-muted)] font-bold">Hozircha hech qanday shartnoma mavjud emas</p>
          </div>
        )}
      </div>

      {/* Contract Preview Modal */}
      {selectedContract && (
        <div className="fixed inset-0 z-[2000] bg-[var(--bg-main)]/90 backdrop-blur-md flex items-center justify-center p-8 animate-in fade-in duration-300">
          <div className="glass w-full max-w-4xl rounded-[40px] overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-500 max-h-[90vh]">
            <div className="p-8 border-b border-[var(--glass-border)] flex justify-between items-center bg-white/3">
              <div>
                <h2 className="text-2xl font-black text-[var(--text-main)] leading-none mb-1">Shartnoma Ko'rish</h2>
                <p className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">ID: {selectedContract.id * 100203}</p>
              </div>
              <div className="flex items-center space-x-3">
                <button onClick={() => handleDownload(selectedContract)} className="p-3 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-400 transition-all shadow-lg active:scale-95">
                  <Download size={20} />
                </button>
                <button className="p-3 glass hover:bg-white/10 text-[var(--text-main)] rounded-2xl transition-all active:scale-95">
                  <Printer size={20} />
                </button>
                <button onClick={() => setSelectedContract(null)} className="p-3 bg-rose-500/10 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white transition-all active:scale-95">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 p-16 overflow-y-auto text-[var(--text-main)]">
              <div className="max-w-2xl mx-auto space-y-10 font-serif">
                <div className="text-center space-y-4 mb-16">
                  <div className="w-20 h-20 bg-emerald-600 rounded-full mx-auto flex items-center justify-center text-white shadow-xl mb-4">
                    <ShieldCheck size={40} />
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-[var(--text-main)] border-b-2 border-[var(--text-main)] inline-block pb-2">O'zbekiston Respublikasi O'rmon Xo'jaligi Agentligi</h3>
                  <p className="text-sm font-bold text-[var(--text-muted)]">ELEKTRON IJARA SHARTNOMASI #SMART-{selectedContract.id}</p>
                </div>

                <div className="grid grid-cols-2 gap-10 text-sm">
                  <div className="space-y-4">
                    <p className="font-bold text-[var(--text-muted)] uppercase text-[10px] tracking-widest">Ijaraga Beruvchi</p>
                    <p className="font-bold">O'rmon Xo'jaligi Davlat Agentligi</p>
                    <p className="text-[var(--text-muted)]">Toshkent sh., Qatortol ko'chasi, 8-uy</p>
                  </div>
                  <div className="space-y-4 text-right">
                    <p className="font-bold text-[var(--text-muted)] uppercase text-[10px] tracking-widest">Ijarachi</p>
                    <p className="font-bold">Foydalanuvchi #{selectedContract.user}</p>
                    <p className="text-[var(--text-muted)]">Shaxsiy ID: {selectedContract.user * 777}</p>
                  </div>
                </div>

                <div className="space-y-6 pt-10 border-t border-[var(--glass-border)]">
                  <h4 className="font-bold text-lg text-[var(--text-main)]">1. Shartnoma Predmeti</h4>
                  <p className="leading-relaxed text-[var(--text-muted)]">
                    Ushbu shartnomaga muvofiq, Ijaraga beruvchi Ijarachiga vaqtincha foydalanish uchun
                    <span className="font-bold text-[var(--text-main)]"> {selectedContract.compartment_name || 'belgilangan o\'rmon fondi hududini'} </span>
                    ijaraga beradi. Hudud umumiy maydoni va ximoya darajasi davlat kadastr ma'lumotlariga mos keladi.
                  </p>
                </div>

                <div className="space-y-6">
                  <h4 className="font-bold text-lg text-[var(--text-main)]">2. Ijara Muddati va To'lovlari</h4>
                  <p className="leading-relaxed text-[var(--text-muted)]">
                    Ijara muddati: <span className="font-bold text-emerald-600">{selectedContract.start_date}</span> dan
                    <span className="font-bold text-emerald-600"> {selectedContract.end_date}</span> gacha.
                    Yillik ijara to'lovi miqdori <span className="font-bold text-[var(--text-main)]">{selectedContract.annual_price} so'm </span>
                    etib belgilangan.
                  </p>
                </div>

                <div className="pt-20 flex justify-between items-end">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-[var(--text-muted)] mb-4 tracking-tighter">ERI TASDIQLANGAN</p>
                    <div className="w-24 h-24 border-2 border-emerald-500 rounded-xl flex flex-col items-center justify-center p-2 text-emerald-600 rotate-[-12deg] opacity-70">
                      <ShieldCheck size={32} />
                      <span className="text-[8px] font-black uppercase mt-1">SMART-CERT</span>
                    </div>
                  </div>
                  <div className="text-right space-y-4">
                    <div className="h-px w-48 bg-[var(--glass-border)] mb-2"></div>
                    <p className="text-xs font-bold italic text-[var(--text-muted)]">Elektron imzo (Raqamli kod ID: {selectedContract.id * 9999})</p>
                    <p className="text-xs font-black uppercase tracking-widest">{selectedContract.start_date}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ContractItem({ contract, onView, onDownload }: { contract: any, onView: () => void, onDownload: () => void }) {
  return (
    <div className="glass p-8 rounded-[35px] hover:border-emerald-500/20 transition-all group flex items-center justify-between relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/[0.02] rounded-bl-[100px]" />

      <div className="flex items-center space-x-8 relative z-10">
        <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-xl">
          <FileText size={28} />
        </div>
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <h3 className="text-xl font-black tracking-tight text-[var(--text-main)]">Shartnoma #{contract.id}</h3>
            {contract.is_signed_eri ? (
              <span className="bg-emerald-500/10 text-emerald-500 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-emerald-500/20 flex items-center space-x-1">
                <ShieldCheck size={10} />
                <span>ERI Imzolangan</span>
              </span>
            ) : (
              <span className="bg-amber-500/10 text-amber-500 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded border border-amber-500/20">
                Imzo kutilmoqda
              </span>
            )}
          </div>
          <div className="flex items-center space-x-6 text-xs font-bold text-[var(--text-muted)]">
            <span className="flex items-center space-x-1"><Clock size={14} /> <span>{contract.start_date} - {contract.end_date}</span></span>
            <span className="flex items-center space-x-1 text-[var(--text-main)]"><span>Narxi:</span> <span className="text-emerald-500">{(contract.annual_price / 1000000).toFixed(1)} mln so'm / yil</span></span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4 relative z-10">
        <div className="text-right mr-8">
          <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-1">To'lov holati</p>
          <p className={`text-xs font-black uppercase ${contract.is_paid ? 'text-emerald-500' : 'text-rose-500 animate-pulse'}`}>
            {contract.is_paid ? "To'langan" : "To'lov kutilmoqda"}
          </p>
        </div>
        <button
          onClick={onView}
          className="p-4 glass rounded-2xl transition-all shadow-xl group/btn"
        >
          <Eye size={20} className="text-[var(--text-muted)] group-hover/btn:text-emerald-500" />
        </button>
        <button
          onClick={onDownload}
          className="p-4 bg-emerald-500 text-white rounded-2xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 active:scale-95"
        >
          <Download size={20} />
        </button>
      </div>
    </div>
  );
}
