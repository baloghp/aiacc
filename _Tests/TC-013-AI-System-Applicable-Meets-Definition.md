# TC-013: AI System - Applicable (Meets Definition)

## Test Information
- **Test ID**: TC-013
- **Phase**: Phase 1 - AI System Scope
- **Category**: AI System Scope Tests

## Test Description
Test that AI systems that meet the definition and are not exempt are correctly identified as applicable.

## Input
Company: EU company
- name: "AITech GmbH"
- legalEntity: "GmbH"
- location: "Munich, Germany"

AI System: Commercial AI system
- name: "SmartAnalytics AI"
- intendedPurpose: "Business intelligence and predictive analytics"
- description: "AI system that generates predictions and influences decision-making"

Legal Scope: Applicable (EU entity, professional use)

AI System Scope Questions:
- Does the system meet the AI definition? → Yes
- Is it exclusively for military, research, or security purposes? → No
- Is it a legacy system without significant changes? → No

## Expected Result
- System sets tag: `ai-system:meets-definition`
- System proceeds to Phase 2 (Role Assignment)
- Assessment continues

## Test Steps
1. Complete Phase 0 and Legal Scope (applicable)
2. Answer AI system scope questions:
   - Meets AI definition? → Yes
   - Exclusively for exempt purposes? → No
   - Legacy system? → No
3. Verify system sets correct tags
4. Verify system proceeds to Phase 2
5. Verify assessment continues

## Success Criteria
- Tag `ai-system:meets-definition` is set
- System proceeds to Phase 2 Role Assignment questions
- Assessment continues to next phase 