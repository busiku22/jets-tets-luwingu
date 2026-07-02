import React, { useState } from 'react';
import { Users, Lightbulb, BookOpen, ChevronLeft, Plus, Trash, AlertCircle, FileSpreadsheet, Check, Send } from 'lucide-react';
import { Participant, Project, Question, DomainType, FocusAreaType, SubjectAlignmentType, LUWINGU_SCHOOLS } from '../types';

interface TeacherDashboardProps {
  participants: Participant[];
  projects: Project[];
  questions: Question[];
  onAddQuestion: (q: Question) => void;
  onDeleteProject: (id: string) => void;
  onBack: () => void;
}

export default function TeacherDashboard({
  participants,
  projects,
  questions,
  onAddQuestion,
  onDeleteProject,
  onBack
}: TeacherDashboardProps) {
  const [activeSubTab, setActiveSubTab] = useState<'roster' | 'projects' | 'new-question'>('roster');
  
  // New Question form state
  const [qType, setQType] = useState<'quiz' | 'olympiad'>('quiz');
  const [qDomain, setQDomain] = useState<DomainType>('Sustainable Systems & Environment (SSE)');
  const [qFocusArea, setQFocusArea] = useState<string>('Climate adaptation');
  const [qSubjectAlignment, setQSubjectAlignment] = useState<SubjectAlignmentType>('Primary Science');
  const [qSection, setQSection] = useState<'Section A' | 'Section B'>('Section A');
  const [qText, setQText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState<number>(0);
  const [qExplanation, setQExplanation] = useState('');
  
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  const handleAddQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!qText.trim()) { setFormError('Please enter the question text.'); return; }
    if (!optA.trim() || !optB.trim() || !optC.trim() || !optD.trim()) { 
      setFormError('Please fill in all four options.'); 
      return; 
    }
    
    setFormError('');
    const options = [optA.trim(), optB.trim(), optC.trim(), optD.trim()];
    const correctAnswer = options[correctAnswerIndex];

    const newQ: Question = {
      id: `teacher-q-${Date.now()}`,
      type: qType,
      domain: qDomain,
      focusArea: qFocusArea as FocusAreaType,
      subjectAlignment: qType === 'olympiad' ? qSubjectAlignment : undefined,
      section: qType === 'olympiad' ? qSection : undefined,
      text: qText.trim(),
      options,
      correctAnswer,
      points: qType === 'quiz' ? 10 : 20,
      explanation: qExplanation.trim() || 'Custom teacher verified scientific challenge.',
      createdByTeacher: true
    };

    onAddQuestion(newQ);
    setFormSuccess(true);
    
    // Reset fields
    setQText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setQExplanation('');
    
    setTimeout(() => {
      setFormSuccess(false);
    }, 2000);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <button
          id="teacher-back-btn"
          onClick={onBack}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-all cursor-pointer text-slate-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h3 className="font-sans font-bold text-slate-800 text-sm flex items-center gap-1">
            <span>🛡️</span>
            <span>Teacher Admin Control</span>
          </h3>
          <p className="text-[10px] text-slate-500">Review district files, view rosters and write syllabus test items.</p>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="grid grid-cols-3 bg-slate-100 p-1 rounded-xl shrink-0">
        <button
          id="subtab-roster-btn"
          onClick={() => setActiveSubTab('roster')}
          className={`py-1.5 text-[11px] font-bold rounded-lg transition-all ${
            activeSubTab === 'roster'
              ? 'bg-[#1E3A8A] text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Roster ({participants.length})
        </button>
        <button
          id="subtab-projects-btn"
          onClick={() => setActiveSubTab('projects')}
          className={`py-1.5 text-[11px] font-bold rounded-lg transition-all ${
            activeSubTab === 'projects'
              ? 'bg-[#1E3A8A] text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Projects ({projects.length})
        </button>
        <button
          id="subtab-new-q-btn"
          onClick={() => setActiveSubTab('new-question')}
          className={`py-1.5 text-[11px] font-bold rounded-lg transition-all ${
            activeSubTab === 'new-question'
              ? 'bg-[#1E3A8A] text-white shadow-sm'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          + Add Question
        </button>
      </div>

      {/* 1. STUDENT ROSTER */}
      {activeSubTab === 'roster' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h4 className="text-xs font-bold text-slate-700">Registered Cohort (Luwingu schools)</h4>
            <span className="text-[10px] text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded-full">
              Local Storage DB
            </span>
          </div>

          {participants.length === 0 ? (
            <div className="text-center p-8 bg-slate-50 rounded-2xl text-slate-400 text-xs italic">
              No students registered on this device yet. Ask students to sign up!
            </div>
          ) : (
            <div className="space-y-2 max-h-[480px] overflow-y-auto">
              {participants.map(p => (
                <div key={p.id} className="p-3 bg-white rounded-xl border border-slate-100 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{p.gender === 'Boy' ? '👦' : p.gender === 'Girl' ? '👧' : '✨'}</span>
                    <div>
                      <div className="font-bold text-xs text-slate-800">{p.name}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">
                        {p.grade} • {p.school}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block text-[9px] font-bold px-2 py-0.2 rounded-full uppercase ${
                      p.category === 'JETS' ? 'bg-blue-100 text-[#1E3A8A]' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {p.category}
                    </span>
                    <span className="block text-[8px] text-slate-400 mt-0.5">
                      {p.synced ? 'Synced ✓' : 'Local Queue'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 2. JETS PROJECTS LIST */}
      {activeSubTab === 'projects' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h4 className="text-xs font-bold text-slate-700">Showcase Prototypes</h4>
            <span className="text-[10px] text-slate-500 font-semibold">{projects.length} Registered</span>
          </div>

          {projects.length === 0 ? (
            <div className="text-center p-8 bg-slate-50 rounded-2xl text-slate-400 text-xs italic">
              No scientific prototypes submitted yet.
            </div>
          ) : (
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {projects.map(pj => (
                <div key={pj.id} className="p-3 bg-white rounded-xl border border-slate-100 space-y-2 shadow-sm relative">
                  
                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to remove this project submission?")) {
                        onDeleteProject(pj.id);
                      }
                    }}
                    className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 transition-all cursor-pointer p-1 rounded-lg hover:bg-slate-50"
                    title="Delete project submission"
                  >
                    <Trash className="w-3.5 h-3.5" />
                  </button>

                  <div className="space-y-1 pr-6">
                    <span className="inline-block text-[8px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full uppercase">
                      {pj.domain.split(' ')[0]}
                    </span>
                    <h5 className="font-extrabold text-slate-900 text-xs leading-snug">{pj.title}</h5>
                    <p className="text-[10px] text-slate-500 font-semibold">
                      By: {pj.participantName} ({pj.school})
                    </p>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-lg text-[10px] space-y-1 border border-slate-100/50">
                    <div>
                      <strong className="text-slate-700">Raw Materials Used:</strong>
                      <p className="text-slate-600 italic mt-0.5">{pj.materialsUsed}</p>
                    </div>
                    <div className="pt-1.5 border-t border-slate-200/50">
                      <strong className="text-slate-700">Operational description:</strong>
                      <p className="text-slate-600 mt-0.5 whitespace-pre-wrap">{pj.description}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[9px] text-slate-400 font-medium">
                    <span>Submitted {new Date(pj.createdAt).toLocaleDateString()}</span>
                    <span>{pj.synced ? 'Synced ✓' : 'Local Queue'}</span>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. NEW QUESTION BUILDER */}
      {activeSubTab === 'new-question' && (
        <form onSubmit={handleAddQuestionSubmit} className="space-y-3.5 bg-white p-3.5 rounded-2xl border border-slate-100 shadow-sm">
          <div className="text-center pb-2 border-b border-slate-100">
            <h4 className="font-bold text-slate-800 text-xs uppercase flex items-center justify-center gap-1">
              <Plus className="w-4 h-4 text-[#1E3A8A]" />
              Write New Academic Challenge
            </h4>
            <p className="text-[9px] text-slate-500 mt-0.5">Define quiz or olympiad items corresponding to domain areas.</p>
          </div>

          {formSuccess ? (
            <div className="py-4 text-center text-blue-850 font-bold space-y-2">
              <div className="w-10 h-10 bg-blue-100 text-[#1E3A8A] rounded-full flex items-center justify-center mx-auto">✓</div>
              <div className="text-xs">Question Added to Active Pool!</div>
              <p className="text-[10px] text-slate-500 font-normal">Stored locally. Safe to test immediately.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {formError && <div className="text-xs text-rose-600 bg-rose-50 p-2 rounded-lg font-semibold">{formError}</div>}

              {/* Quiz vs Olympiad Toggle */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Target Assessment</label>
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setQType('quiz')}
                    className={`py-1 text-xs font-bold rounded-lg transition-all ${
                      qType === 'quiz'
                        ? 'bg-slate-950 text-white'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Quiz (10 pts)
                  </button>
                  <button
                    type="button"
                    onClick={() => setQType('olympiad')}
                    className={`py-1 text-xs font-bold rounded-lg transition-all ${
                      qType === 'olympiad'
                        ? 'bg-slate-950 text-white'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    Olympiad (20 pts)
                  </button>
                </div>
              </div>

              {/* Domain Selection */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Domain Area</label>
                <select
                  value={qDomain}
                  onChange={(e) => setQDomain(e.target.value as DomainType)}
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none bg-white text-slate-700"
                >
                  <option value="Sustainable Systems & Environment (SSE)">Sustainable Systems & Environment (SSE)</option>
                  <option value="Health, Food & Human Wellbeing System (HFWS)">Health, Food & Human Wellbeing System (HFWS)</option>
                  <option value="Digital, Robotics & Intelligent Systems (DRIS)">Digital, Robotics & Intelligent Systems (DRIS)</option>
                  <option value="Engineering, Design & Production Systems (EDPS)">Engineering, Design & Production Systems (EDPS)</option>
                  <option value="Mathematical Modelling & Investigation (MMSI)">Mathematical Modelling & Investigation (MMSI)</option>
                </select>
              </div>

              {/* Focus Area Text Input */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Focus Area Focus</label>
                  <input
                    type="text"
                    value={qFocusArea}
                    onChange={(e) => setQFocusArea(e.target.value)}
                    placeholder="e.g. Climate adaptation"
                    className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none"
                    required
                  />
                </div>
                {qType === 'olympiad' ? (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Subject Alignment</label>
                    <select
                      value={qSubjectAlignment}
                      onChange={(e) => setQSubjectAlignment(e.target.value as SubjectAlignmentType)}
                      className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none bg-white text-slate-700"
                    >
                      <option value="Primary Science">Primary Science</option>
                      <option value="Primary Creative & Technology Studies">Creative & Tech Studies</option>
                      <option value="Primary Mathematics">Primary Math</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Syllabus Criteria</label>
                    <span className="block text-[10px] text-slate-400 mt-1.5 font-bold italic">Round robin format</span>
                  </div>
                )}
              </div>

              {/* For Olympiad: Section choice */}
              {qType === 'olympiad' && (
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Section</label>
                  <div className="grid grid-cols-2 gap-2 bg-slate-50 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setQSection('Section A')}
                      className={`py-0.5 text-[11px] rounded transition-all ${
                        qSection === 'Section A' ? 'bg-amber-500 text-white font-bold' : 'text-slate-500'
                      }`}
                    >
                      Section A
                    </button>
                    <button
                      type="button"
                      onClick={() => setQSection('Section B')}
                      className={`py-0.5 text-[11px] rounded transition-all ${
                        qSection === 'Section B' ? 'bg-blue-500 text-white font-bold' : 'text-slate-500'
                      }`}
                    >
                      Section B
                    </button>
                  </div>
                </div>
              )}

              {/* Question text */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Question Text</label>
                <textarea
                  rows={2}
                  value={qText}
                  onChange={(e) => setQText(e.target.value)}
                  placeholder="Ask a scientific, local, or mathematical question..."
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none"
                  required
                />
              </div>

              {/* Four options */}
              <div className="space-y-1.5">
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Multiple Choice Options</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={optA}
                    onChange={(e) => setOptA(e.target.value)}
                    placeholder="Option A"
                    className="text-xs p-2 rounded-lg border border-slate-200 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    value={optB}
                    onChange={(e) => setOptB(e.target.value)}
                    placeholder="Option B"
                    className="text-xs p-2 rounded-lg border border-slate-200 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    value={optC}
                    onChange={(e) => setOptC(e.target.value)}
                    placeholder="Option C"
                    className="text-xs p-2 rounded-lg border border-slate-200 focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    value={optD}
                    onChange={(e) => setOptD(e.target.value)}
                    placeholder="Option D"
                    className="text-xs p-2 rounded-lg border border-slate-200 focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Correct Answer Selection */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Mark Correct Answer</label>
                <div className="grid grid-cols-4 gap-1.5">
                  {['A', 'B', 'C', 'D'].map((letter, idx) => (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => setCorrectAnswerIndex(idx)}
                      className={`py-1.5 rounded-lg border text-xs font-bold transition-all ${
                        correctAnswerIndex === idx
                          ? 'border-[#3B82F6] bg-blue-50 text-[#1E3A8A] font-extrabold ring-1 ring-[#3B82F6]'
                          : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      Option {letter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Explanation */}
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Scientific Explanation (Why is it correct?)</label>
                <input
                  type="text"
                  value={qExplanation}
                  onChange={(e) => setQExplanation(e.target.value)}
                  placeholder="Explain the science to help children learn..."
                  className="w-full text-xs p-2 rounded-lg border border-slate-200 focus:outline-none"
                />
              </div>

              {/* Submit */}
              <button
                id="submit-teacher-q-btn"
                type="submit"
                className="w-full bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold py-2 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm font-sans"
              >
                <Check className="w-4 h-4" />
                Publish & Save Question
              </button>
            </div>
          )}
        </form>
      )}

    </div>
  );
}
