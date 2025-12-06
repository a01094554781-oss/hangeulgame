import React, { useState } from 'react';
import { GameType, GameStats, Difficulty } from './types.ts';
import { InitialGame } from './views/InitialGame.tsx';
import { CategoryGame } from './views/CategoryGame.tsx';
import { SpeedGame } from './views/SpeedGame.tsx';
import { Button } from './components/Button.tsx';
import { Cookie, Grid2X2, ArrowLeft, Trophy, Sparkles, Star, Zap, AlignCenterHorizontal } from 'lucide-react';

const App: React.FC = () => {
  const [currentGame, setCurrentGame] = useState<GameType>(GameType.NONE);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.EASY);
  const [lastStats, setLastStats] = useState<GameStats | null>(null);

  const startGame = (type: GameType) => {
    setCurrentGame(type);
    setLastStats(null);
  };

  const handleGameOver = (stats: GameStats) => {
    setLastStats(stats);
  };

  const resetToMenu = () => {
    setCurrentGame(GameType.NONE);
    setLastStats(null);
  };

  return (
    <div className="min-h-screen font-sans text-gray-800 flex flex-col bg-brand-50 selection:bg-brand-200">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-brand-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={resetToMenu}>
            <div className="bg-brand-500 text-white p-2 rounded-xl shadow-md group-hover:scale-110 transition-transform">
                <Cookie className="w-6 h-6" />
            </div>
            <h1 className="text-xl md:text-2xl font-display text-brand-900 tracking-tight mt-1">한글과자 아케이드</h1>
          </div>
          
          {currentGame !== GameType.NONE && (
            <button 
                onClick={resetToMenu}
                className="text-brand-400 hover:text-brand-600 transition-colors p-2 bg-brand-50 rounded-xl hover:bg-brand-100"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col items-center justify-start max-w-4xl">
        
        {currentGame === GameType.NONE ? (
          // MENU SCREEN
          <div className="w-full flex flex-col gap-8 animate-pop py-4">
            
            <section className="text-center space-y-4 mb-4">
               <h2 className="text-4xl md:text-5xl font-display text-brand-900 drop-shadow-sm leading-tight">
                  <span className="text-brand-500">AI</span>와 함께하는<br/>
                  한글 과자 놀이
               </h2>
               <p className="text-brand-800/60 text-lg font-medium">
                  문제를 내드릴게요, 과자로 맞춰보세요!
               </p>
            </section>

            {/* Difficulty Selector */}
            <div className="bg-white p-6 rounded-[2rem] border border-brand-100 shadow-sm">
                <label className="flex items-center gap-2 text-sm font-bold text-brand-400 mb-4 uppercase tracking-wider justify-center">
                    <Sparkles className="w-4 h-4" /> 난이도 선택 (Difficulty)
                </label>
                <div className="grid grid-cols-3 gap-3 md:gap-6">
                    {[
                        { id: Difficulty.EASY, label: '순한맛', desc: '초급', color: 'bg-green-100 text-green-700 ring-green-200' },
                        { id: Difficulty.MEDIUM, label: '중간맛', desc: '중급', color: 'bg-yellow-100 text-yellow-700 ring-yellow-200' },
                        { id: Difficulty.HARD, label: '매운맛', desc: '고급', color: 'bg-red-100 text-red-700 ring-red-200' }
                    ].map(d => (
                            <button 
                            key={d.id}
                            onClick={() => setDifficulty(d.id)}
                            className={`relative px-2 py-4 md:px-6 rounded-2xl border-2 text-center transition-all active:scale-95
                                ${difficulty === d.id 
                                    ? `${d.color} ring-2 ring-offset-2 border-transparent shadow-md font-bold` 
                                    : 'bg-gray-50 text-gray-400 border-gray-100 hover:bg-white hover:border-brand-200'
                                }
                            `}
                            >
                            <div className="font-display text-lg md:text-xl mb-1">{d.label}</div>
                            <div className="text-xs opacity-80 hidden md:block">{d.desc}</div>
                            {difficulty === d.id && (
                                <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-sm text-brand-500">
                                    <Star className="w-4 h-4 fill-current" />
                                </div>
                            )}
                            </button>
                    ))}
                </div>
            </div>

            {/* Game Selection */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Game 1: Initial */}
              <button 
                onClick={() => startGame(GameType.INITIAL)}
                className="group relative bg-brand-100 hover:bg-brand-200 p-6 rounded-[2rem] transition-all duration-300 border-2 border-brand-200 hover:border-brand-300 active:scale-95 text-left overflow-hidden shadow-sm h-64 flex flex-col justify-between"
              >
                 <div className="absolute -top-4 -right-4 text-brand-300/30 group-hover:scale-110 transition-transform duration-500 rotate-12">
                    <AlignCenterHorizontal size={120} />
                 </div>
                 <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center text-brand-600 shadow-sm">
                    <AlignCenterHorizontal className="w-6 h-6"/>
                 </div>
                 <div className="relative z-10">
                    <h3 className="text-2xl font-display text-brand-900 mb-1">초성 게임</h3>
                    <p className="text-brand-800/80 font-medium text-sm leading-snug">
                        제시된 초성을 보고<br/>단어를 만들어보세요.
                    </p>
                 </div>
              </button>

              {/* Game 2: Category */}
              <button 
                onClick={() => startGame(GameType.CATEGORY)}
                className="group relative bg-violet-100 hover:bg-violet-200 p-6 rounded-[2rem] transition-all duration-300 border-2 border-violet-200 hover:border-violet-300 active:scale-95 text-left overflow-hidden shadow-sm h-64 flex flex-col justify-between"
              >
                 <div className="absolute -top-4 -right-4 text-violet-300/30 group-hover:scale-110 transition-transform duration-500 -rotate-12">
                    <Grid2X2 size={120} />
                 </div>
                 <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center text-violet-600 shadow-sm">
                    <Grid2X2 className="w-6 h-6"/>
                 </div>
                 <div className="relative z-10">
                    <h3 className="text-2xl font-display text-violet-900 mb-1">카테고리</h3>
                    <p className="text-violet-900/80 font-medium text-sm leading-snug">
                        주제에 맞는<br/>단어를 찾아보세요.
                    </p>
                 </div>
              </button>

              {/* Game 3: Speed */}
              <button 
                onClick={() => startGame(GameType.SPEED)}
                className="group relative bg-accent/30 hover:bg-accent/50 p-6 rounded-[2rem] transition-all duration-300 border-2 border-accent hover:border-accent-hover active:scale-95 text-left overflow-hidden shadow-sm h-64 flex flex-col justify-between"
              >
                 <div className="absolute -top-4 -right-4 text-accent/30 group-hover:scale-110 transition-transform duration-500 rotate-6">
                    <Zap size={120} />
                 </div>
                 <div className="bg-white w-12 h-12 rounded-2xl flex items-center justify-center text-yellow-600 shadow-sm">
                    <Zap className="w-6 h-6"/>
                 </div>
                 <div className="relative z-10">
                    <h3 className="text-2xl font-display text-brand-900 mb-1">단어 짓기</h3>
                    <p className="text-brand-900/80 font-medium text-sm leading-snug">
                        제시된 단어를<br/>누구보다 빠르게!
                    </p>
                 </div>
              </button>
            </div>

          </div>
        ) : (
          // GAME SCREEN
          <div className="w-full flex flex-col items-center">
             {lastStats ? (
                // GAME OVER OVERLAY
                <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-8 text-center animate-pop border-4 border-brand-100 relative mt-10">
                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
                         <div className="w-24 h-24 bg-accent rounded-full flex items-center justify-center border-4 border-white shadow-lg text-brand-900 animate-bounce-slight">
                            <Trophy className="w-12 h-12" />
                        </div>
                    </div>
                   
                    <h2 className="text-3xl font-display text-gray-800 mb-2 mt-10">게임 종료!</h2>
                    <p className="text-gray-400 font-medium mb-8">재미있게 놀았나요?</p>
                    
                    <div className="space-y-3">
                        <Button onClick={() => startGame(currentGame)} variant="success" className="w-full shadow-lg shadow-accent/20">다시 하기</Button>
                        <Button onClick={resetToMenu} variant="secondary" className="w-full">메뉴로 나가기</Button>
                    </div>
                </div>
             ) : (
                // ACTIVE GAME VIEW
                <>
                    <div className="mb-6 flex items-center gap-2 px-4 py-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-brand-100 text-xs font-bold text-brand-800 uppercase tracking-wide">
                         <span className={`w-2 h-2 rounded-full ${
                             difficulty === Difficulty.EASY ? 'bg-green-500' :
                             difficulty === Difficulty.MEDIUM ? 'bg-yellow-500' : 'bg-red-500'
                         }`}></span>
                        <span>
                            {difficulty === Difficulty.EASY ? '순한맛 (Easy)' : 
                             difficulty === Difficulty.MEDIUM ? '중간맛 (Medium)' : '매운맛 (Hard)'}
                        </span>
                    </div>

                    {currentGame === GameType.INITIAL && (
                        <InitialGame 
                            difficulty={difficulty}
                            onGameOver={handleGameOver}
                            onBack={resetToMenu}
                        />
                    )}
                    {currentGame === GameType.CATEGORY && (
                        <CategoryGame 
                            difficulty={difficulty}
                            onGameOver={handleGameOver}
                        />
                    )}
                    {currentGame === GameType.SPEED && (
                        <SpeedGame 
                            difficulty={difficulty}
                            onGameOver={handleGameOver}
                        />
                    )}
                </>
             )}
          </div>
        )}
      </main>
      
      {/* Footer */}
      <footer className="py-8 text-center text-brand-900/20 text-sm font-display">
        <p>Hangul Cookie Arcade Remake</p>
      </footer>
    </div>
  );
};

export default App;