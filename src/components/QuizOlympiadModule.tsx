import React, { useState, useEffect } from 'react';
import { Award, BookOpen, ChevronLeft, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, Trophy, HelpCircle, Star, Sparkles, Clock, MapPin } from 'lucide-react';
import { Participant, Question, DomainType, SubjectAlignmentType, QuizResult } from '../types';

interface QuizOlympiadModuleProps {
  selectedParticipant: Participant;
  questions: Question[];
  onSaveResult: (result: Omit<QuizResult, 'id' | 'createdAt' | 'synced'>) => void;
  onBack: () => void;
  mode: 'quiz' | 'olympiad';
}

const DOMAINS: DomainType[] = [
  'Sustainable Systems & Environment (SSE)',
  'Health, Food & Human Wellbeing System (HFWS)',
  'Digital, Robotics & Intelligent Systems (DRIS)',
  'Engineering, Design & Production Systems (EDPS)',
  'Mathematical Modelling & Investigation (MMSI)'
];

const SUBJECT_ALIGNMENTS: { name: SubjectAlignmentType; sA: string; sB: string; icon: string }[] = [
  {
    name: 'Primary Science',
    sA: 'Sustainable Systems & Environment (SSE) [Section A]',
    sB: 'Health, Food & Human Wellbeing System (HFWS) [Section B]',
    icon: '🌱'
  },
  {
    name: 'Primary Creative & Technology Studies',
    sA: 'Digital, Robotics & Intelligent Systems (DRIS) [Section A]',
    sB: 'Engineering, Design & Production Systems (EDPS) [Section B]',
    icon: '⚙️'
  },
  {
    name: 'Primary Mathematics',
    sA: 'Math Modelling & Data Analysis [Section A]',
    sB: 'Scientific Research & Evidence Validation [Section B]',
    icon: '📐'
  }
];

export default function QuizOlympiadModule({
  selectedParticipant,
  questions,
  onSaveResult,
  onBack,
  mode
}: QuizOlympiadModuleProps) {
  // Navigation & selection states
  const [selectedDomain, setSelectedDomain] = useState<DomainType | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<SubjectAlignmentType | null>(null);
  
  // Gameplay states
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(120); // 2 minutes for Olympiad questions
  const [timerActive, setTimerActive] = useState(false);

  // Sound/Visual sparks state
  const [encouragementText, setEncouragementText] = useState('');

   // 1. Filter and start quiz
  const handleStartQuiz = (domain: DomainType) => {
    setSelectedDomain(domain);
    const approvedQuestionsOnly = questions.filter(q => !q.createdByTeacher || q.approvedByOrganiser);
    const filtered = approvedQuestionsOnly.filter(q => q.type === 'quiz' && q.domain === domain);
    
    if (filtered.length === 0) {
      alert("No quiz questions loaded for this domain yet. Teachers can add them in the Teacher Zone!");
      return;
    }
    
    // Shuffle slightly or sort
    setActiveQuestions(filtered.slice(0, 5)); // Take 5 questions for a child-friendly quick quiz
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setCorrectAnswersCount(0);
    setQuizComplete(false);
  };

  // 2. Filter and start Olympiad (aligned with Subject Alignments)
  const handleStartOlympiad = (subject: SubjectAlignmentType) => {
    setSelectedSubject(subject);
    const approvedQuestionsOnly = questions.filter(q => !q.createdByTeacher || q.approvedByOrganiser);
    
    // For Olympiads, filter based on Table 13 mapping
    let filtered: Question[] = [];
    if (subject === 'Primary Science') {
      filtered = approvedQuestionsOnly.filter(
        q => q.type === 'olympiad' && 
        (q.domain === 'Sustainable Systems & Environment (SSE)' || q.domain === 'Health, Food & Human Wellbeing System (HFWS)')
      );
    } else if (subject === 'Primary Creative & Technology Studies') {
      filtered = approvedQuestionsOnly.filter(
        q => q.type === 'olympiad' && 
        (q.domain === 'Digital, Robotics & Intelligent Systems (DRIS)' || q.domain === 'Engineering, Design & Production Systems (EDPS)')
      );
    } else if (subject === 'Primary Mathematics') {
      filtered = approvedQuestionsOnly.filter(
        q => q.type === 'olympiad' && q.domain === 'Mathematical Modelling & Investigation (MMSI)'
      );
    }

    if (filtered.length === 0) {
      alert("No Olympiad questions loaded for this subject yet. Teachers can add them in the Teacher Zone!");
      return;
    }

    // Set questions and start timer
    setActiveQuestions(filtered.slice(0, 6)); // Standard 6 high-value questions (3 Section A, 3 Section B)
    setCurrentIdx(0);
    setSelectedAnswer(null);
    setHasAnswered(false);
    setCorrectAnswersCount(0);
    setQuizComplete(false);
    setTimeRemaining(180); // 3 minutes total
    setTimerActive(true);
  };

  // 3. Olympiad Timer hook
  useEffect(() => {
    if (!timerActive || quizComplete || activeQuestions.length === 0) return;
    
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto complete quiz if time runs out
          handleCompleteQuiz(correctAnswersCount);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, quizComplete, activeQuestions, correctAnswersCount]);

  // 4. Handle Option Click
  const handleOptionClick = (option: string) => {
    if (hasAnswered) return;
    setSelectedAnswer(option);
    setHasAnswered(true);

    const activeQuestion = activeQuestions[currentIdx];
    const isCorrect = option === activeQuestion.correctAnswer;

    if (isCorrect) {
      setCorrectAnswersCount(prev => prev + 1);
      const wins = ["Awesome work!", "Sensational!", "You got it!", "Scientifically accurate!", "Perfect answer! ⭐"];
      setEncouragementText(wins[Math.floor(Math.random() * wins.length)]);
    } else {
      const encourages = ["Don't worry, you are learning!", "Good try, keep going!", "Mistakes help us grow! 💪", "Almost there! Keep practicing."];
      setEncouragementText(encourages[Math.floor(Math.random() * encourages.length)]);
    }
  };

  // 5. Handle Next Question
  const handleNext = () => {
    if (currentIdx < activeQuestions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedAnswer(null);
      setHasAnswered(false);
      setEncouragementText('');
    } else {
      handleCompleteQuiz(correctAnswersCount + (selectedAnswer === activeQuestions[currentIdx].correctAnswer && !hasAnswered ? 1 : 0));
    }
  };

  // 6. Complete and save result
  const handleCompleteQuiz = (finalCorrectCount: number) => {
    setQuizComplete(true);
    setTimerActive(false);

    // Save score
    onSaveResult({
      participantName: selectedParticipant.name,
      school: selectedParticipant.school,
      type: mode,
      domain: selectedDomain || 'Sustainable Systems & Environment (SSE)',
      subjectAlignment: selectedSubject || undefined,
      score: finalCorrectCount,
      totalQuestions: activeQuestions.length,
      percentage: Math.round((finalCorrectCount / activeQuestions.length) * 100)
    });
  };

  // Render Section Badge for Olympiads
  const renderOlympiadSectionBadge = (q: Question) => {
    if (mode !== 'olympiad') return null;
    const isSecA = q.section === 'Section A';
    return (
      <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
        isSecA ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-blue-100 text-blue-800 border border-blue-200'
      }`}>
        {q.section || 'General Section'}
      </span>
    );
  };

  const activeQuestion = activeQuestions[currentIdx];

  return (
    <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
      
      {/* 1. DOMAIN OR SUBJECT SELECTION SCREEN */}
      {!selectedDomain && !selectedSubject && (
        <div className="space-y-4 flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <button
              id="quiz-back-btn"
              onClick={onBack}
              className="p-1.5 hover:bg-slate-100 rounded-lg transition-all cursor-pointer text-slate-600"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h3 className="font-sans font-bold text-slate-800 text-sm capitalize">
                {mode === 'quiz' ? 'Luwingu JETS & TETS Quizzes' : 'Luwingu Olympiad Arena'}
              </h3>
              <p className="text-[10px] text-slate-500">
                {mode === 'quiz' ? 'Select a domain area below to start your practice.' : 'Select your subject alignment to begin the formal contest.'}
              </p>
            </div>
          </div>

          {/* QUIZZES MODE DOMAINS LIST */}
          {mode === 'quiz' ? (
            <div className="space-y-3 flex-1 overflow-y-auto">
              <div className="bg-blue-50 border border-blue-100/50 p-3 rounded-2xl text-[11px] text-blue-950 leading-relaxed">
                📢 <strong>Quiz Rules:</strong> Each quiz contains 5 questions from the selected domain. Earn 10 points per correct answer. All results save offline on this device.
              </div>

              <div className="grid grid-cols-1 gap-3">
                {DOMAINS.map((dom) => {
                  const colors = [
                    'border-teal-200 hover:border-teal-400 bg-teal-50/20 text-teal-950',
                    'border-rose-200 hover:border-rose-400 bg-rose-50/20 text-rose-950',
                    'border-blue-200 hover:border-blue-400 bg-blue-50/20 text-blue-950',
                    'border-amber-200 hover:border-amber-400 bg-amber-50/20 text-amber-950',
                    'border-purple-200 hover:border-purple-400 bg-purple-50/20 text-purple-950'
                  ];
                  const dShort = dom.split('(')[1]?.replace(')', '') || 'JETS';
                  const index = DOMAINS.indexOf(dom);
                  return (
                    <button
                      key={dom}
                      onClick={() => handleStartQuiz(dom)}
                      className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${colors[index]}`}
                    >
                      <div className="space-y-1 pr-4">
                        <span className="text-[10px] font-bold tracking-wider uppercase opacity-65">Domain {index + 1}</span>
                        <h4 className="font-sans font-extrabold text-sm leading-tight">{dom}</h4>
                        <p className="text-[10px] opacity-75">Click to load table-based multiple-choice practice.</p>
                      </div>
                      <span className="bg-white/80 border border-black/5 rounded-xl w-10 h-10 flex items-center justify-center font-extrabold text-xs shrink-0">
                        {dShort}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            /* OLYMPIAD MODE SUBJECTS LIST */
            <div className="space-y-3.5 flex-1 overflow-y-auto">
              <div className="bg-purple-50 border border-purple-100 p-3 rounded-2xl text-[11px] text-purple-950 leading-relaxed space-y-1">
                <div className="font-bold flex items-center gap-1 text-purple-900">
                  <Clock className="w-3.5 h-3.5" />
                  Official Olympiad Rules:
                </div>
                <p>• Formal 3-minute timer applies.</p>
                <p>• 6 Questions divided into <strong>Section A</strong> and <strong>Section B</strong> (20 points each).</p>
                <p>• Yields a beautiful official certificate of merit upon scoring 50% or more!</p>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {SUBJECT_ALIGNMENTS.map((sub) => (
                  <button
                    key={sub.name}
                    onClick={() => handleStartOlympiad(sub.name)}
                    className="w-full text-left p-4 rounded-2xl border border-purple-100 bg-white hover:border-purple-300 transition-all cursor-pointer flex items-center gap-4 group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl shadow-inner shrink-0">
                      {sub.icon}
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <h4 className="font-sans font-extrabold text-sm text-slate-800 leading-tight group-hover:text-purple-900 transition-all">{sub.name}</h4>
                      <div className="text-[9px] text-slate-500 font-medium space-y-0.5">
                        <p className="truncate">🎯 {sub.sA}</p>
                        <p className="truncate">🎯 {sub.sB}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-purple-300 group-hover:text-purple-600 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. ACTIVE QUIZ / OLYMPIAD SCREEN */}
      {(selectedDomain || selectedSubject) && !quizComplete && activeQuestion && (
        <div className="flex-1 flex flex-col justify-between space-y-4">
          
          {/* Top Info Bar */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div className="space-y-0.5">
              <span className="text-[10px] font-extrabold text-[#1E3A8A] tracking-wider uppercase">
                {mode === 'quiz' ? 'Practice Quiz' : 'Olympiad'}
              </span>
              <div className="text-xs font-bold text-slate-800">
                Question {currentIdx + 1} of {activeQuestions.length}
              </div>
            </div>

            {/* Timed counter for Olympiads */}
            {mode === 'olympiad' && (
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold border ${
                timeRemaining <= 30 
                  ? 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse' 
                  : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}>
                <Clock className="w-4 h-4 shrink-0" />
                <span>
                  {Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}
                </span>
              </div>
            )}

            {/* Simple Progress Bar */}
            <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden shrink-0">
              <div 
                className="bg-[#3B82F6] h-full transition-all duration-300" 
                style={{ width: `${((currentIdx + 1) / activeQuestions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Text Area */}
          <div className="space-y-3 flex-1 flex flex-col justify-center">
            <div className="flex flex-wrap gap-1.5 items-center">
              {renderOlympiadSectionBadge(activeQuestion)}
              <span className="bg-slate-100 text-slate-700 text-[9px] font-bold px-2 py-0.5 rounded-md">
                {activeQuestion.focusArea}
              </span>
            </div>

            <p className="font-sans font-bold text-slate-800 text-sm sm:text-base leading-snug">
              {activeQuestion.text}
            </p>
          </div>

          {/* Options List */}
          <div className="space-y-2.5 py-2 shrink-0">
            {activeQuestion.options.map((opt, i) => {
              const alphabet = ['A', 'B', 'C', 'D'];
              const isSelected = selectedAnswer === opt;
              const isCorrectAnswer = opt === activeQuestion.correctAnswer;
              
              let btnClass = 'border-slate-200 bg-white hover:border-slate-300 text-slate-800';
              let badgeClass = 'bg-slate-100 text-slate-600';

              if (hasAnswered) {
                if (isCorrectAnswer) {
                  btnClass = 'border-emerald-500 bg-emerald-50/80 text-emerald-950 ring-2 ring-emerald-500/10 font-bold';
                  badgeClass = 'bg-emerald-600 text-white';
                } else if (isSelected) {
                  btnClass = 'border-rose-300 bg-rose-50 text-rose-950 font-bold';
                  badgeClass = 'bg-rose-600 text-white';
                } else {
                  btnClass = 'border-slate-100 bg-white opacity-50 text-slate-400';
                  badgeClass = 'bg-slate-50 text-slate-300';
                }
              }

              return (
                <button
                  key={opt}
                  onClick={() => handleOptionClick(opt)}
                  disabled={hasAnswered}
                  className={`w-full text-left p-3 rounded-xl border flex items-center gap-3 transition-all cursor-pointer ${btnClass}`}
                >
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[11px] shrink-0 ${badgeClass}`}>
                    {alphabet[i]}
                  </span>
                  <span className="text-xs font-medium leading-tight">{opt}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback & Navigation Panel */}
          <div className="min-h-[85px] bg-slate-50 border border-slate-100 p-3 rounded-xl shrink-0 flex flex-col justify-between gap-2.5">
            {hasAnswered ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className={`text-xs font-bold flex items-center gap-1 ${
                    selectedAnswer === activeQuestion.correctAnswer ? 'text-emerald-700' : 'text-rose-700'
                  }`}>
                    {selectedAnswer === activeQuestion.correctAnswer ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                        <span>{encouragementText}</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                        <span>{encouragementText}</span>
                      </>
                    )}
                  </div>
                  <button
                    id="quiz-next-btn"
                    onClick={handleNext}
                    className="bg-[#1E3A8A] hover:bg-blue-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer font-sans"
                  >
                    <span>{currentIdx === activeQuestions.length - 1 ? 'Finish' : 'Next'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
                
                {activeQuestion.explanation && (
                  <p className="text-[10px] text-slate-500 leading-tight border-t border-slate-200/50 pt-1">
                    💡 <span className="font-semibold text-slate-700">Explanation:</span> {activeQuestion.explanation}
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-2 text-[10px] text-slate-400 font-semibold flex items-center justify-center gap-1">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Tap an option above to select your answer!</span>
              </div>
            )}
          </div>

        </div>
      )}

      {/* 3. COMPLETION SCREEN / MERIT CERTIFICATE */}
      {quizComplete && (
        <div className="space-y-4 flex-1 flex flex-col justify-between p-2">
          
          <div className="text-center space-y-1 py-4">
            <h3 className="font-sans font-extrabold text-slate-800 text-lg">Test Completed!</h3>
            <p className="text-xs text-slate-500">Mwabombeni, you have submitted your answers.</p>
          </div>

          {/* Core Results Block */}
          <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm text-center space-y-4">
            
            {/* Score circle */}
            <div className="inline-flex relative items-center justify-center">
              <div className="w-24 h-24 rounded-full border-[6px] border-blue-100 flex flex-col items-center justify-center bg-blue-50">
                <span className="text-2xl font-extrabold text-slate-800 leading-none">
                  {correctAnswersCount}/{activeQuestions.length}
                </span>
                <span className="text-[9px] text-blue-800 font-bold uppercase tracking-wider mt-1">
                  Correct
                </span>
              </div>
              <span className="absolute -top-1 -right-1 text-2xl">🏆</span>
            </div>

            <div className="space-y-1">
              <h4 className="font-bold text-slate-800 text-sm">
                Your Score: <span className="text-blue-700 font-extrabold">{Math.round((correctAnswersCount / activeQuestions.length) * 100)}%</span>
              </h4>
              <p className="text-[11px] text-slate-500 leading-relaxed max-w-xs mx-auto">
                {correctAnswersCount === activeQuestions.length ? (
                  "✨ Outstanding! Perfect score! You are a brilliant Luwingu science leader. Keep up the high effort!"
                ) : correctAnswersCount >= 3 ? (
                  "Great job! You passed the challenge. Your interest in JETS and TETS is fantastic."
                ) : (
                  "Good practice session. Science and technology require focus and practice. Try another domain area to grow!"
                )}
              </p>
            </div>
          </div>

          {/* PRINTABLE DISTRICT OLYMPIAD CERTIFICATE OF COMPLETION */}
          {mode === 'olympiad' && correctAnswersCount >= 3 && (
            <div className="border-[4px] border-amber-400 bg-amber-50/40 p-4.5 rounded-xl text-center space-y-3 select-none relative overflow-hidden shadow-sm border-double">
              
              {/* Background watermark seals */}
              <div className="absolute right-1 bottom-1 text-5xl opacity-10 font-bold rotate-12">LUWINGU</div>
              
              <div className="text-[9px] font-bold text-amber-800 uppercase tracking-widest leading-none">
                Republic of Zambia • Ministry of Education
              </div>
              
              <div className="space-y-0.5">
                <h4 className="font-serif font-bold text-[13px] text-slate-900 uppercase tracking-tight">
                  Luwingu JETS & TETS Olympiad Certificate
                </h4>
                <div className="h-0.5 w-16 bg-amber-400 mx-auto" />
              </div>

              <div className="text-[9px] text-slate-600">
                This is to certify that JETS Participant
              </div>

              <div className="font-sans font-extrabold text-slate-950 text-sm italic tracking-wide leading-none py-1 underline decoration-amber-500">
                {selectedParticipant.name}
              </div>

              <div className="text-[9px] text-slate-600 max-w-xs mx-auto leading-normal">
                has successfully completed the primary school level challenge in
                <div className="font-bold text-slate-800 mt-0.5">{selectedSubject}</div>
                attaining a passing grade of <strong className="text-amber-800">{Math.round((correctAnswersCount / activeQuestions.length) * 100)}%</strong>.
              </div>

              <div className="grid grid-cols-2 pt-2 gap-4 text-[7px] text-slate-500 font-semibold border-t border-slate-200/50">
                <div className="text-left">
                  <div className="font-bold text-slate-800">B. Kapikanya</div>
                  <div>District JETS Coordinator</div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-slate-400">ID: LWG-{Math.floor(Math.random()*9000+1000)}</div>
                  <div>Luwingu, Northern Province</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Controls */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              id="quiz-complete-finish-btn"
              onClick={() => {
                setSelectedDomain(null);
                setSelectedSubject(null);
                setQuizComplete(false);
                onBack();
              }}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer text-center"
            >
              Back to Home Dashboard
            </button>
            <button
              id="quiz-complete-retry-btn"
              onClick={() => {
                if (selectedDomain) {
                  handleStartQuiz(selectedDomain);
                } else if (selectedSubject) {
                  handleStartOlympiad(selectedSubject);
                }
              }}
              className="text-xs text-[#1E3A8A] hover:text-blue-900 font-bold hover:underline py-1"
            >
              Try This Challenge Again
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
