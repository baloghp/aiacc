import { Company } from './Company';
import { AISystem } from './AISystem';

export interface AssessmentState {
  company: Company;
  aiSystem: AISystem;
  activeTags: Record<string, string[]>; // Active tags for the current assessment (questionId -> tags)
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
      activeTags: {}, // Initialize with empty tags object
    };
  }

  // Reset the assessment state
  reset() {
    this.constructor();
  }

  // Tag management methods
  addTag(questionId: string, tag: string) {
    if (!this.state.activeTags[questionId]) {
      this.state.activeTags[questionId] = [];
    }
    if (!this.state.activeTags[questionId].includes(tag)) {
      this.state.activeTags[questionId].push(tag);
    }
  }

  removeTag(questionId: string, tag: string) {
    if (this.state.activeTags[questionId]) {
      this.state.activeTags[questionId] = this.state.activeTags[questionId].filter(t => t !== tag);
    }
  }

  hasTag(tag: string): boolean {
    return Object.values(this.state.activeTags).some(tags => tags.includes(tag));
  }

  getActiveTags(): string[] {
    return Object.values(this.state.activeTags).flat();
  }

  clearTags() {
    this.state.activeTags = {};
  }

  // Process question answers and set tags accordingly
  processQuestionAnswer(questionId: string, answer: string | string[], questionType: string, tags?: string[]) {
    // Remove previous tags for this question
    if (this.state.activeTags[questionId]) {
      this.state.activeTags[questionId].forEach(tag => {
        this.removeTag(questionId, tag);
      });
    }

    if (questionType === 'yesNo') {
      if (answer === 'Yes' || answer === 'yes') {
        // Add tags for "Yes" answers
        if (tags && tags.length > 0) {
          tags.forEach(tag => this.addTag(questionId, tag));
        }
      }
      // For "No" answers, we don't add any tags (they remain removed)
    } else if (questionType === 'singleChoice') {
      if (typeof answer === 'string') {
        // Split the answer by comma and treat each part as a tag
        const answerTags = answer.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
        answerTags.forEach(tag => this.addTag(questionId, tag));
      }
    } else if (questionType === 'multipleChoice') {
      if (Array.isArray(answer)) {
        // For each selected option, split by comma and treat each part as a tag
        answer.forEach(option => {
          const optionTags = option.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
          optionTags.forEach(tag => this.addTag(questionId, tag));
        });
      }
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

  // Check if assessment should terminate early (mock implementation)
  shouldTerminateEarly(): boolean {
    // Mock: terminate if we have any disqualification tags
    const activeTags = this.getActiveTags();
    const disqualificationTags = [
      'disqualify:non-eu-entity',
      'disqualify:non-professional', 
      'disqualify:non-ai-system',
      'disqualify:no-eu-placement'
    ];
    
    return disqualificationTags.some(tag => activeTags.includes(tag));
  }
} 