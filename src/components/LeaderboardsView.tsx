import React, { useState } from 'react';
import { Award, ChevronLeft, BarChart2, Star, Trophy, Users, ShieldAlert } from 'lucide-react';
import { Participant, QuizResult, LUWINGU_SCHOOLS } from '../types';

interface LeaderboardsViewProps {
  results: QuizResult[];
  participants: Participant[];
  onBack: () => void;
}

export default function LeaderboardsView({
  results,
  participants,
  onBack
}: LeaderboardsViewProps) {
  const [activeLeaderTab, setActiveLeaderTab] = useState<'schools' | 'students'>('schools');

  // 1. Calculate school average scores
  const schoolStatsMap: Record<string, { totalPercentage: number; count: number; JETScount: number; TETScount: number }> = {};
  
  // Initialize map
  LUWINGU_SCHOOLS.forEach(sch => {
    schoolStatsMap[sch] = { totalPercentage: 0, count: 0, JETScount: 0, TETScount: 0 };
  });

  // Calculate based on saved results
  results.forEach(res => {
    const school = res.school;
    if (schoolStatsMap[school]) {
      schoolStatsMap[school].totalPercentage += res.percentage;
      schoolStatsMap[school].count += 1;
    }
  });

  // Count participants per school
  participants.forEach(p => {
    const school = p.school;
    if (schoolStatsMap[school]) {
      if (p.category === 'JETS') {
        schoolStatsMap[school].JETScount += 1;
      } else {
        schoolStatsMap[school].TETScount += 1;
      }
    }
  });

  const schoolLeaderboard = Object.keys(schoolStatsMap)
    .map(name => {
      const stats = schoolStatsMap[name];
      return {
        school: name,
        avgScore: stats.count > 0 ? Math.round(stats.totalPercentage / stats.count) : 0,
        testsTaken: stats.count,
        totalCohort: stats.JETScount + stats.TETScount,
        jets: stats.JETScount,
        tets: stats.TETScount
      };
    })
    // Sort by avgScore first. If tied, sort by tests taken or total cohort
    .sort((a, b) => b.avgScore - a.avgScore || b.testsTaken - a.testsTaken);

  // 2. Student Leaderboard (Top individual test results)
  const studentLeaderboard = [...results]
    .sort((a, b) => b.percentage - a.percentage || b.score - a.score)
    .slice(0, 15); // Show top 15 results

  return (
    <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
      
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3 shrink-0">
        <button
          id="leader-back-btn"
          onClick={onBack}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-all cursor-pointer text-slate-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h3 className="font-sans font-bold text-slate-800 text-sm flex items-center gap-1.5">
            <Trophy className="w-4 h-4 text-amber-500" />
            District Leaderboard
          </h3>
          <p className="text-[10px] text-slate-500">Live standings of educational institutions and innovators in Luwingu.</p>
        </div>
      </div>

      {/* Leaderboard Tabs */}
      <div className="grid grid-cols-2 bg-slate-100 p-1 rounded-xl shrink-0">
        <button
          id="leadertab-schools-btn"
          onClick={() => setActiveLeaderTab('schools')}
          className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
            activeLeaderTab === 'schools'
              ? 'bg-[#1E3A8A] text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          🏆 School Standings
        </button>
        <button
          id="leadertab-students-btn"
          onClick={() => setActiveLeaderTab('students')}
          className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
            activeLeaderTab === 'students'
              ? 'bg-[#1E3A8A] text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          🏅 Top Performers
        </button>
      </div>

      {/* Main List */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        
        {/* TAB 1: SCHOOLS */}
        {activeLeaderTab === 'schools' && (
          <div className="space-y-2.5">
            {schoolLeaderboard.map((item, index) => {
              const bgColors = [
                'bg-amber-50/70 border-amber-200 text-amber-950', 
                'bg-slate-100/70 border-slate-200 text-slate-950', 
                'bg-orange-50/50 border-orange-150 text-orange-950'
              ];
              const medals = ['🥇', '🥈', '🥉'];
              const isRanked = index < 3;
              
              return (
                <div 
                  key={item.school} 
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    isRanked ? bgColors[index] : 'bg-white border-slate-100 text-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="w-6 text-center font-bold font-mono text-sm">
                      {isRanked ? medals[index] : `${index + 1}`}
                    </span>
                    <div className="min-w-0">
                      <div className="font-sans font-bold text-xs truncate leading-snug">{item.school}</div>
                      <div className="text-[9px] text-slate-500 font-medium mt-0.5">
                        {item.totalCohort} active participants • {item.testsTaken} tests submitted
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="text-sm font-extrabold text-[#1E3A8A]">
                      {item.avgScore > 0 ? `${item.avgScore}%` : 'N/A'}
                    </div>
                    <span className="text-[8px] text-slate-400 font-bold block">Avg Score</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 2: STUDENTS */}
        {activeLeaderTab === 'students' && (
          <div className="space-y-2">
            {studentLeaderboard.length === 0 ? (
              <div className="text-center py-10 bg-slate-50 rounded-2xl text-xs text-slate-400 italic">
                No scores recorded yet. Tap the Home button to complete a Quiz or Olympiad and secure your rank!
              </div>
            ) : (
              studentLeaderboard.map((res, index) => {
                const bgColors = [
                  'bg-amber-50/40 border-amber-200 text-amber-950', 
                  'bg-slate-100/40 border-slate-200 text-slate-950', 
                  'bg-orange-50/30 border-orange-150 text-orange-950'
                ];
                const medals = ['🥇', '🥈', '🥉'];
                const isRanked = index < 3;

                return (
                  <div 
                    key={res.id} 
                    className={`p-3 rounded-xl border flex items-center justify-between ${
                      isRanked ? bgColors[index] : 'bg-white border-slate-100 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className="w-5 text-center font-bold font-mono text-xs">
                        {isRanked ? medals[index] : `${index + 1}`}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-xs truncate leading-none text-slate-950">{res.participantName}</div>
                        <div className="text-[9px] text-slate-500 font-medium truncate mt-1">
                          {res.school} • <span className="uppercase font-bold">{res.type}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="text-xs font-extrabold text-[#1E3A8A]">
                        {res.percentage}%
                      </div>
                      <span className="text-[8px] text-slate-400 font-bold block">
                        ({res.score}/{res.totalQuestions}) Correct
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

      </div>

      {/* Leaderboard footer */}
      <div className="bg-[#1E3A8A] text-blue-50 p-3 rounded-xl text-center text-[10px] shrink-0 font-medium font-sans">
        ⭐ Standard scoring rules apply: Olympiad questions count as 20 points, practice quizzes as 10 points. All metrics are updated dynamically.
      </div>

    </div>
  );
}
