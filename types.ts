export enum GameType {
  NONE = 'NONE',
  INITIAL = 'INITIAL',   // 초성게임
  CATEGORY = 'CATEGORY', // 카테고리게임
  SPEED = 'SPEED',       // 단어짓기(스피드)
}

export interface VocabularyItem {
  id: string;
  text: string;
  hint?: string;
  // Optional properties for extended games
  emoji?: string;
  pronunciation?: string;
}

export interface GameStats {
  score: number;
  correct: number;
  wrong: number;
  streak: number;
}

export enum Difficulty {
  EASY = 'EASY',     // 순한맛
  MEDIUM = 'MEDIUM', // 중간맛
  HARD = 'HARD',     // 매운맛
}