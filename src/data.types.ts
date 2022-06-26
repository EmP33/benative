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
}
