import React, { useState, useEffect } from 'react';
import { Lightbulb, Check, ChevronLeft, AlertCircle, Plus, Trash } from 'lucide-react';
import { Participant, Project, DomainType, FocusAreaType, DomainType as DType } from '../types';

interface RegistrationModuleProps {
  selectedParticipant: Participant;
  onSubmitProject: (project: Omit<Project, 'id' | 'createdAt' | 'synced'>) => void;
  onBack: () => void;
}

const DOMAIN_FOCUS_AREAS: Record<DomainType, FocusAreaType[]> = {
  'Sustainable Systems & Environment (SSE)': [
    'Climate adaptation',
    'Renewable energy',
    'Waste management',
    'Water systems'
  ],
  'Health, Food & Human Wellbeing System (HFWS)': [
    'Public health solutions',
    'Nutrition systems',
    'Food security',
    'Water safety'
  ],
  'Digital, Robotics & Intelligent Systems (DRIS)': [
    'Software solutions',
    'Automation',
    'IoT systems',
    'AI applications'
  ],
  'Engineering, Design & Production Systems (EDPS)': [
    'Infrastructure design',
    'Manufacturing systems',
    'Product design',
    'Smart mobility'
  ],
  'Mathematical Modelling & Investigation (MMSI)': [
    'Data analysis',
    'Simulation models',
    'Scientific research',
    'Evidence validation'
  ]
};

export default function RegistrationModule({
  selectedParticipant,
  onSubmitProject,
  onBack
}: RegistrationModuleProps) {
  const [title, setTitle] = useState('');
  const [domain, setDomain] = useState<DomainType>('Sustainable Systems & Environment (SSE)');
  const [focusArea, setFocusArea] = useState<FocusAreaType>('Climate adaptation');
  const [description, setDescription] = useState('');
  const [materialsUsed, setMaterialsUsed] = useState('');
  
  // Co-innovators state (Up to 5 participants per JETS rule)
  const [coInnovators, setCoInnovators] = useState<string[]>([]);
  const [newInnovator, setNewInnovator] = useState('');
  
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // Update focus area list when domain changes
  useEffect(() => {
    const areas = DOMAIN_FOCUS_AREAS[domain];
    if (areas && areas.length > 0) {
      setFocusArea(areas[0]);
    }
  }, [domain]);

  const handleAddCoInnovator = () => {
    if (!newInnovator.trim()) return;
    if (coInnovators.length >= 4) { // 1 primary + 4 co-innovators = 5 participants total
      alert("A standard JETS project can have a maximum of 5 participants in total!");
      return;
    }
    setCoInnovators([...coInnovators, newInnovator.trim()]);
    setNewInnovator('');
  };

  const handleRemoveCoInnovator = (idx: number) => {
    setCoInnovators(coInnovators.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please write a name/title for your project.');
      return;
    }
    if (!description.trim()) {
      setError('Please write a short explanation of how your project works.');
      return;
    }
    if (!materialsUsed.trim()) {
      setError('Please tell us what materials you used to build it.');
      return;
    }

    setError('');
    
    // Compile co-innovators list into description or append
    const finalMaterials = materialsUsed.trim();
    const finalDescription = coInnovators.length > 0 
      ? `${description.trim()}\n\n[Co-Innovators: ${coInnovators.join(', ')}]`
      : description.trim();

    onSubmitProject({
      title: title.trim(),
      domain,
      focusArea,
      participantId: selectedParticipant.id,
      participantName: selectedParticipant.name,
      school: selectedParticipant.school,
      description: finalDescription,
      materialsUsed: finalMaterials
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onBack();
    }, 2000);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <button
          id="project-back-btn"
          onClick={onBack}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-all cursor-pointer text-slate-600"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div>
          <h3 className="font-sans font-bold text-slate-800 text-sm flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            JETS & TETS Project Submission
          </h3>
          <p className="text-[10px] text-slate-500">Submit your prototype to the Luwingu district showcase.</p>
        </div>
      </div>

      {isSuccess ? (
        <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center space-y-3 shadow-sm py-16">
          <div className="w-14 h-14 bg-blue-100 text-[#1E3A8A] rounded-full flex items-center justify-center mx-auto text-2xl font-bold">✓</div>
          <h4 className="font-bold text-slate-800 text-base">Project Registered Successfully!</h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            Your project was saved locally on this tablet/phone. It will appear on the teacher's dashboard and is queued to synchronize when you connect.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          {error && (
            <div className="text-xs text-rose-700 bg-rose-50 p-2.5 rounded-xl font-medium border border-rose-100 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Primary Innovator Note */}
          <div className="bg-blue-50 border border-blue-100/50 p-2.5 rounded-xl text-blue-950 text-[11px] leading-relaxed">
            Primary Innovator: <strong className="text-[#1E3A8A]">{selectedParticipant.name}</strong> • 
            School: <strong className="text-[#1E3A8A]">{selectedParticipant.school}</strong>
          </div>

          {/* 1. Project Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Project / Prototype Title</label>
            <input
              id="project-title-input"
              type="text"
              placeholder="e.g. Solar powered chicken egg incubator"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#3B82F6] focus:outline-none"
              required
            />
          </div>

          {/* 2. Domain & Focus Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Domain</label>
              <select
                id="project-domain-select"
                value={domain}
                onChange={(e) => setDomain(e.target.value as DomainType)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#3B82F6] focus:outline-none bg-white text-slate-700 font-semibold"
              >
                {Object.keys(DOMAIN_FOCUS_AREAS).map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Focus Area</label>
              <select
                id="project-focus-select"
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value as FocusAreaType)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#3B82F6] focus:outline-none bg-white text-slate-700"
              >
                {DOMAIN_FOCUS_AREAS[domain]?.map(fa => (
                  <option key={fa} value={fa}>{fa}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Team Members (JETS Rule: Max 5 participants) */}
          <div className="border border-slate-100 p-3 rounded-xl space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-slate-700">Team Members (Up to 5 total)</label>
              <span className="text-[10px] text-slate-500 font-semibold">{coInnovators.length + 1} of 5 registered</span>
            </div>

            {coInnovators.length > 0 && (
              <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 rounded-lg">
                {coInnovators.map((name, i) => (
                  <span key={i} className="inline-flex items-center gap-1 bg-white border border-slate-200 text-slate-700 text-[10px] px-2 py-0.5 rounded-full font-medium">
                    {name}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveCoInnovator(i)}
                      className="text-rose-500 hover:text-rose-700 font-bold ml-0.5"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}

            {coInnovators.length < 4 && (
              <div className="flex gap-1.5">
                <input
                  id="project-co-innovator-input"
                  type="text"
                  placeholder="Enter partner name..."
                  value={newInnovator}
                  onChange={(e) => setNewInnovator(e.target.value)}
                  className="flex-1 text-[11px] p-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#3B82F6]"
                />
                <button
                  id="add-co-innovator-btn"
                  type="button"
                  onClick={handleAddCoInnovator}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold px-3 py-2 rounded-lg transition-all"
                >
                  Add Partner
                </button>
              </div>
            )}
          </div>

          {/* 4. Materials Used (Crucial JETS field) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Materials Used (How did you build it?)</label>
            <textarea
              id="project-materials-input"
              rows={2}
              placeholder="e.g. Cardboard box, old plastic water bottle, clay, copper wires, 1.5v battery, small school light bulb."
              value={materialsUsed}
              onChange={(e) => setMaterialsUsed(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#3B82F6] focus:outline-none"
              required
            />
          </div>

          {/* 5. Project Description */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Project Description & How It Works</label>
            <textarea
              id="project-description-input"
              rows={3}
              placeholder="e.g. This project helps dry vegetables using solar energy. The black plastic captures heat and the bottle lets hot air blow across. This keeps the food secure for a long time."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:border-[#3B82F6] focus:outline-none"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            id="project-submit-form-btn"
            type="submit"
            className="w-full bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm font-sans"
          >
            <Check className="w-4 h-4" />
            Submit Project to Showcase
          </button>
        </form>
      )}
    </div>
  );
}
