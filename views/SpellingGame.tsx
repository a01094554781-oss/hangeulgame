import React, { useState, useEffect, useRef } from 'react';
import { VocabularyItem, GameStats } from '../types.ts';
import { Button } from '../components/Button.tsx';
import { checkSpellingWithAI, getAIHint } from '../services/geminiService.ts';
import { ArrowRight, Check, X, Volume2, HelpCircle, Loader2, Lightbulb } from 'lucide-react';

interface Props {
  data: VocabularyItem[];
  onGameOver: (stats: GameStats) => void;
  isLoading: boolean;
}

export const SpellingGame: React.FC<Props> = ({ data, onGameOver, isLoading }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [aiHint, setAiHint] = useState<string | null>(null);
  const [loadingHint, setLoadingHint] = useState(false);
  const [stats, setStats] = useState<GameStats>({ score: 0, correct: 0, wrong: 0, streak: 0 });
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isLoading && inputRef.current) {
        inputRef.current.focus();
    }
  }, [isLoading, currentIndex]);

  const currentWord = data[currentIndex];

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!userInput.trim() || isChecking) return;

    setIsChecking(true);
    const normalizedInput = userInput.trim(); 
    
    // Check spelling
    const aiResponse = await checkSpellingWithAI(normalizedInput, currentWord.text);
    const isActuallyCorrect = aiResponse.toUpperCase().includes("CORRECT");

    setFeedback(aiResponse === "CORRECT" ? "Correct! Great job!" : aiResponse);
    
    if (isActuallyCorrect) {
      setStats(prev => ({
        ...prev,
        score: prev.score + 10 + (prev.streak * 2),
        correct: prev.correct + 1,
        streak: prev.streak + 1
      }));
    } else {
      setStats(prev => ({
        ...prev,
        wrong: prev.wrong + 1,
        streak: 0
      }));
    }
    
    setIsChecking(false);
  };

  const handleGetHint = async () => {
    if (loadingHint || aiHint) return;
    setLoadingHint(true);
    const hint = await getAIHint(currentWord.text);
    setAiHint(hint);
    setLoadingHint(false);
    inputRef.current?.focus();
  };

  const handleNext = () => {
    setFeedback(null);
    setUserInput('');
    setAiHint(null);
    if (currentIndex < data.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onGameOver(stats);
    }
  };

  if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center h-64 text-orange-800">
          <Loader2 className="w-12 h-12 animate-spin mb-4" />
          <p className="font-display text-xl animate-pulse">Mixing ingredients...</p>
        </div>
      );
  }

  if (!currentWord) return <div className="text-center p-8">No data available. Try reloading.</div>;

  const isCorrect = feedback && (feedback.toLowerCase().includes("correct") || feedback.includes("Great job"));

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-6 p-4">
      {/* Progress Bar */}
      <div className="w-full h-4 bg-orange-100 rounded-full overflow-hidden border border-orange-200">
        <div 
          className="h-full bg-orange-400 striped-progress transition-all duration-500"
          style={{ width: `${((currentIndex) / data.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div className="w-full bg-white rounded-3xl shadow-lg border-b-8 border-orange-200 p-8 flex flex-col items-center relative overflow-hidden">
        
        <div className="absolute top-4 right-4">
            <button 
                onClick={handleGetHint}
                disabled={!!aiHint || loadingHint || isCorrect}
                className="text-orange-300 hover:text-orange-500 disabled:opacity-50 transition-colors"
                title="Get AI Hint"
            >
                {loadingHint ? <Loader2 className="animate-spin w-6 h-6"/> : <Lightbulb className="w-6 h-6" />}
            </button>
        </div>

        <span className="text-8xl mb-6 animate-bounce-slight filter drop-shadow-md transform transition-transform hover:scale-110 duration-300 cursor-default">
          {currentWord.emoji || '🍪'}
        </span>
        
        <h2 className="text-3xl font-display text-gray-800 mb-2">{currentWord.hint || ''}</h2>
        <div className="flex items-center text-orange-400 text-base font-medium mb-8 bg-orange-50 px-3 py-1 rounded-lg">
           <Volume2 className="w-4 h-4 mr-2" />
           {currentWord.pronunciation || '...'}
        </div>

        {aiHint && (
            <div className="mb-4 text-sm text-orange-600 bg-orange-50 p-3 rounded-xl border border-orange-100 animate-pop flex gap-2">
                <Lightbulb className="w-4 h-4 shrink-0 mt-0.5" />
                {aiHint}
            </div>
        )}

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="w-full relative">
          <div className="relative">
            <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={!!feedback && isCorrect}
                placeholder="Type here..."
                className={`w-full text-center text-3xl font-display py-4 border-2 rounded-2xl focus:outline-none transition-all shadow-inner
                ${feedback 
                    ? (isCorrect ? 'border-green-400 bg-green-50 text-green-700' : 'border-red-400 bg-red-50 text-red-700')
                    : 'border-orange-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 text-gray-800 bg-gray-50'
                }
                `}
                autoComplete="off"
                lang="ko"
            />
          </div>
          
          {!isCorrect && (
             <Button 
                type="submit" 
                className="w-full mt-6 shadow-md" 
                disabled={!userInput.trim() || isChecking}
            >
                {isChecking ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Check Spelling'}
             </Button>
          )}
        </form>

        {/* Feedback Section */}
        {feedback && (
          <div className={`mt-6 w-full animate-pop`}>
            {!isCorrect && (
                 <div className="bg-red-50 text-red-800 p-4 rounded-xl border border-red-100 mb-4 flex gap-3 items-start">
                    <X className="w-5 h-5 mt-0.5 shrink-0" />
                    <div className="text-left text-sm">{feedback}</div>
                 </div>
            )}

            {isCorrect && (
                <div className="bg-green-50 text-green-800 p-4 rounded-xl border border-green-100 mb-4 flex flex-col items-center gap-2">
                    <Check className="w-8 h-8 text-green-500" />
                    <span className="font-bold text-lg">Perfect!</span>
                </div>
            )}

            <Button 
                onClick={handleNext} 
                variant={isCorrect ? "success" : "secondary"}
                className="w-full"
            >
                {currentIndex === data.length - 1 ? "Finish Game" : "Next Word"} <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-between w-full text-orange-900/50 text-sm font-bold tracking-wide">
         <span className="bg-white/50 px-3 py-1 rounded-lg">SCORE: {stats.score}</span>
         <span className="bg-white/50 px-3 py-1 rounded-lg">{currentIndex + 1} / {data.length}</span>
      </div>
    </div>
  );
};