# AI Act Compliance WebApp POC

A Next.js + Mantine UI application to guide organizations through the EU AI Act compliance journey. This POC implements a comprehensive assessment workflow with entity management, step-by-step compliance assessment, and obligation discovery.

## Project Purpose

This app helps organizations:
- Manage assessment questions, obligations, and advisory notes (CRUD operations)
- Conduct step-by-step compliance assessments through an interactive wizard
- Discover applicable legal obligations and advisory notes based on assessment results
- Export and import assessment data as JSON

## Features

### Entity Management (`/setup`)
- **Questions Management**: Create, edit, and delete assessment question groups and individual questions
  - Support for Yes/No, Multiple Choice, and Single Choice question types
  - Markdown support for question text
  - Method name mapping for assessment logic integration
  - Phase-based organization (Company, AISystem, Applicability, Roles, Risk, GPAI, Results)
- **Obligations Management**: Manage legal obligations with filtering criteria
  - Applicable roles (Provider, Deployer, Importer, Distributor, ProductManufacturer, AuthorizedRepresentative)
  - Risk categories (Prohibited, High, Limited, Minimal)
  - GPAI and systemic risk applicability
- **Notes Management**: Manage advisory notes and compliance guidance
  - Similar filtering criteria as obligations
  - Best practices and compliance recommendations

### Assessment Wizard (`/assessment`)
- **8-Step Assessment Process**:
  1. **Welcome**: Introduction and overview
  2. **Company**: Organization details (name, legal entity, location, contact person, stakeholders, certifications)
  3. **AI System**: System details (name, purpose, description, functionality, deployment context, version, assessment date)
  4. **Applicability**: Legal scope and AI system scope assessment
  5. **Roles**: Role assignment (Provider, Deployer, Importer, Distributor, ProductManufacturer, AuthorizedRepresentative)
  6. **Risk**: Risk classification (Prohibited, High, Limited, Minimal)
  7. **GPAI**: General Purpose AI assessment
  8. **Results**: Assessment summary and applicable obligations/notes

- **Interactive Stepper**: Responsive design with vertical (desktop) and horizontal (mobile) layouts
- **State Management**: AssessmentManager class handles all assessment state and logic
- **Results Panel**: Displays applicable obligations and notes based on assessment results

### Mock UI Showcase (`/mock-ui`)
- Demonstrates Mantine UI components (Modal, Stepper, Table, Button)
- Development and testing environment for UI components

## Tech Stack
- **Framework**: Next.js 15.3.3 (App Router, React 19.1.0)
- **UI Library**: Mantine UI 8.2.1
- **Language**: TypeScript 5.8.3
- **Testing**: Jest, React Testing Library
- **Development**: ESLint, Prettier, Storybook
- **Storage**: Local file storage (browser download/upload for JSON)

## Main Pages
- `/` — Home page with navigation to main sections
- `/setup` — Entity Setup (Questions, Obligations, Notes CRUD)
- `/assessment` — Assessment Wizard (8-step compliance assessment)
- `/mock-ui` — Mock UI Showcase (Mantine components demo)

## Domain Model

### Core Entities
- **Company**: name, legalEntity, location, contactPerson, stakeholders, certifications
- **AISystem**: name, intendedPurpose, description, functionality, deploymentContext, version, assessmentDate
- **ApplicabilityAssessment**: legalScope, aiSystemScope, isApplicable, legacyStatus
- **RoleAssignment**: roles, primaryRole
- **RiskClassification**: riskLevel, isGPAI, hasSystemicRisk, applicableObligations, applicableNotes

### Assessment Data
- **QuestionGroup**: id, order, phase, questions[], isComplete
- **Question**: id, text, type, methodName, options[] (for choice questions)
- **Obligation**: id, article, description, applicableRoles[], riskCategory[], isGPAIApplicable, hasSystemicRiskApplicable
- **Note**: id, title, description, applicableRoles[], riskCategory[], isGPAIApplicable, hasSystemicRiskApplicable

### Enums
- **Role**: Provider, Deployer, ProductManufacturer, AuthorizedRepresentative, Importer, Distributor
- **RiskLevel**: Prohibited, High, Limited, Minimal
- **AssessmentPhase**: Company, AISystem, Applicability, Roles, Risk, GPAI, Results

## Assessment Workflow
1. **Setup Phase**: Configure questions, obligations, and notes in the setup page
2. **Assessment Phase**: Complete the 8-step assessment wizard
3. **Results Phase**: Review applicable obligations and notes based on assessment
4. **Export Phase**: Download assessment data as JSON for external use

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
- `/test-utils` — Testing utilities and setup

### Key Components
- `AssessmentManager` — Core business logic for assessment state management
- `QuestionsCRUD` — Full CRUD interface for assessment questions
- `ObligationsCRUD` — Full CRUD interface for legal obligations
- `NotesCRUD` — Full CRUD interface for advisory notes
- Assessment step components — Individual steps in the assessment wizard

### Data Flow
1. Questions, obligations, and notes are managed in `/setup`
2. Assessment data flows through `AssessmentManager` during wizard steps
3. Results are computed based on assessment state and filtered obligations/notes
4. Data can be exported/imported as JSON for external processing

## Testing
```sh
# Run tests
npm run test

# Run tests in watch mode
npm run jest:watch

# Run Storybook
npm run storybook
```

## References
- See `_Design/Domain Design.md` and `_Design/POC Technical Design.md` for full domain and technical details
- [EU AI Act Overview](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
- [Mantine UI Documentation](https://mantine.dev/)
- [Next.js Documentation](https://nextjs.org/)
