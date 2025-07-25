import { Button, Group, Title, Text, Box } from "@mantine/core";
import type { StepNavProps } from "./AssessmentIntroStep";

export default function AssessmentResultsStep({ previousStep }: StepNavProps & { previousStep?: () => void }) {
  return (
    <Box>
      <Title order={3}>Assessment Results</Title>
      <Text mt="md">[Results and obligations summary go here]</Text>
      <Group mt="xl">
        <Button variant="default" onClick={previousStep}>Back</Button>
        <Button>Export Report</Button>
      </Group>
    </Box>
  );
} 