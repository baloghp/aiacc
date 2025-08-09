# TC-006: EU Entity - Applicable (EU Company, Professional Use)

## Test Information
- **Test ID**: TC-006
- **Phase**: Phase 1 - Legal Scope
- **Category**: Legal Scope Tests

## Test Description
Test that EU companies placing AI systems on the EU market are correctly identified as applicable.

## Input
Company: EU company
- name: "TechCorp GmbH"
- legalEntity: "GmbH"
- location: "Berlin, Germany"

AI System: Commercial AI system
- name: "BusinessAnalytics AI"
- intendedPurpose: "Business intelligence and analytics"

Legal Scope Questions:
- Is your organization established in the EU? → Yes
- Do you place AI systems on the EU market or use their output in the EU? → Yes
- Are you a natural person using AI for non-professional activities? → No

## Expected Result
- System sets tags: `legal:eu-entity`, `legal:places-on-eu`
- System proceeds to AI System Scope questions
- Assessment continues to Phase 2

## Test Steps
1. Complete Phase 0 with valid inputs
2. Answer legal scope questions:
   - Organization established in EU? → Yes
   - Place AI on EU market? → Yes
   - Non-professional use? → No
3. Verify system sets correct tags
4. Verify system proceeds to AI System Scope
5. Verify assessment continues to Phase 2

## Success Criteria
- Tags `legal:eu-entity` and `legal:places-on-eu` are set
- System proceeds to AI System Scope questions
- Assessment continues to Phase 2 