export interface Note {
  id: string;
  title: string;
  description: string;
  applicableRoles: string[];
  riskCategory: string[];
  isGPAIApplicable: boolean;
  hasSystemicRiskApplicable: boolean;
} 