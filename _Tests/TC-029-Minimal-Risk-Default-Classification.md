# TC-029: Minimal Risk - Default Classification

## Test Information
- **Test ID**: TC-029
- **Phase**: Phase 2 - Risk Classification
- **Category**: Risk Classification Tests

## Test Description
Test that AI systems not falling into other risk categories are correctly classified as minimal-risk.

## Input
Company: EU software company
- name: "SoftwareTech GmbH"
- legalEntity: "GmbH"
- location: "Stuttgart, Germany"

AI System: Standard business AI system
- name: "BusinessAnalytics AI"
- intendedPurpose: "Business analytics and reporting"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)
Role Assignment: Provider

Risk Classification Questions:
- Is the system prohibited? → No
- Does it qualify as high-risk? → No
- Does it involve limited risk? → No
- Is it a general-purpose AI model? → No

## Expected Result
- System sets tag: `risk:minimal`
- System proceeds to GPAI check
- Assessment continues

## Test Steps
1. Complete Phase 0, Legal Scope, AI System Scope, and Role Assignment (all applicable)
2. Answer risk classification questions:
   - Prohibited system? → No
   - High-risk? → No
   - Limited risk? → No
   - GPAI? → No
3. Verify system sets correct tags
4. Verify system proceeds to GPAI check
5. Verify assessment continues

## Success Criteria
- Tag `risk:minimal` is set
- System proceeds to GPAI check
- Assessment continues to next phase 