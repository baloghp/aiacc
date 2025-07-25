"use client";
import { useState } from "react";
import { Stepper, Paper, Flex, Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import AssessmentIntroStep from "@/components/assessment/AssessmentIntroStep";
import AssessmentCompanyStep from "@/components/assessment/AssessmentCompanyStep";
import AssessmentAISystemStep from "@/components/assessment/AssessmentAISystemStep";
import AssessmentApplicabilityStep from "@/components/assessment/AssessmentApplicabilityStep";
import AssessmentRoleAssignmentStep from "@/components/assessment/AssessmentRoleAssignmentStep";
import AssessmentRiskClassificationStep from "@/components/assessment/AssessmentRiskClassificationStep";
import AssessmentGPAIStep from "@/components/assessment/AssessmentGPAIStep";
import AssessmentResultsStep from "@/components/assessment/AssessmentResultsStep";
import AssessmentResultsPanel from "@/components/assessment/AssessmentResultsPanel";

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

  // State for obligations and notes to show in the results panel
  const [obligations, _setObligations] = useState([]); // TODO: type Obligation[]
  const [notes, _setNotes] = useState([]); // TODO: type Note[]

  return (
    <Box maw={1100} mx="auto" w="100%">
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
          {activeStep === 0 && (
            <AssessmentIntroStep nextStep={() => setActiveStep((s) => s + 1)} />
          )}
          {activeStep === 1 && (
            <AssessmentCompanyStep
              previousStep={() => setActiveStep((s) => s - 1)}
              nextStep={() => setActiveStep((s) => s + 1)}
            />
          )}
          {activeStep === 2 && (
            <AssessmentAISystemStep
              previousStep={() => setActiveStep((s) => s - 1)}
              nextStep={() => setActiveStep((s) => s + 1)}
            />
          )}
          {activeStep === 3 && (
            <AssessmentApplicabilityStep
              previousStep={() => setActiveStep((s) => s - 1)}
              nextStep={() => setActiveStep((s) => s + 1)}
            />
          )}
          {activeStep === 4 && (
            <AssessmentRoleAssignmentStep
              previousStep={() => setActiveStep((s) => s - 1)}
              nextStep={() => setActiveStep((s) => s + 1)}
            />
          )}
          {activeStep === 5 && (
            <AssessmentRiskClassificationStep
              previousStep={() => setActiveStep((s) => s - 1)}
              nextStep={() => setActiveStep((s) => s + 1)}
            />
          )}
          {activeStep === 6 && (
            <AssessmentGPAIStep
              previousStep={() => setActiveStep((s) => s - 1)}
              nextStep={() => setActiveStep((s) => s + 1)}
            />
          )}
          {activeStep === 7 && (
            <AssessmentResultsStep previousStep={() => setActiveStep((s) => s - 1)} />
          )}
        </Paper>
      </Flex>
      {/* Results panel below the wizard, same width as content */}
      
      <AssessmentResultsPanel obligations={obligations} notes={notes} />
    </Box>
  );
} 