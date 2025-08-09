# TC-019: Single Role - Authorized Representative Only

## Test Information
- **Test ID**: TC-019
- **Phase**: Phase 2 - Role Assignment
- **Category**: Role Assignment Tests

## Test Description
Test that companies that represent non-EU providers are correctly assigned the authorized representative role.

## Input
Company: EU representative company
- name: "RepTech GmbH"
- legalEntity: "GmbH"
- location: "Frankfurt, Germany"

AI System: Non-EU provider's AI system
- name: "USProvider AI"
- intendedPurpose: "AI system from US provider represented in EU"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)

Role Assignment Questions:
- Do you develop and place the AI system on the market under your name? → No
- Do you use the AI system under your authority (not personally)? → No
- Do you import AI from third countries to the EU? → No
- Do you distribute AI in the EU supply chain? → No
- Are you a product manufacturer integrating AI? → No
- Do you represent a non-EU provider? → Yes

## Expected Result
- System sets tag: `role:authorized-representative`
- System proceeds to Risk Classification
- Assessment continues

## Test Steps
1. Complete Phase 0, Legal Scope, and AI System Scope (all applicable)
2. Answer role assignment questions:
   - Develop and place on market? → No
   - Use under authority? → No
   - Import from third countries? → No
   - Distribute in EU supply chain? → No
   - Product manufacturer? → No
   - Authorized representative? → Yes
3. Verify system sets correct tags
4. Verify system proceeds to Risk Classification
5. Verify assessment continues

## Success Criteria
- Tag `role:authorized-representative` is set
- System proceeds to Risk Classification questions
- Assessment continues to next phase 