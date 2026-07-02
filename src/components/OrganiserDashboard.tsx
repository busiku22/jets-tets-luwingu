import React, { useState } from 'react';
import { Shield, CheckCircle, Clock, Plus, Trash2, ChevronLeft, MapPin, Search, AlertCircle, BookOpen, ThumbsUp, XCircle } from 'lucide-react';
import { Question } from '../types';

interface OrganiserDashboardProps {
  questions: Question[];
  schools: string[];
  onApproveQuestion: (id: string) => void;
  onRejectQuestion: (id: string) => void;
  onAddSchool: (schoolName: string) => void;
  onDeleteSchool: (schoolName: string) => void;
  onBack: () => void;
  appRatings?: {rating: number; comment: string; date: string; user?: string}[];
  onClearRatings?: () => void;
}

export default function OrganiserDashboard({
  questions,
  schools,
  onApproveQuestion,
  onRejectQuestion,
  onAddSchool,
  onDeleteSchool,
  onBack,
  appRatings = [],
  onClearRatings
}: OrganiserDashboardProps) {
  const [activeTab, setActiveTab] = useState<'quizzes' | 'schools' | 'feedback'>('quizzes');
  
  // School add form state
  const [newSchool, setNewSchool] = useState('');
  const [schoolError, setSchoolError] = useState('');
  const [schoolSuccess, setSchoolSuccess] = useState('');
  const [schoolSearch, setSchoolSearch] = useState('');

  // Quiz filters
  const [quizFilter, setQuizFilter] = useState<'all' | 'pending' | 'approved'>('pending');

  const teacherQuestions = questions.filter(q => q.createdByTeacher);
  const pendingQuestions = teacherQuestions.filter(q => !q.approvedByOrganiser);
  const approvedQuestions = teacherQuestions.filter(q => q.approvedByOrganiser);

  const displayedQuestions = teacherQuestions.filter(q => {
    if (quizFilter === 'pending') return !q.approvedByOrganiser;
    if (quizFilter === 'approved') return q.approvedByOrganiser;
    return true;
  });

  const handleAddSchoolSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = newSchool.trim();
    if (!formatted) {
      setSchoolError('Please enter a school name.');
      return;
    }
    
    // Check if duplicate
    const exists = schools.some(s => s.toLowerCase() === formatted.toLowerCase());
    if (exists) {
      setSchoolError('This school is already registered in the district pool!');
      return;
    }

    setSchoolError('');
    onAddSchool(formatted);
    setNewSchool('');
    setSchoolSuccess(`"${formatted}" successfully added to Luwingu schools!`);
    
    setTimeout(() => {
      setSchoolSuccess('');
    }, 2500);
  };

  const filteredSchools = schools.filter(s => 
    s.toLowerCase().includes(schoolSearch.toLowerCase())
  );

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <button
          id="organiser-back-btn"
          onClick={onBack}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-all cursor-pointer text-slate-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h3 className="font-sans font-bold text-slate-800 text-sm flex items-center gap-1.5">
            <Shield className="w-4.5 h-4.5 text-amber-600" />
            <span>District JETS Organiser Portal</span>
          </h3>
          <p className="text-[10px] text-slate-500">Official Luwingu District quality assurance, quiz vetting & school registry.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 bg-slate-150 p-0.5 rounded-xl gap-0.5">
        <button
          onClick={() => setActiveTab('quizzes')}
          className={`py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
            activeTab === 'quizzes'
              ? 'bg-[#1E3A8A] text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-850'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Quizzes ({pendingQuestions.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('schools')}
          className={`py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
            activeTab === 'schools'
              ? 'bg-[#1E3A8A] text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-850'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" />
          <span>Schools ({schools.length})</span>
        </button>
        <button
          onClick={() => setActiveTab('feedback')}
          className={`py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all flex flex-col sm:flex-row items-center justify-center gap-1 ${
            activeTab === 'feedback'
              ? 'bg-[#1E3A8A] text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-850'
          }`}
        >
          <ThumbsUp className="w-3.5 h-3.5 text-amber-500" />
          <span>Ratings ({appRatings.length})</span>
        </button>
      </div>

      {/* RENDER VET QUIZZES */}
      {activeTab === 'quizzes' && (
        <div className="space-y-3.5">
          {/* Status filter pills */}
          <div className="flex gap-2 bg-slate-50 p-1 rounded-lg border border-slate-100 w-fit">
            <button
              onClick={() => setQuizFilter('pending')}
              className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                quizFilter === 'pending'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pending Approval ({pendingQuestions.length})
            </button>
            <button
              onClick={() => setQuizFilter('approved')}
              className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                quizFilter === 'approved'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Approved ({approvedQuestions.length})
            </button>
            <button
              onClick={() => setQuizFilter('all')}
              className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${
                quizFilter === 'all'
                  ? 'bg-[#1E3A8A] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Teacher Items ({teacherQuestions.length})
            </button>
          </div>

          {displayedQuestions.length === 0 ? (
            <div className="text-center p-8 bg-slate-50 border border-slate-200/60 rounded-2xl space-y-2">
              <CheckCircle className="w-10 h-10 text-slate-300 mx-auto" />
              <div className="text-xs font-bold text-slate-600">No questions found in this category</div>
              <p className="text-[10px] text-slate-400">
                {quizFilter === 'pending' 
                  ? 'Great job! There are no pending syllabus questions to approve right now.' 
                  : 'Write and publish new test items from the Teacher Zone first.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
              {displayedQuestions.map((q) => (
                <div key={q.id} className="bg-white border border-slate-100 rounded-2xl p-3.5 shadow-sm space-y-2.5">
                  <div className="flex items-start justify-between gap-1.5">
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[9px] font-extrabold bg-blue-50 text-[#1E3A8A] px-2 py-0.5 rounded-full uppercase">
                          {q.type}
                        </span>
                        {q.subjectAlignment && (
                          <span className="text-[9px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">
                            {q.subjectAlignment}
                          </span>
                        )}
                        <span className="text-[8px] font-medium text-slate-400">
                          {q.domain}
                        </span>
                      </div>
                      <h4 className="font-sans font-bold text-slate-800 text-xs mt-1 leading-snug">
                        {q.text}
                      </h4>
                    </div>
                    <div>
                      {q.approvedByOrganiser ? (
                        <span className="text-[9px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase flex items-center gap-0.5">
                          ✓ Approved
                        </span>
                      ) : (
                        <span className="text-[9px] font-extrabold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full uppercase flex items-center gap-0.5">
                          <Clock className="w-2.5 h-2.5" /> Pending
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Multiple choice options */}
                  <div className="grid grid-cols-2 gap-2 text-[10px]">
                    {q.options.map((opt, idx) => {
                      const isCorrect = opt === q.correctAnswer;
                      return (
                        <div 
                          key={idx} 
                          className={`p-2 rounded-xl border ${
                            isCorrect 
                              ? 'border-emerald-200 bg-emerald-50/50 text-emerald-900 font-bold' 
                              : 'border-slate-100 bg-slate-50 text-slate-600'
                          }`}
                        >
                          <span className="text-slate-400 mr-1">{['A', 'B', 'C', 'D'][idx]}.</span> {opt}
                        </div>
                      );
                    })}
                  </div>

                  {q.explanation && (
                    <p className="text-[9px] text-slate-500 bg-slate-50 p-2 rounded-xl italic">
                      💡 <strong>Explanation:</strong> {q.explanation}
                    </p>
                  )}

                  {/* Organiser approval action buttons */}
                  <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-2.5 mt-1">
                    {q.approvedByOrganiser ? (
                      <button
                        onClick={() => onRejectQuestion(q.id)}
                        className="text-[9px] font-bold bg-rose-50 text-rose-700 hover:bg-rose-100 px-2.5 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Revoke Approval
                      </button>
                    ) : (
                      <button
                        onClick={() => onApproveQuestion(q.id)}
                        className="text-[9px] font-bold bg-emerald-700 text-white hover:bg-emerald-800 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all cursor-pointer shadow-xs"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" /> Approve Quiz Item
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* RENDER SCHOOLS REGISTRY */}
      {activeTab === 'schools' && (
        <div className="space-y-4">
          {/* Add school form */}
          <form onSubmit={handleAddSchoolSubmit} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-xs space-y-3">
            <div className="space-y-0.5">
              <h4 className="font-sans font-bold text-slate-800 text-xs flex items-center gap-1">
                <Plus className="w-4 h-4 text-[#1E3A8A]" />
                Add New School to District Registry
              </h4>
              <p className="text-[9px] text-slate-500">Once added, pupils can select this school during system registration.</p>
            </div>

            {schoolError && (
              <div className="text-[10px] text-rose-700 bg-rose-50 p-2 rounded-xl flex items-center gap-1 border border-rose-100">
                <AlertCircle className="w-3.5 h-3.5" /> {schoolError}
              </div>
            )}

            {schoolSuccess && (
              <div className="text-[10px] text-emerald-800 bg-emerald-50 p-2 rounded-xl flex items-center gap-1 border border-emerald-150 font-medium">
                ✓ {schoolSuccess}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. LUPOSOSHI SECONDARY SCHOOL"
                value={newSchool}
                onChange={(e) => setNewSchool(e.target.value.toUpperCase())}
                className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#3B82F6] focus:outline-none"
              />
              <button
                type="submit"
                className="bg-[#1E3A8A] hover:bg-blue-900 text-white text-xs font-bold px-3.5 rounded-xl transition-all flex items-center gap-1 shadow-sm"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
          </form>

          {/* List and Search of schools */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-700">Luwingu Registered Schools Pool</h4>
              <span className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full font-mono">{filteredSchools.length} listed</span>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search registered schools..."
                value={schoolSearch}
                onChange={(e) => setSchoolSearch(e.target.value)}
                className="w-full text-xs pl-8.5 pr-3 py-2 rounded-xl border border-slate-200 focus:border-[#3B82F6] focus:outline-none bg-slate-50"
              />
            </div>

            {/* List */}
            <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden max-h-[220px] overflow-y-auto divide-y divide-slate-50">
              {filteredSchools.length === 0 ? (
                <div className="text-center py-6 text-slate-400 text-[11px]">No schools match your search query.</div>
              ) : (
                filteredSchools.map((s, idx) => (
                  <div key={idx} className="p-2.5 flex items-center justify-between text-xs hover:bg-slate-50 transition-all">
                    <span className="font-semibold text-slate-700 font-sans">{s}</span>
                    <button
                      onClick={() => onDeleteSchool(s)}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-all"
                      title="Remove from district database"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* RENDER INNOVATION RATINGS & FEEDBACK */}
      {activeTab === 'feedback' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2">
              <ThumbsUp className="w-5 h-5 text-amber-700 shrink-0" />
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider">
                Luwingu Innovation Ratings
              </h4>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Below are reviews and ratings submitted by school children and teachers of Luwingu regarding our new 
              <strong> JETS & TETS Offline-First Innovation</strong>. Developed to solve critical network drops and high cellular bundle costs in our district.
            </p>

            {/* Average score card */}
            {appRatings.length > 0 ? (
              <div className="bg-white p-3 rounded-xl border border-amber-250 flex items-center justify-between">
                <div>
                  <span className="text-2xl font-black text-slate-800">
                    {(appRatings.reduce((acc, r) => acc + r.rating, 0) / appRatings.length).toFixed(1)}
                  </span>
                  <span className="text-xs text-slate-400 font-bold"> / 5.0 Rating</span>
                  <p className="text-[9px] text-slate-500 font-medium">{appRatings.length} total reviews</p>
                </div>
                <div className="flex gap-0.5 text-amber-500 text-lg">
                  {Array.from({ length: 5 }).map((_, i) => {
                    const avg = appRatings.reduce((acc, r) => acc + r.rating, 0) / appRatings.length;
                    return (
                      <span key={i}>
                        {i < Math.round(avg) ? '★' : '☆'}
                      </span>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center py-2 text-xs text-amber-900 italic font-medium">
                No ratings submitted yet. Be the first to rate our offline learning hub!
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h5 className="text-xs font-bold text-slate-700">Detailed Feedback logs</h5>
              {onClearRatings && appRatings.length > 0 && (
                <button
                  onClick={onClearRatings}
                  className="text-[9px] font-bold text-rose-700 hover:underline cursor-pointer"
                >
                  Reset Ratings Pool
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-[300px] overflow-y-auto">
              {appRatings.length === 0 ? (
                <div className="bg-white rounded-xl p-6 border border-slate-100 text-center text-[11px] text-slate-400">
                  Waiting for ratings from users...
                </div>
              ) : (
                appRatings.map((r, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-slate-150 space-y-1.5 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-slate-800">{r.user || 'Luwingu Learner'}</span>
                        <span className="text-[9px] text-slate-400 font-mono">{r.date}</span>
                      </div>
                      <div className="flex gap-0.5 text-amber-500 text-xs">
                        {Array.from({ length: r.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                        {Array.from({ length: 5 - r.rating }).map((_, i) => (
                          <span key={i} className="text-slate-200">★</span>
                        ))}
                      </div>
                    </div>
                    {r.comment && (
                      <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg italic">
                        "{r.comment}"
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
