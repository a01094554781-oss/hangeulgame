import React, { useState, useEffect, useRef } from 'react';
import { GameStats, Difficulty, VocabularyItem } from '../types.ts';
import { Button } from '../components/Button.tsx';
import { fetchSpeedWords } from '../services/geminiService.ts';
import { Loader2, Timer, CheckCircle, Sparkles, XCircle, ArrowRight } from 'lucide-react';

interface Props {
  difficulty: Difficulty;
  onGameOver: (stats: GameStats) => void;
}

export const SpeedGame: React.FC<Props> = ({ difficulty, onGameOver }) => {
  const [words, setWords] = useState<VocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);

  // Use 'any' for timer ref to avoid NodeJS.Timeout vs number issues in some environments
  const timerRef = useRef<any>(null);

  useEffect(() => {
    initGame();
    return () => clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (gameActive && timeLeft > 0) {
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    endGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [gameActive]);

  const initGame = async () => {
    setLoading(true);
    const data = await fetchSpeedWords(difficulty);
    setWords(data);
    setLoading(false);
    setGameActive(true);
  };

  const endGame = () => {
    setGameActive(false);
    clearInterval(timerRef.current);
    onGameOver({ score, correct: score / 10, wrong: 0, streak: 0 });
  };

  const handleNextWord = () => {
    if (!gameActive) return;
    setScore(prev => prev + 10);
    nextCard();
  };

  const handlePass = () => {
    if (!gameActive) return;
    nextCard();
  };

  const nextCard = () => {
    if (currentIndex < words.length - 1) {
        setCurrentIndex(prev => prev + 1);
    } else {
        // Loop randomly to keep going
        setCurrentIndex(Math.floor(Math.random() * words.length));
    }
  }

  if (loading) {
     return (
        <div className="flex flex-col items-center justify-center h-64 text-brand-800">
          <Loader2 className="w-12 h-12 animate-spin mb-4" />
          <p className="font-display text-xl animate-pulse text-brand-500">주문서를 가져오는 중...</p>
        </div>
      );
  }

  const currentWord = words[currentIndex];

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-6">
      
      {/* Timer Header */}
      <div className="flex items-center gap-2 bg-brand-600 text-white px-6 py-2 rounded-full font-bold text-xl shadow-lg border-2 border-brand-400">
         <Timer className={`w-6 h-6 ${timeLeft < 10 ? 'animate-pulse text-accent' : ''}`} />
         <span>{timeLeft}초</span>
      </div>

      {/* Main Order Card */}
      <div className="w-full bg-white rounded-[2.5rem] p-8 shadow-xl border-4 border-brand-100 text-center relative overflow-hidden flex flex-col items-center min-h-[320px] justify-center">
         
         <div className="mb-4 flex flex-col items-center">
             <div className="bg-brand-50 p-4 rounded-full mb-2 shadow-inner">
                <Sparkles className="w-8 h-8 text-accent" />
             </div>
             <div className="text-sm text-brand-300 font-bold tracking-widest uppercase">Make this word</div>
         </div>
         
         <div className="py-6 w-full my-2">
            <div className="text-6xl md:text-7xl font-display text-brand-900 mb-4 drop-shadow-sm leading-tight">{currentWord?.text}</div>
            <div className="text-brand-400 font-medium text-lg bg-brand-50 inline-block px-4 py-1 rounded-full">{currentWord?.hint}</div>
         </div>

         <p className="text-brand-900/30 text-xs mt-2 font-medium">
            빨리 만들고 '다음문제' 버튼을 누르세요!
         </p>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4 w-full px-2">
         <button 
            onClick={handlePass} 
            className="h-20 rounded-2xl border-2 border-brand-100 text-brand-300 font-display text-xl hover:bg-brand-50 active:scale-95 transition-all flex flex-col items-center justify-center gap-1"
         >
            <XCircle className="w-6 h-6 opacity-50" />
            <span>패스</span>
         </button>
         <button 
            onClick={handleNextWord} 
            className="h-20 rounded-2xl bg-accent text-brand-900 font-display text-2xl shadow-[0_4px_0_0_#d97706] hover:bg-accent-hover active:shadow-none active:translate-y-[4px] transition-all flex flex-col items-center justify-center gap-1"
         >
            <ArrowRight className="w-6 h-6" />
            <span>다음문제</span>
         </button>
      </div>
    </div>
  );
};