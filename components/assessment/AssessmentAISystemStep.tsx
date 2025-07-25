import { Button, Group, Title, Text, Box } from "@mantine/core";
import type { StepNavProps } from "./AssessmentIntroStep";

export default function AssessmentAISystemStep({ nextStep, previousStep }: StepNavProps & { previousStep?: () => void }) {
  return (
    <Box>
      <Title order={3}>AI System Details</Title>
      <Text mt="md">[AI System form goes here]</Text>
      <Group mt="xl">
        <Button variant="default" onClick={previousStep}>Back</Button>
        <Button onClick={nextStep}>Next</Button>
      </Group>
    </Box>
  );
} 