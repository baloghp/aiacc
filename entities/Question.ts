export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  text: string;
  type: 'yesNo' | 'multipleChoice' | 'singleChoice' | 'text';
  options?: QuestionOption[];
  allowMultiple?: boolean;
  dependencies?: string[];
  targetAttribute: string;
} 