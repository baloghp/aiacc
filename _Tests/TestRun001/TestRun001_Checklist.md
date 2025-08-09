# Test Run 001 - Manual Testing Checklist

## Overview
This checklist contains all 49 test cases for the EU AI Act Compliance WebApp. Each test case is listed as a markdown task that can be checked off during manual testing.

## Phase 0 - Input Validation Tests

### [ ] TC-001: Valid Company and AI System Input
- **Phase**: 0
- **Category**: Input Validation
- **Description**: Test valid company and AI system details input
- **Expected**: System accepts input and proceeds to Phase 1

### [ ] TC-002: Invalid Company Input
- **Phase**: 0
- **Category**: Input Validation
- **Description**: Test invalid company details (empty fields, invalid format)
- **Expected**: System shows validation errors and prevents progression

### [ ] TC-003: Invalid AI System Input
- **Phase**: 0
- **Category**: Input Validation
- **Description**: Test invalid AI system details (empty fields, invalid format)
- **Expected**: System shows validation errors and prevents progression

## Phase 1 - Legal Scope Tests

### [ ] TC-004: EU Entity Not Applicable - Non-EU
- **Phase**: 1
- **Category**: Legal Scope
- **Description**: Test non-EU entity with output not in EU
- **Expected**: System sets `legal:non-eu` tag and shows not applicable message

### [ ] TC-005: EU Entity Not Applicable - Non-Professional
- **Phase**: 1
- **Category**: Legal Scope
- **Description**: Test EU entity with non-professional use
- **Expected**: System sets `legal:non-professional` tag and shows not applicable message

### [ ] TC-006: EU Entity Applicable - EU Company
- **Phase**: 1
- **Category**: Legal Scope
- **Description**: Test EU company with professional use
- **Expected**: System sets `legal:eu-entity` tag and proceeds to AI System Scope

### [ ] TC-007: EU Entity Applicable - Output in EU
- **Phase**: 1
- **Category**: Legal Scope
- **Description**: Test non-EU entity with output in EU
- **Expected**: System sets `legal:eu-entity` tag and proceeds to AI System Scope

## Phase 1 - AI System Scope Tests

### [ ] TC-008: AI System Exempt - Military
- **Phase**: 1
- **Category**: AI System Scope
- **Description**: Test AI system used for military purposes
- **Expected**: System sets `ai-system:exempt` tag and shows exemption message

### [ ] TC-009: AI System Exempt - Research
- **Phase**: 1
- **Category**: AI System Scope
- **Description**: Test AI system used for research purposes
- **Expected**: System sets `ai-system:exempt` tag and shows exemption message

### [ ] TC-010: AI System Exempt - Security
- **Phase**: 1
- **Category**: AI System Scope
- **Description**: Test AI system used for security purposes
- **Expected**: System sets `ai-system:exempt` tag and shows exemption message

### [ ] TC-011: AI System Exempt - Legacy
- **Phase**: 1
- **Category**: AI System Scope
- **Description**: Test legacy AI system
- **Expected**: System sets `ai-system:exempt` tag and shows exemption message

### [ ] TC-012: AI System Not AI Definition
- **Phase**: 1
- **Category**: AI System Scope
- **Description**: Test system that doesn't meet AI definition
- **Expected**: System sets `ai-system:not-ai` tag and shows not applicable message

### [ ] TC-013: AI System Applicable - Meets Definition
- **Phase**: 1
- **Category**: AI System Scope
- **Description**: Test AI system that meets definition
- **Expected**: System sets `ai-system:applicable` tag and proceeds to Phase 2

## Phase 2 - Role Assignment Tests

### [ ] TC-014: Single Role - Provider Only
- **Phase**: 2
- **Category**: Role Assignment
- **Description**: Test company acting as provider only
- **Expected**: System sets `role:provider` tag and proceeds to risk classification

### [ ] TC-015: Single Role - Deployer Only
- **Phase**: 2
- **Category**: Role Assignment
- **Description**: Test company acting as deployer only
- **Expected**: System sets `role:deployer` tag and proceeds to risk classification

### [ ] TC-016: Single Role - Importer Only
- **Phase**: 2
- **Category**: Role Assignment
- **Description**: Test company acting as importer only
- **Expected**: System sets `role:importer` tag and proceeds to risk classification

### [ ] TC-017: Single Role - Distributor Only
- **Phase**: 2
- **Category**: Role Assignment
- **Description**: Test company acting as distributor only
- **Expected**: System sets `role:distributor` tag and proceeds to risk classification

### [ ] TC-018: Single Role - Product Manufacturer Only
- **Phase**: 2
- **Category**: Role Assignment
- **Description**: Test company acting as product manufacturer only
- **Expected**: System sets `role:product-manufacturer` tag and proceeds to risk classification

### [ ] TC-019: Single Role - Authorized Representative Only
- **Phase**: 2
- **Category**: Role Assignment
- **Description**: Test company acting as authorized representative only
- **Expected**: System sets `role:authorized-representative` tag and proceeds to risk classification

### [ ] TC-020: Multiple Roles - Provider and Deployer
- **Phase**: 2
- **Category**: Role Assignment
- **Description**: Test company acting as both provider and deployer
- **Expected**: System sets `role:provider` and `role:deployer` tags and proceeds to risk classification

### [ ] TC-021: Multiple Roles - Provider and Importer
- **Phase**: 2
- **Category**: Role Assignment
- **Description**: Test company acting as both provider and importer
- **Expected**: System sets `role:provider` and `role:importer` tags and proceeds to risk classification

## Phase 2 - Risk Classification Tests

### [ ] TC-022: Prohibited Risk - Social Scoring
- **Phase**: 2
- **Category**: Risk Classification
- **Description**: Test AI system for social scoring (prohibited)
- **Expected**: System sets `risk:prohibited` tag and shows prohibited message

### [ ] TC-023: Prohibited Risk - Real-time Biometric ID
- **Phase**: 2
- **Category**: Risk Classification
- **Description**: Test AI system for real-time biometric identification (prohibited)
- **Expected**: System sets `risk:prohibited` tag and shows prohibited message

### [ ] TC-024: High Risk - Critical Infrastructure
- **Phase**: 2
- **Category**: Risk Classification
- **Description**: Test AI system for critical infrastructure (high risk)
- **Expected**: System sets `risk:high` tag and proceeds to GPAI check

### [ ] TC-025: High Risk - Employment
- **Phase**: 2
- **Category**: Risk Classification
- **Description**: Test AI system for employment decisions (high risk)
- **Expected**: System sets `risk:high` tag and proceeds to GPAI check

### [ ] TC-026: High Risk - Law Enforcement
- **Phase**: 2
- **Category**: Risk Classification
- **Description**: Test AI system for law enforcement (high risk)
- **Expected**: System sets `risk:high` tag and proceeds to GPAI check

### [ ] TC-027: Limited Risk - Chatbot
- **Phase**: 2
- **Category**: Risk Classification
- **Description**: Test AI system for chatbot (limited risk)
- **Expected**: System sets `risk:limited` tag and proceeds to GPAI check

### [ ] TC-028: Limited Risk - Deep Fake Detection
- **Phase**: 2
- **Category**: Risk Classification
- **Description**: Test AI system for deep fake detection (limited risk)
- **Expected**: System sets `risk:limited` tag and proceeds to GPAI check

### [ ] TC-029: Minimal Risk - Default Classification
- **Phase**: 2
- **Category**: Risk Classification
- **Description**: Test AI system that doesn't meet other risk criteria (minimal risk)
- **Expected**: System sets `risk:minimal` tag and proceeds to GPAI check

## Phase 2 - GPAI Classification Tests

### [ ] TC-030: GPAI - Not GPAI
- **Phase**: 2
- **Category**: GPAI Classification
- **Description**: Test AI system that is not GPAI
- **Expected**: System sets `gpai:not-gpai` tag and proceeds to Phase 3

### [ ] TC-031: GPAI - Baseline GPAI
- **Phase**: 2
- **Category**: GPAI Classification
- **Description**: Test AI system that is baseline GPAI
- **Expected**: System sets `gpai:baseline` tag and proceeds to Phase 3

### [ ] TC-032: GPAI - Systemic Risk
- **Phase**: 2
- **Category**: GPAI Classification
- **Description**: Test AI system that is GPAI with systemic risk
- **Expected**: System sets `gpai:systemic-risk` tag and proceeds to Phase 3

## Phase 3 - Obligation Discovery Tests

### [ ] TC-033: Minimal Risk Obligations
- **Phase**: 3
- **Category**: Obligation Discovery
- **Description**: Test obligation discovery for minimal risk AI system
- **Expected**: System shows minimal risk obligations and generates compliance report

### [ ] TC-034: Limited Risk Obligations
- **Phase**: 3
- **Category**: Obligation Discovery
- **Description**: Test obligation discovery for limited risk AI system
- **Expected**: System shows limited risk obligations and generates compliance report

### [ ] TC-035: High Risk Obligations
- **Phase**: 3
- **Category**: Obligation Discovery
- **Description**: Test obligation discovery for high risk AI system
- **Expected**: System shows high risk obligations and generates compliance report

### [ ] TC-036: High Risk Multiple Roles
- **Phase**: 3
- **Category**: Obligation Discovery
- **Description**: Test obligation discovery for high risk AI system with multiple roles
- **Expected**: System shows obligations for all applicable roles and generates compliance report

### [ ] TC-037: GPAI Baseline Obligations
- **Phase**: 3
- **Category**: Obligation Discovery
- **Description**: Test obligation discovery for GPAI baseline
- **Expected**: System shows GPAI baseline obligations and generates compliance report

### [ ] TC-038: GPAI Systemic Risk Obligations
- **Phase**: 3
- **Category**: Obligation Discovery
- **Description**: Test obligation discovery for GPAI with systemic risk
- **Expected**: System shows GPAI systemic risk obligations and generates compliance report

## Edge Cases and Error Handling Tests

### [ ] TC-039: Incomplete Question Group
- **Phase**: 2
- **Category**: Edge Cases
- **Description**: Test incomplete question group submission
- **Expected**: System shows validation error and prevents progression

### [ ] TC-040: Session Persistence
- **Phase**: All
- **Category**: Edge Cases
- **Description**: Test session persistence across browser refresh
- **Expected**: System maintains assessment state in local storage

### [ ] TC-041: Invalid Answer Format
- **Phase**: All
- **Category**: Edge Cases
- **Description**: Test invalid answer format submission
- **Expected**: System shows validation error and prevents progression

### [ ] TC-042: No Matching Obligations
- **Phase**: 3
- **Category**: Edge Cases
- **Description**: Test scenario with no matching obligations
- **Expected**: System shows appropriate message and generates empty compliance report

### [ ] TC-043: Multiple Risk Classifications
- **Phase**: 2
- **Category**: Edge Cases
- **Description**: Test AI system that could be classified in multiple risk categories
- **Expected**: System applies highest risk classification and proceeds accordingly

## Integration Tests

### [ ] TC-044: End-to-End - Minimal Risk Provider
- **Phase**: All
- **Category**: Integration
- **Description**: Complete workflow for minimal risk provider
- **Expected**: System guides through all phases and generates appropriate compliance report

### [ ] TC-045: End-to-End - High Risk Provider Deployer
- **Phase**: All
- **Category**: Integration
- **Description**: Complete workflow for high risk provider and deployer
- **Expected**: System guides through all phases and generates appropriate compliance report

### [ ] TC-046: End-to-End - GPAI Systemic Risk
- **Phase**: All
- **Category**: Integration
- **Description**: Complete workflow for GPAI with systemic risk
- **Expected**: System guides through all phases and generates appropriate compliance report

## Performance and Usability Tests

### [ ] TC-047: Large Obligation Set
- **Phase**: 3
- **Category**: Performance
- **Description**: Test with large number of obligations
- **Expected**: System handles large obligation sets efficiently

### [ ] TC-048: Rapid Navigation
- **Phase**: All
- **Category**: Usability
- **Description**: Test rapid navigation between phases
- **Expected**: System maintains state and allows smooth navigation

### [ ] TC-049: Export Functionality
- **Phase**: 3
- **Category**: Usability
- **Description**: Test export functionality for compliance report
- **Expected**: System allows export of compliance report in appropriate format

## Test Run Summary

- **Total Tests**: 49
- **Phase 0 Tests**: 3
- **Phase 1 Tests**: 10
- **Phase 2 Tests**: 19
- **Phase 3 Tests**: 6
- **Edge Cases**: 5
- **Integration Tests**: 3
- **Performance/Usability Tests**: 3

## Notes for Manual Testing

1. **Test Environment**: Ensure the web application is running and accessible
2. **Data Preparation**: Have test data ready for each scenario
3. **Browser Testing**: Test in multiple browsers if required
4. **Documentation**: Document any issues or unexpected behavior
5. **Regression**: Re-run critical tests after any fixes

## Test Completion Checklist

- [ ] All Phase 0 tests completed
- [ ] All Phase 1 tests completed
- [ ] All Phase 2 tests completed
- [ ] All Phase 3 tests completed
- [ ] All edge cases tested
- [ ] All integration tests completed
- [ ] All performance/usability tests completed
- [ ] Issues documented and reported
- [ ] Test results summarized 