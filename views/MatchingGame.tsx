import React, { useState, useEffect } from 'react';
import { VocabularyItem, GameStats, Difficulty } from '../types.ts';
import { Button } from '../components/Button.tsx';
import { Loader2, RefreshCw } from 'lucide-react';

interface Props {
  data: VocabularyItem[];
  difficulty: Difficulty;
  onGameOver: (stats: GameStats) => void;
  onRestart: () => void;
  isLoading: boolean;
}

interface Card {
  id: string; 
  vocabId: string; 
  content: string; 
  type: 'WORD' | 'IMAGE';
  isFlipped: boolean;
  isMatched: boolean;
}

export const MatchingGame: React.FC<Props> = ({ data, difficulty, onGameOver, onRestart, isLoading }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<Card[]>([]);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [targetPairs, setTargetPairs] = useState(6);

  useEffect(() => {
    if (data.length > 0) {
      initializeGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, difficulty]);

  const initializeGame = () => {
    // Determine number of pairs based on difficulty
    let numPairs = 6;
    if (difficulty === Difficulty.EASY) numPairs = 4;
    if (difficulty === Difficulty.MEDIUM) numPairs = 6;
    if (difficulty === Difficulty.HARD) numPairs = 8;
    
    setTargetPairs(numPairs);

    const gameWords = data.slice(0, numPairs);
    
    const cardPairs: Card[] = [];
    gameWords.forEach((word) => {
      // Card 1: Hangul
      cardPairs.push({
        id: `${word.id}-word`,
        vocabId: word.id,
        content: word.text,
        type: 'WORD',
        isFlipped: false,
        isMatched: false,
      });
      // Card 2: Emoji/English
      // For Hard mode, maybe show English text instead of Emoji sometimes? For now, stick to Emoji style for consistency.
      cardPairs.push({
        id: `${word.id}-img`,
        vocabId: word.id,
        content: word.emoji || '🍪',
        type: 'IMAGE',
        isFlipped: false,
        isMatched: false,
      });
    });

    setCards(cardPairs.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMatches(0);
    setMoves(0);
    setWrongAttempts(0);
  };

  const handleCardClick = (card: Card) => {
    if (card.isFlipped || card.isMatched || flippedCards.length >= 2) return;

    const newCards = cards.map(c => c.id === card.id ? { ...c, isFlipped: true } : c);
    setCards(newCards);
    
    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(prev => prev + 1);
      checkForMatch(newFlipped[0], newFlipped[1]);
    }
  };

  const checkForMatch = (card1: Card, card2: Card) => {
    if (card1.vocabId === card2.vocabId) {
      setTimeout(() => {
        setCards(prev => prev.map(c => 
          c.vocabId === card1.vocabId ? { ...c, isMatched: true, isFlipped: true } : c
        ));
        setFlippedCards([]);
        setMatches(prev => {
          const newMatches = prev + 1;
          if (newMatches === targetPairs) {
            onGameOver({
                score: Math.max(0, (targetPairs * 20) - (moves * 5)),
                correct: targetPairs,
                wrong: wrongAttempts,
                streak: 0
            });
          }
          return newMatches;
        });
      }, 500);
    } else {
      setWrongAttempts(prev => prev + 1);
      setTimeout(() => {
        setCards(prev => prev.map(c => 
          c.id === card1.id || c.id === card2.id ? { ...c, isFlipped: false } : c
        ));
        setFlippedCards([]);
      }, 1000);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-orange-800">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="font-display text-xl animate-pulse">Baking cookies...</p>
      </div>
    );
  }

  // Dynamic grid class based on card count
  const gridClass = targetPairs <= 4 
    ? "grid-cols-2 sm:grid-cols-4 max-w-2xl" 
    : "grid-cols-3 sm:grid-cols-4 max-w-4xl";

  return (
    <div className="flex flex-col items-center w-full mx-auto">
      <div className="flex justify-between items-center w-full max-w-4xl mb-6 px-4">
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-orange-100">
            <span className="text-orange-900 font-display text-lg">Moves: <span className="text-orange-600 font-bold">{moves}</span></span>
        </div>
        <Button size="sm" variant="secondary" onClick={onRestart}>
          <RefreshCw className="w-4 h-4 mr-1" /> Restart
        </Button>
      </div>

      <div className={`grid gap-3 sm:gap-4 w-full px-2 ${gridClass}`}>
        {cards.map(card => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card)}
            disabled={card.isFlipped || card.isMatched}
            className={`
              aspect-[3/4] sm:aspect-square rounded-2xl shadow-[0_4px_0_0_rgba(0,0,0,0.05)] flex flex-col items-center justify-center transition-all duration-300 transform perspective-1000 relative
              ${card.isFlipped || card.isMatched ? 'rotate-y-180 bg-white border-4 border-orange-100' : 'bg-cookie-400 border-b-8 border-cookie-500 hover:translate-y-[-2px] hover:shadow-md'}
            `}
          >
            {(card.isFlipped || card.isMatched) ? (
              <div className="animate-pop flex flex-col items-center">
                {card.type === 'IMAGE' ? (
                  <span className="text-5xl sm:text-6xl filter drop-shadow-sm" role="img" aria-label="emoji">{card.content}</span>
                ) : (
                  <span className="text-2xl sm:text-3xl font-display text-orange-900 break-keep leading-tight px-1 font-bold">
                    {card.content}
                  </span>
                )}
              </div>
            ) : (
              <div className="text-cookie-200 opacity-60">
                 <span className="text-4xl">🍪</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};