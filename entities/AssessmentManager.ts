import { Company } from './Company';
import { AISystem } from './AISystem';
import { ApplicabilityAssessment } from './ApplicabilityAssessment';
import { RoleAssignment } from './RoleAssignment';
import { RiskClassification } from './RiskClassification';
import { Obligation } from './Obligation';
import { Note } from './Note';
import { RiskLevel, Role } from './enums';

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
          isNonProfessional: false,
        },
        aiSystemScope: {
          meetsAIDef: false,
          exclusions: [],
          isExempt: false,
          isLegacy: false,
        },
        isApplicable: false,
        legacyStatus: "",
      },
      roleAssignment: {
        roles: [],
        primaryRole: undefined,
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

  // Dedicated methods for setting specific properties
  // Legal Scope
  setLegalScopeIsEUEntity(value: boolean) {
    this.state.applicabilityAssessment.legalScope.isEUEntity = value;
  }

  setLegalScopePlacesOnEU(value: boolean) {
    this.state.applicabilityAssessment.legalScope.placesOnEU = value;
  }

  setLegalScopeOutputInEU(value: boolean) {
    this.state.applicabilityAssessment.legalScope.outputInEU = value;
  }

  setLegalScopeIsNonProfessional(value: boolean) {
    // This would typically be used to determine if the AI Act applies
    // For now, we'll store it in the legal scope
    this.state.applicabilityAssessment.legalScope.isNonProfessional = value;
  }

  // AI System Scope
  setAISystemScopeMeetsAIDef(value: boolean) {
    this.state.applicabilityAssessment.aiSystemScope.meetsAIDef = value;
  }

  setAISystemScopeExclusions(value: string[]) {
    this.state.applicabilityAssessment.aiSystemScope.exclusions = value;
  }

  setAISystemScopeIsExempt(value: boolean) {
    // This would typically be used to determine if the system is exempt
    this.state.applicabilityAssessment.aiSystemScope.isExempt = value;
  }

  setAISystemScopeIsLegacy(value: boolean) {
    // This would typically be used to determine legacy status
    this.state.applicabilityAssessment.aiSystemScope.isLegacy = value;
  }

  // Applicability Assessment
  setApplicabilityAssessmentIsApplicable(value: boolean) {
    this.state.applicabilityAssessment.isApplicable = value;
  }

  setApplicabilityAssessmentLegacyStatus(value: string) {
    this.state.applicabilityAssessment.legacyStatus = value;
  }

  // Role Assignment
  setRoleAssignmentRoles(value: Role[]) {
    this.state.roleAssignment.roles = value;
  }

  setRoleAssignmentPrimaryRole(value: Role) {
    // This would typically be used to set the primary role
    this.state.roleAssignment.primaryRole = value;
  }

  // Risk Classification
  setRiskClassificationRiskLevel(value: RiskLevel) {
    this.state.riskClassification.riskLevel = value;
  }

  setRiskClassificationIsGPAI(value: boolean) {
    this.state.riskClassification.isGPAI = value;
  }

  setRiskClassificationHasSystemicRisk(value: boolean) {
    this.state.riskClassification.hasSystemicRisk = value;
  }

  setRiskClassificationApplicableObligations(value: string[]) {
    this.state.riskClassification.applicableObligations = value;
  }

  setRiskClassificationApplicableNotes(value: string[]) {
    this.state.riskClassification.applicableNotes = value;
  }

  setRiskClassificationIsProhibited(value: boolean) {
    // This would typically be used to determine if the system is prohibited
    if (value) {
      this.state.riskClassification.riskLevel = RiskLevel.Prohibited;
    }
  }

  setRiskClassificationIsHighRisk(value: boolean) {
    // This would typically be used to determine if the system is high risk
    if (value) {
      this.state.riskClassification.riskLevel = RiskLevel.High;
    }
  }

  setRiskClassificationIsLimitedRisk(value: boolean) {
    // This would typically be used to determine if the system is limited risk
    if (value) {
      this.state.riskClassification.riskLevel = RiskLevel.Limited;
    }
  }

  // Get available method names for the QuestionsCRUD component
  getAvailableMethodNames(): string[] {
    return [
      // Legal Scope
      'setLegalScopeIsEUEntity',
      'setLegalScopePlacesOnEU', 
      'setLegalScopeOutputInEU',
      'setLegalScopeIsNonProfessional',
      
      // AI System Scope
      'setAISystemScopeMeetsAIDef',
      'setAISystemScopeExclusions',
      'setAISystemScopeIsExempt',
      'setAISystemScopeIsLegacy',
      
      // Applicability Assessment
      'setApplicabilityAssessmentIsApplicable',
      'setApplicabilityAssessmentLegacyStatus',
      
      // Role Assignment
      'setRoleAssignmentRoles',
      'setRoleAssignmentPrimaryRole',
      
      // Risk Classification
      'setRiskClassificationRiskLevel',
      'setRiskClassificationIsGPAI',
      'setRiskClassificationHasSystemicRisk',
      'setRiskClassificationApplicableObligations',
      'setRiskClassificationApplicableNotes',
      'setRiskClassificationIsProhibited',
      'setRiskClassificationIsHighRisk',
      'setRiskClassificationIsLimitedRisk'
    ];
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