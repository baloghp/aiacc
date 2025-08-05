export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'yesNo' | 'multipleChoice' | 'singleChoice';
  order: number; // Order number for displaying questions
  options?: QuestionOption[];
  dependencies?: string[];
  tags?: string[]; // Tags to set when this question is answered
}
