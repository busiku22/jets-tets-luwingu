import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, ChevronLeft, Wifi, WifiOff, CloudLightning, ShieldCheck, Database } from 'lucide-react';

interface OfflineSyncIndicatorProps {
  isOnline: boolean;
  pendingStudentsCount: number;
  pendingProjectsCount: number;
  pendingScoresCount: number;
  onTriggerSync: () => void;
  onBack: () => void;
}

export default function OfflineSyncIndicator({
  isOnline,
  pendingStudentsCount,
  pendingProjectsCount,
  pendingScoresCount,
  onTriggerSync,
  onBack
}: OfflineSyncIndicatorProps) {
  const [syncState, setSyncState] = useState<'idle' | 'connecting' | 'students' | 'projects' | 'scores' | 'complete'>('idle');
  const [progress, setProgress] = useState(0);

  const totalPending = pendingStudentsCount + pendingProjectsCount + pendingScoresCount;

  const handleSyncClick = () => {
    if (!isOnline) {
      alert("You are currently simulated as offline. Please tap the connection toggle in the green status bar at the top to connect first!");
      return;
    }
    if (totalPending === 0) {
      alert("All local data is already fully synchronized with the Luwingu Central Server!");
      return;
    }

    // Trigger step-by-step progress simulation
    setSyncState('connecting');
    setProgress(15);

    setTimeout(() => {
      setSyncState('students');
      setProgress(45);
    }, 1000);

    setTimeout(() => {
      setSyncState('projects');
      setProgress(75);
    }, 2000);

    setTimeout(() => {
      setSyncState('scores');
      setProgress(95);
    }, 3000);

    setTimeout(() => {
      setProgress(100);
      setSyncState('complete');
      onTriggerSync(); // Clear pending items in parent state
    }, 4000);
  };

  return (
    <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
      
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3 shrink-0">
        <button
          id="sync-back-btn"
          onClick={onBack}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-all cursor-pointer text-slate-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h3 className="font-sans font-bold text-slate-800 text-sm flex items-center gap-1.5">
            <RefreshCw className="w-4 h-4 text-[#1E3A8A]" />
            Luwingu Sync Manager
          </h3>
          <p className="text-[10px] text-slate-500">Safely backup local learning records to district servers.</p>
        </div>
      </div>

      {/* Main Status Panel */}
      <div className="flex-1 overflow-y-auto space-y-4">
        
        {/* Signal Status Block */}
        <div className={`p-4 rounded-2xl border ${
          isOnline 
            ? 'bg-blue-50 border-blue-100 text-blue-950' 
            : 'bg-amber-50 border-amber-200 text-amber-950 animate-pulse'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`p-2 rounded-xl shrink-0 ${isOnline ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
              {isOnline ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
            </div>
            <div className="space-y-0.5">
              <h4 className="font-sans font-bold text-xs">
                {isOnline ? 'Internet / GSM Connection is Online' : 'No Active Connection Detected'}
              </h4>
              <p className="text-[10px] opacity-85 leading-snug">
                {isOnline 
                  ? 'Great! The device can talk securely to the Luwingu Educational Portal. Stored items can be uploaded instantly.' 
                  : 'All data is stored securely in this tablet/phone\'s memory. You can take quizzes, register projects, and sync them once you are near school wifi or GSM towers.'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Sync Progress Display */}
        {syncState !== 'idle' && (
          <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-3 shadow-md border border-slate-800">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-blue-400 font-bold">
                {syncState === 'connecting' && 'Connecting to hub...'}
                {syncState === 'students' && 'Syncing student cohorts...'}
                {syncState === 'projects' && 'Syncing science prototypes...'}
                {syncState === 'scores' && 'Updating district scoreboard...'}
                {syncState === 'complete' && 'Sync successfully completed!'}
              </span>
              <span className="font-bold">{progress}%</span>
            </div>

            {/* Simulated Progress bar */}
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-[#3B82F6] h-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="text-[10px] text-slate-400 font-mono space-y-0.5 pt-1.5 border-t border-slate-800/80">
              <div className={progress >= 15 ? 'text-blue-400 font-semibold' : 'opacity-40'}>
                [✓] Secure Handshake Completed
              </div>
              <div className={progress >= 45 ? 'text-blue-400 font-semibold' : 'opacity-40'}>
                [✓] Uploaded {pendingStudentsCount} Student Rosters
              </div>
              <div className={progress >= 75 ? 'text-blue-400 font-semibold' : 'opacity-40'}>
                [✓] Uploaded {pendingProjectsCount} JETS/TETS Innovations
              </div>
              <div className={progress >= 95 ? 'text-blue-400 font-semibold' : 'opacity-40'}>
                [✓] Pushed {pendingScoresCount} Quiz & Olympiad Results
              </div>
            </div>
          </div>
        )}

        {/* Pending Items Breakdowns */}
        {syncState === 'idle' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">Items Stored on this Device</h4>
            
            <div className="grid grid-cols-1 gap-2.5">
              
              {/* Student Rosters */}
              <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                  <Database className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-800">Unsynced Student Roster</div>
                    <p className="text-[10px] text-slate-400">Profiles created locally during offline state.</p>
                  </div>
                </div>
                <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                  pendingStudentsCount > 0 ? 'bg-amber-100 text-amber-850' : 'bg-slate-100 text-slate-500'
                }`}>
                  {pendingStudentsCount} pending
                </span>
              </div>

              {/* Projects */}
              <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                  <Database className="w-4 h-4 text-amber-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-800">Unsynced Innovation Projects</div>
                    <p className="text-[10px] text-slate-400">Cardboard models, scientific formulas registered.</p>
                  </div>
                </div>
                <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                  pendingProjectsCount > 0 ? 'bg-amber-100 text-amber-850' : 'bg-slate-100 text-slate-500'
                }`}>
                  {pendingProjectsCount} pending
                </span>
              </div>

              {/* Quiz scores */}
              <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2.5">
                  <Database className="w-4 h-4 text-blue-600 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-800">Unsynced Quiz & Olympiad Results</div>
                    <p className="text-[10px] text-slate-400">Scorecard lists waiting to place on district leaderboards.</p>
                  </div>
                </div>
                <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-full ${
                  pendingScoresCount > 0 ? 'bg-amber-100 text-amber-850' : 'bg-slate-100 text-slate-500'
                }`}>
                  {pendingScoresCount} pending
                </span>
              </div>

            </div>
          </div>
        )}

        {/* Sync Success Stamp */}
        {syncState === 'complete' && (
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl text-center space-y-2 py-10 shadow-inner">
            <CheckCircle2 className="w-12 h-12 text-[#1E3A8A] mx-auto" />
            <h4 className="font-extrabold text-[#1E3A8A] text-sm">Synchronization Successful!</h4>
            <p className="text-xs text-blue-850 max-w-xs mx-auto leading-normal">
              All registered student cohorts, innovative blueprints, and scoreboard results have been successfully verified and backed up!
            </p>
          </div>
        )}

      </div>

      {/* Sync Button Footer */}
      {syncState === 'idle' && (
        <div className="pt-2 shrink-0">
          <button
            id="sync-now-btn"
            onClick={handleSyncClick}
            disabled={totalPending === 0}
            className={`w-full py-3 rounded-2xl font-bold text-xs transition-all shadow-sm cursor-pointer flex items-center justify-center gap-1.5 font-sans ${
              totalPending > 0
                ? 'bg-[#1E3A8A] hover:bg-blue-900 text-white'
                : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed'
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Synchronize Now ({totalPending} items)</span>
          </button>
        </div>
      )}

      {syncState === 'complete' && (
        <div className="pt-2 shrink-0">
          <button
            id="sync-complete-back-btn"
            onClick={() => {
              setSyncState('idle');
              onBack();
            }}
            className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-2xl font-bold text-xs transition-all cursor-pointer text-center"
          >
            Return to Dashboard
          </button>
        </div>
      )}

    </div>
  );
}
