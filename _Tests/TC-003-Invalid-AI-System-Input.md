# TC-003: Invalid AI System Input (Missing Purpose)

## Test Information
- **Test ID**: TC-003
- **Phase**: Phase 0 - Input Validation
- **Category**: Validation Tests

## Test Description
Test that the system properly validates AI system input and shows errors for missing required fields.

## Input
Complete company details:
- name: "TechCorp GmbH"
- legalEntity: "GmbH"
- location: "Berlin, Germany"
- contactPerson: "Dr. Anna Schmidt"
- stakeholders: ["Board of Directors", "IT Department"]
- certifications: ["ISO 27001"]

Incomplete AI system details:
- name: "SmartAnalytics AI"
- intendedPurpose: "" (empty)
- description: "AI system for analyzing business data and generating insights"
- functionality: "Predictive analytics, pattern recognition"
- deploymentContext: "Cloud-based SaaS platform"
- version: "2.1.0"
- assessmentDate: "2024-01-15"

## Expected Result
- System displays validation errors for missing intended purpose
- Stays in Phase 0
- No tags set

## Test Steps
1. Open the webapp
2. Enter complete company information
3. Enter incomplete AI system information (missing intendedPurpose)
4. Submit the form
5. Verify validation errors are displayed
6. Verify system remains in Phase 0

## Success Criteria
- Validation errors displayed for missing intended purpose
- System does not proceed to Phase 1
- User is prompted to correct the errors 