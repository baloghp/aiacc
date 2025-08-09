# TC-023: Prohibited Risk - Real-time Biometric ID

## Test Information
- **Test ID**: TC-023
- **Phase**: Phase 2 - Risk Classification
- **Category**: Risk Classification Tests

## Test Description
Test that AI systems for real-time biometric identification in public spaces are correctly classified as prohibited.

## Input
Company: EU company
- name: "BiometricTech GmbH"
- legalEntity: "GmbH"
- location: "Munich, Germany"

AI System: Real-time biometric ID system
- name: "BiometricID AI"
- intendedPurpose: "Real-time biometric identification in public spaces"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)
Role Assignment: Provider

Risk Classification Questions:
- Is the system prohibited (e.g., social scoring, real-time biometric ID in public)? → Yes
- Does it qualify as high-risk? → N/A
- Does it involve limited risk? → N/A
- Is it a general-purpose AI model? → N/A

## Expected Result
- System sets tag: `risk:prohibited`
- System displays warning and halts assessment
- No obligations displayed

## Test Steps
1. Complete Phase 0, Legal Scope, AI System Scope, and Role Assignment (all applicable)
2. Answer risk classification questions:
   - Prohibited system? → Yes (Real-time biometric ID)
3. Verify system sets correct tags
4. Verify system displays warning message
5. Verify assessment halts
6. Verify no obligations are shown

## Success Criteria
- Tag `risk:prohibited` is set
- System displays warning about prohibited use
- Assessment halts with appropriate guidance
- No obligations are listed 