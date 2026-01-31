"use client";

import { MapContainer, TileLayer, Marker, Popup, ZoomControl, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { TreePine, Wind, Thermometer, Droplets, X, ShieldCheck, Zap } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

// Fix for default marker icons
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Map() {
  const [compartments, setCompartments] = useState<any[]>([]);
  const [selectedComp, setSelectedComp] = useState<any>(null);
  const [showLeaseWizard, setShowLeaseWizard] = useState(false);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/forest-compartments/')
      .then(res => res.json())
      .then(data => {
        const processed = data.map((item: any) => ({
          ...item,
          polygon: typeof item.polygon === 'string' ? JSON.parse(item.polygon) : item.polygon
        }));
        setCompartments(processed);
      })
      .catch(err => console.error("Error fetching compartments:", err));
  }, []);

  const getCompStyle = (status: string) => {
    switch (status) {
      case 'available': return { fillColor: "#f59e0b", weight: 2, fillOpacity: 0.4, color: 'white' }; // Gold
      case 'leased': return { fillColor: "#10b981", weight: 2, fillOpacity: 0.4, color: 'white' }; // Emerald
      case 'protected': return { fillColor: "#64748b", weight: 1, fillOpacity: 0.2, color: '#334155' }; // Slate
      default: return { fillColor: "#10b981", weight: 2, fillOpacity: 0.3, color: 'white' };
    }
  };

  const { theme } = useTheme();

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[41.311081, 69.240562]}
        zoom={6}
        zoomControl={false}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url={theme === 'dark'
            ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            : "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          }
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />

        <LocationSelector onLocationSelect={(latlng) => console.log("Task at:", latlng)} />

        <ZoomControl position="bottomright" />

        {compartments.map(comp => (
          <GeoJSON
            key={comp.id}
            data={comp.polygon}
            style={getCompStyle(comp.status)}
            eventHandlers={{
              click: () => {
                setSelectedComp(comp);
                if (comp.status === 'available') setShowLeaseWizard(true);
              }
            }}
          >
            <Popup>
              <div className="p-2 text-[var(--text-main)] min-w-[200px] bg-transparent">
                <h3 className="font-bold text-lg mb-2">{comp.name}</h3>
                <div className="space-y-1 text-xs">
                  <p className="flex justify-between text-[var(--text-muted)]"><span>Holati:</span> <span className="font-bold uppercase text-emerald-500">{comp.status_display}</span></p>
                  <p className="flex justify-between text-[var(--text-muted)]"><span>Maydon:</span> <b className="text-[var(--text-main)]">{comp.area_ha.toFixed(1)} Ha</b></p>
                  <p className="flex justify-between text-[var(--text-muted)]"><span>Tuproq:</span> <b className="text-[var(--text-main)]">{comp.soil_type}</b></p>
                </div>
                {comp.status === 'available' && (
                  <button
                    onClick={() => setShowLeaseWizard(true)}
                    className="w-full mt-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all"
                  >
                    Ijaraga Olish (E-Auksion)
                  </button>
                )}
              </div>
            </Popup>
          </GeoJSON>
        ))}
      </MapContainer>

      {/* Lease Wizard Overlay */}
      {showLeaseWizard && selectedComp && (
        <div className="absolute inset-0 z-[5000] bg-[var(--bg-main)]/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass max-w-2xl w-full p-8 rounded-[40px] shadow-3xl animate-in zoom-in-95 duration-500">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-black text-[var(--text-main)]">{selectedComp.name} - Ijara Shartnomasi</h2>
              <button onClick={() => setShowLeaseWizard(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all h-fit text-[var(--text-main)]"><X size={24} /></button>
            </div>

            <div className="grid grid-cols-2 gap-8 mb-8">
              <div className="p-6 glass rounded-3xl">
                <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase mb-1">Ijara muddati</p>
                <p className="text-xl font-bold text-[var(--text-main)]">10 Yil (2026-2036)</p>
              </div>
              <div className="p-6 glass rounded-3xl">
                <p className="text-[10px] text-[var(--text-muted)] font-bold uppercase mb-1">Yillik to'lov</p>
                <p className="text-xl font-bold text-emerald-500">4,500,000 UZS</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h4 className="font-bold flex items-center space-x-2 text-[var(--text-main)]"><ShieldCheck className="text-emerald-500" size={18} /> <span>Hujjatlashtirish va ERI</span></h4>
              <div className="p-4 bg-[var(--bg-main)]/40 rounded-2xl text-xs text-[var(--text-muted)] space-y-2 leading-relaxed border border-[var(--glass-border)]">
                <p>1. O'zbekiston Respublikasining o'rmon xo'jaligi to'g'risidagi qonuni talablariga muvofiq ijara shartnomasi rasmiylashtiriladi.</p>
                <p>2. Shartnoma elektron raqamli imzo (ERI) orqali tasdiqlanishi shart.</p>
                <p>3. To'lovlar elektron to'lov tizimlari (Payme/Click) orqali amalga oshiriladi.</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 py-4 glass hover:bg-white/10 rounded-2xl font-bold transition-all text-[var(--text-main)]">Hujjatlarni Yuklash</button>
              <button className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-400 text-white rounded-2xl font-black shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center space-x-2">
                <Zap size={18} />
                <span>ERI bilan Imzolash</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function LocationSelector({ onLocationSelect }: { onLocationSelect: (latlng: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      onLocationSelect([e.latlng.lat, e.latlng.lng]);
      // Logic for "Assign Task" at this point
    }
  });
  return null;
}

import { useMapEvents } from 'react-leaflet';
