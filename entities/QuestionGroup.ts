import { Question } from './Question';

export interface QuestionGroup {
  id: string;
  order: number;
  phase: string;
  questions: Question[];
  isComplete: boolean;
}
