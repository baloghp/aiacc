# TC-002: Invalid Company Input (Missing Required Fields)

## Test Information
- **Test ID**: TC-002
- **Phase**: Phase 0 - Input Validation
- **Category**: Validation Tests

## Test Description
Test that the system properly validates company input and shows errors for missing required fields.

## Input
Incomplete company details:
- name: "" (empty)
- legalEntity: "" (empty)
- location: "Berlin, Germany"
- contactPerson: "Dr. Anna Schmidt"
- stakeholders: ["Board of Directors"]
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
- System displays validation errors for missing company name and legal entity
- Stays in Phase 0
- No tags set

## Test Steps
1. Open the webapp
2. Enter incomplete company information (missing name and legalEntity)
3. Enter complete AI system information
4. Submit the form
5. Verify validation errors are displayed
6. Verify system remains in Phase 0

## Success Criteria
- Validation errors displayed for missing company name
- Validation errors displayed for missing legal entity
- System does not proceed to Phase 1
- User is prompted to correct the errors 