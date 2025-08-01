export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'yesNo' | 'multipleChoice' | 'singleChoice' | 'text';
  options?: QuestionOption[];
  dependencies?: string[];
  tags?: string[]; // Tags to set when this question is answered
} 