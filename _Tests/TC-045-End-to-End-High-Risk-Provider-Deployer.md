# TC-045: End-to-End High Risk Provider + Deployer

## Test Information
- **Test ID**: TC-045
- **Phase**: All Phases
- **Category**: Integration Tests

## Test Description
Test complete end-to-end workflow for EU provider and deployer with high-risk AI system.

## Input
Company: EU AI company
- name: "HighRiskProviderTech GmbH"
- legalEntity: "GmbH"
- location: "Berlin, Germany"
- contactPerson: "Dr. Michael Weber"
- stakeholders: ["Board of Directors", "R&D Department", "Operations"]
- certifications: ["ISO 27001", "ISO 13485"]

AI System: High risk AI system
- name: "MedicalDiagnosis AI"
- intendedPurpose: "Medical diagnosis and treatment recommendations"
- description: "AI system for medical image analysis and diagnosis"
- functionality: "Medical image processing, diagnosis prediction"
- deploymentContext: "Hospital network deployment"
- version: "3.2.1"
- assessmentDate: "2024-01-15"

Complete Assessment Answers:
- Legal Scope: EU entity, places on EU market, professional use
- AI System Scope: Meets definition, not exempt
- Role Assignment: Provider + Deployer
- Risk Classification: High risk (medical)
- GPAI: Not GPAI

## Expected Result
- Complete assessment workflow executes successfully
- All phases complete without errors
- Correct tags are set throughout
- Comprehensive high-risk obligations are displayed
- Compliance report is generated

## Test Steps
1. Complete Phase 0 with all company and AI system details
2. Complete Phase 1 Legal Scope questions
3. Complete Phase 1 AI System Scope questions
4. Complete Phase 2 Role Assignment questions
5. Complete Phase 2 Risk Classification questions
6. Complete Phase 2 GPAI questions
7. Verify Phase 3 obligation discovery
8. Verify compliance report generation

## Success Criteria
- All phases complete successfully
- Correct tags are set: `legal:eu-entity`, `legal:places-on-eu`, `ai-system:meets-definition`, `role:provider`, `role:deployer`, `risk:high`
- Comprehensive high-risk obligations are displayed
- Compliance report is generated
- Assessment completes end-to-end without errors 