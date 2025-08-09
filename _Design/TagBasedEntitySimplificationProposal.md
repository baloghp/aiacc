# Tag-Based Entity Simplification Proposal

## Overview

This document proposes a tag-based approach to simplify the current entity model by replacing the complex nested entities (`LegalScope`, `AISystemScope`, `RiskClassification`, `RoleAssignment`, `ApplicabilityAssessment`) with a unified tag system. This approach leverages the existing tag-based filtering mechanism to create a more flexible and maintainable architecture.

## Current Entity Model Analysis

### Existing Entities to Replace

1. **LegalScope** (`LegalScope.ts`)
   - `isEUEntity: boolean`
   - `placesOnEU: boolean` 
   - `outputInEU: boolean`
   - `isNonProfessional: boolean`

2. **AISystemScope** (`AISystemScope.ts`)
   - `meetsAIDef: boolean`
   - `exclusions: string[]`
   - `isExempt: boolean`
   - `isLegacy: boolean`

3. **RiskClassification** (`RiskClassification.ts`)
   - `riskLevel: RiskLevel` (enum: Prohibited, High, Limited, Minimal)
   - `isGPAI: boolean`
   - `hasSystemicRisk: boolean`

4. **RoleAssignment** (`RoleAssignment.ts`)
   - `roles: Role[]` (enum: Provider, Deployer, ProductManufacturer, etc.)
   - `primaryRole?: Role`

5. **ApplicabilityAssessment** (`ApplicabilityAssessment.ts`)
   - `isApplicable: boolean`
   - `legacyStatus?: string`

## Proposed Tag-Based System

### Tag Categories and Prefixes

To maintain organization and avoid conflicts, we propose using prefixed tags:

#### 1. Legal Scope Tags (Prefix: `legal:`)
```
legal:eu-entity          // Organization established in EU
legal:places-on-eu       // Places AI systems on EU market
legal:output-in-eu       // Uses AI output in EU
legal:non-professional   // Natural person, non-professional use
legal:applicable         // Overall legal applicability
```

#### 2. AI System Scope Tags (Prefix: `ai-system:`)
```
ai-system:meets-definition    // Meets AI definition
ai-system:exempt-military     // Military purpose exemption
ai-system:exempt-research     // Research purpose exemption
ai-system:exempt-security     // Security purpose exemption
ai-system:legacy-system       // Legacy system without changes
ai-system:exempt              // Overall system exemption
```

#### 3. Risk Classification Tags (Prefix: `risk:`)
```
risk:prohibited          // Prohibited AI systems
risk:high                // High-risk AI systems
risk:limited             // Limited-risk AI systems
risk:minimal             // Minimal-risk AI systems
risk:gpai                // General Purpose AI
risk:systemic-risk       // GPAI with systemic risk
```

#### 4. Role Assignment Tags (Prefix: `role:`)
```
role:provider                    // AI system provider
role:deployer                   // AI system deployer
role:product-manufacturer       // Product manufacturer
role:authorized-representative  // Authorized representative
role:importer                   // Importer
role:distributor               // Distributor
```

#### 5. Assessment Status Tags (Prefix: `assessment:`)
```
assessment:applicable           // AI Act applies to this system
assessment:not-applicable      // AI Act does not apply
assessment:legacy-system       // Legacy system status
assessment:exempt              // System is exempt from AI Act
```

#### 6. Disqualification Tags (Prefix: `assessment:`)
```
'disqualify:non-eu-entity',
'disqualify:non-professional', 
'disqualify:non-ai-system',
'disqualify:no-eu-placement'
```

### Tag Setting Logic

#### Questions → Tags Mapping

**Legal Scope Questions:**
- "Is your organization established in the EU?" (Yes/No)
  - Yes → `legal:eu-entity`
- "Do you place AI systems on the EU market?" (Yes/No)
  - Yes → `legal:places-on-eu`
- "Do you use AI output in the EU?" (Yes/No)
  - Yes → `legal:output-in-eu`
- "Are you a natural person using AI for non-professional activities?" (Yes/No)
  - Yes → `legal:non-professional`

**AI System Scope Questions:**
- "Does the system meet the AI definition?" (Yes/No)
  - Yes → `ai-system:meets-definition`
- "Is it exclusively for military purposes?" (Yes/No)
  - Yes → `ai-system:exempt-military`
- "Is it exclusively for research purposes?" (Yes/No)
  - Yes → `ai-system:exempt-research`
- "Is it exclusively for security purposes?" (Yes/No)
  - Yes → `ai-system:exempt-security`
- "Is it a legacy system without significant changes?" (Yes/No)
  - Yes → `ai-system:legacy-system`

**Risk Classification Questions:**
- "Is the system prohibited?" (Yes/No)
  - Yes → `risk:prohibited`
- "Does it qualify as high-risk?" (Yes/No)
  - Yes → `risk:high`
- "Does it involve limited risk?" (Yes/No)
  - Yes → `risk:limited`
- "Is it a general-purpose AI model?" (Yes/No)
  - Yes → `risk:gpai`
- "Does it exceed 10^25 FLOPs or pose systemic risks?" (Yes/No)
  - Yes → `risk:systemic-risk`

**Role Assignment Questions:**
- "Do you develop and place the AI system on the market under your name?" (Yes/No)
  - Yes → `role:provider`
- "Do you use the AI system under your authority?" (Yes/No)
  - Yes → `role:deployer`
- "Do you import AI from third countries to the EU?" (Yes/No)
  - Yes → `role:importer`
- "Do you distribute AI in the EU supply chain?" (Yes/No)
  - Yes → `role:distributor`
- "Are you a product manufacturer integrating AI?" (Yes/No)
  - Yes → `role:product-manufacturer`
- "Do you represent a non-EU provider?" (Yes/No)
  - Yes → `role:authorized-representative`

**Assessment Status Logic:**
- If `legal:non-professional` → `assessment:not-applicable`
- If `ai-system:exempt` → `assessment:exempt`
- If `ai-system:legacy-system` → `assessment:legacy-system`
- If `legal:eu-entity` AND `legal:places-on-eu` AND `ai-system:meets-definition` → `assessment:applicable`
- Otherwise → `assessment:not-applicable`

### Obligations and Notes Tag Requirements

#### Example Obligation Tag Requirements:
```json
{
  "id": "art-6-classification",
  "article": "Article 6",
  "description": "Classification and documentation",
  "requiredTags": ["role:provider", "risk:high", "assessment:applicable"]
}
```

#### Example Note Tag Requirements:
```json
{
  "id": "note-high-risk-compliance",
  "title": "High-Risk Compliance Guidance",
  "description": "Additional guidance for high-risk systems",
  "requiredTags": ["risk:high", "assessment:applicable"]
}
```

## Implementation Benefits

### 1. **Simplified Data Model**
- Eliminates complex nested objects
- Single `activeTags: string[]` array in `AssessmentState`
- Easier serialization/deserialization
- Reduced memory footprint

### 2. **Enhanced Flexibility**
- Easy to add new tags without changing entity interfaces
- Support for complex tag combinations
- Dynamic filtering based on tag presence
- Extensible for future requirements

### 3. **Improved Maintainability**
- Centralized tag management
- Clear tag naming conventions
- Easier to understand and modify
- Reduced coupling between components

### 4. **Better Performance**
- Simple array operations for tag management
- Efficient filtering using array methods
- No complex object traversal

## Migration Strategy

### Phase 1: Tag System Implementation
1. ✅ Implement tag-based filtering (already completed)
2. ✅ Add tag management to `AssessmentManager`
3. ✅ Update CRUD components for tag editing

### Phase 2: Entity Simplification
1. Update `AssessmentState` interface:
   ```typescript
   export interface AssessmentState {
     company: Company;
     aiSystem: AISystem;
     activeTags: string[]; // Replace all nested entities
   }
   ```

2. Remove entity files:
   - `LegalScope.ts`
   - `AISystemScope.ts` 
   - `RiskClassification.ts`
   - `RoleAssignment.ts`
   - `ApplicabilityAssessment.ts`

3. Update `AssessmentManager`:
   - Remove all nested entity management
   - Focus on tag-based logic
   - Implement assessment status logic based on tags

### Phase 3: Question Configuration
1. Update all questions to include appropriate tags
2. Configure tag setting logic in `AssessmentManager.processQuestionAnswer()`
3. Update obligation and note data with `requiredTags`
4. Add assessment status logic to automatically set `assessment:*` tags

### Phase 4: UI Updates
1. Update assessment components to work with tags
2. Modify display logic to show active tags
3. Update filtering logic in obligation and note lists
4. Display assessment status based on `assessment:*` tags

## Tag Validation and Rules

### Tag Naming Conventions
- Use lowercase with hyphens: `legal:eu-entity`
- Prefix with category: `legal:`, `ai-system:`, `risk:`, `role:`, `assessment:`
- Keep tags descriptive but concise

### Tag Dependencies
- Some tags may be mutually exclusive (e.g., `risk:prohibited` vs `risk:high`)
- Some tags may require others (e.g., `risk:systemic-risk` requires `risk:gpai`)
- Assessment status tags are computed based on other tags
- Validation logic can be added to `AssessmentManager`

### Assessment Status Logic
The system should automatically compute and set assessment status tags based on the combination of other tags:

```typescript
// Example logic in AssessmentManager
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
```

### Tag Persistence
- Tags are stored in `AssessmentState.activeTags`
- Persisted with other assessment data
- Can be exported/imported as part of assessment reports

## Conclusion

This tag-based approach significantly simplifies the entity model while maintaining all current functionality. It provides a more flexible, maintainable, and extensible architecture that can easily accommodate future requirements. The migration can be done incrementally, ensuring backward compatibility during the transition.

The proposed tag system reduces complexity from multiple nested entities to a simple array of strings, making the codebase easier to understand, test, and maintain while providing enhanced flexibility for future enhancements. By including assessment status as tags, we create a completely unified tag-based system that eliminates the need for any complex nested entities. 