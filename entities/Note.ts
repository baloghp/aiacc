export interface Note {
  id: string;
  title: string;
  description: string;
  applicableRoles: string[];
  riskCategory: string[];
  isGPAIApplicable: boolean;
  hasSystemicRiskApplicable: boolean;
  requiredTags?: string[]; // Tags that must be present for this note to apply
} 