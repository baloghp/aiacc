import { LegalScope } from '@/entities/LegalScope';
import { AISystemScope } from '@/entities/AISystemScope';

export interface ApplicabilityAssessment {
  legalScope: LegalScope;
  aiSystemScope: AISystemScope;
  isApplicable: boolean;
  legacyStatus: string;
} 