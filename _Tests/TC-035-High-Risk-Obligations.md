# TC-035: High Risk Obligations

## Test Information
- **Test ID**: TC-035
- **Phase**: Phase 3 - Obligation Discovery
- **Category**: Obligation Discovery Tests

## Test Description
Test that high risk AI systems with provider role receive correct obligations.

## Input
Company: EU company
- name: "HighRiskTech GmbH"
- legalEntity: "GmbH"
- location: "Munich, Germany"

AI System: High risk AI system
- name: "MedicalDiagnosis AI"
- intendedPurpose: "Medical diagnosis and treatment recommendations"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)
Role Assignment: Provider
Risk Classification: High-risk
GPAI: Not GPAI

## Expected Result
- System filters obligations based on active tags
- Obligations from Matrix 3 displayed (Articles 6-27, 41, 43, 47-49, 71-73, 86)
- Assessment completes with obligation list

## Test Steps
1. Complete all previous phases (Phase 0, Legal Scope, AI System Scope, Role Assignment, Risk Classification, GPAI)
2. Verify system filters obligations based on active tags
3. Verify obligations from Matrix 3 are displayed
4. Verify assessment completes with obligation list
5. Verify system generates compliance report

## Success Criteria
- Obligations from Matrix 3 are correctly filtered and displayed
- Assessment completes successfully
- Compliance report is generated
- Active tags: `legal:eu-entity`, `legal:places-on-eu`, `ai-system:meets-definition`, `role:provider`, `risk:high` 