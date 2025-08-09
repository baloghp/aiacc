# TC-031: GPAI - Baseline GPAI

## Test Information
- **Test ID**: TC-031
- **Phase**: Phase 2 - GPAI Classification
- **Category**: GPAI Classification Tests

## Test Description
Test that general-purpose AI models are correctly identified as GPAI.

## Input
Company: EU AI company
- name: "GPAITech GmbH"
- legalEntity: "GmbH"
- location: "Berlin, Germany"

AI System: General-purpose AI model
- name: "GPT-4 Clone"
- intendedPurpose: "General-purpose language model for various applications"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)
Role Assignment: Provider
Risk Classification: Minimal-risk

GPAI Questions:
- Is it a general-purpose AI model? → Yes
- Does it exceed 10^25 FLOPs or pose systemic risks? → No

## Expected Result
- System sets tag: `risk:gpai`
- System proceeds to obligation discovery
- Assessment continues

## Test Steps
1. Complete Phase 0, Legal Scope, AI System Scope, Role Assignment, and Risk Classification (all applicable)
2. Answer GPAI questions:
   - General-purpose AI model? → Yes
   - Exceeds 10^25 FLOPs or systemic risks? → No
3. Verify system sets correct tags
4. Verify system proceeds to obligation discovery
5. Verify assessment continues

## Success Criteria
- Tag `risk:gpai` is set
- System proceeds to obligation discovery
- Assessment continues to next phase 