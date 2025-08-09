# TC-033: Minimal Risk Obligations

## Test Information
- **Test ID**: TC-033
- **Phase**: Phase 3 - Obligation Discovery
- **Category**: Obligation Discovery Tests

## Test Description
Test that minimal risk AI systems with provider and deployer roles receive correct obligations.

## Input
Company: EU company
- name: "MinimalTech GmbH"
- legalEntity: "GmbH"
- location: "Hamburg, Germany"

AI System: Minimal risk AI system
- name: "BusinessAnalytics AI"
- intendedPurpose: "Business analytics and reporting"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)
Role Assignment: Provider + Deployer
Risk Classification: Minimal-risk
GPAI: Not GPAI

## Expected Result
- System filters obligations based on active tags
- Obligations from Matrix 1 displayed (Articles 4, 50, 49, 71)
- Assessment completes with obligation list

## Test Steps
1. Complete all previous phases (Phase 0, Legal Scope, AI System Scope, Role Assignment, Risk Classification, GPAI)
2. Verify system filters obligations based on active tags
3. Verify obligations from Matrix 1 are displayed
4. Verify assessment completes with obligation list
5. Verify system generates compliance report

## Success Criteria
- Obligations from Matrix 1 are correctly filtered and displayed
- Assessment completes successfully
- Compliance report is generated
- Active tags: `legal:eu-entity`, `legal:places-on-eu`, `ai-system:meets-definition`, `role:provider`, `role:deployer`, `risk:minimal` 