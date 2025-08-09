# TC-012: AI System - Not AI Definition

## Test Information
- **Test ID**: TC-012
- **Phase**: Phase 1 - AI System Scope
- **Category**: AI System Scope Tests

## Test Description
Test that systems that don't meet the AI definition are correctly identified as not applicable.

## Input
Company: EU company
- name: "SimpleTech GmbH"
- legalEntity: "GmbH"
- location: "Frankfurt, Germany"

AI System: Simple calculator system
- name: "BasicCalculator"
- intendedPurpose: "Basic mathematical calculations"
- description: "Simple calculator application with no AI capabilities"

Legal Scope: Applicable (EU entity, professional use)

AI System Scope Questions:
- Does the system meet the AI definition? → No
- Is it exclusively for military, research, or security purposes? → N/A
- Is it a legacy system without significant changes? → N/A

## Expected Result
- No AI tags set
- System ends assessment with "Not Applicable" result
- No obligations displayed

## Test Steps
1. Complete Phase 0 and Legal Scope (applicable)
2. Answer AI system scope questions:
   - Meets AI definition? → No
3. Verify no AI tags are set
4. Verify system displays "Not Applicable" result
5. Verify no obligations are shown

## Success Criteria
- No AI system tags are set
- System displays "Not Applicable" message
- No obligations are listed
- Assessment ends with appropriate guidance 