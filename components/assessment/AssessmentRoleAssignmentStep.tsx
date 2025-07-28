import { Button, Group, Title, Text, Box } from "@mantine/core";
import type { StepNavProps } from "./AssessmentIntroStep";
import { AssessmentManager } from "@/entities/AssessmentManager";

interface AssessmentRoleAssignmentStepProps extends StepNavProps {
  previousStep?: () => void;
  assessmentManager: AssessmentManager;
}

export default function AssessmentRoleAssignmentStep({ nextStep, previousStep, assessmentManager: _assessmentManager }: AssessmentRoleAssignmentStepProps) {
  return (
    <Box>
      <Title order={3}>Role Assignment</Title>
      <Text mt="md">[Role assignment questions go here]</Text>
      <Group mt="xl">
        <Button variant="default" onClick={previousStep}>Back</Button>
        <Button onClick={nextStep}>Next</Button>
      </Group>
    </Box>
  );
} 