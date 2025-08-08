# AI Act Compliance Assessment Tool

A Next.js + Mantine UI application that guides organizations through EU AI Act compliance assessment using a tag-based system. This tool implements a comprehensive assessment workflow with dynamic question filtering, obligation discovery, professional reporting, and advanced state management features.

## Project Purpose

This application helps organizations:
- Conduct step-by-step AI Act compliance assessments through an interactive wizard
- Dynamically filter questions based on previous answers using dependency tags
- Discover applicable legal obligations and advisory notes based on assessment results
- Export comprehensive reports in both PDF and Excel formats
- Save and load assessment progress for continued work
- Navigate backwards through the assessment with intelligent state management
- Manage assessment data with a tag-based system for precise filtering

## Core Features

### Assessment Wizard (`/assessment`)
- **8-Step Assessment Process**:
  1. **Welcome**: Introduction and legal disclaimers
  2. **Company**: Organization details (name, legal entity, location, contact person, stakeholders, certifications)
  3. **AI System**: System details (name, purpose, description, functionality, deployment context, version, assessment date)
  4. **Applicability**: Legal scope and AI system scope assessment with dynamic question filtering
  5. **Roles**: Role assignment (Provider, Deployer, Importer, Distributor, ProductManufacturer, AuthorizedRepresentative)
  6. **Risk**: Risk classification (Prohibited, High, Limited, Minimal)
  7. **GPAI**: General Purpose AI and systemic risk assessment
  8. **Results**: Assessment summary with applicable obligations and notes

- **Dynamic Question Filtering**: Questions appear based on dependency tags from previous answers
- **Interactive Stepper**: Responsive design with vertical (desktop) and horizontal (mobile) layouts
- **State Management**: AssessmentManager class handles all assessment state and tag-based logic
- **Real-time Results Panel**: Displays applicable obligations and notes as assessment progresses
- **Backtracking Support**: Navigate backwards with intelligent state clearing and confirmation dialogs
- **Early Termination**: Skip to results when assessment determines no further questions apply

### Save/Load Functionality
- **Assessment Persistence**: Save assessment progress to browser localStorage
- **Multiple Assessments**: Store up to 10 saved assessments with automatic cleanup
- **Export/Import**: Share assessments as JSON files between users
- **Resume Capability**: Continue assessments from where you left off
- **Cross-Device Support**: Import assessments on different devices
- **Assessment Management**: Delete saved assessments and manage storage

### Export Functionality
- **PDF Export**: Complete assessment reports with company and AI system information
  - Professional formatting with legal disclaimers
  - Company and AI system summaries
  - Applicable obligations and advisory notes
  - Tag-based filtering results
- **Excel Export**: Multi-sheet professional reports including:
  - Assessment Summary with legal disclaimers
  - Company Information
  - AI System Information
  - Questions and Answers (with tag explanations)
  - Active Tags Summary
  - Advisory Notes
  - Applicable Obligations
- **Client-side Processing**: All exports generated in the browser
- **Professional Formatting**: Structured data with clear explanations and context
- **Timestamped Files**: Automatic filename generation with dates

### Entity Management (`/setup`)
- **Questions Management**: Create, edit, and delete assessment questions with dependency tags
  - Support for Yes/No, Multiple Choice, and Single Choice question types
  - Markdown support for question text
  - Dependency tag system for dynamic filtering
  - Phase-based organization (Company, AISystem, Applicability, Roles, Risk, GPAI, Results)
- **Obligations Management**: Manage legal obligations with tag-based filtering
  - Required tags and required all tags for precise filtering
  - Article references and detailed descriptions
  - Order-based organization
- **Notes Management**: Manage advisory notes and compliance guidance
  - Similar tag-based filtering as obligations
  - Best practices and compliance recommendations
  - Order-based organization

## Tech Stack
- **Framework**: Next.js 15.3.3 (App Router, React 19.1.0)
- **UI Library**: Mantine UI 8.2.1
- **Language**: TypeScript 5.8.3
- **Testing**: Jest, React Testing Library, Playwright
- **Development**: ESLint, Prettier, Storybook
- **Export Libraries**: XLSX for Excel export, @react-pdf/renderer for PDF export
- **Storage**: Browser localStorage for assessment persistence, local file storage for JSON exports

## Main Pages
- `/` — Home page with navigation to main sections
- `/setup` — Entity Setup (Questions, Obligations, Notes CRUD with tag-based filtering)
- `/assessment` — Assessment Wizard (8-step compliance assessment with dynamic filtering)
- `/mock-ui` — Mock UI Showcase (Mantine components demo)

## Domain Model

### Core Entities
- **Company**: name, legalEntity, location, contactPerson, stakeholders, certifications
- **AISystem**: name, intendedPurpose, description, functionality, deploymentContext, version, assessmentDate
- **AssessmentState**: company, aiSystem, activeTags (questionId -> tags mapping)

### Assessment Data
- **QuestionGroup**: id, order, phase, questions[], isComplete
- **Question**: id, text, type, order, options[], dependencies[], tags[]
- **Obligation**: id, article, description, requiredTags[], requiredAllTags[], order
- **Note**: id, title, description, requiredTags[], requiredAllTags[], order
- **SavedAssessment**: id, name, createdAt, lastModified, assessmentState, currentStep, isComplete, schemaVersion

### Tag-Based System
- **Active Tags**: Dynamic collection of tags representing current assessment state
- **Dependency Tags**: Questions only appear when required tags are present
- **Required Tags**: Obligations/notes apply if any required tags are present
- **Required All Tags**: Obligations/notes apply only if ALL required tags are present

### Enums
- **Role**: Provider, Deployer, ProductManufacturer, AuthorizedRepresentative, Importer, Distributor
- **RiskLevel**: Prohibited, High, Limited, Minimal
- **AssessmentPhase**: Company, AISystem, Applicability, Roles, Risk, GPAI, Results

## Assessment Workflow
1. **Setup Phase**: Configure questions, obligations, and notes with tag-based filtering
2. **Assessment Phase**: Complete the 8-step assessment wizard with dynamic question filtering
3. **Save/Load Phase**: Persist progress and resume assessments as needed
4. **Results Phase**: Review applicable obligations and notes based on active tags
5. **Export Phase**: Download comprehensive reports in PDF or Excel format

## Key Features

### Dynamic Question Filtering
- Questions appear based on dependency tags from previous answers
- Maintains original question order within phases
- Smooth user experience with conditional question flow
- Early termination when no further questions apply

### Tag-Based Obligation Discovery
- Obligations and notes are filtered based on active tags
- Supports both "any tag" and "all tags" filtering requirements
- Real-time updates as assessment progresses

### Advanced State Management
- **AssessmentManager**: Centralized state management with serialization support
- **Backtracking**: Navigate backwards with intelligent state clearing
- **Persistence**: Save/load assessments with complete state restoration
- **Validation**: Real-time answer validation and error handling

### Professional Export System
- **PDF Export**: Complete visual reports with all assessment data
  - Professional formatting with legal disclaimers
  - Company and AI system summaries
  - Applicable obligations and advisory notes
- **Excel Export**: Multi-sheet structured reports with:
  - Professional formatting and organization
  - Clear explanations for each section
  - Legal disclaimers and context
  - Timestamped filenames for easy organization

### Responsive Design
- Mobile-friendly interface with adaptive layouts
- Color scheme toggle for accessibility
- Progress tracking and navigation controls
- Desktop and mobile-optimized save/load interfaces

## Environment Variables

### Setup Page Access Control
The `/setup` page is protected by an environment variable to prevent unauthorized access in production environments.

```bash
# Enable setup page access (development only)
NEXT_PUBLIC_SETUP_ENABLED=true
```

**Note**: Set this to `true` only in development environments. In production, this should be `false` or not set at all.

## Quick Start

```sh
# Install dependencies
yarn install
# or
npm install

# Start the development server
yarn dev
# or
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Project Structure
- `/app` — Next.js pages and API routes
- `/components` — React components organized by feature
- `/entities` — TypeScript domain models and business logic
- `/data` — Sample and user data (JSON files)
- `/utils` — Utility functions including Excel and PDF export
- `/services` — Assessment storage and persistence services
- `/test-utils` — Testing utilities and setup

### Key Components
- `AssessmentManager` — Core business logic for assessment state and tag management
- `QuestionRenderer` — Dynamic question rendering with dependency filtering
- `AssessmentExportButton` — Excel export functionality
- `AssessmentResultsPanel` — Real-time results display
- `AssessmentSaveLoadButtons` — Save/load functionality
- `BacktrackConfirmationDialog` — Backtracking confirmation
- Assessment step components — Individual steps in the assessment wizard

### Data Flow
1. Questions, obligations, and notes are managed in `/setup` with tag-based filtering
2. Assessment data flows through `AssessmentManager` during wizard steps
3. Active tags are updated based on user answers
4. Questions are filtered dynamically based on dependency tags
5. Results are computed based on active tags and filtered obligations/notes
6. Assessment state can be saved/loaded for persistence
7. Data can be exported in PDF or Excel format

## Testing
```sh
# Run tests
npm run test

# Run tests in watch mode
npm run jest:watch

# Run Storybook
npm run storybook

# Run Playwright tests
npx playwright test
```

## Export Features

### Excel Export
- **7 Professional Sheets**: Summary, Company, AI System, Questions, Tags, Notes, Obligations
- **Structured Data**: Clear organization with explanations and context
- **Legal Disclaimers**: Professional disclaimers and usage notes
- **Client-side Processing**: No server dependencies

### PDF Export
- **Complete Visual Reports**: All assessment data in a single document
- **Professional Formatting**: Clean, readable layout with legal disclaimers
- **High-quality Output**: Suitable for official documentation
- **Tag-based Results**: Clear presentation of applicable obligations and notes

## Save/Load Features

### Assessment Persistence
- **Local Storage**: Browser-based persistence with automatic cleanup
- **Multiple Assessments**: Store up to 10 assessments with intelligent management
- **Export/Import**: Share assessments as JSON files
- **Cross-Device**: Import assessments on different devices
- **State Restoration**: Complete restoration of assessment progress

### User Experience
- **Desktop Interface**: Save/load buttons in top-right corner
- **Mobile Interface**: Save/load buttons below assessment content
- **Confirmation Dialogs**: Clear feedback for save/load operations
- **Error Handling**: Graceful handling of storage issues and corrupted data

## References
- See `_Design/Domain Design.md` and `_Design/POC Technical Design.md` for full domain and technical details
- See `SAVE_LOAD_FEATURES.md` for detailed save/load functionality documentation
- [EU AI Act Overview](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
- [Mantine UI Documentation](https://mantine.dev/)
- [Next.js Documentation](https://nextjs.org/)
