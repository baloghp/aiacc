# TC-004: EU Entity - Not Applicable (Non-EU Company)

## Test Information
- **Test ID**: TC-004
- **Phase**: Phase 1 - Legal Scope
- **Category**: Legal Scope Tests

## Test Description
Test that non-EU companies are correctly identified as not applicable under the EU AI Act.

## Input
Company: Non-EU company
- name: "US Tech Solutions Inc."
- legalEntity: "Corporation"
- location: "San Francisco, USA"

AI System: Standard AI system
- name: "DataProcessor AI"
- intendedPurpose: "Data processing and analytics"

Legal Scope Questions:
- Is your organization established in the EU? → No
- Do you place AI systems on the EU market or use their output in the EU? → No
- Are you a natural person using AI for non-professional activities? → No

## Expected Result
- System sets tag: `legal:non-eu-entity`
- System ends assessment with "Not Applicable" result
- No obligations displayed

## Test Steps
1. Complete Phase 0 with valid inputs
2. Answer legal scope questions:
   - Organization established in EU? → No
   - Place AI on EU market? → No
   - Non-professional use? → No
3. Verify system sets correct tags
4. Verify system displays "Not Applicable" result
5. Verify no obligations are shown

## Success Criteria
- Tag `legal:non-eu-entity` is set
- System displays "Not Applicable" message
- No obligations are listed
- Assessment ends with appropriate guidance 