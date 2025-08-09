# TC-038: GPAI Systemic Risk Obligations

## Test Information
- **Test ID**: TC-038
- **Phase**: Phase 3 - Obligation Discovery
- **Category**: Obligation Discovery Tests

## Test Description
Test that GPAI models with systemic risk receive comprehensive obligations.

## Input
Company: EU AI company
- name: "SystemicGPAITech GmbH"
- legalEntity: "GmbH"
- location: "Berlin, Germany"

AI System: Large-scale GPAI model
- name: "MegaGPT-5"
- intendedPurpose: "Ultra-large general-purpose language model"
- description: "Model exceeding 10^25 FLOPs with potential systemic risks"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)
Role Assignment: Provider
Risk Classification: Minimal-risk
GPAI: GPAI with systemic risk

## Expected Result
- System filters obligations based on active tags
- Obligations from Matrix 5 + Matrix 4 displayed (Articles 51, 55 + 41, 53, 54, 56, 89)
- Assessment completes with obligation list

## Test Steps
1. Complete all previous phases (Phase 0, Legal Scope, AI System Scope, Role Assignment, Risk Classification, GPAI)
2. Verify system filters obligations based on active tags
3. Verify obligations from Matrix 5 and Matrix 4 are displayed
4. Verify assessment completes with obligation list
5. Verify system generates compliance report

## Success Criteria
- Obligations from Matrix 5 and Matrix 4 are correctly filtered and displayed
- Assessment completes successfully
- Compliance report is generated
- Active tags: `legal:eu-entity`, `legal:places-on-eu`, `ai-system:meets-definition`, `role:provider`, `risk:minimal`, `risk:gpai`, `risk:systemic-risk` 