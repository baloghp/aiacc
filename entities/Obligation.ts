export interface Obligation {
  id: string;
  article: string;
  description: string;
  requiredTags?: string[]; // Tags that must be present for this obligation to apply
  order?: number; // Optional order for sorting
} 