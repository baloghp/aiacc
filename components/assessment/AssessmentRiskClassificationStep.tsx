import { Button, Group, Title, Text, Box } from "@mantine/core";
import type { StepNavProps } from "./AssessmentIntroStep";
import { AssessmentManager } from "@/entities/AssessmentManager";

interface AssessmentRiskClassificationStepProps extends StepNavProps {
  previousStep?: () => void;
  assessmentManager: AssessmentManager;
}

export default function AssessmentRiskClassificationStep({ nextStep, previousStep, assessmentManager: _assessmentManager }: AssessmentRiskClassificationStepProps) {
  return (
    <Box>
      <Title order={3}>Risk Classification</Title>
      <Text mt="md">[Risk classification questions go here]</Text>
      <Group mt="xl">
        <Button variant="default" onClick={previousStep}>Back</Button>
        <Button onClick={nextStep}>Next</Button>
      </Group>
    </Box>
  );
} 