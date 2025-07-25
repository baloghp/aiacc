"use client";
import { useState } from "react";
import { Stepper, Button, Group, Paper, Title, Text, Box, Flex } from "@mantine/core";
import { Wizard, useWizard } from "react-use-wizard";
import { useMediaQuery } from "@mantine/hooks";

// Step components (placeholders for now)
function IntroStep() {
  const { nextStep } = useWizard();
  return (
    <Box>
      <Title order={2}>Welcome to the AI Act Compliance Assessment</Title>
      <Text mt="md">This wizard will guide you through the compliance journey. Click Next to begin.</Text>
      <Group mt="xl">
        <Button onClick={nextStep}>Start Assessment</Button>
      </Group>
    </Box>
  );
}

function CompanyStep() {
  const { nextStep, previousStep } = useWizard();
  return (
    <Box>
      <Title order={3}>Company Details</Title>
      <Text mt="md">[Company form goes here]</Text>
      <Group mt="xl">
        <Button variant="default" onClick={previousStep}>Back</Button>
        <Button onClick={nextStep}>Next</Button>
      </Group>
    </Box>
  );
}

function AISystemStep() {
  const { nextStep, previousStep } = useWizard();
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

function ApplicabilityStep() {
  const { nextStep, previousStep } = useWizard();
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

function RoleAssignmentStep() {
  const { nextStep, previousStep } = useWizard();
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

function RiskClassificationStep() {
  const { nextStep, previousStep } = useWizard();
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

function GPAIStep() {
  const { nextStep, previousStep } = useWizard();
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

function ResultsStep() {
  const { previousStep } = useWizard();
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

const stepLabels = [
  "Welcome",
  "Company",
  "AI System",
  "Applicability",
  "Roles",
  "Risk",
  "GPAI",
  "Results"
];

export default function AssessmentPage() {
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Mantine Stepper and react-use-wizard are kept in sync
  return (
    <Flex
      direction={isMobile ? 'column' : 'row'}
      align={isMobile ? 'stretch' : 'flex-start'}
      gap="xl"
      p="xl"
      style={{ minHeight: "80vh" }}
    >
      <Stepper
        orientation={isMobile ? 'horizontal' : 'vertical'}
        active={activeStep}
        onStepClick={setActiveStep}
        allowNextStepsSelect={false}
        w={isMobile ? '100%' : 220}
        size="md"
        styles={{
          step: isMobile ? { flex: 1, minWidth: 0 } : undefined,
          stepBody: { cursor: "pointer" }
        }}
      >
        {stepLabels.map((label) => (
          <Stepper.Step
            key={label}
            label={isMobile ? undefined : label}
          >
            {isMobile ? (
              <div style={{ fontSize: 12, marginTop: 4, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{label}</div>
            ) : null}
          </Stepper.Step>
        ))}
      </Stepper>
      <Paper
        shadow="md"
        radius="md"
        p="xl"
        style={{
          flex: 1,
          minWidth: 0,
          width: isMobile ? '100%' : undefined,
          marginTop: isMobile ? 24 : 0,
        }}
      >
        <Wizard
          startIndex={activeStep}
          onStepChange={setActiveStep}
        >
          <IntroStep />
          <CompanyStep />
          <AISystemStep />
          <ApplicabilityStep />
          <RoleAssignmentStep />
          <RiskClassificationStep />
          <GPAIStep />
          <ResultsStep />
        </Wizard>
      </Paper>
    </Flex>
  );
} 