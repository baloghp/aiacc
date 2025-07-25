import { Button, Group, Title, Text, Box } from "@mantine/core";

export type StepNavProps = {
  nextStep?: () => void;
};

export default function AssessmentIntroStep({ nextStep }: StepNavProps) {
  return (
    <Box>
      <Title order={2}>Welcome to the AI Act Compliance Assessment</Title>
      <Text mt="md">
        This wizard will guide you through the compliance journey. Click Next to begin.
      </Text>
      <Group mt="xl">
        <Button onClick={nextStep}>Start Assessment</Button>
      </Group>
    </Box>
  );
} 