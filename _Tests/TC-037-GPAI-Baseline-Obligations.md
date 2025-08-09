# TC-037: GPAI Baseline Obligations

## Test Information
- **Test ID**: TC-037
- **Phase**: Phase 3 - Obligation Discovery
- **Category**: Obligation Discovery Tests

## Test Description
Test that GPAI models (no systemic risk) receive correct baseline obligations.

## Input
Company: EU AI company
- name: "GPAIBaselineTech GmbH"
- legalEntity: "GmbH"
- location: "Munich, Germany"

AI System: GPAI model
- name: "GPT-4 Clone"
- intendedPurpose: "General-purpose language model for various applications"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)
Role Assignment: Provider
Risk Classification: Minimal-risk
GPAI: GPAI (no systemic risk)

## Expected Result
- System filters obligations based on active tags
- Obligations from Matrix 4 displayed (Articles 41, 53, 54, 56, 89)
- Assessment completes with obligation list

## Test Steps
1. Complete all previous phases (Phase 0, Legal Scope, AI System Scope, Role Assignment, Risk Classification, GPAI)
2. Verify system filters obligations based on active tags
3. Verify obligations from Matrix 4 are displayed
4. Verify assessment completes with obligation list
5. Verify system generates compliance report

## Success Criteria
- Obligations from Matrix 4 are correctly filtered and displayed
- Assessment completes successfully
- Compliance report is generated
- Active tags: `legal:eu-entity`, `legal:places-on-eu`, `ai-system:meets-definition`, `role:provider`, `risk:minimal`, `risk:gpai` 