# TC-009: AI System - Exempt (Research Use)

## Test Information
- **Test ID**: TC-009
- **Phase**: Phase 1 - AI System Scope
- **Category**: AI System Scope Tests

## Test Description
Test that AI systems exclusively for research purposes are correctly identified as exempt.

## Input
Company: EU research institution
- name: "Research Institute GmbH"
- legalEntity: "GmbH"
- location: "Heidelberg, Germany"

AI System: Research AI system
- name: "ResearchAnalytics AI"
- intendedPurpose: "Scientific research and academic studies"

Legal Scope: Applicable (EU entity, professional use)

AI System Scope Questions:
- Does the system meet the AI definition? → Yes
- Is it exclusively for military, research, or security purposes? → Yes (Research)
- Is it a legacy system without significant changes? → No

## Expected Result
- System sets tag: `ai-system:exempt-research`
- System ends assessment with "Not Applicable" result
- No obligations displayed

## Test Steps
1. Complete Phase 0 and Legal Scope (applicable)
2. Answer AI system scope questions:
   - Meets AI definition? → Yes
   - Exclusively for research purposes? → Yes
   - Legacy system? → No
3. Verify system sets correct tags
4. Verify system displays "Not Applicable" result
5. Verify no obligations are shown

## Success Criteria
- Tag `ai-system:exempt-research` is set
- System displays "Not Applicable" message
- No obligations are listed
- Assessment ends with appropriate guidance 