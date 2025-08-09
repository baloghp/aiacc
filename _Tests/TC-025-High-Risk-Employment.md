# TC-025: High Risk - Employment

## Test Information
- **Test ID**: TC-025
- **Phase**: Phase 2 - Risk Classification
- **Category**: Risk Classification Tests

## Test Description
Test that AI systems for employment decisions are correctly classified as high-risk.

## Input
Company: EU HR company
- name: "HRTech GmbH"
- legalEntity: "GmbH"
- location: "Hamburg, Germany"

AI System: Employment decision AI system
- name: "HiringAI Platform"
- intendedPurpose: "Recruitment and promotion decision-making"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)
Role Assignment: Provider

Risk Classification Questions:
- Is the system prohibited? → No
- Does it qualify as high-risk (e.g., in critical infrastructure, employment, law enforcement)? → Yes
- Does it involve limited risk? → N/A
- Is it a general-purpose AI model? → No

## Expected Result
- System sets tag: `risk:high`
- System proceeds to GPAI check
- Assessment continues

## Test Steps
1. Complete Phase 0, Legal Scope, AI System Scope, and Role Assignment (all applicable)
2. Answer risk classification questions:
   - Prohibited system? → No
   - High-risk (employment)? → Yes
   - Limited risk? → N/A
   - GPAI? → No
3. Verify system sets correct tags
4. Verify system proceeds to GPAI check
5. Verify assessment continues

## Success Criteria
- Tag `risk:high` is set
- System proceeds to GPAI check
- Assessment continues to next phase 