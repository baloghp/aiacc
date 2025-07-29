import { Box, Title, Text, Group } from "@mantine/core";
import { IconBrain } from "@tabler/icons-react";
import { AISystem } from "@/entities/AISystem";

interface AssessmentAISystemSummaryProps {
  aiSystem: AISystem;
}

export default function AssessmentAISystemSummary({ aiSystem }: AssessmentAISystemSummaryProps) {
  const hasOptionalInfo = aiSystem.intendedPurpose || aiSystem.description || aiSystem.functionality || aiSystem.deploymentContext || aiSystem.version || aiSystem.assessmentDate;

  return (
    <Box>
      <Group mb={8} gap={8}>
        <IconBrain size={20} color="var(--mantine-color-blue-7)" />
        <Title order={5} fw={600}>AI System Information</Title>
      </Group>
      
      <Text size="sm" mb="xs">
        This assessment covers the AI system <strong>{aiSystem.name}</strong>
        {hasOptionalInfo && " with the following details:"}
      </Text>

      {hasOptionalInfo && (
        <Box ml="md">
          {aiSystem.intendedPurpose && (
            <Text size="sm" mb={4}>
              <strong>Intended Purpose:</strong> {aiSystem.intendedPurpose}
            </Text>
          )}
          
          {aiSystem.description && (
            <Text size="sm" mb={4}>
              <strong>Description:</strong> {aiSystem.description}
            </Text>
          )}
          
          {aiSystem.functionality && (
            <Text size="sm" mb={4}>
              <strong>Functionality:</strong> {aiSystem.functionality}
            </Text>
          )}
          
          {aiSystem.deploymentContext && (
            <Text size="sm" mb={4}>
              <strong>Deployment Context:</strong> {aiSystem.deploymentContext}
            </Text>
          )}
          
          {aiSystem.version && (
            <Text size="sm" mb={4}>
              <strong>Version:</strong> {aiSystem.version}
            </Text>
          )}
          
          {aiSystem.assessmentDate && (
            <Text size="sm">
              <strong>Assessment Date:</strong> {aiSystem.assessmentDate}
            </Text>
          )}
        </Box>
      )}
    </Box>
  );
} 