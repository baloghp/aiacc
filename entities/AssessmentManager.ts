import { Company } from './Company';
import { AISystem } from './AISystem';
import notesData from '../data/notes.json';
import obligationsData from '../data/obligations.json';
import { Note } from './Note';
import { Obligation } from './Obligation';

export interface AssessmentState {
  company: Company;
  aiSystem: AISystem;
  activeTags: Record<string, string[]>; // Active tags for the current assessment (questionId -> tags)
}

export class AssessmentManager {
  private state: AssessmentState;
  private isDevelopment() {
    return process.env.NODE_ENV === 'development';
  }
  constructor() {
    if(!this.isDevelopment()) {
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
      } else {
                this.state = {
                  company: {
                    name: "Test Company",
                    legalEntity: "Test Legal Entity",
                    location: "Test Location",
                    contactPerson: "Test Contact Person",
                    stakeholders: ["Test Stakeholder 1", "Test Stakeholder 2"],
                    certifications: ["Test Certification 1", "Test Certification 2"],
                  },
                  aiSystem: {
                    name: "Test AI System",
                    intendedPurpose: "Test Intended Purpose",
                    description: "Test Description",
                    functionality: "Test Functionality",
                    deploymentContext: "Test Deployment Context",
                    version: "Test Version",
                    assessmentDate: "Test Assessment Date",
                  },
                  activeTags: {},
                };
  }
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

  getApplicableNotes(): Note[] {
    const activeTags = this.getActiveTags();
    
    // Check if assessment has started (company and AI system have basic info)
    const hasAssessmentStarted = this.state.company.name.trim() !== "" && 
                               this.state.aiSystem.name.trim() !== "" && 
                               this.state.aiSystem.intendedPurpose.trim() !== "";

    if (!hasAssessmentStarted) {
      return [];
    }

    return notesData
      .filter(note => {
        // If no required tags are set, the note applies to everyone
        if (!note.requiredTags || note.requiredTags.length === 0) {
          return true;
        }
        
        // Tag-based filtering: note applies if any of its required tags are present in active tags
        return note.requiredTags.some(requiredTag => 
          activeTags.includes(requiredTag)
        );
      })
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }

  getApplicableObligations(): Obligation[] {
    const activeTags = this.getActiveTags();
    
    // Check if assessment has started (company and AI system have basic info)
    const hasAssessmentStarted = this.state.company.name.trim() !== "" && 
                               this.state.aiSystem.name.trim() !== "" && 
                               this.state.aiSystem.intendedPurpose.trim() !== "";

    if (!hasAssessmentStarted) {
      return [];
    }

    return obligationsData
      .filter(obligation => {
        // If no required tags are set, the obligation applies to everyone
        if (!obligation.requiredTags || obligation.requiredTags.length === 0) {
          return true;
        }
        
        // Tag-based filtering: obligation applies if any of its required tags are present in active tags
        return obligation.requiredTags.some(requiredTag => 
          activeTags.includes(requiredTag)
        );
      })
      .sort((a, b) => (a.order || 0) - (b.order || 0));
  }
} 