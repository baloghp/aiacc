export interface Obligation {
  id: string;
  article: string;
  description: string;
  applicableRoles: string[];
  riskCategory: string[];
  isGPAIApplicable: boolean;
  hasSystemicRiskApplicable: boolean;
} 