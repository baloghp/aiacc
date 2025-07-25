export interface Question {
  id: string;
  text: string;
  type: 'yesNo' | 'multipleChoice';
  dependencies?: string[];
  targetAttribute: string;
} 