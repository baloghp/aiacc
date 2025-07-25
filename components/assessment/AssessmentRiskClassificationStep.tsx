import { Button, Group, Title, Text, Box } from "@mantine/core";
import type { StepNavProps } from "./AssessmentIntroStep";

export default function AssessmentRiskClassificationStep({ nextStep, previousStep }: StepNavProps & { previousStep?: () => void }) {
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