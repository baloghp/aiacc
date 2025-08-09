# TC-001: Valid Company and AI System Input

## Test Information
- **Test ID**: TC-001
- **Phase**: Phase 0 - Input Validation
- **Category**: Validation Tests

## Test Description
Test that the system accepts valid company and AI system input and proceeds to Phase 1.

## Input
Complete company details:
- name: "TechCorp GmbH"
- legalEntity: "GmbH"
- location: "Berlin, Germany"
- contactPerson: "Dr. Anna Schmidt"
- stakeholders: ["Board of Directors", "IT Department"]
- certifications: ["ISO 27001"]

Complete AI system details:
- name: "SmartAnalytics AI"
- intendedPurpose: "Data analysis and business intelligence"
- description: "AI system for analyzing business data and generating insights"
- functionality: "Predictive analytics, pattern recognition"
- deploymentContext: "Cloud-based SaaS platform"
- version: "2.1.0"
- assessmentDate: "2024-01-15"

## Expected Result
- System validates inputs successfully
- Proceeds to Phase 1 with loaded QuestionGroups
- No tags set yet

## Test Steps
1. Open the webapp
2. Enter complete company information
3. Enter complete AI system information
4. Submit the form
5. Verify system proceeds to Phase 1
6. Verify QuestionGroups are loaded in correct order

## Success Criteria
- No validation errors displayed
- System transitions to Phase 1
- QuestionGroups are loaded and displayed
- User can proceed to answer questions 