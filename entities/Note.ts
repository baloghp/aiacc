export interface Note {
  id: string;
  title: string;
  description: string;
  requiredTags?: string[]; // Tags that must be present for this note to apply
} 