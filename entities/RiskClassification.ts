import { RiskLevel } from '@/entities/enums';

export interface RiskClassification {
  riskLevel: RiskLevel;
  isGPAI: boolean;
  hasSystemicRisk: boolean;
  applicableObligations: string[]; // Obligation IDs
  applicableNotes: string[]; // Note IDs
} 