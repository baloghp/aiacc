import { Button, Group, Title, Text, Box } from "@mantine/core";
import type { StepNavProps } from "./AssessmentIntroStep";
import { AssessmentManager } from "@/entities/AssessmentManager";

interface AssessmentApplicabilityStepProps extends StepNavProps {
  previousStep?: () => void;
  assessmentManager: AssessmentManager;
}

export default function AssessmentApplicabilityStep({ nextStep, previousStep, assessmentManager: _assessmentManager }: AssessmentApplicabilityStepProps) {
  return (
    <Box>
      <Title order={3}>Applicability Assessment</Title>
      <Text mt="md">[Applicability questions go here]</Text>
      <Group mt="xl">
        <Button variant="default" onClick={previousStep}>Back</Button>
        <Button onClick={nextStep}>Next</Button>
      </Group>
    </Box>
  );
} 