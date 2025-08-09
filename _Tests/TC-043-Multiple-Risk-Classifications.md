# TC-043: Multiple Risk Classifications

## Test Information
- **Test ID**: TC-043
- **Phase**: Phase 2 - Risk Classification
- **Category**: Edge Cases and Error Handling Tests

## Test Description
Test that the system properly handles AI systems that could be classified as multiple risk levels and prioritizes correctly.

## Input
Company: EU company
- name: "MultiRiskTech GmbH"
- legalEntity: "GmbH"
- location: "Berlin, Germany"

AI System: AI system with multiple risk characteristics
- name: "MultiRiskAI Platform"
- intendedPurpose: "AI system that could be classified as both high and limited risk"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)
Role Assignment: Provider

Risk Classification Questions:
- Is the system prohibited? → No
- Does it qualify as high-risk? → Yes (critical infrastructure component)
- Does it involve limited risk? → Yes (chatbot functionality)
- Is it a general-purpose AI model? → No

## Expected Result
- System prioritizes higher risk classification
- System sets tag: `risk:high`
- System proceeds to GPAI check
- Assessment continues

## Test Steps
1. Complete Phase 0, Legal Scope, AI System Scope, and Role Assignment (all applicable)
2. Answer risk classification questions:
   - Prohibited system? → No
   - High-risk? → Yes
   - Limited risk? → Yes
   - GPAI? → No
3. Verify system prioritizes higher risk classification
4. Verify system sets correct tags
5. Verify system proceeds to GPAI check
6. Verify assessment continues

## Success Criteria
- System prioritizes higher risk classification (`risk:high`)
- System sets correct tags
- System proceeds to GPAI check
- Assessment continues to next phase 