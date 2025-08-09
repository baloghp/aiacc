# TC-021: Multiple Roles - Provider + Importer

## Test Information
- **Test ID**: TC-021
- **Phase**: Phase 2 - Role Assignment
- **Category**: Role Assignment Tests

## Test Description
Test that companies that both develop AI and import from third countries are correctly assigned multiple roles.

## Input
Company: EU AI company
- name: "ImportProviderTech GmbH"
- legalEntity: "GmbH"
- location: "Hamburg, Germany"

AI System: AI system developed and imported
- name: "HybridAI Platform"
- intendedPurpose: "AI platform with both domestic and imported components"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)

Role Assignment Questions:
- Do you develop and place the AI system on the market under your name? → Yes
- Do you use the AI system under your authority (not personally)? → No
- Do you import AI from third countries to the EU? → Yes
- Do you distribute AI in the EU supply chain? → No
- Are you a product manufacturer integrating AI? → No
- Do you represent a non-EU provider? → No

## Expected Result
- System sets tags: `role:provider`, `role:importer`
- System proceeds to Risk Classification
- Assessment continues

## Test Steps
1. Complete Phase 0, Legal Scope, and AI System Scope (all applicable)
2. Answer role assignment questions:
   - Develop and place on market? → Yes
   - Use under authority? → No
   - Import from third countries? → Yes
   - Distribute in EU supply chain? → No
   - Product manufacturer? → No
   - Authorized representative? → No
3. Verify system sets correct tags
4. Verify system proceeds to Risk Classification
5. Verify assessment continues

## Success Criteria
- Tags `role:provider` and `role:importer` are set
- System proceeds to Risk Classification questions
- Assessment continues to next phase 