import { Company } from './Company';
import { AISystem } from './AISystem';
import { ApplicabilityAssessment } from './ApplicabilityAssessment';
import { RoleAssignment } from './RoleAssignment';
import { RiskClassification } from './RiskClassification';
import { Obligation } from './Obligation';
import { Note } from './Note';
import { RiskLevel } from './enums';

export interface AssessmentState {
  company: Company;
  aiSystem: AISystem;
  applicabilityAssessment: ApplicabilityAssessment;
  roleAssignment: RoleAssignment;
  riskClassification: RiskClassification;
}

export class AssessmentManager {
  private state: AssessmentState;

  constructor() {
    this.state = {
      company: {
        name: "",
        legalEntity: "",
        location: "",
        contactPerson: "",
        stakeholders: [],
        certifications: [],
      },
      aiSystem: {
        name: "",
        intendedPurpose: "",
        description: "",
        functionality: "",
        deploymentContext: "",
        version: "",
        assessmentDate: "",
      },
      applicabilityAssessment: {
        legalScope: {
          isEUEntity: false,
          placesOnEU: false,
          outputInEU: false,
        },
        aiSystemScope: {
          meetsAIDef: false,
          exclusions: [],
        },
        isApplicable: false,
        legacyStatus: "",
      },
      roleAssignment: {
        roles: [],
      },
      riskClassification: {
        riskLevel: RiskLevel.Minimal,
        isGPAI: false,
        hasSystemicRisk: false,
        applicableObligations: [],
        applicableNotes: [],
      },
    };
  }

  // Reset the assessment state
  reset() {
    this.constructor();
  }

  // Update methods for each step
  updateCompany(data: Partial<Company>) {
    this.state.company = { ...this.state.company, ...data };
  }

  updateAISystem(data: Partial<AISystem>) {
    this.state.aiSystem = { ...this.state.aiSystem, ...data };
  }

  updateApplicability(data: Partial<ApplicabilityAssessment>) {
    this.state.applicabilityAssessment = { ...this.state.applicabilityAssessment, ...data };
  }

  updateRoles(data: Partial<RoleAssignment>) {
    this.state.roleAssignment = { ...this.state.roleAssignment, ...data };
  }

  updateRiskClassification(data: Partial<RiskClassification>) {
    this.state.riskClassification = { ...this.state.riskClassification, ...data };
  }

  // Compute and return the current list of obligations (stub for now)
  getCurrentObligations(): Obligation[] {
    // TODO: Implement logic to filter obligations based on state
    return [];
  }

  // Compute and return the current list of notes (stub for now)
  getCurrentNotes(): Note[] {
    // TODO: Implement logic to filter notes based on state
    return [];
  }

  // Get the full state (for debugging/export)
  getState(): AssessmentState {
    return this.state;
  }

  // Optionally, restore from a saved state
  fromState(state: AssessmentState) {
    this.state = state;
  }
} 