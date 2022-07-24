export interface TaskType {
  id: string;
  correctAnswer: string | [];
  answers?: string[];
  translation: string;
  order: number;
  question: string;
  title: string;
  type: string;
}

export interface PartType {
  id: string;
  status: number;
  title: string;
  tasks: TaskType;
  words: [];
  order: number;
}

export interface LessonType {
  category: string;
  date: number;
  description: string;
  id: string;
  parts: PartType;
  status: number;
  title: string;
  order: number;
}

export interface WordType {
  status: string;
  id: string;
  known: boolean;
  word: {
    translation: string;
    word: string[];
  };
}

export interface AppCategoryType {
  title: string;
  description: string;
  id: string;
}

export interface FlashCardWordType {
  concept: string;
  definition: string;
  active?: boolean;
  status: string;
}

export interface FlashCardSetType {
  title: string;
  id: string;
  words: FlashCardWordType[];
}

export interface BadgeType {
  title: string;
  id: string;
  description: string;
  finished: boolean;
}

export interface SituationWordType {
  id: number;
  status: string;
  translation: string;
  word: string | string[];
  active?: boolean;
}

export interface SituationLessonType {
  id: number;
  order: number;
  status: number;
  title: string;
  words: SituationWordType[];
}
