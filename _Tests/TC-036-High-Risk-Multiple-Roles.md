# TC-036: High Risk Multiple Roles

## Test Information
- **Test ID**: TC-036
- **Phase**: Phase 3 - Obligation Discovery
- **Category**: Obligation Discovery Tests

## Test Description
Test that high risk AI systems with multiple roles receive comprehensive obligations.

## Input
Company: EU company
- name: "MultiRoleHighRiskTech GmbH"
- legalEntity: "GmbH"
- location: "Berlin, Germany"

AI System: High risk AI system
- name: "CriticalInfrastructure AI"
- intendedPurpose: "Critical infrastructure management and control"

Legal Scope: Applicable (EU entity, professional use)
AI System Scope: Applicable (meets definition, not exempt)
Role Assignment: Provider + Deployer + Importer + Distributor
Risk Classification: High-risk
GPAI: Not GPAI

## Expected Result
- System filters obligations based on active tags
- All high-risk obligations for all roles displayed
- Assessment completes with comprehensive obligation list

## Test Steps
1. Complete all previous phases (Phase 0, Legal Scope, AI System Scope, Role Assignment, Risk Classification, GPAI)
2. Verify system filters obligations based on active tags
3. Verify all high-risk obligations for all roles are displayed
4. Verify assessment completes with obligation list
5. Verify system generates compliance report

## Success Criteria
- All high-risk obligations for all roles are correctly filtered and displayed
- Assessment completes successfully
- Compliance report is generated
- Active tags: `legal:eu-entity`, `legal:places-on-eu`, `ai-system:meets-definition`, `role:provider`, `role:deployer`, `role:importer`, `role:distributor`, `risk:high` 