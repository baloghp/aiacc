# TC-049: Export Functionality

## Test Information
- **Test ID**: TC-049
- **Phase**: Phase 3 - Report Generation
- **Category**: Performance and Usability Tests

## Test Description
Test that the system properly exports complete assessment reports with all relevant data.

## Input
Company: EU company
- name: "ExportTech GmbH"
- legalEntity: "GmbH"
- location: "Hamburg, Germany"

AI System: High risk AI system
- name: "ExportTestAI Platform"
- intendedPurpose: "Testing export functionality"

Complete Assessment:
- Legal Scope: Applicable (EU entity, professional use)
- AI System Scope: Applicable (meets definition, not exempt)
- Role Assignment: Provider + Deployer
- Risk Classification: High-risk
- GPAI: Not GPAI
- Obligations: High-risk obligations for provider and deployer

## Expected Result
- System generates complete assessment report
- Report includes all assessment data and obligations
- Report can be exported in appropriate format
- All relevant tags are included in export

## Test Steps
1. Complete all assessment phases
2. Generate compliance report
3. Test export functionality
4. Verify exported report contains all assessment data
5. Verify exported report contains all obligations
6. Verify exported report contains all relevant tags
7. Verify export format is appropriate

## Success Criteria
- System generates complete assessment report
- Report includes all company and AI system details
- Report includes all assessment answers
- Report includes all active tags
- Report includes all applicable obligations
- Report can be exported successfully
- Export format is appropriate and readable 