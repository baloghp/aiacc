# TC-016: Single Role - Importer Only

## Test Information
- **Test ID**: TC-016
- **Phase**: Phase 2 - Role Assignment
- **Category**: Role Assignment Tests

## Test Description
Test that companies that import AI from third countries are correctly assigned the importer role.

## Input
Company: EU import company
- name: "ImportTech GmbH"
- legalEntity: "GmbH"
- location: "Hamburg, Germany"

AI System: Imported AI system
- name: "ImportedAnalytics AI"
- intendedPurpose: "Data analytics imported from third country"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)

Role Assignment Questions:
- Do you develop and place the AI system on the market under your name? → No
- Do you use the AI system under your authority (not personally)? → No
- Do you import AI from third countries to the EU? → Yes
- Do you distribute AI in the EU supply chain? → No
- Are you a product manufacturer integrating AI? → No
- Do you represent a non-EU provider? → No

## Expected Result
- System sets tag: `role:importer`
- System proceeds to Risk Classification
- Assessment continues

## Test Steps
1. Complete Phase 0, Legal Scope, and AI System Scope (all applicable)
2. Answer role assignment questions:
   - Develop and place on market? → No
   - Use under authority? → No
   - Import from third countries? → Yes
   - Distribute in EU supply chain? → No
   - Product manufacturer? → No
   - Authorized representative? → No
3. Verify system sets correct tags
4. Verify system proceeds to Risk Classification
5. Verify assessment continues

## Success Criteria
- Tag `role:importer` is set
- System proceeds to Risk Classification questions
- Assessment continues to next phase 