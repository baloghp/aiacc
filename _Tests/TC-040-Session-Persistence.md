# TC-040: Session Persistence

## Test Information
- **Test ID**: TC-040
- **Phase**: All Phases
- **Category**: Performance and Usability Tests

## Test Description
Test that the system properly persists session data and loads it when user reopens the browser.

## Input
Company: EU company
- name: "PersistenceTech GmbH"
- legalEntity: "GmbH"
- location: "Munich, Germany"

AI System: Standard AI system
- name: "PersistenceAI Platform"
- intendedPurpose: "Testing session persistence"

Assessment Progress:
- Phase 0: Completed
- Phase 1 Legal Scope: Completed (tags: `legal:eu-entity`, `legal:places-on-eu`)
- Phase 1 AI System Scope: In progress (partially answered)

## Expected Result
- System loads saved session data when reopened
- System continues from last completed step
- All previous answers and tags are preserved
- User can continue assessment from where they left off

## Test Steps
1. Complete Phase 0 and Phase 1 Legal Scope
2. Start Phase 1 AI System Scope and answer some questions
3. Close browser completely
4. Reopen browser and navigate to webapp
5. Verify system loads saved session
6. Verify all previous answers are preserved
7. Verify system continues from last step
8. Verify all tags are preserved

## Success Criteria
- System loads saved session data
- All previous answers are preserved
- All previously set tags are preserved
- System continues from last incomplete step
- User can seamlessly continue assessment 