# TC-044: End-to-End Minimal Risk Provider

## Test Information
- **Test ID**: TC-044
- **Phase**: All Phases
- **Category**: Integration Tests

## Test Description
Test complete end-to-end workflow for EU provider with minimal risk AI system.

## Input
Company: EU AI provider
- name: "MinimalProviderTech GmbH"
- legalEntity: "GmbH"
- location: "Munich, Germany"
- contactPerson: "Dr. Anna Schmidt"
- stakeholders: ["Board of Directors", "IT Department"]
- certifications: ["ISO 27001"]

AI System: Minimal risk AI system
- name: "BusinessAnalytics AI"
- intendedPurpose: "Business analytics and reporting"
- description: "AI system for analyzing business data and generating insights"
- functionality: "Predictive analytics, pattern recognition"
- deploymentContext: "Cloud-based SaaS platform"
- version: "2.1.0"
- assessmentDate: "2024-01-15"

Complete Assessment Answers:
- Legal Scope: EU entity, places on EU market, professional use
- AI System Scope: Meets definition, not exempt
- Role Assignment: Provider only
- Risk Classification: Minimal risk
- GPAI: Not GPAI

## Expected Result
- Complete assessment workflow executes successfully
- All phases complete without errors
- Correct tags are set throughout
- Minimal risk obligations are displayed
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
- Correct tags are set: `legal:eu-entity`, `legal:places-on-eu`, `ai-system:meets-definition`, `role:provider`, `risk:minimal`
- Minimal risk obligations are displayed
- Compliance report is generated
- Assessment completes end-to-end without errors 