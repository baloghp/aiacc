# TC-028: Limited Risk - Deep Fake Detection

## Test Information
- **Test ID**: TC-028
- **Phase**: Phase 2 - Risk Classification
- **Category**: Risk Classification Tests

## Test Description
Test that AI systems for detecting deep fakes are correctly classified as limited-risk.

## Input
Company: EU media company
- name: "MediaTech GmbH"
- legalEntity: "GmbH"
- location: "Hamburg, Germany"

AI System: Deep fake detection system
- name: "DeepFakeDetector AI"
- intendedPurpose: "Detection and identification of deep fake content"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)
Role Assignment: Provider

Risk Classification Questions:
- Is the system prohibited? → No
- Does it qualify as high-risk? → No
- Does it involve limited risk (e.g., chatbots, deep fakes)? → Yes
- Is it a general-purpose AI model? → No

## Expected Result
- System sets tag: `risk:limited`
- System proceeds to GPAI check
- Assessment continues

## Test Steps
1. Complete Phase 0, Legal Scope, AI System Scope, and Role Assignment (all applicable)
2. Answer risk classification questions:
   - Prohibited system? → No
   - High-risk? → No
   - Limited risk (deep fake detection)? → Yes
   - GPAI? → No
3. Verify system sets correct tags
4. Verify system proceeds to GPAI check
5. Verify assessment continues

## Success Criteria
- Tag `risk:limited` is set
- System proceeds to GPAI check
- Assessment continues to next phase 