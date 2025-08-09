# AI Act Compliance WebApp: Proof-of-Concept with Next.js & Mantine UI

This document provides a blueprint to start developing your POC using Next.js and Mantine UI. The application will have two main pages:
1. **Entity Setup Page**: For maintaining the predefined entities (questions, obligations, notes), persisted as JSON files.
2. **Assessment Page**: For end-user assessments using the logic and user flow established previously.

## 1. Project Bootstrapping

### Tech Stack
- **Next.js** (App Router, React 18+, file-based routing)
- **Mantine UI** (component library & hook system)
- **TypeScript** (recommended for type safety)
- **File System / Local File Storage** (for development POC, use browser download/upload for JSON; for production, consider API endpoints or cloud storage)

### Quick Start

```sh
npx create-next-app@latest ai-act-compliance-poc -ts
cd ai-act-compliance-poc
npm install @mantine/core @mantine/hooks @mantine/notifications @emotion/react @emotion/styled
```

## 2. Project Structure

```
/pages
  /setup         # Entity Setup Page (CRUD for questions/obligations/notes)
  /assessment    # Assessment Page (user wizard)
  /api           # (Optional) For backend file operations, if not fully client-side

/entities        # TypeScript definitions for core entities
/data            # Initial sample JSONs for questions, obligations, notes
/utils           # Logic for reading/writing/loading JSON; questionnaire logic

/app.tsx         # App entry (MantineProvider, theme)
```

## 3. Entity Definitions (`/entities`)

Define these as TypeScript interfaces for clarity and safety.

```ts
// Question.ts
export interface Question {
  id: string;
  text: string;
  type: 'yesNo' | 'multipleChoice' | 'singleChoice' | 'text';
  options?: QuestionOption[];
  allowMultiple?: boolean;
  dependencies?: string[];
  targetAttribute: string;
  tags?: string[]; // Tags to set when this question is answered
}

export interface QuestionOption {
  value: string;
  label: string;
}

export interface QuestionGroup {
  id: string;
  order: number;
  phase: string;
  questions: Question[];
  isComplete: boolean;
}

// Obligation.ts
export interface Obligation {
  id: string;
  article: string;
  description: string;
  applicableRoles: string[];
  riskCategory: string[];
  isGPAIApplicable: boolean;
  hasSystemicRiskApplicable: boolean;
  requiredTags?: string[]; // Tags that must be present for this obligation to apply
}

// Note.ts
export interface Note {
  id: string;
  title: string;
  description: string;
  applicableRoles: string[];
  riskCategory: string[];
  isGPAIApplicable: boolean;
  hasSystemicRiskApplicable: boolean;
  requiredTags?: string[]; // Tags that must be present for this note to apply
}

// AssessmentManager.ts
export interface AssessmentState {
  company: Company;
  aiSystem: AISystem;
  activeTags: string[]; // Active tags for the current assessment
}

export class AssessmentManager {
  private state: AssessmentState;

  constructor() {
    this.state = {
      company: { /* ... */ },
      aiSystem: { /* ... */ },
      activeTags: [], // Initialize with empty tags array
    };
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
}
```

## 4. Tag-Based System

### Tag Categories and Prefixes

The system uses prefixed tags to maintain organization:

#### Legal Scope Tags (Prefix: `legal:`)
```
legal:eu-entity          // Organization established in EU
legal:places-on-eu       // Places AI systems on EU market
legal:output-in-eu       // Uses AI output in EU
legal:non-professional   // Natural person, non-professional use
legal:applicable         // Overall legal applicability
```

#### AI System Scope Tags (Prefix: `ai-system:`)
```
ai-system:meets-definition    // Meets AI definition
ai-system:exempt-military     // Military purpose exemption
ai-system:exempt-research     // Research purpose exemption
ai-system:exempt-security     // Security purpose exemption
ai-system:legacy-system       // Legacy system without changes
ai-system:exempt              // Overall system exemption
```

#### Risk Classification Tags (Prefix: `risk:`)
```
risk:prohibited          // Prohibited AI systems
risk:high                // High-risk AI systems
risk:limited             // Limited-risk AI systems
risk:minimal             // Minimal-risk AI systems
risk:gpai                // General Purpose AI
risk:systemic-risk       // GPAI with systemic risk
```

#### Role Assignment Tags (Prefix: `role:`)
```
role:provider                    // AI system provider
role:deployer                   // AI system deployer
role:product-manufacturer       // Product manufacturer
role:authorized-representative  // Authorized representative
role:importer                   // Importer
role:distributor               // Distributor
```

### Tag Setting Logic

Questions automatically set tags based on answers:

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

## 5. Entity Setup Page (`/setup`)

### Purpose
- Manage (create/edit/delete) **Questions**, **Obligations**, and **Notes**
- Configure tags for questions and required tags for obligations/notes
- Store as downloadable/uploadable JSON files
- Simple Mantine UI forms with table views

### Suggested Features
- Tabs/SegmentedControl for switching between entities (Questions, Obligations, Notes)
- Mantine Table to list current items
- Modal/Dialog for add/edit forms with tag management
- Export buttons to download JSON files
- Import/upload for loading JSON

### Tag Management UI
- TextInput for entering new tags
- Badge components to display existing tags
- ActionIcon to remove tags
- MultiSelect for managing multiple tags

### Example UI Flow
- User selects "Questions" tab → views/edit/add QuestionGroups and their Questions
- Each question can have tags configured that will be set when answered
- On save, triggers JSON file download of updated array
- Similar for Obligations and Notes with required tags

### Key Mantine Hooks/Components
- `Tabs`, `Table`, `Modal`, `Button`, `Textarea`, `Input`, `FileInput`, `Notifications`, `Badge`, `Stack`, `MultiSelect`
- State managed via useState/useReducer or Zustand/Context for more complex logic

## 6. Assessment Page (`/assessment`)

### Purpose
- End-user experience: wizard-style assessment based on current JSON config
- Dynamically loads Questions/Obligations/Notes from available JSON files
- Uses tag-based filtering for obligations and notes

### Suggested Features
- Progress Steps or Mantine `Stepper` to indicate phase/question group
- Each QuestionGroup renders its list of Questions (as fields)
- On completion of a group, automatically triggers logic to set tags via `AssessmentManager.processQuestionAnswer()`
- Conditional logic per your domain model (e.g., only show RiskClassification if applicable)
- At end, displays matched Obligations & Notes based on active tags, with review/export options

### UI Flow Example
1. **Phase 0**: User enters company & AI system details
2. **Phase 1**: Wizard moves through each QuestionGroup, maintaining order
3. **Phase 2**: Wizard displays role/risk questions as per the assessments
4. **Results**: Shows Obligations/Notes filtered by active tags, with optional JSON export of the assessment

### Tag-Based Filtering
- Obligations and Notes are filtered based on their `requiredTags`
- Only show items where any of their `requiredTags` are present in `activeTags`
- Fallback to legacy filtering (roles, risk levels) if no `requiredTags` are defined

### Key Mantine Hooks/Components
- `Stepper`, `Input`, `RadioGroup`, `Checkbox`, `Alert`, `Notification`, `Badge`
- For state: useReducer (good fit for stepwise progress and the object graph), or Zustand for global store

## 7. Data Handling (Development POC)

- All entity configurations (questions, obligations, notes) are edited and downloaded locally in `/setup` as JSON files
- `/assessment` accepts uploaded JSON (or uses sample JSON), then proceeds through the workflow
- For a simple POC you may use browser-only file I/O (`FileReader`/`Blob`/download)  
  For production, consider using Next.js API routes or cloud storage.

### Example JSON (Question Groups with Tags)
```json
[
  {
    "id": "qg-legal-scope",
    "order": 1,
    "phase": "Phase 1 Applicability",
    "questions": [
      {
        "id": "q1",
        "text": "Is your organization established in the EU?",
        "type": "yesNo",
        "targetAttribute": "legalScope.isEUEntity",
        "tags": ["legal:eu-entity"]
      },
      {
        "id": "q2",
        "text": "Do you place AI systems on the EU market?",
        "type": "yesNo",
        "targetAttribute": "legalScope.placesOnEU",
        "tags": ["legal:places-on-eu"]
      }
    ],
    "isComplete": false
  }
]
```

### Example JSON (Obligations with Required Tags)
```json
[
  {
    "id": "art-6-classification",
    "article": "Article 6",
    "description": "Classification and documentation",
    "applicableRoles": ["Provider"],
    "riskCategory": ["High"],
    "isGPAIApplicable": false,
    "hasSystemicRiskApplicable": false,
    "requiredTags": ["role:provider", "risk:high"]
  }
]
```

## 8. Implementation Tips

- Leverage Mantine's `Stepper` and `Table` for wizard navigation and setup views.
- Use dynamic imports for JSON configuration, updating state on file upload in the browser.
- Drive all assessment logic from the entity model: after each group is completed, compute and update the assessment object according to your business logic.
- Use the `AssessmentManager.processQuestionAnswer()` method to automatically set tags based on question answers.
- Implement tag-based filtering in obligation and note display components.
- Use TypeScript types throughout to avoid bugs.

## 9. References & Useful Resources

- [Mantine UI documentation & Wizard/Stepper example](https://mantine.dev/core/stepper/)
- [Next.js documentation (App Router, file handling)](https://nextjs.org/docs)
- [File Upload & Download in React](https://dev.to)
- [Full-featured Multi-step Form Example with Mantine](https://github.com/mantinedev/mantine/tree/master/src/mantine-demos/src/demos/core/Stepper)

## 10. Next Steps

1. **Create TypeScript entity files in `/entities` with tag support**  
2. **Bootstrap the two pages in `/pages/setup` and `/pages/assessment`**  
3. **Implement the setup interfaces: tabs/tables for entity CRUD with tag management, local file export/import**  
4. **Build wizard logic in Assessment page: dynamic steps, question rendering, tag setting, tag-based filtering**  
5. **Test full flow: setup, save JSON, start assessment, guide user through all logic using the tag-based model**  

Let me know if you want detailed code samples or a breakdown for any specific part.