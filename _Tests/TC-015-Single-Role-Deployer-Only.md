# TC-015: Single Role - Deployer Only

## Test Information
- **Test ID**: TC-015
- **Phase**: Phase 2 - Role Assignment
- **Category**: Role Assignment Tests

## Test Description
Test that companies that use AI systems under their authority are correctly assigned the deployer role.

## Input
Company: EU company using AI
- name: "BusinessCorp Ltd"
- legalEntity: "Limited Company"
- location: "London, UK"

AI System: AI system used by company
- name: "CustomerService AI"
- intendedPurpose: "Customer service automation"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)

Role Assignment Questions:
- Do you develop and place the AI system on the market under your name? → No
- Do you use the AI system under your authority (not personally)? → Yes
- Do you import AI from third countries to the EU? → No
- Do you distribute AI in the EU supply chain? → No
- Are you a product manufacturer integrating AI? → No
- Do you represent a non-EU provider? → No

## Expected Result
- System sets tag: `role:deployer`
- System proceeds to Risk Classification
- Assessment continues

## Test Steps
1. Complete Phase 0, Legal Scope, and AI System Scope (all applicable)
2. Answer role assignment questions:
   - Develop and place on market? → No
   - Use under authority? → Yes
   - Import from third countries? → No
   - Distribute in EU supply chain? → No
   - Product manufacturer? → No
   - Authorized representative? → No
3. Verify system sets correct tags
4. Verify system proceeds to Risk Classification
5. Verify assessment continues

## Success Criteria
- Tag `role:deployer` is set
- System proceeds to Risk Classification questions
- Assessment continues to next phase 