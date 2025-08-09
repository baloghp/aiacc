# TC-008: AI System - Exempt (Military Use)

## Test Information
- **Test ID**: TC-008
- **Phase**: Phase 1 - AI System Scope
- **Category**: AI System Scope Tests

## Test Description
Test that AI systems exclusively for military purposes are correctly identified as exempt.

## Input
Company: EU company
- name: "DefenseTech GmbH"
- legalEntity: "GmbH"
- location: "Munich, Germany"

AI System: Military AI system
- name: "TacticalAnalysis AI"
- intendedPurpose: "Military tactical analysis and planning"

Legal Scope: Applicable (EU entity, professional use)

AI System Scope Questions:
- Does the system meet the AI definition? → Yes
- Is it exclusively for military, research, or security purposes? → Yes (Military)
- Is it a legacy system without significant changes? → No

## Expected Result
- System sets tag: `ai-system:exempt-military`
- System ends assessment with "Not Applicable" result
- No obligations displayed

## Test Steps
1. Complete Phase 0 and Legal Scope (applicable)
2. Answer AI system scope questions:
   - Meets AI definition? → Yes
   - Exclusively for military purposes? → Yes
   - Legacy system? → No
3. Verify system sets correct tags
4. Verify system displays "Not Applicable" result
5. Verify no obligations are shown

## Success Criteria
- Tag `ai-system:exempt-military` is set
- System displays "Not Applicable" message
- No obligations are listed
- Assessment ends with appropriate guidance 