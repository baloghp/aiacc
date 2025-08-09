# TC-005: EU Entity - Not Applicable (Non-Professional Use)

## Test Information
- **Test ID**: TC-005
- **Phase**: Phase 1 - Legal Scope
- **Category**: Legal Scope Tests

## Test Description
Test that natural persons using AI for non-professional activities are correctly identified as not applicable.

## Input
Company: Natural person
- name: "John Smith"
- legalEntity: "Individual"
- location: "Berlin, Germany"

AI System: Personal AI system
- name: "Personal Assistant AI"
- intendedPurpose: "Personal productivity and entertainment"

Legal Scope Questions:
- Is your organization established in the EU? → Yes
- Do you place AI systems on the EU market or use their output in the EU? → Yes
- Are you a natural person using AI for non-professional activities? → Yes

## Expected Result
- System sets tag: `legal:non-professional`
- System ends assessment with "Not Applicable" result
- No obligations displayed

## Test Steps
1. Complete Phase 0 with valid inputs
2. Answer legal scope questions:
   - Organization established in EU? → Yes
   - Place AI on EU market? → Yes
   - Non-professional use? → Yes
3. Verify system sets correct tags
4. Verify system displays "Not Applicable" result
5. Verify no obligations are shown

## Success Criteria
- Tag `legal:non-professional` is set
- System displays "Not Applicable" message
- No obligations are listed
- Assessment ends with appropriate guidance 