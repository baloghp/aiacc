import { Box, Title, List, Text, Badge, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import obligationsData from "../../data/obligations.json";
import { AssessmentState } from "@/entities/AssessmentManager";
import { Obligation } from "@/entities/Obligation";

interface AssessmentObligationsListProps {
  assessmentState?: AssessmentState;
}

export default function AssessmentObligationsList({ assessmentState }: AssessmentObligationsListProps) {
  const [obligations, setObligations] = useState<Obligation[]>([]);
  const [filteredObligations, setFilteredObligations] = useState<Obligation[]>([]);

  // Load obligations from JSON
  useEffect(() => {
    setObligations(obligationsData);
  }, []);

  // Filter obligations based on assessment state
  useEffect(() => {
    if (!assessmentState || obligations.length === 0) {
      setFilteredObligations([]);
      return;
    }

    // Check if assessment has started (company and AI system have basic info)
    const hasAssessmentStarted = assessmentState.company.name.trim() !== "" && 
                               assessmentState.aiSystem.name.trim() !== "" && 
                               assessmentState.aiSystem.intendedPurpose.trim() !== "";

    if (!hasAssessmentStarted) {
      setFilteredObligations([]);
      return;
    }

    const filtered = obligations.filter(obligation => {
      // Check if any of the user's roles match the obligation's applicable roles
      const hasMatchingRole = assessmentState.roleAssignment.roles.some(userRole => 
        obligation.applicableRoles.includes(userRole)
      );

      // Check if the risk level matches
      const hasMatchingRisk = obligation.riskCategory.includes(assessmentState.riskClassification.riskLevel);

      // Check GPAI applicability
      const gpaIMatches = !obligation.isGPAIApplicable || 
        (obligation.isGPAIApplicable && assessmentState.riskClassification.isGPAI);

      // Check systemic risk applicability
      const systemicRiskMatches = !obligation.hasSystemicRiskApplicable || 
        (obligation.hasSystemicRiskApplicable && assessmentState.riskClassification.hasSystemicRisk);

      // Apply OR logic: obligation applies if ANY of the conditions match
      return hasMatchingRole || hasMatchingRisk || gpaIMatches || systemicRiskMatches;
    });

    setFilteredObligations(filtered);
  }, [assessmentState, obligations]);

  return (
    <Box>
      <Title order={5} mb="sm">
        Applicable Obligations 
        {filteredObligations.length > 0 && (
          <Badge size="sm" ml="xs" color="blue">
            {filteredObligations.length}
          </Badge>
        )}
      </Title>
      {filteredObligations.length > 0 ? (
        <List spacing="xs" size="sm">
          {filteredObligations.map((obligation) => (
            <List.Item key={obligation.id}>
              <Group gap="xs" align="flex-start">
                <Text fw={500} size="sm">{obligation.article}:</Text>
                <Text size="sm" style={{ flex: 1 }}>{obligation.description}</Text>
              </Group>
              <Group gap="xs" mt={4}>
                {obligation.applicableRoles.map(role => (
                  <Badge key={role} size="xs" variant="light" color="blue">
                    {role}
                  </Badge>
                ))}
                {obligation.riskCategory.map(risk => (
                  <Badge key={risk} size="xs" variant="light" color="orange">
                    {risk}
                  </Badge>
                ))}
                {obligation.isGPAIApplicable && (
                  <Badge size="xs" variant="light" color="purple">
                    GPAI
                  </Badge>
                )}
                {obligation.hasSystemicRiskApplicable && (
                  <Badge size="xs" variant="light" color="red">
                    Systemic Risk
                  </Badge>
                )}
              </Group>
            </List.Item>
          ))}
        </List>
      ) : (
        <Text c="dimmed" size="sm">
          {assessmentState ? "No obligations match your current assessment criteria." : "Complete the assessment to see applicable obligations."}
        </Text>
      )}
    </Box>
  );
} 