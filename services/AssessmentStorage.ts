'use client';

import { AssessmentState } from '@/entities/AssessmentManager';

export interface SavedAssessment {
  id: string;
  name: string;
  createdAt: string;
  lastModified: string;
  assessmentState: AssessmentState;
  currentStep: number;
  isComplete: boolean;
  schemaVersion: string;
}

export class AssessmentStorage {
  private readonly STORAGE_KEY = 'ai-act-assessments';
  private readonly SCHEMA_VERSION = '1.0';
  private readonly MAX_ASSESSMENTS = 10;

  /**
   * Save an assessment to localStorage
   */
  saveAssessment(assessment: Omit<SavedAssessment, 'id' | 'createdAt' | 'lastModified' | 'schemaVersion'>): string {
    const savedAssessment: SavedAssessment = {
      ...assessment,
      id: this.generateId(),
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      schemaVersion: this.SCHEMA_VERSION,
    };

    const assessments = this.getAllAssessments();
    
    // Add new assessment
    assessments.push(savedAssessment);
    
    // Enforce 10-assessment limit by removing oldest if needed
    if (assessments.length > this.MAX_ASSESSMENTS) {
      assessments.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
      assessments.splice(this.MAX_ASSESSMENTS);
    }
    
    this.saveToStorage(assessments);
    
    return savedAssessment.id;
  }

  /**
   * Update an existing assessment
   */
  updateAssessment(id: string, updates: Partial<Omit<SavedAssessment, 'id' | 'createdAt' | 'schemaVersion'>>): boolean {
    const assessments = this.getAllAssessments();
    const index = assessments.findIndex(a => a.id === id);
    
    if (index === -1) {return false;}
    
    assessments[index] = {
      ...assessments[index],
      ...updates,
      lastModified: new Date().toISOString(),
    };
    
    this.saveToStorage(assessments);
    return true;
  }

  /**
   * Load an assessment by ID
   */
  loadAssessment(id: string): SavedAssessment | null {
    const assessments = this.getAllAssessments();
    return assessments.find(a => a.id === id) || null;
  }

  /**
   * Get all saved assessments
   */
  getAllAssessments(): SavedAssessment[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) {return [];}
      
      const assessments = JSON.parse(data) as SavedAssessment[];
      
      // Validate schema version and migrate if needed
      return assessments.map(assessment => this.migrateAssessment(assessment));
    } catch (error) {
      console.error('Error loading assessments from localStorage:', error);
      return [];
    }
  }

  /**
   * Delete an assessment by ID
   */
  deleteAssessment(id: string): boolean {
    const assessments = this.getAllAssessments();
    const filtered = assessments.filter(a => a.id !== id);
    
    if (filtered.length === assessments.length) {return false;}
    
    this.saveToStorage(filtered);
    return true;
  }

  /**
   * Export an assessment as JSON string
   */
  exportAssessment(id: string): string | null {
    const assessment = this.loadAssessment(id);
    if (!assessment) {return null;}
    
    return JSON.stringify(assessment, null, 2);
  }

  /**
   * Import an assessment from JSON string
   */
  importAssessment(jsonData: string): SavedAssessment | null {
    try {
      const assessment = JSON.parse(jsonData) as SavedAssessment;
      
      // Validate required fields
      if (!assessment.id || !assessment.name || !assessment.assessmentState) {
        throw new Error('Invalid assessment data');
      }
      
      // Migrate if needed
      const migratedAssessment = this.migrateAssessment(assessment);
      
      // Generate new ID to avoid conflicts
      migratedAssessment.id = this.generateId();
      migratedAssessment.createdAt = new Date().toISOString();
      migratedAssessment.lastModified = new Date().toISOString();
      
      // Save the imported assessment
      const assessments = this.getAllAssessments();
      assessments.push(migratedAssessment);
      
      // Enforce limit
      if (assessments.length > this.MAX_ASSESSMENTS) {
        assessments.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
        assessments.splice(this.MAX_ASSESSMENTS);
      }
      
      this.saveToStorage(assessments);
      
      return migratedAssessment;
    } catch (error) {
      console.error('Error importing assessment:', error);
      return null;
    }
  }

  /**
   * Get assessment count
   */
  getAssessmentCount(): number {
    return this.getAllAssessments().length;
  }

  /**
   * Check if storage is full
   */
  isStorageFull(): boolean {
    return this.getAssessmentCount() >= this.MAX_ASSESSMENTS;
  }

  /**
   * Clear all assessments
   */
  clearAllAssessments(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  private generateId(): string {
    return `assessment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private saveToStorage(assessments: SavedAssessment[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(assessments));
    } catch (error) {
      console.error('Error saving assessments to localStorage:', error);
      throw new Error('Failed to save assessment. Storage may be full.');
    }
  }

  private migrateAssessment(assessment: SavedAssessment): SavedAssessment {
    // Handle schema migrations here
    if (!assessment.schemaVersion || assessment.schemaVersion !== this.SCHEMA_VERSION) {
      // For now, just update the schema version
      // In the future, add migration logic here
      assessment.schemaVersion = this.SCHEMA_VERSION;
    }
    
    return assessment;
  }
}
