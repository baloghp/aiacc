# TC-018: Single Role - Product Manufacturer Only

## Test Information
- **Test ID**: TC-018
- **Phase**: Phase 2 - Role Assignment
- **Category**: Role Assignment Tests

## Test Description
Test that companies that manufacture products integrating AI are correctly assigned the product manufacturer role.

## Input
Company: EU product manufacturer
- name: "ManufactureTech GmbH"
- legalEntity: "GmbH"
- location: "Stuttgart, Germany"

AI System: AI-integrated product
- name: "SmartDevice AI"
- intendedPurpose: "AI-powered smart device manufacturing"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)

Role Assignment Questions:
- Do you develop and place the AI system on the market under your name? → No
- Do you use the AI system under your authority (not personally)? → No
- Do you import AI from third countries to the EU? → No
- Do you distribute AI in the EU supply chain? → No
- Are you a product manufacturer integrating AI? → Yes
- Do you represent a non-EU provider? → No

## Expected Result
- System sets tag: `role:product-manufacturer`
- System proceeds to Risk Classification
- Assessment continues

## Test Steps
1. Complete Phase 0, Legal Scope, and AI System Scope (all applicable)
2. Answer role assignment questions:
   - Develop and place on market? → No
   - Use under authority? → No
   - Import from third countries? → No
   - Distribute in EU supply chain? → No
   - Product manufacturer? → Yes
   - Authorized representative? → No
3. Verify system sets correct tags
4. Verify system proceeds to Risk Classification
5. Verify assessment continues

## Success Criteria
- Tag `role:product-manufacturer` is set
- System proceeds to Risk Classification questions
- Assessment continues to next phase 