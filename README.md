# AI Act Compliance WebApp POC

A Next.js + Mantine UI application to guide organizations through the EU AI Act compliance journey. This POC implements Phases 0–2 of the compliance workflow, including entity setup, applicability assessment, role assignment, risk classification, and obligations discovery.

## Project Purpose

This app helps organizations:
- Model their company and AI system details
- Assess applicability of the EU AI Act
- Assign roles and classify risk
- Discover legal obligations and advisory notes
- Export and import assessment and entity data as JSON

## Features
- **Entity Setup Page**: Manage Questions, Obligations, and Notes (CRUD, import/export as JSON)
- **Assessment Wizard**: Stepwise compliance assessment based on current entity data
- **Obligation Discovery**: Filters obligations and notes based on assessment results
- **Local Storage**: Persists session and assessment state in the browser
- **Modern UI**: Built with Mantine UI components (Stepper, Table, Modal, etc.)

## Tech Stack
- Next.js (App Router, React 18+)
- Mantine UI
- TypeScript
- Local file storage (browser download/upload for JSON)

## Main Pages
- `/setup` — Entity Setup (Questions, Obligations, Notes)
- `/assessment` — Assessment Wizard (Phases 0–2)
- `/mock-ui` — Mock UI Showcase (Mantine components demo)

## Domain Model
- **Company**: name, legalEntity, location, contactPerson, stakeholders, certifications
- **AI System**: name, intendedPurpose, description, functionality, deploymentContext, version, assessmentDate
- **Applicability Assessment**: legalScope, aiSystemScope, isApplicable, legacyStatus
- **Role Assignment**: roles (Provider, Deployer, etc.)
- **Risk Classification**: riskLevel, isGPAI, hasSystemicRisk, applicableObligations, applicableNotes
- **Obligation/Note**: id, description, applicableRoles, riskCategory, isGPAIApplicable, hasSystemicRiskApplicable
- **QuestionGroup/Question/Answer**: For assessment workflow

## EU AI Act Compliance Workflow
1. **Phase 0**: Enter company and AI system details
2. **Phase 1**: Applicability assessment via grouped questions
3. **Phase 2**: Role assignment and risk classification
4. **Obligation Discovery**: Filter obligations/notes based on assessment
5. **Export/Save**: Download assessment report or entity data as JSON

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
- All entity definitions are in `/entities`
- Sample and user data is stored in `/data`
- Utility logic in `/utils`
- UI and business logic in `/app` and `/components`

## References
- See `_Design/Domain Design.md` and `_Design/POC Technical Design.md` for full domain and technical details.
- [EU AI Act Overview](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai)
- [Mantine UI Documentation](https://mantine.dev/)
- [Next.js Documentation](https://nextjs.org/)
