export interface Obligation {
  id: string;
  article: string;
  description: string;
  applicableRoles: string[];
  riskCategory: string[];
  isGPAIApplicable: boolean;
  hasSystemicRiskApplicable: boolean;
  requiredTags?: string[]; // Tags that must be present for this obligation to apply
} 