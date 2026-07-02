import React from 'react';
import { Award, BookOpen, Lightbulb, RefreshCw, BarChart2, CheckCircle2, AlertCircle, PlusCircle, Star, Sparkles } from 'lucide-react';
import { Participant, QuizResult } from '../types';

interface DashboardHomeProps {
  selectedParticipant: Participant | null;
  participantsCount: number;
  projectsCount: number;
  resultsCount: number;
  pendingSyncCount: number;
  onNavigate: (target: 'quizzes' | 'olympiads' | 'projects' | 'sync' | 'leaderboards' | 'auth') => void;
  latestResults: QuizResult[];
}

export default function DashboardHome({
  selectedParticipant,
  participantsCount,
  projectsCount,
  resultsCount,
  pendingSyncCount,
  onNavigate,
  latestResults
}: DashboardHomeProps) {
  
  // Calculate top schools from results for simple offline leaderboard preview
  const schoolScores: { [key: string]: { total: number; count: number } } = {};
  latestResults.forEach(r => {
    if (!schoolScores[r.school]) {
      schoolScores[r.school] = { total: 0, count: 0 };
    }
    schoolScores[r.school].total += r.score;
    schoolScores[r.school].count += 1;
  });

  const sortedSchools = Object.keys(schoolScores)
    .map(school => ({
      school,
      avg: Math.round((schoolScores[school].total / schoolScores[school].count) * 10) / 10,
      submissions: schoolScores[school].count
    }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 3);

  return (
    <div className="flex-1 p-4 space-y-5">
      
      {/* 1. HERO BANNER WELCOME */}
      <div className="bg-gradient-to-br from-[#1E3A8A] to-slate-900 text-white rounded-2xl p-4.5 shadow-md relative overflow-hidden">
        {/* Background decorative spheres */}
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-700/30 rounded-full blur-xl" />
        <div className="absolute right-12 top-2 w-12 h-12 bg-amber-400/20 rounded-full blur-md" />

        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-1">
            <span className="text-amber-400 text-xs">★</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-200">Luwingu District JETS & TETS</span>
          </div>
          
          {selectedParticipant ? (
            <div className="space-y-1">
              <h2 className="font-sans font-extrabold text-xl leading-tight">
                Mwabombeni, <span className="text-amber-300">{selectedParticipant.name}</span>!
              </h2>
              <p className="text-xs text-blue-100/90 leading-snug">
                Representing <span className="font-bold underline decoration-amber-400 decoration-2">{selectedParticipant.school}</span>. Ready to show your skills?
              </p>
            </div>
          ) : (
            <div className="space-y-1">
              <h2 className="font-sans font-extrabold text-lg leading-tight">
                Welcome to JETS & TETS Hub!
              </h2>
              <p className="text-xs text-blue-100/90 leading-snug">
                Empowering schools and children in Luwingu to build, test, and innovate offline!
              </p>
              <button
                id="hero-select-profile-btn"
                onClick={() => onNavigate('auth')}
                className="mt-2.5 bg-amber-400 hover:bg-amber-500 text-slate-900 text-xs font-bold px-3.5 py-1.5 rounded-xl transition-all shadow-sm cursor-pointer inline-flex items-center gap-1"
              >
                Choose Profile to Start
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 2. CORE ACTION CHOOSER: QUIZZES vs OLYMPIADS */}
      <div className="space-y-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-1">Choose Academic Path</h3>
        <div className="grid grid-cols-2 gap-3.5">
          {/* QUIZZES CARD */}
          <button
            id="choose-quizzes-btn"
            onClick={() => {
              if (!selectedParticipant) {
                alert("Please select or register a student profile first!");
                onNavigate('auth');
              } else {
                onNavigate('quizzes');
              }
            }}
            className="group relative bg-gradient-to-b from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl p-4 text-left shadow-sm border border-blue-400/20 flex flex-col justify-between h-36 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md"
          >
            <div className="bg-blue-400/30 p-2.5 rounded-xl w-fit">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-sans font-extrabold text-base leading-tight">Interactive Quizzes</h4>
              <p className="text-[10px] text-blue-100/80 leading-snug">
                Round-robin style. 5 focus domains. Test your general science!
              </p>
            </div>
            <span className="absolute right-4 top-4 text-xs bg-blue-700/40 px-2 py-0.5 rounded-full font-bold">
              GO ▶
            </span>
          </button>

          {/* OLYMPIADS CARD */}
          <button
            id="choose-olympiads-btn"
            onClick={() => {
              if (!selectedParticipant) {
                alert("Please select or register a student profile first!");
                onNavigate('auth');
              } else {
                onNavigate('olympiads');
              }
            }}
            className="group relative bg-gradient-to-b from-purple-600 to-indigo-700 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-2xl p-4 text-left shadow-sm border border-purple-500/20 flex flex-col justify-between h-36 cursor-pointer transition-all hover:scale-[1.02] hover:shadow-md"
          >
            <div className="bg-purple-500/30 p-2.5 rounded-xl w-fit">
              <Award className="w-5 h-5 text-white" />
            </div>
            <div className="space-y-0.5">
              <h4 className="font-sans font-extrabold text-base leading-tight">Olympiad Arena</h4>
              <p className="text-[10px] text-purple-100/80 leading-snug">
                Primary Science, Math & CTS. High-stakes challenge!
              </p>
            </div>
            <span className="absolute right-4 top-4 text-xs bg-purple-900/40 px-2 py-0.5 rounded-full font-bold">
              GO ▶
            </span>
          </button>
        </div>
      </div>

      {/* 3. INNOVATION PROJECTS REGISTRATION CARD */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="bg-amber-100 text-amber-800 font-bold text-[9px] uppercase px-2 py-0.5 rounded-full">
              JETS & TETS Innovations
            </span>
            <h4 className="font-sans font-bold text-slate-800 text-sm">Register JETS Project / Prototype</h4>
            <p className="text-[11px] text-slate-500">
              Submit your innovations (sustainable systems, software, or smart mechanics) and keep it stored offline until sync.
            </p>
          </div>
          <div className="bg-amber-50 p-2 rounded-xl">
            <Lightbulb className="w-5 h-5 text-amber-600" />
          </div>
        </div>

        <button
          id="home-register-project-btn"
          onClick={() => {
            if (!selectedParticipant) {
              alert("Please select or register a student profile first!");
              onNavigate('auth');
            } else {
              onNavigate('projects');
            }
          }}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1"
        >
          <PlusCircle className="w-4 h-4 text-amber-400" />
          Submit New Innovation Project
        </button>
      </div>

      {/* 4. SYNC HUB QUICK BANNER */}
      <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${
        pendingSyncCount > 0 
          ? 'bg-amber-50/70 border-amber-200' 
          : 'bg-blue-50/50 border-blue-100'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl ${
            pendingSyncCount > 0 ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-[#1E3A8A]'
          }`}>
            <RefreshCw className={`w-4 h-4 ${pendingSyncCount > 0 ? 'animate-spin' : ''}`} />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800">
              {pendingSyncCount > 0 ? 'Pending Data Synchronization' : 'Device Fully Synchronized'}
            </div>
            <div className="text-[10px] text-slate-500">
              {pendingSyncCount > 0 
                ? `${pendingSyncCount} local items (registrations, scores) waiting to sync` 
                : 'All your answers and projects are synced with the Luwingu Central Server!'
              }
            </div>
          </div>
        </div>
        <button
          id="home-sync-btn"
          onClick={() => onNavigate('sync')}
          className={`text-[10px] font-bold px-2.5 py-1.5 rounded-lg transition-all border ${
            pendingSyncCount > 0
              ? 'bg-amber-600 text-white border-amber-500 hover:bg-amber-700'
              : 'bg-white text-[#1E3A8A] border-blue-200 hover:bg-blue-50'
          }`}
        >
          View Sync
        </button>
      </div>

      {/* 5. LOCAL SCHOOL PODIUM / LEADERBOARD */}
      <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-sans font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1">
            <BarChart2 className="w-4 h-4 text-[#1E3A8A]" />
            Luwingu School Standings
          </h4>
          <button
            id="home-view-all-leaders-btn"
            onClick={() => onNavigate('leaderboards')}
            className="text-[10px] font-bold text-[#1E3A8A] hover:underline"
          >
            Full Board
          </button>
        </div>

        {sortedSchools.length === 0 ? (
          <p className="text-[11px] text-slate-400 italic text-center py-2">
            No quiz records yet. Complete a quiz to place your school on the leaderboard!
          </p>
        ) : (
          <div className="space-y-2">
            {sortedSchools.map((item, index) => {
              const bgColors = ['bg-amber-50 border-amber-200 text-amber-900', 'bg-slate-50 border-slate-200 text-slate-900', 'bg-orange-50/50 border-orange-100 text-orange-900'];
              const medals = ['🥇', '🥈', '🥉'];
              return (
                <div
                  key={item.school}
                  className={`p-2 rounded-xl border flex items-center justify-between text-xs ${bgColors[index] || 'bg-white border-slate-100 text-slate-800'}`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-base shrink-0">{medals[index] || '⭐'}</span>
                    <span className="font-bold truncate">{item.school}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 text-right">
                    <div>
                      <span className="font-extrabold">{item.avg}%</span>
                      <span className="text-[9px] text-slate-500 block">Avg Score</span>
                    </div>
                    <div className="border-l border-slate-200/50 pl-2.5">
                      <span className="font-bold">{item.submissions}</span>
                      <span className="text-[9px] text-slate-500 block">Tests</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
