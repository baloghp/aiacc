import { Company } from './Company';
import { AISystem } from './AISystem';

export interface AssessmentState {
  company: Company;
  aiSystem: AISystem;
  activeTags: string[]; // Active tags for the current assessment
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
      activeTags: [], // Initialize with empty tags array
    };
  }

  // Reset the assessment state
  reset() {
    this.constructor();
  }

  // Tag management methods
  addTag(tag: string) {
    if (!this.state.activeTags.includes(tag)) {
      this.state.activeTags.push(tag);
    }
  }

  removeTag(tag: string) {
    this.state.activeTags = this.state.activeTags.filter(t => t !== tag);
  }

  hasTag(tag: string): boolean {
    return this.state.activeTags.includes(tag);
  }

  getActiveTags(): string[] {
    return [...this.state.activeTags];
  }

  clearTags() {
    this.state.activeTags = [];
  }

  // Process question answers and set tags accordingly
  processQuestionAnswer(_questionId: string, answer: string | string[], questionType: string, tags?: string[]) {
    if (!tags || tags.length === 0) {
      return; // No tags to process
    }

    if (questionType === 'yesNo') {
      if (answer === 'Yes' || answer === 'yes') {
        // Add tags for "Yes" answers
        tags.forEach(tag => this.addTag(tag));
      } else {
        // Remove tags for "No" answers
        tags.forEach(tag => this.removeTag(tag));
      }
    } else if (questionType === 'singleChoice') {
      // Remove previous tags for this question and add new one
      tags.forEach(tag => this.removeTag(tag));
      if (typeof answer === 'string') {
        this.addTag(answer);
      }
    } else if (questionType === 'multipleChoice') {
      // Remove previous tags for this question and add new ones
      tags.forEach(tag => this.removeTag(tag));
      if (Array.isArray(answer)) {
        answer.forEach(option => this.addTag(option));
      }
    }
  }

  // Compute assessment status based on active tags
  computeAssessmentStatus() {
    // Clear existing assessment tags
    this.removeTag('assessment:applicable');
    this.removeTag('assessment:not-applicable');
    this.removeTag('assessment:exempt');
    this.removeTag('assessment:legacy-system');

    // Set assessment status based on other tags
    if (this.hasTag('legal:non-professional')) {
      this.addTag('assessment:not-applicable');
    } else if (this.hasTag('ai-system:exempt')) {
      this.addTag('assessment:exempt');
    } else if (this.hasTag('ai-system:legacy-system')) {
      this.addTag('assessment:legacy-system');
    } else if (this.hasTag('legal:eu-entity') && 
               this.hasTag('legal:places-on-eu') && 
               this.hasTag('ai-system:meets-definition')) {
      this.addTag('assessment:applicable');
    } else {
      this.addTag('assessment:not-applicable');
    }
  }

  // Update methods for each step
  updateCompany(data: Partial<Company>) {
    this.state.company = { ...this.state.company, ...data };
  }

  updateAISystem(data: Partial<AISystem>) {
    this.state.aiSystem = { ...this.state.aiSystem, ...data };
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