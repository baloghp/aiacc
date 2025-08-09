# TC-047: Large Obligation Set

## Test Information
- **Test ID**: TC-047
- **Phase**: Phase 3 - Obligation Discovery
- **Category**: Performance and Usability Tests

## Test Description
Test that the system efficiently handles large obligation sets with multiple roles and high risk.

## Input
Company: EU company
- name: "LargeObligationTech GmbH"
- legalEntity: "GmbH"
- location: "Berlin, Germany"

AI System: High risk AI system
- name: "ComplexAI Platform"
- intendedPurpose: "Complex AI system with multiple risk factors"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)
Role Assignment: Provider + Deployer + Importer + Distributor
Risk Classification: High-risk
GPAI: Not GPAI

## Expected Result
- System efficiently handles large obligation set
- All obligations for all roles are displayed
- System maintains good performance
- Assessment completes successfully

## Test Steps
1. Complete all previous phases (Phase 0, Legal Scope, AI System Scope, Role Assignment, Risk Classification, GPAI)
2. Verify system filters obligations based on active tags
3. Verify all obligations for all roles are displayed
4. Verify system maintains good performance
5. Verify assessment completes successfully
6. Verify compliance report generation

## Success Criteria
- System efficiently handles large obligation set
- All obligations for all roles are correctly filtered and displayed
- System maintains good performance (response time < 2 seconds)
- Assessment completes successfully
- Compliance report is generated
- Active tags: `legal:eu-entity`, `legal:places-on-eu`, `ai-system:meets-definition`, `role:provider`, `role:deployer`, `role:importer`, `role:distributor`, `risk:high` 