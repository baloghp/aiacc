# TC-032: GPAI - Systemic Risk

## Test Information
- **Test ID**: TC-032
- **Phase**: Phase 2 - GPAI Classification
- **Category**: GPAI Classification Tests

## Test Description
Test that GPAI exceeding 10^25 FLOPs or posing systemic risks are correctly identified.

## Input
Company: EU AI company
- name: "SystemicGPAITech GmbH"
- legalEntity: "GmbH"
- location: "Munich, Germany"

AI System: Large-scale GPAI model
- name: "MegaGPT-5"
- intendedPurpose: "Ultra-large general-purpose language model"
- description: "Model exceeding 10^25 FLOPs with potential systemic risks"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)
Role Assignment: Provider
Risk Classification: Minimal-risk

GPAI Questions:
- Is it a general-purpose AI model? → Yes
- Does it exceed 10^25 FLOPs or pose systemic risks? → Yes

## Expected Result
- System sets tags: `risk:gpai`, `risk:systemic-risk`
- System proceeds to obligation discovery
- Assessment continues

## Test Steps
1. Complete Phase 0, Legal Scope, AI System Scope, Role Assignment, and Risk Classification (all applicable)
2. Answer GPAI questions:
   - General-purpose AI model? → Yes
   - Exceeds 10^25 FLOPs or systemic risks? → Yes
3. Verify system sets correct tags
4. Verify system proceeds to obligation discovery
5. Verify assessment continues

## Success Criteria
- Tags `risk:gpai` and `risk:systemic-risk` are set
- System proceeds to obligation discovery
- Assessment continues to next phase 