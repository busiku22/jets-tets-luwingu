/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import AndroidFrame from './components/AndroidFrame';
import StudentAuth from './components/StudentAuth';
import DashboardHome from './components/DashboardHome';
import RegistrationModule from './components/RegistrationModule';
import QuizOlympiadModule from './components/QuizOlympiadModule';
import TeacherDashboard from './components/TeacherDashboard';
import OrganiserDashboard from './components/OrganiserDashboard';
import OfflineSyncIndicator from './components/OfflineSyncIndicator';
import LeaderboardsView from './components/LeaderboardsView';
import IntroModal from './components/IntroModal';

import { INITIAL_QUESTIONS } from './data/defaultQuestions';
import { Participant, Project, Question, QuizResult, LUWINGU_SCHOOLS } from './types';
import { User, Shield, Home, RefreshCw, BarChart2, LogOut, Lightbulb, BookOpen } from 'lucide-react';

// Preloaded mock data for realistic first-time view
const PRELOADED_PARTICIPANTS: Participant[] = [
  {
    id: 'p-1',
    name: 'Natasha Mwaba',
    age: 12,
    grade: 'Grade 7',
    school: 'Ipusukilo Primary School',
    category: 'JETS',
    gender: 'Girl',
    registeredOffline: false,
    synced: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'p-2',
    name: 'Mwansa Chanda',
    age: 11,
    grade: 'Grade 6',
    school: 'Luwingu Primary School',
    category: 'JETS',
    gender: 'Boy',
    registeredOffline: false,
    synced: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const PRELOADED_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Solar Cassava Dehydrator Prototype',
    domain: 'Sustainable Systems & Environment (SSE)',
    focusArea: 'Renewable energy',
    participantId: 'p-1',
    participantName: 'Natasha Mwaba',
    school: 'Ipusukilo Primary School',
    description: 'A crop drying chamber built using black-painted local clay bricks to absorb heat, dry grass insulation, and recycled clear greenhouse plastics. Reduces cassava drying times from 6 days to just 2 days while preventing flies from contaminating the food.',
    materialsUsed: 'Local clay mud, organic black charcoal paint, dried grass, timber frame, clear plastic wrappers.',
    synced: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'proj-2',
    title: 'Bicycle-Powered Irrigation Water Pump',
    domain: 'Engineering, Design & Production Systems (EDPS)',
    focusArea: 'Smart mobility',
    participantId: 'p-2',
    participantName: 'Mwansa Chanda',
    school: 'Luwingu Primary School',
    description: 'This prototype connects an old bicycle chain drive to a wooden double-acting piston pump. Riding the bicycle draws water from shallow garden wells and pumps it directly through rubber tubes to vegetable beds, saving students from carrying heavy buckets by hand.',
    materialsUsed: 'Discarded bicycle frame and gears, flexible garden hose, local bamboo poles, carved hardwood pistons.',
    synced: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  }
];

const PRELOADED_RESULTS: QuizResult[] = [
  {
    id: 'r-1',
    participantName: 'Natasha Mwaba',
    school: 'Ipusukilo Primary School',
    type: 'quiz',
    domain: 'Health, Food & Human Wellbeing System (HFWS)',
    score: 5,
    totalQuestions: 5,
    percentage: 100,
    synced: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'r-2',
    participantName: 'Mwansa Chanda',
    school: 'Luwingu Primary School',
    type: 'quiz',
    domain: 'Sustainable Systems & Environment (SSE)',
    score: 4,
    totalQuestions: 5,
    percentage: 80,
    synced: true,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
  },
  {
    id: 'r-3',
    participantName: 'Natasha Mwaba',
    school: 'Ipusukilo Primary School',
    type: 'olympiad',
    domain: 'Sustainable Systems & Environment (SSE)',
    subjectAlignment: 'Primary Science',
    score: 5,
    totalQuestions: 6,
    percentage: 83,
    synced: true,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
  }
];

const PRELOADED_RATINGS = [
  {
    rating: 5,
    comment: "This offline JETS/TETS application is a lifesaver for Chifumo Day. The students loved practicing the Olympiad questions even without dynamic 3G/4G connectivity.",
    date: "2026-06-28",
    user: "Mrs. N. Mwansa (Chifumo Day Secondary)"
  },
  {
    rating: 5,
    comment: "Excellent innovation! Solved our network issues completely. Pupils can register projects offline during prep and sync once they reach the Boma.",
    date: "2026-06-30",
    user: "Mr. B. Mulenga (Misambula Day)"
  },
  {
    rating: 4,
    comment: "Our Grade 7 pupils easily registered their engineering designs and took quizzes. Lead Developer Busiku Kapikanya and Loyd Chimponda deserve great credit for this district system!",
    date: "2026-07-01",
    user: "Mr. J. Chipasha (Luwingu Primary)"
  }
];

export default function App() {
  // 1. Connection simulated state (True = Online, False = Offline)
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // 2. Data states persisted in LocalStorage
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  // 3. User & Session states
  const [selectedParticipant, setSelectedParticipant] = useState<Participant | null>(null);
  const [isTeacher, setIsTeacher] = useState<boolean>(false);
  const [isOrganiser, setIsOrganiser] = useState<boolean>(false);
  const [schools, setSchools] = useState<string[]>([]);
  const [activePage, setActivePage] = useState<'auth' | 'home' | 'quizzes' | 'olympiads' | 'projects' | 'sync' | 'leaderboards' | 'organiser'>('auth');
  const [appRatings, setAppRatings] = useState<{rating: number; comment: string; date: string; user?: string}[]>([]);
  const [showIntro, setShowIntro] = useState<boolean>(false);

  // Load from local storage or set preloaded defaults
  useEffect(() => {
    const savedParticipants = localStorage.getItem('jets_participants');
    const savedProjects = localStorage.getItem('jets_projects');
    const savedResults = localStorage.getItem('jets_results');
    const savedQuestions = localStorage.getItem('jets_questions');

    if (savedParticipants) setParticipants(JSON.parse(savedParticipants));
    else {
      setParticipants(PRELOADED_PARTICIPANTS);
      localStorage.setItem('jets_participants', JSON.stringify(PRELOADED_PARTICIPANTS));
    }

    if (savedProjects) setProjects(JSON.parse(savedProjects));
    else {
      setProjects(PRELOADED_PROJECTS);
      localStorage.setItem('jets_projects', JSON.stringify(PRELOADED_PROJECTS));
    }

    if (savedResults) setResults(JSON.parse(savedResults));
    else {
      setResults(PRELOADED_RESULTS);
      localStorage.setItem('jets_results', JSON.stringify(PRELOADED_RESULTS));
    }

    // Combine standard initial questions with any teacher custom questions
    const standardQs = INITIAL_QUESTIONS;
    if (savedQuestions) {
      const parsedCustom = JSON.parse(savedQuestions);
      setQuestions([...standardQs, ...parsedCustom]);
    } else {
      setQuestions(standardQs);
    }

    const savedSchools = localStorage.getItem('jets_schools');
    if (savedSchools) {
      setSchools(JSON.parse(savedSchools));
    } else {
      setSchools(LUWINGU_SCHOOLS);
      localStorage.setItem('jets_schools', JSON.stringify(LUWINGU_SCHOOLS));
    }

    const savedRatings = localStorage.getItem('jets_app_ratings');
    if (savedRatings) {
      setAppRatings(JSON.parse(savedRatings));
    } else {
      setAppRatings(PRELOADED_RATINGS);
      localStorage.setItem('jets_app_ratings', JSON.stringify(PRELOADED_RATINGS));
    }

    const hasRated = localStorage.getItem('jets_tets_innovation_rated');
    if (hasRated !== 'true') {
      setShowIntro(true);
    }
  }, []);

  // Sync state triggers
  const saveParticipantsToLocal = (newParts: Participant[]) => {
    setParticipants(newParts);
    localStorage.setItem('jets_participants', JSON.stringify(newParts));
  };

  const saveProjectsToLocal = (newProjs: Project[]) => {
    setProjects(newProjs);
    localStorage.setItem('jets_projects', JSON.stringify(newProjs));
  };

  const saveResultsToLocal = (newResults: QuizResult[]) => {
    setResults(newResults);
    localStorage.setItem('jets_results', JSON.stringify(newResults));
  };

  const saveQuestionsToLocal = (newQs: Question[]) => {
    // Only save custom questions created by teacher to avoid saving default list over and over
    const customOnly = newQs.filter(q => q.createdByTeacher);
    setQuestions([...INITIAL_QUESTIONS, ...customOnly]);
    localStorage.setItem('jets_questions', JSON.stringify(customOnly));
  };

  // 4. ACTION: Register Participant
  const handleRegisterParticipant = (pData: {
    name: string;
    age: number;
    grade: string;
    school: string;
    category: 'JETS' | 'TETS';
    gender: 'Boy' | 'Girl' | 'Other';
  }) => {
    const newParticipant: Participant = {
      id: `p-${Date.now()}`,
      ...pData,
      registeredOffline: !isOnline,
      synced: isOnline,
      createdAt: new Date().toISOString()
    };

    const updated = [newParticipant, ...participants];
    saveParticipantsToLocal(updated);
    setSelectedParticipant(newParticipant);
    setIsTeacher(false);
    setActivePage('home');
  };

  // 5. ACTION: Submit Project
  const handleRegisterProject = (projData: Omit<Project, 'id' | 'createdAt' | 'synced'>) => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      ...projData,
      synced: isOnline,
      createdAt: new Date().toISOString()
    };

    const updated = [newProj, ...projects];
    saveProjectsToLocal(updated);
  };

  // 6. ACTION: Save Quiz Result
  const handleSaveQuizResult = (resData: Omit<QuizResult, 'id' | 'createdAt' | 'synced'>) => {
    const newRes: QuizResult = {
      id: `res-${Date.now()}`,
      ...resData,
      synced: isOnline,
      createdAt: new Date().toISOString()
    };

    const updated = [newRes, ...results];
    saveResultsToLocal(updated);
  };

  // 7. ACTION: Teacher Add Question
  const handleTeacherAddQuestion = (newQ: Question) => {
    const updated = [...questions, newQ];
    saveQuestionsToLocal(updated);
  };

  // 7d. ACTION: Submit Innovation Rating
  const handleSubmitRating = (rating: number, comment: string) => {
    const newRating = {
      rating,
      comment: comment.trim(),
      date: new Date().toLocaleDateString(),
      user: selectedParticipant 
        ? `${selectedParticipant.name} (${selectedParticipant.school})` 
        : 'Luwingu Guest / Learner'
    };
    const updated = [newRating, ...appRatings];
    setAppRatings(updated);
    localStorage.setItem('jets_app_ratings', JSON.stringify(updated));
    localStorage.setItem('jets_tets_innovation_rated', 'true');
  };

  const handleClearRatings = () => {
    setAppRatings([]);
    localStorage.setItem('jets_app_ratings', JSON.stringify([]));
    localStorage.removeItem('jets_tets_innovation_rated');
  };

  // 7b. ACTION: Organiser Approve/Reject Questions
  const handleApproveQuestion = (id: string) => {
    const updated = questions.map(q => {
      if (q.id === id) {
        return { ...q, approvedByOrganiser: true };
      }
      return q;
    });
    saveQuestionsToLocal(updated);
  };

  const handleRejectQuestion = (id: string) => {
    const updated = questions.filter(q => q.id !== id);
    saveQuestionsToLocal(updated);
  };

  // 7c. ACTION: Organiser Manage Schools
  const handleAddSchool = (schoolName: string) => {
    const updated = [...schools, schoolName];
    setSchools(updated);
    localStorage.setItem('jets_schools', JSON.stringify(updated));
  };

  const handleDeleteSchool = (schoolName: string) => {
    const updated = schools.filter(s => s !== schoolName);
    setSchools(updated);
    localStorage.setItem('jets_schools', JSON.stringify(updated));
  };

  // 8. ACTION: Delete Project
  const handleDeleteProject = (id: string) => {
    const filtered = projects.filter(p => p.id !== id);
    saveProjectsToLocal(filtered);
  };

  // 9. ACTION: Trigger Local Sync
  const handleTriggerSyncComplete = () => {
    setIsSyncing(true);
    
    // Simulate slight syncing calculations and complete
    setTimeout(() => {
      // Mark all students as synced
      const syncedParts = participants.map(p => ({ ...p, synced: true }));
      saveParticipantsToLocal(syncedParts);

      // Mark all projects as synced
      const syncedProjs = projects.map(p => ({ ...p, synced: true }));
      saveProjectsToLocal(syncedProjs);

      // Mark all results as synced
      const syncedResults = results.map(r => ({ ...r, synced: true }));
      saveResultsToLocal(syncedResults);

      setIsSyncing(false);
    }, 1500);
  };

  // Calculate pending unsynced counts
  const pendingStudentsCount = participants.filter(p => !p.synced).length;
  const pendingProjectsCount = projects.filter(p => !p.synced).length;
  const pendingScoresCount = results.filter(r => !r.synced).length;
  const totalPendingCount = pendingStudentsCount + pendingProjectsCount + pendingScoresCount;

  // Handle active navigation
  const navigateTo = (target: typeof activePage) => {
    setActivePage(target);
  };

  // Profile signout
  const handleSignOut = () => {
    setSelectedParticipant(null);
    setIsTeacher(false);
    setIsOrganiser(false);
    navigateTo('auth');
  };

  return (
    <FrameShortcutIndicator>
      <AndroidFrame
        isOnline={isOnline}
        setIsOnline={setIsOnline}
        pendingSyncCount={totalPendingCount}
        triggerSync={handleTriggerSyncComplete}
        isSyncing={isSyncing}
      >
      {/* 1. App Navigation Top-Bar (Visible once logged in/using app) */}
      {(selectedParticipant || isTeacher || isOrganiser) && (
        <div className="bg-white border-b border-slate-100 px-4 py-3 flex items-center justify-between shrink-0 shadow-xs select-none">
          <button 
            id="nav-to-home-logo-btn"
            onClick={() => {
              if (isOrganiser) {
                navigateTo('organiser');
              } else {
                setIsTeacher(false);
                navigateTo('home');
              }
            }}
            className="flex items-center gap-1.5 text-left cursor-pointer"
          >
            <div className="w-7 h-7 rounded-lg bg-[#1E3A8A] text-white flex items-center justify-center font-bold text-sm">
              JT
            </div>
            <div>
              <h1 className="font-sans font-black text-slate-800 text-[11px] leading-tight uppercase tracking-tight">
                Luwingu Portal
              </h1>
              <p className="text-[8px] text-slate-400 font-semibold leading-none">Primary District Hub</p>
            </div>
          </button>

          {/* Nav pills */}
          <div className="flex items-center gap-2">
            
            {/* Home Icon */}
            {selectedParticipant && !isTeacher && !isOrganiser && (
              <button
                id="nav-home-btn"
                onClick={() => navigateTo('home')}
                className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                  activePage === 'home' ? 'bg-blue-50 text-[#1E3A8A]' : 'text-slate-500 hover:bg-slate-50'
                }`}
                title="Home Dashboard"
              >
                <Home className="w-4 h-4" />
              </button>
            )}

            {/* Leaderboard Icon */}
            <button
              id="nav-leaders-btn"
              onClick={() => { setIsTeacher(false); navigateTo('leaderboards'); }}
              className={`p-1.5 rounded-lg transition-all cursor-pointer ${
                activePage === 'leaderboards' ? 'bg-blue-50 text-[#1E3A8A]' : 'text-slate-500 hover:bg-slate-50'
              }`}
              title="Leaderboard standings"
            >
              <BarChart2 className="w-4 h-4" />
            </button>

            {/* Developer Acknowledgements and Rating Reopener */}
            <button
              id="nav-about-devs-reopen-btn"
              onClick={() => setShowIntro(true)}
              className="p-1.5 text-amber-500 hover:bg-amber-50 rounded-lg transition-all cursor-pointer flex items-center gap-1 shrink-0"
              title="About Developers & Rate Innovation"
            >
              <span className="text-xs font-black select-none">🏆 Rate Devs</span>
            </button>

            {/* Sync Manager Link */}
            <button
              id="nav-sync-btn"
              onClick={() => { setIsTeacher(false); navigateTo('sync'); }}
              className={`p-1.5 rounded-lg transition-all cursor-pointer relative ${
                activePage === 'sync' ? 'bg-blue-50 text-[#1E3A8A]' : 'text-slate-500 hover:bg-slate-50'
              }`}
              title="Backup & Synchronization Panel"
            >
              <RefreshCw className="w-4 h-4" />
              {totalPendingCount > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-amber-500 rounded-full animate-ping" />
              )}
            </button>

            {/* Signout button */}
            <button
              id="nav-logout-btn"
              onClick={handleSignOut}
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"
              title="Log out of profile"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. RENDER ACTIVE PAGES */}
      <main className="flex-1 flex flex-col justify-between">
        
        {/* PAGE 1: USER AUTH / REGISTRATION PROFILE SELECTION */}
        {activePage === 'auth' && (
          <StudentAuth
            participants={participants}
            selectedParticipant={selectedParticipant}
            onSelectParticipant={(p) => {
              setSelectedParticipant(p);
              if (p) {
                setIsTeacher(false);
                setIsOrganiser(false);
                navigateTo('home');
              }
            }}
            onRegisterParticipant={handleRegisterParticipant}
            isTeacher={isTeacher}
            setIsTeacher={(val) => {
              setIsTeacher(val);
              if (val) {
                setSelectedParticipant(null);
                setIsOrganiser(false);
                navigateTo('sync'); // Move page so it doesn't overlap auth options
              }
            }}
            onTeacherLogout={() => {
              setIsTeacher(false);
              navigateTo('auth');
            }}
            isOrganiser={isOrganiser}
            setIsOrganiser={(val) => {
              setIsOrganiser(val);
              if (val) {
                setSelectedParticipant(null);
                setIsTeacher(false);
                navigateTo('organiser');
              }
            }}
            onOrganiserLogout={() => {
              setIsOrganiser(false);
              navigateTo('auth');
            }}
            schools={schools}
            onShowIntro={() => setShowIntro(true)}
          />
        )}

        {/* PAGE 2: HOME DASHBOARD */}
        {activePage === 'home' && selectedParticipant && (
          <DashboardHome
            selectedParticipant={selectedParticipant}
            participantsCount={participants.length}
            projectsCount={projects.length}
            resultsCount={results.length}
            pendingSyncCount={totalPendingCount}
            onNavigate={(target) => {
              if (target === 'auth') {
                handleSignOut();
              } else {
                navigateTo(target);
              }
            }}
            latestResults={results}
          />
        )}

        {/* PAGE 3: INTERACTIVE QUIZ ENGINE */}
        {activePage === 'quizzes' && selectedParticipant && (
          <QuizOlympiadModule
            selectedParticipant={selectedParticipant}
            questions={questions}
            onSaveResult={handleSaveQuizResult}
            onBack={() => navigateTo('home')}
            mode="quiz"
          />
        )}

        {/* PAGE 4: INTERACTIVE OLYMPIAD ENGINE */}
        {activePage === 'olympiads' && selectedParticipant && (
          <QuizOlympiadModule
            selectedParticipant={selectedParticipant}
            questions={questions}
            onSaveResult={handleSaveQuizResult}
            onBack={() => navigateTo('home')}
            mode="olympiad"
          />
        )}

        {/* PAGE 5: PROJECT SUBMISSIONS MODULE */}
        {activePage === 'projects' && selectedParticipant && (
          <RegistrationModule
            selectedParticipant={selectedParticipant}
            onSubmitProject={handleRegisterProject}
            onBack={() => navigateTo('home')}
          />
        )}

        {/* PAGE 6: OFFLINE SYNC CONTROLLER */}
        {activePage === 'sync' && (
          isTeacher ? (
            <TeacherDashboard
              participants={participants}
              projects={projects}
              questions={questions}
              onAddQuestion={handleTeacherAddQuestion}
              onDeleteProject={handleDeleteProject}
              onBack={() => {
                setIsTeacher(false);
                navigateTo('auth');
              }}
            />
          ) : (
            <OfflineSyncIndicator
              isOnline={isOnline}
              pendingStudentsCount={pendingStudentsCount}
              pendingProjectsCount={pendingProjectsCount}
              pendingScoresCount={pendingScoresCount}
              onTriggerSync={handleTriggerSyncComplete}
              onBack={() => {
                if (selectedParticipant) navigateTo('home');
                else navigateTo('auth');
              }}
            />
          )
        )}

        {/* PAGE 7: LEADERBOARD BOARD STANDINGS */}
        {activePage === 'leaderboards' && (
          <LeaderboardsView
            results={results}
            participants={participants}
            onBack={() => {
              if (selectedParticipant) navigateTo('home');
              else navigateTo('auth');
            }}
          />
        )}

        {/* PAGE 8: DISTRICT ORGANISER PORTAL */}
        {activePage === 'organiser' && (
          <OrganiserDashboard
            questions={questions}
            schools={schools}
            onApproveQuestion={handleApproveQuestion}
            onRejectQuestion={handleRejectQuestion}
            onAddSchool={handleAddSchool}
            onDeleteSchool={handleDeleteSchool}
            appRatings={appRatings}
            onClearRatings={handleClearRatings}
            onBack={() => {
              setIsOrganiser(false);
              navigateTo('auth');
            }}
          />
        )}

      </main>

      {showIntro && (
        <IntroModal
          onClose={() => setShowIntro(false)}
          onSubmitRating={handleSubmitRating}
          hasAlreadyRated={localStorage.getItem('jets_tets_innovation_rated') === 'true'}
        />
      )}
    </AndroidFrame>
  </FrameShortcutIndicator>
);
}

// Inline lightweight assistant widget displaying easy quick actions for assessment testing
function FrameShortcutIndicator({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1 w-full flex flex-col justify-between">
        {children}
      </div>
      
      {/* Quick developer simulation helpers panel placed floating below on desktop */}
      <div className="hidden lg:flex fixed bottom-6 left-6 max-w-xs bg-slate-900 border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-300 shadow-xl flex-col gap-2 font-mono">
        <div className="font-sans font-bold text-white text-[11px] uppercase tracking-wide border-b border-slate-850 pb-1.5 flex items-center justify-between">
          <span>Simulation Controls</span>
          <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
        </div>
        <p className="text-[10px] text-slate-400">
          Simulate rural connectivity drops: Click the <strong className="text-amber-400">Connected</strong> button in the green status bar of the phone frame!
        </p>
        <div className="text-[9px] text-slate-500 space-y-0.5">
          <div>Teacher passcode: <strong className="text-slate-300">luwingu</strong></div>
          <div>Organiser passcode: <strong className="text-amber-400">organiser</strong></div>
        </div>
      </div>
    </div>
  );
}

