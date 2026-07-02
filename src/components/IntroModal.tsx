import React, { useState } from 'react';
import { Award, Star, X, Info, Heart } from 'lucide-react';

interface IntroModalProps {
  onClose: () => void;
  onSubmitRating: (rating: number, comment: string) => void;
  hasAlreadyRated?: boolean;
}

export default function IntroModal({
  onClose,
  onSubmitRating,
  hasAlreadyRated = false
}: IntroModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitRating(rating, comment);
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="absolute inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 select-none">
      <div 
        id="intro-modal-card" 
        className="w-full max-w-sm bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90%] overflow-y-auto animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Banner */}
        <div className="bg-gradient-to-br from-[#1E3A8A] to-blue-900 text-white p-5 text-center relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full text-slate-200 hover:text-white transition-all cursor-pointer"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-2 shadow-md animate-bounce">
            <Award className="w-7 h-7 text-white" />
          </div>
          <h2 className="font-sans font-black text-sm tracking-tight">Luwingu District JETS & TETS</h2>
          <p className="text-[10px] text-amber-300 font-bold uppercase tracking-wider mt-0.5">Offline-First Learning Hub</p>
        </div>

        {/* Content Area */}
        <div className="p-5 space-y-4 flex-1">
          {/* Developer Acknowledgements */}
          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-3.5 space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Info className="w-4 h-4 text-[#1E3A8A]" />
              <span>Developer Acknowledgement</span>
            </div>
            
            <div className="space-y-2 text-[11px] leading-relaxed">
              <div>
                <p className="text-slate-400 font-medium">Lead Developer:</p>
                <p className="font-bold text-slate-800">Mr. Busiku Kapikanya</p>
                <p className="text-slate-500 italic">ICT Teacher at Misambula Day Secondary School</p>
              </div>
              
              <div className="border-t border-slate-150 pt-2">
                <p className="text-slate-400 font-medium">Co-developer:</p>
                <p className="font-bold text-slate-800">Mr. Loyd Chimponda</p>
                <p className="text-slate-500 italic">Teacher at Chifumo Day Secondary School</p>
              </div>
            </div>
          </div>

          {/* District Innovation Motivation Description */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 flex items-center gap-1.5 text-[11px]">
              💡 District Network Innovation Concept
            </h4>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              This system was arrived at looking at how best we can make <strong>NEW JETS</strong> and <strong>TETS</strong> workable in Luwingu District, despite key network coverage challenges and bundle resource constraints.
            </p>
            <div className="bg-slate-50 rounded-xl p-2.5 space-y-1 text-[10px] text-slate-500">
              <p><strong>JETS:</strong> Junior Engineers, Technicians, and Scientists</p>
              <p><strong>TETS:</strong> Tertiary Engineers, Technicians, and Scientists</p>
            </div>
          </div>

          {/* Rating Prompt / Interactive Widget */}
          <div className="border-t border-slate-100 pt-3.5">
            {isSubmitted ? (
              <div className="text-center py-4 space-y-2">
                <div className="text-3xl">❤️</div>
                <h4 className="font-sans font-bold text-[#1E3A8A] text-xs">Thank you for rating us!</h4>
                <p className="text-[10px] text-slate-500">Your review helps prove our Luwingu offline innovation is ready for Android deployment!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="text-center">
                  <h4 className="font-bold text-slate-800 text-xs">Rate our JETS/TETS Innovation!</h4>
                  <p className="text-[10px] text-slate-400">Help our district win the national science showcase.</p>
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((starValue) => {
                    const isLit = hoverRating !== null ? starValue <= hoverRating : starValue <= rating;
                    return (
                      <button
                        key={starValue}
                        type="button"
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(null)}
                        className="p-1 hover:scale-120 transition-all cursor-pointer text-2xl text-amber-400 focus:outline-none"
                      >
                        {isLit ? '★' : '☆'}
                      </button>
                    );
                  })}
                </div>

                {/* Comment input */}
                <div>
                  <textarea
                    placeholder="Suggest features or share your feedback..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full p-2 text-[11px] border border-slate-200 rounded-xl focus:outline-none focus:border-[#3B82F6] min-h-[55px] bg-slate-50 focus:bg-white resize-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2 rounded-xl text-xs transition-all cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-bold py-2 rounded-xl text-xs shadow-md transition-all cursor-pointer"
                  >
                    Submit & Save
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Simple visual stamp footer */}
        <div className="bg-slate-50 p-3 border-t border-slate-100 text-center shrink-0 flex items-center justify-center gap-1">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span className="text-[10px] text-slate-400 font-mono">Misambula Day & Chifumo Day Coop</span>
        </div>
      </div>
    </div>
  );
}
