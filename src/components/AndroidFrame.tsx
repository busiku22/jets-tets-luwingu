import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Battery, Radio, Shield, HelpCircle, Activity } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  pendingSyncCount: number;
  triggerSync: () => void;
  isSyncing: boolean;
}

export default function AndroidFrame({
  children,
  isOnline,
  setIsOnline,
  pendingSyncCount,
  triggerSync,
  isSyncing
}: AndroidFrameProps) {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 py-4 sm:py-8 flex flex-col items-center justify-center font-sans antialiased selection:bg-[#3B82F6] selection:text-white">
      {/* Container holding the Android Phone Frame on desktop, full screen on mobile */}
      <div className="w-full max-w-md sm:h-[840px] h-screen bg-slate-550 sm:rounded-[40px] sm:shadow-2xl sm:border-[10px] border-slate-700 flex flex-col relative overflow-hidden bg-[#F0F4F8]">
        
        {/* Top Camera Notch for Desktop */}
        <div className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-slate-700 rounded-b-xl z-50">
          <div className="absolute top-1 left-1/2 -translate-x-1/2 h-2.5 w-2.5 bg-black rounded-full" />
        </div>

        {/* Status Bar */}
        <div className="bg-[#1E3A8A] text-white text-xs px-5 py-2.5 flex items-center justify-between z-40 select-none shrink-0 font-medium tracking-wide border-b border-[#3B82F6]">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-[11px] sm:text-xs">{time}</span>
            <span className="text-[9px] bg-[#3B82F6] px-1.5 py-0.5 rounded text-white font-black uppercase tracking-wider font-sans">Luwingu</span>
          </div>

          {/* Quick Simulated Connection Switcher inside Status Bar */}
          <button 
            id="network-toggle-btn"
            onClick={() => setIsOnline(!isOnline)}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full transition-all text-[10px] font-bold ${
              isOnline 
                ? 'bg-[#3B82F6] hover:bg-blue-500 text-white border border-blue-400/50 shadow-sm' 
                : 'bg-amber-500 hover:bg-amber-400 text-amber-950 border border-amber-400/50 animate-pulse font-extrabold'
            }`}
            title="Click to toggle Online/Offline simulated network"
          >
            {isOnline ? (
              <>
                <Wifi className="w-3.5 h-3.5" />
                <span>Connected</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3.5 h-3.5" />
                <span>Offline</span>
              </>
            )}
          </button>

          <div className="flex items-center gap-2">
            {pendingSyncCount > 0 && (
              <span className="bg-amber-400 text-slate-900 text-[9px] px-1.5 py-0.5 rounded-full font-black animate-bounce">
                {pendingSyncCount} unsynced
              </span>
            )}
            <div className="flex items-center gap-1">
              <Battery className="w-4 h-4 text-blue-100 rotate-90 sm:rotate-0" />
              <span className="text-[10px]">92%</span>
            </div>
          </div>
        </div>

        {/* Offline Banner Indicator if disconnected */}
        {!isOnline && (
          <div className="bg-amber-400 text-amber-950 px-4 py-1.5 text-center text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md border-b border-amber-500 shrink-0 select-none">
            <WifiOff className="w-3.5 h-3.5 text-amber-900" />
            <span className="font-bold">Working Offline. Progress stores safely on this device!</span>
          </div>
        )}

        {/* App Main Content Area */}
        <div className="flex-1 overflow-y-auto bg-[#F0F4F8] flex flex-col">
          {children}
        </div>

        {/* Styled Android Soft Keys Bar & Maintenance Footer */}
        <footer className="bg-white border-t border-slate-200 py-3 px-4 shrink-0 select-none flex flex-col gap-1 items-center justify-center shadow-inner">
          <div className="flex gap-8 justify-center opacity-40 mb-1">
            <span className="text-xs text-slate-400">◀</span>
            <span className="text-xs text-slate-400">●</span>
            <span className="text-xs text-slate-400">■</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-amber-400'}`}></span>
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">
              System Status: {isOnline ? 'Connected' : 'Offline'} {pendingSyncCount > 0 ? '• Syncing Data...' : ''}
            </span>
          </div>
          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
            Developed and Maintained by <span className="text-[#1E3A8A] font-extrabold">Busiku Kapikanya</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
