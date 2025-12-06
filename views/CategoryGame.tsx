import React, { useState, useEffect } from 'react';
import { GameStats, Difficulty } from '../types.ts';
import { Button } from '../components/Button.tsx';
import { generateCategory, generateCategoryExamples } from '../services/geminiService.ts';
import { Loader2, Grid2X2, Lightbulb, ArrowRight } from 'lucide-react';

interface Props {
  difficulty: Difficulty;
  onGameOver: (stats: GameStats) => void;
}

export const CategoryGame: React.FC<Props> = ({ difficulty, onGameOver }) => {
  const [category, setCategory] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [examples, setExamples] = useState<string[]>([]);
  const [showExamples, setShowExamples] = useState(false);
  const [loadingExamples, setLoadingExamples] = useState(false);
  const [round, setRound] = useState(1);

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    setLoading(true);
    setExamples([]);
    setShowExamples(false);
    const newCat = await generateCategory(difficulty);
    setCategory(newCat);
    setLoading(false);
  };

  const handleShowExamples = async () => {
    if (showExamples) return;
    setLoadingExamples(true);
    const exs = await generateCategoryExamples(category);
    setExamples(exs);
    setShowExamples(true);
    setLoadingExamples(false);
  };

  const handleNext = () => {
    setRound(prev => prev + 1);
    loadCategory();
  };

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-6">
      <div className="bg-white rounded-[2rem] p-8 shadow-xl border-2 border-brand-100 w-full text-center relative overflow-hidden">
        <h2 className="text-brand-400 font-bold tracking-widest mb-4 uppercase">문제 {round}</h2>
        
        {loading ? (
           <div className="h-40 flex items-center justify-center">
             <Loader2 className="w-10 h-10 text-brand-400 animate-spin" />
           </div>
        ) : (
           <div className="py-8 bg-brand-50 rounded-3xl border border-brand-100 mb-6">
              <div className="flex justify-center mb-4">
                <div className="bg-white p-3 rounded-2xl shadow-sm text-brand-500">
                    <Grid2X2 className="w-8 h-8" />
                </div>
              </div>
              <div className="text-4xl md:text-5xl font-display text-brand-700 mb-2">{category}</div>
              <p className="text-brand-900/40 text-sm font-medium">이 주제에 맞는 단어를 만들어보세요!</p>
           </div>
        )}

        {/* Examples */}
        {showExamples && (
            <div className="bg-accent-light/50 p-4 rounded-xl border border-accent animate-pop mb-6">
                <h4 className="text-sm font-bold text-brand-800 mb-2 flex items-center justify-center gap-1">
                    <Lightbulb className="w-4 h-4 text-accent" /> 추천 단어
                </h4>
                <div className="flex flex-wrap justify-center gap-2">
                    {examples.map((ex, idx) => (
                        <span key={idx} className="bg-white text-brand-900 px-3 py-1 rounded-full text-lg font-display shadow-sm border border-brand-100">
                            {ex}
                        </span>
                    ))}
                </div>
            </div>
        )}

        <div className="grid gap-3">
             {!showExamples && (
                <Button 
                    onClick={handleShowExamples} 
                    variant="secondary"
                    className="w-full"
                    disabled={loading || loadingExamples}
                >
                    {loadingExamples ? <Loader2 className="animate-spin w-5 h-5"/> : <Lightbulb className="w-5 h-5" />}
                    추천 단어 보기
                </Button>
             )}

             <Button 
                onClick={handleNext} 
                variant="success"
                className="w-full"
                disabled={loading}
             >
                다음 문제 <ArrowRight className="w-5 h-5" />
             </Button>
        </div>
      </div>

      <Button onClick={onGameOver.bind(null, {score: 0, correct: 0, wrong: 0} as GameStats)} variant="secondary" className="mt-4 text-sm py-2">
         그만하기
      </Button>
    </div>
  );
};