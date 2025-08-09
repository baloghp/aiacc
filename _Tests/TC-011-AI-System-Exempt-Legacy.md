# TC-011: AI System - Exempt (Legacy System)

## Test Information
- **Test ID**: TC-011
- **Phase**: Phase 1 - AI System Scope
- **Category**: AI System Scope Tests

## Test Description
Test that legacy AI systems without significant changes are correctly identified as exempt.

## Input
Company: EU company
- name: "LegacyTech GmbH"
- legalEntity: "GmbH"
- location: "Hamburg, Germany"

AI System: Legacy AI system
- name: "LegacyAnalytics AI"
- intendedPurpose: "Historical data analysis"
- description: "System deployed before 2024 with no significant changes"

Legal Scope: Applicable (EU entity, professional use)

AI System Scope Questions:
- Does the system meet the AI definition? → Yes
- Is it exclusively for military, research, or security purposes? → No
- Is it a legacy system without significant changes? → Yes

## Expected Result
- System sets tag: `ai-system:legacy-system`
- System ends assessment with "Not Applicable" result
- No obligations displayed

## Test Steps
1. Complete Phase 0 and Legal Scope (applicable)
2. Answer AI system scope questions:
   - Meets AI definition? → Yes
   - Exclusively for exempt purposes? → No
   - Legacy system? → Yes
3. Verify system sets correct tags
4. Verify system displays "Not Applicable" result
5. Verify no obligations are shown

## Success Criteria
- Tag `ai-system:legacy-system` is set
- System displays "Not Applicable" message
- No obligations are listed
- Assessment ends with appropriate guidance 