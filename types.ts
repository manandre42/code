export enum Difficulty {
  EASY = 'Iniciante',
  MEDIUM = 'Intermediário',
  HARD = 'Avançado',
  EXPERT = 'Mestre'
}

export enum MissionStatus {
  LOCKED = 'LOCKED',
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED'
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  storyline: string; // The narrative text
  clueUrl?: string; // The external GitHub Page URL (simulated)
  difficulty: Difficulty;
  xpReward: number;
  answerHash: string; // In a real app, this would be hashed. Here simple string for demo.
  hint: string; // A static hint, or prompt for AI
  requiredLevel: number;
}

export interface UserState {
  level: number;
  currentXp: number;
  completedMissions: string[]; // IDs
  unlockedBadges: string[];
  username: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}