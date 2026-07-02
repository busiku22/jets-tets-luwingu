import React, { useState, useEffect } from 'react';
import { User, Users, LogIn, PlusCircle, ShieldAlert, Check, BookOpen, AlertTriangle, Shield } from 'lucide-react';
import { Participant, LUWINGU_SCHOOLS } from '../types';

interface StudentAuthProps {
  participants: Participant[];
  selectedParticipant: Participant | null;
  onSelectParticipant: (p: Participant | null) => void;
  onRegisterParticipant: (p: {
    name: string;
    age: number;
    grade: string;
    school: string;
    category: 'JETS' | 'TETS';
    gender: 'Boy' | 'Girl' | 'Other';
    schoolLevel: 'Primary' | 'Secondary';
  }) => void;
  isTeacher: boolean;
  setIsTeacher: (val: boolean) => void;
  onTeacherLogout: () => void;
  isOrganiser: boolean;
  setIsOrganiser: (val: boolean) => void;
  onOrganiserLogout: () => void;
  schools: string[];
  onShowIntro?: () => void;
}

export default function StudentAuth({
  participants,
  selectedParticipant,
  onSelectParticipant,
  onRegisterParticipant,
  isTeacher,
  setIsTeacher,
  onTeacherLogout,
  isOrganiser,
  setIsOrganiser,
  onOrganiserLogout,
  schools,
  onShowIntro
}: StudentAuthProps) {
  const [activeTab, setActiveTab] = useState<'student-select' | 'student-new' | 'teacher' | 'organiser'>('student-select');
  
  // Registration state
  const [name, setName] = useState('');
  const [age, setAge] = useState<number>(10);
  const [schoolLevel, setSchoolLevel] = useState<'Primary' | 'Secondary'>('Primary');
  const [grade, setGrade] = useState('Grade 5');
  const [school, setSchool] = useState(schools && schools.length > 0 ? schools[0] : (LUWINGU_SCHOOLS && LUWINGU_SCHOOLS.length > 0 ? LUWINGU_SCHOOLS[0] : ''));
  const [category, setCategory] = useState<'JETS' | 'TETS'>('JETS');
  const [gender, setGender] = useState<'Boy' | 'Girl' | 'Other'>('Boy');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState(false);

  // Sync school default selection if schools change
  useEffect(() => {
    if (schools && schools.length > 0 && !schools.includes(school)) {
      setSchool(schools[0]);
    }
  }, [schools]);

  // Grade lists
  const primaryGrades = ['Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7'];
  const secondaryGrades = ['Form 1', 'Form 2', 'Grade 10', 'Grade 11', 'Grade 12'];
  const gradesPool = schoolLevel === 'Primary' ? primaryGrades : secondaryGrades;

  const handleSchoolLevelChange = (level: 'Primary' | 'Secondary') => {
    setSchoolLevel(level);
    setGrade(level === 'Primary' ? primaryGrades[0] : secondaryGrades[0]);
  };

  // Teacher login state
  const [teacherPassword, setTeacherPassword] = useState('');
  const [teacherError, setTeacherError] = useState('');

  // Organiser login state
  const [organiserPassword, setOrganiserPassword] = useState('');
  const [organiserError, setOrganiserError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setRegError('Please enter your name.');
      return;
    }
    setRegError('');
    onRegisterParticipant({
      name: name.trim(),
      age,
      grade,
      school,
      category,
      gender,
      schoolLevel
    });
    
    setRegSuccess(true);
    setName('');
    setTimeout(() => {
      setRegSuccess(false);
      setActiveTab('student-select');
    }, 1500);
  };

  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Use simple, accessible password for district teachers
    if (teacherPassword.toLowerCase() === 'luwingu' || teacherPassword.toLowerCase() === 'jets123') {
      setIsTeacher(true);
      setTeacherPassword('');
      setTeacherError('');
    } else {
      setTeacherError('Incorrect password. Please use "luwingu" or "jets123" to access.');
    }
  };

  const handleOrganiserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (organiserPassword.toLowerCase() === 'organiser' || organiserPassword.toLowerCase() === 'district') {
      setIsOrganiser(true);
      setOrganiserPassword('');
      setOrganiserError('');
    } else {
      setOrganiserError('Incorrect passcode. Please use "organiser" or "district" to access.');
    }
  };

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Tab Switcher */}
      <div className="grid grid-cols-4 bg-slate-100 p-1 rounded-xl gap-0.5">
        <button
          id="tab-student-select"
          onClick={() => { setActiveTab('student-select'); setIsTeacher(false); setIsOrganiser(false); }}
          className={`py-2 text-[9px] sm:text-xs font-bold rounded-lg transition-all text-center ${
            activeTab === 'student-select' && !isTeacher && !isOrganiser
              ? 'bg-white text-[#1E3A8A] shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Select Profile
        </button>
        <button
          id="tab-student-new"
          onClick={() => { setActiveTab('student-new'); setIsTeacher(false); setIsOrganiser(false); }}
          className={`py-2 text-[9px] sm:text-xs font-bold rounded-lg transition-all text-center ${
            activeTab === 'student-new' && !isTeacher && !isOrganiser
              ? 'bg-white text-[#1E3A8A] shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          New Student
        </button>
        <button
          id="tab-teacher-login"
          onClick={() => { setActiveTab('teacher'); setIsOrganiser(false); }}
          className={`py-2 text-[9px] sm:text-xs font-bold rounded-lg transition-all text-center ${
            (isTeacher || activeTab === 'teacher') && !isOrganiser
              ? 'bg-[#1E3A8A] text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Teacher Zone
        </button>
        <button
          id="tab-organiser-login"
          onClick={() => { setActiveTab('organiser'); setIsTeacher(false); }}
          className={`py-2 text-[9px] sm:text-xs font-bold rounded-lg transition-all text-center ${
            isOrganiser || activeTab === 'organiser'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Organiser
        </button>
      </div>

      {/* 1. SELECT STUDENT PROFILE */}
      {activeTab === 'student-select' && !isTeacher && !isOrganiser && (
        <div className="space-y-4">
          <div className="text-center py-2">
            <h3 className="font-sans font-bold text-slate-800 text-lg">Who is learning today?</h3>
            <p className="text-xs text-slate-500">Tap your profile to start quizzes, upload projects or run Olympiads.</p>
          </div>

          {participants.length === 0 ? (
            <div className="text-center p-6 bg-blue-50/50 border border-blue-100 rounded-2xl flex flex-col items-center gap-3">
              <Users className="w-10 h-10 text-[#3B82F6]/70" />
              <div className="text-sm font-semibold text-slate-800">No students registered on this device yet</div>
              <p className="text-xs text-slate-500 max-w-xs">
                Welcome to the Luwingu JETS & TETS Hub! Let's get you set up. It takes less than a minute.
              </p>
              <button
                id="get-started-reg-btn"
                onClick={() => setActiveTab('student-new')}
                className="mt-1 bg-[#1E3A8A] hover:bg-blue-900 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                Register First Student
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              <div className="max-h-[380px] overflow-y-auto space-y-2 pr-1">
                {participants.map((p) => {
                  const isSelected = selectedParticipant?.id === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => onSelectParticipant(isSelected ? null : p)}
                      className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'border-[#3B82F6] bg-blue-50 text-[#1E3A8A] ring-2 ring-blue-500/20'
                          : 'border-slate-200 bg-white text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-base ${
                          p.gender === 'Boy' 
                            ? 'bg-blue-100 text-blue-700' 
                            : p.gender === 'Girl' 
                            ? 'bg-rose-100 text-rose-700' 
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {p.gender === 'Boy' ? '👦' : p.gender === 'Girl' ? '👧' : '✨'}
                        </div>
                        <div>
                          <div className="font-bold text-sm leading-tight text-slate-900">{p.name}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5 font-medium">
                            {p.grade} • {p.school}
                          </div>
                          <span className={`inline-block mt-1 text-[9px] px-1.5 py-0.2 rounded-full font-bold uppercase ${
                            p.category === 'JETS' ? 'bg-blue-100 text-blue-800' : 'bg-orange-150 text-orange-850'
                          }`}>
                            {p.category} Participant
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {isSelected ? (
                          <span className="bg-[#3B82F6] text-white p-1 rounded-full">
                            <Check className="w-3.5 h-3.5" />
                          </span>
                        ) : (
                          <span className="text-[10px] text-slate-400 border border-slate-200 px-2 py-0.5 rounded-lg font-bold bg-slate-50">
                            Select
                          </span>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {selectedParticipant && (
                <div className="bg-[#1E3A8A] text-white p-3 rounded-xl flex items-center justify-between shadow-sm">
                  <div className="text-xs">
                    Signed in as <span className="font-bold">{selectedParticipant.name}</span>
                  </div>
                  <button
                    id="clear-auth-selection-btn"
                    onClick={() => onSelectParticipant(null)}
                    className="text-[10px] bg-blue-900/60 hover:bg-blue-950 px-2 py-1 rounded-lg font-bold border border-blue-700"
                  >
                    Change Student
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* 2. REGISTER NEW STUDENT */}
      {activeTab === 'student-new' && !isTeacher && !isOrganiser && (
        <form onSubmit={handleRegister} className="space-y-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-center pb-2 border-b border-slate-100">
            <h3 className="font-sans font-bold text-slate-800 text-base flex items-center justify-center gap-1.5">
              <PlusCircle className="w-5 h-5 text-[#1E3A8A]" />
              Register New Student
            </h3>
            <p className="text-[11px] text-slate-500 mt-0.5">Let's create your profile for JETS/TETS.</p>
          </div>

          {regSuccess ? (
            <div className="py-6 text-center text-[#1E3A8A] font-bold space-y-2">
              <div className="w-12 h-12 bg-blue-100 text-[#1E3A8A] rounded-full flex items-center justify-center mx-auto text-xl">✓</div>
              <div className="text-sm">Profile Created Successfully!</div>
              <p className="text-xs text-slate-500 font-normal">Loading your school portal...</p>
            </div>
          ) : (
            <div className="space-y-3">
              {regError && <div className="text-xs text-rose-600 bg-rose-50 p-2 rounded-lg font-semibold">{regError}</div>}

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                <input
                  id="student-reg-name-input"
                  type="text"
                  placeholder="e.g. Mwansa Chanda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full text-sm p-2.5 rounded-xl border border-slate-200 focus:border-[#3B82F6] focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">School Level</label>
                  <div className="grid grid-cols-2 gap-1 bg-slate-100 p-0.5 rounded-xl">
                    <button
                      type="button"
                      onClick={() => handleSchoolLevelChange('Primary')}
                      className={`py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                        schoolLevel === 'Primary'
                          ? 'bg-[#1E3A8A] text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-850'
                      }`}
                    >
                      Pri
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSchoolLevelChange('Secondary')}
                      className={`py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${
                        schoolLevel === 'Secondary'
                          ? 'bg-[#1E3A8A] text-white shadow-xs'
                          : 'text-slate-500 hover:text-slate-850'
                      }`}
                    >
                      Sec
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Grade</label>
                  <select
                    id="student-reg-grade-select"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:border-[#3B82F6] focus:outline-none bg-white font-sans font-medium"
                  >
                    {gradesPool.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Age</label>
                  <select
                    id="student-reg-age-select"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="w-full text-xs p-2 rounded-xl border border-slate-200 focus:border-[#3B82F6] focus:outline-none bg-white font-sans font-medium"
                  >
                    {[7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(n => (
                      <option key={n} value={n}>{n} Yrs</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setCategory('JETS')}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        category === 'JETS'
                          ? 'bg-[#1E3A8A] text-white font-black'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      JETS
                    </button>
                    <button
                      type="button"
                      onClick={() => setCategory('TETS')}
                      className={`py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                        category === 'TETS'
                          ? 'bg-orange-600 text-white font-black'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      TETS
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1 leading-snug font-medium">
                    {category === 'JETS' 
                      ? 'Junior Engineers, Technicians, and Scientists' 
                      : 'Tertiary Engineers, Technicians, and Scientists'}
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Avatar / Gender</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setGender('Boy')}
                      className={`py-1.5 text-xs rounded-lg border flex items-center justify-center gap-1 ${
                        gender === 'Boy'
                          ? 'border-blue-500 bg-blue-50/50 text-blue-900 font-bold'
                          : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      👦 Boy
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('Girl')}
                      className={`py-1.5 text-xs rounded-lg border flex items-center justify-center gap-1 ${
                        gender === 'Girl'
                          ? 'border-rose-500 bg-rose-50/50 text-rose-900 font-bold'
                          : 'border-slate-200 text-slate-500'
                      }`}
                    >
                      👧 Girl
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Your School</label>
                <select
                  id="student-reg-school-select"
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full text-sm p-2.5 rounded-xl border border-slate-200 focus:border-[#3B82F6] focus:outline-none bg-white"
                >
                  {schools.map(sc => (
                    <option key={sc} value={sc}>{sc}</option>
                  ))}
                </select>
              </div>

              <button
                id="submit-student-reg-btn"
                type="submit"
                className="w-full mt-2 bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1 font-sans"
              >
                <Check className="w-4 h-4" />
                Save Profile & Start
              </button>
            </div>
          )}
        </form>
      )}

      {/* 3. TEACHER / ADMIN ACCESS ZONE */}
      {activeTab === 'teacher' && (
        <div className="space-y-4">
          {isTeacher ? (
            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center space-y-3">
              <ShieldAlert className="w-10 h-10 text-[#1E3A8A] mx-auto" />
              <h4 className="font-bold text-slate-800 text-sm">Teacher Mode is Activated</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                You have full permission to add new questions, grade projects, review the school leaderboards, and manage participants.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  id="teacher-portal-go-btn"
                  onClick={() => {
                    // Let app know to show teacher dash
                    onSelectParticipant(null); // Clear selected student
                  }}
                  className="bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-xl text-xs transition-all cursor-pointer"
                >
                  Enter Teacher Dashboard
                </button>
                <button
                  id="teacher-logout-btn"
                  onClick={onTeacherLogout}
                  className="text-xs text-rose-700 hover:text-rose-800 font-bold hover:underline"
                >
                  Exit Teacher Mode
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleTeacherLogin} className="space-y-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-center pb-2 border-b border-slate-100">
                <h3 className="font-sans font-bold text-slate-800 text-base flex items-center justify-center gap-1.5">
                  <LogIn className="w-5 h-5 text-[#1E3A8A]" />
                  Teacher Login
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">District Teachers & Organizers Portal</p>
              </div>

              {teacherError && (
                <div className="text-xs text-rose-700 bg-rose-50 p-2.5 rounded-xl font-medium border border-rose-100">
                  {teacherError}
                </div>
              )}

              <div className="bg-amber-50 border border-amber-200 text-amber-900 text-[11px] p-2.5 rounded-xl space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                  Rural Offline Passcode Hint:
                </div>
                <p>To access from rural remote schools, enter standard passcode <strong>luwingu</strong> or <strong>jets123</strong></p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Enter Teacher Passcode</label>
                <input
                  id="teacher-password-input"
                  type="password"
                  placeholder="Enter passcode..."
                  value={teacherPassword}
                  onChange={(e) => setTeacherPassword(e.target.value)}
                  className="w-full text-sm p-2.5 rounded-xl border border-slate-200 focus:border-[#3B82F6] focus:outline-none"
                  required
                />
              </div>

              <button
                id="submit-teacher-login-btn"
                type="submit"
                className="w-full bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                Login to Teacher Portal
              </button>
            </form>
          )}
        </div>
      )}

      {/* 4. DISTRICT ORGANISER ACCESS ZONE */}
      {activeTab === 'organiser' && (
        <div className="space-y-4">
          {isOrganiser ? (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-center space-y-3">
              <Shield className="w-10 h-10 text-amber-600 mx-auto" />
              <h4 className="font-bold text-slate-800 text-sm">District Organiser Portal Active</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Authorized role verified. You can now access and manage Luwingu schools and verify quiz submissions.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <button
                  id="organiser-portal-go-btn"
                  onClick={() => {
                    onSelectParticipant(null); // Clear selected student
                  }}
                  className="bg-amber-600 hover:bg-amber-700 text-white font-bold py-2 px-4 rounded-xl text-xs transition-all cursor-pointer"
                >
                  Enter Organiser Dashboard
                </button>
                <button
                  id="organiser-logout-btn"
                  onClick={onOrganiserLogout}
                  className="text-xs text-rose-700 hover:text-rose-800 font-bold hover:underline"
                >
                  Exit Organiser Portal
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleOrganiserLogin} className="space-y-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
              <div className="text-center pb-2 border-b border-slate-100">
                <h3 className="font-sans font-bold text-slate-800 text-base flex items-center justify-center gap-1.5">
                  <Shield className="w-5 h-5 text-amber-600" />
                  JETS Organiser Login
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5">District Vetting & Vetting Dashboard</p>
              </div>

              {organiserError && (
                <div className="text-xs text-rose-700 bg-rose-50 p-2.5 rounded-xl font-medium border border-rose-100">
                  {organiserError}
                </div>
              )}

              <div className="bg-amber-50 border border-amber-200 text-amber-900 text-[11px] p-2.5 rounded-xl space-y-1">
                <div className="font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                  Rural Offline Passcode Hint:
                </div>
                <p>For Luwingu JETS officials, use passcode <strong>organiser</strong> or <strong>district</strong></p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Enter Organiser Passcode</label>
                <input
                  id="organiser-password-input"
                  type="password"
                  placeholder="Enter passcode..."
                  value={organiserPassword}
                  onChange={(e) => setOrganiserPassword(e.target.value)}
                  className="w-full text-sm p-2.5 rounded-xl border border-slate-200 focus:border-[#3B82F6] focus:outline-none"
                  required
                />
              </div>

              <button
                id="submit-organiser-login-btn"
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Shield className="w-4 h-4" />
                Login to Organiser Portal
              </button>
            </form>
          )}
        </div>
      )}

      {/* 5. DEVELOPMENT ACKNOWLEDGEMENTS FOOTER */}
      {onShowIntro && (
        <div className="pt-3 border-t border-slate-100 mt-6 text-center">
          <p className="text-[10px] text-slate-400 font-medium leading-normal">
            Luwingu District JETS & TETS Offline Hub
          </p>
          <button
            type="button"
            onClick={onShowIntro}
            className="mt-1 bg-amber-50 hover:bg-amber-100 text-[#1E3A8A] text-[10px] font-bold px-3 py-1 rounded-full border border-amber-200 inline-flex items-center gap-1 cursor-pointer transition-all"
          >
            🏆 About Developers & Rate Innovation
          </button>
        </div>
      )}
    </div>
  );
}
