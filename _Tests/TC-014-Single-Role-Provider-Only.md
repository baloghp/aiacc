# TC-014: Single Role - Provider Only

## Test Information
- **Test ID**: TC-014
- **Phase**: Phase 2 - Role Assignment
- **Category**: Role Assignment Tests

## Test Description
Test that companies that develop and place AI systems on the market are correctly assigned the provider role.

## Input
Company: EU AI development company
- name: "AIProvider GmbH"
- legalEntity: "GmbH"
- location: "Berlin, Germany"

AI System: Commercial AI system
- name: "BusinessAI Platform"
- intendedPurpose: "Business process automation"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)

Role Assignment Questions:
- Do you develop and place the AI system on the market under your name? → Yes
- Do you use the AI system under your authority (not personally)? → No
- Do you import AI from third countries to the EU? → No
- Do you distribute AI in the EU supply chain? → No
- Are you a product manufacturer integrating AI? → No
- Do you represent a non-EU provider? → No

## Expected Result
- System sets tag: `role:provider`
- System proceeds to Risk Classification
- Assessment continues

## Test Steps
1. Complete Phase 0, Legal Scope, and AI System Scope (all applicable)
2. Answer role assignment questions:
   - Develop and place on market? → Yes
   - Use under authority? → No
   - Import from third countries? → No
   - Distribute in EU supply chain? → No
   - Product manufacturer? → No
   - Authorized representative? → No
3. Verify system sets correct tags
4. Verify system proceeds to Risk Classification
5. Verify assessment continues

## Success Criteria
- Tag `role:provider` is set
- System proceeds to Risk Classification questions
- Assessment continues to next phase 