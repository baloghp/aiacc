import { Button, Group, Title, Text, Box } from "@mantine/core";
import type { StepNavProps } from "./AssessmentIntroStep";

export default function AssessmentGPAIStep({ nextStep, previousStep }: StepNavProps & { previousStep?: () => void }) {
  return (
    <Box>
      <Title order={3}>GPAI/Systemic Risk</Title>
      <Text mt="md">[GPAI/systemic risk questions go here]</Text>
      <Group mt="xl">
        <Button variant="default" onClick={previousStep}>Back</Button>
        <Button onClick={nextStep}>Next</Button>
      </Group>
    </Box>
  );
} 