# TC-039: Incomplete Question Group

## Test Information
- **Test ID**: TC-039
- **Phase**: Phase 1 - Question Group Validation
- **Category**: Edge Cases and Error Handling Tests

## Test Description
Test that the system properly handles incomplete question groups and prompts users to complete them.

## Input
Company: EU company
- name: "IncompleteTech GmbH"
- legalEntity: "GmbH"
- location: "Hamburg, Germany"

AI System: Standard AI system
- name: "TestAI Platform"
- intendedPurpose: "Testing and validation"

Legal Scope Questions (Partial):
- Is your organization established in the EU? → Yes
- Do you place AI systems on the EU market or use their output in the EU? → (Not answered)
- Are you a natural person using AI for non-professional activities? → (Not answered)

## Expected Result
- System detects incomplete question group
- System prompts user to complete missing questions
- System does not proceed to next phase
- No tags set until group is complete

## Test Steps
1. Complete Phase 0 with valid inputs
2. Start Phase 1 Legal Scope questions
3. Answer only first question, leave others unanswered
4. Attempt to proceed to next phase
5. Verify system detects incomplete group
6. Verify system prompts user to complete questions
7. Verify system does not proceed

## Success Criteria
- System detects incomplete question group
- System displays appropriate error message
- System prompts user to complete missing questions
- System does not proceed to next phase
- No tags are set until group is complete 