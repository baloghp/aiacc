# TC-030: GPAI - Not GPAI

## Test Information
- **Test ID**: TC-030
- **Phase**: Phase 2 - GPAI Classification
- **Category**: GPAI Classification Tests

## Test Description
Test that specialized AI systems (not general-purpose) are correctly identified as not GPAI.

## Input
Company: EU AI company
- name: "SpecializedTech GmbH"
- legalEntity: "GmbH"
- location: "Munich, Germany"

AI System: Specialized AI system
- name: "MedicalDiagnosis AI"
- intendedPurpose: "Medical image diagnosis for specific conditions"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)
Role Assignment: Provider
Risk Classification: High-risk (medical)

GPAI Questions:
- Is it a general-purpose AI model? → No
- Does it exceed 10^25 FLOPs or pose systemic risks? → N/A

## Expected Result
- No GPAI tags set
- System proceeds to obligation discovery
- Assessment continues

## Test Steps
1. Complete Phase 0, Legal Scope, AI System Scope, Role Assignment, and Risk Classification (all applicable)
2. Answer GPAI questions:
   - General-purpose AI model? → No
3. Verify no GPAI tags are set
4. Verify system proceeds to obligation discovery
5. Verify assessment continues

## Success Criteria
- No GPAI tags are set
- System proceeds to obligation discovery
- Assessment continues to next phase 