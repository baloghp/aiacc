# TC-007: EU Entity - Applicable (EU Company, Output in EU)

## Test Information
- **Test ID**: TC-007
- **Phase**: Phase 1 - Legal Scope
- **Category**: Legal Scope Tests

## Test Description
Test that EU companies using AI output in the EU are correctly identified as applicable.

## Input
Company: EU company
- name: "DataCorp Ltd"
- legalEntity: "Limited Company"
- location: "London, UK"

AI System: AI system with EU output
- name: "CustomerInsights AI"
- intendedPurpose: "Customer behavior analysis and insights"

Legal Scope Questions:
- Is your organization established in the EU? → Yes
- Do you place AI systems on the EU market or use their output in the EU? → Yes
- Are you a natural person using AI for non-professional activities? → No

## Expected Result
- System sets tags: `legal:eu-entity`, `legal:output-in-eu`
- System proceeds to AI System Scope questions
- Assessment continues to Phase 2

## Test Steps
1. Complete Phase 0 with valid inputs
2. Answer legal scope questions:
   - Organization established in EU? → Yes
   - Use AI output in EU? → Yes
   - Non-professional use? → No
3. Verify system sets correct tags
4. Verify system proceeds to AI System Scope
5. Verify assessment continues to Phase 2

## Success Criteria
- Tags `legal:eu-entity` and `legal:output-in-eu` are set
- System proceeds to AI System Scope questions
- Assessment continues to Phase 2 