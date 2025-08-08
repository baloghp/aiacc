'use client';

import { useEffect, useRef, useState } from 'react';
import { Box, Flex, Paper, Stepper } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import AssessmentAISystemStep from '@/components/assessment/AssessmentAISystemStep';
import AssessmentApplicabilityStep from '@/components/assessment/AssessmentApplicabilityStep';
import AssessmentCompanyStep from '@/components/assessment/AssessmentCompanyStep';
import AssessmentGPAIStep from '@/components/assessment/AssessmentGPAIStep';
import AssessmentIntroStep from '@/components/assessment/AssessmentIntroStep';
import AssessmentResultsPanel from '@/components/assessment/AssessmentResultsPanel';
import AssessmentResultsStep from '@/components/assessment/AssessmentResultsStep';
import AssessmentRiskClassificationStep from '@/components/assessment/AssessmentRiskClassificationStep';
import AssessmentRoleAssignmentStep from '@/components/assessment/AssessmentRoleAssignmentStep';
import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import AssessmentSaveLoadButtons from '@/components/assessment/AssessmentSaveLoadButtons';
import { BacktrackConfirmationDialog } from '@/components/assessment/BacktrackConfirmationDialog';
import { AssessmentManager, AssessmentState } from '@/entities/AssessmentManager';
import { Note } from '@/entities/Note';
import { Obligation } from '@/entities/Obligation';
import { SavedAssessment } from '@/services/AssessmentStorage';

const stepLabels = [
  'Welcome',
  'Company',
  'AI System',
  'Applicability',
  'Roles',
  'Risk',
  'GPAI',
  'Results',
];

export default function AssessmentPage() {
  const [activeStep, setActiveStep] = useState(0);
  const isMobile = useMediaQuery('(max-width: 768px)');
  // Create AssessmentManager instance using useRef to persist across renders
  const assessmentManagerRef = useRef<AssessmentManager>(new AssessmentManager());

  const [assessmentState, setAssessmentState] = useState<AssessmentState | undefined>(() => {
    // Initialize with the AssessmentManager's initial state
    const initialState = assessmentManagerRef.current.getState();
    return initialState;
  });

  const [applicableNotes, setApplicableNotes] = useState<Note[]>([]);
  const [applicableObligations, setApplicableObligations] = useState<Obligation[]>([]);
  const [stateUpdateTrigger, setStateUpdateTrigger] = useState(0);

  // Backtracking state
  const [showBacktrackDialog, setShowBacktrackDialog] = useState(false);
  const [pendingTargetStep, setPendingTargetStep] = useState<number | null>(null);

  // Handle assessment loaded from storage
  const handleAssessmentLoaded = (assessment: SavedAssessment) => {
    // Update the current step to where the assessment was saved
    setActiveStep(assessment.currentStep);
    // Trigger state update to refresh the UI
    triggerStateUpdate();
  };

  // Update assessment state and applicable lists whenever it changes
  useEffect(() => {
    const updateState = () => {
      const newState = assessmentManagerRef.current.getState();
      setAssessmentState(newState);

      // Update applicable lists
      setApplicableNotes(assessmentManagerRef.current.getApplicableNotes());
      setApplicableObligations(assessmentManagerRef.current.getApplicableObligations());
    };

    // Initial state
    updateState();
  }, [activeStep, stateUpdateTrigger]);

  // Method to trigger state updates
  const triggerStateUpdate = () => {
    setStateUpdateTrigger((prev) => prev + 1);
  };

  // Method to get current assessment state
  const getCurrentAssessmentState = () => {
    const newState = assessmentManagerRef.current.getState();
    return newState;
  };

  // Handle stepper step click with backtracking confirmation
  const handleStepClick = (step: number) => {
    // If clicking on a previous step, show confirmation dialog
    if (step < activeStep) {
      setPendingTargetStep(step);
      setShowBacktrackDialog(true);
    } else {
      // For future steps, just set the step (should be prevented by allowNextStepsSelect)
      setActiveStep(step);
    }
  };

  // Handle backtracking confirmation
  const handleBacktrackConfirm = () => {
    if (pendingTargetStep !== null) {
      const targetPhase = assessmentManagerRef.current.getPhaseForStep(pendingTargetStep);
      
      if (targetPhase) {
        // Clear answers from the target phase onwards
        assessmentManagerRef.current.clearAnswersFromPhase(targetPhase);
      }
      
      // Navigate to the target step
      setActiveStep(pendingTargetStep);
      
      // Trigger state update to refresh the UI
      triggerStateUpdate();
      
      // Reset dialog state
      setShowBacktrackDialog(false);
      setPendingTargetStep(null);
    }
  };

  // Handle backtracking cancellation
  const handleBacktrackCancel = () => {
    setShowBacktrackDialog(false);
    setPendingTargetStep(null);
  };

  return (
    <Box maw={1100} mx="auto" w="100%">
      <Flex
        direction={isMobile ? 'column' : 'row'}
        align={isMobile ? 'stretch' : 'flex-start'}
        gap="xl"
        p="xl"
        style={{ minHeight: '80vh' }}
      >
        {/* Color Scheme Toggle - Top Left (Hidden on Mobile) */}
        {!isMobile && (
          <Box style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 10 }}>
            <ColorSchemeToggle />
          </Box>
        )}

        {/* Save/Load Buttons - Top Right (Hidden on Mobile) */}
        {!isMobile && (
          <Box style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
            <AssessmentSaveLoadButtons
              assessmentManager={assessmentManagerRef.current}
              currentStep={activeStep}
              isComplete={activeStep === 7}
              onAssessmentLoaded={handleAssessmentLoaded}
            />
          </Box>
        )}

        <Stepper
          orientation={isMobile ? 'horizontal' : 'vertical'}
          active={activeStep}
          onStepClick={handleStepClick}
          allowNextStepsSelect={false}
          w={isMobile ? '100%' : 220}
          size="md"
          styles={{
            step: isMobile ? { flex: 1, minWidth: 0 } : undefined,
            stepBody: { cursor: 'pointer' },
          }}
        >
          {stepLabels.map((label) => (
            <Stepper.Step key={label} label={isMobile ? undefined : label}>
              {isMobile ? (
                <div
                  style={{
                    fontSize: 12,
                    marginTop: 4,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {label}
                </div>
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
          {activeStep === 0 && <AssessmentIntroStep nextStep={() => setActiveStep((s) => s + 1)} />}
          {activeStep === 1 && (
            <AssessmentCompanyStep
              previousStep={() => setActiveStep((s) => s - 1)}
              nextStep={() => {
                setActiveStep((s) => s + 1);
                setAssessmentState(getCurrentAssessmentState());
              }}
              assessmentManager={assessmentManagerRef.current}
            />
          )}
          {activeStep === 2 && (
            <AssessmentAISystemStep
              previousStep={() => setActiveStep((s) => s - 1)}
              nextStep={() => {
                setActiveStep((s) => s + 1);
                setAssessmentState(getCurrentAssessmentState());
              }}
              assessmentManager={assessmentManagerRef.current}
            />
          )}
          {activeStep === 3 && (
            <AssessmentApplicabilityStep
              previousStep={() => setActiveStep((s) => s - 1)}
              nextStep={() => {
                setActiveStep((s) => s + 1);
                setAssessmentState(getCurrentAssessmentState());
              }}
              assessmentManager={assessmentManagerRef.current}
              onStateChange={triggerStateUpdate}
              onEarlyTermination={() => {
                if (process.env.NODE_ENV === 'development') {
                  console.log('Early termination: skipping to Results step');
                }
                setActiveStep(7); // Skip directly to Results step
                setAssessmentState(getCurrentAssessmentState());
              }}
            />
          )}
          {activeStep === 4 && (
            <AssessmentRoleAssignmentStep
              previousStep={() => setActiveStep((s) => s - 1)}
              nextStep={() => {
                setActiveStep((s) => s + 1);
                setAssessmentState(getCurrentAssessmentState());
              }}
              assessmentManager={assessmentManagerRef.current}
              onStateChange={triggerStateUpdate}
              onEarlyTermination={() => {
                if (process.env.NODE_ENV === 'development') {
                  console.log('Early termination: skipping to Results step');
                }
                setActiveStep(7); // Skip directly to Results step
                setAssessmentState(getCurrentAssessmentState());
              }}
            />
          )}
          {activeStep === 5 && (
            <AssessmentRiskClassificationStep
              previousStep={() => setActiveStep((s) => s - 1)}
              nextStep={() => {
                setActiveStep((s) => s + 1);
                setAssessmentState(getCurrentAssessmentState());
              }}
              assessmentManager={assessmentManagerRef.current}
              onStateChange={triggerStateUpdate}
              onEarlyTermination={() => {
                if (process.env.NODE_ENV === 'development') {
                  console.log('Early termination: skipping to Results step');
                }
                setActiveStep(7); // Skip directly to Results step
                setAssessmentState(getCurrentAssessmentState());
              }}
            />
          )}
          {activeStep === 6 && (
            <AssessmentGPAIStep
              previousStep={() => setActiveStep((s) => s - 1)}
              nextStep={() => {
                setActiveStep((s) => s + 1);
                setAssessmentState(getCurrentAssessmentState());
              }}
              assessmentManager={assessmentManagerRef.current}
              onStateChange={triggerStateUpdate}
              onEarlyTermination={() => {
                if (process.env.NODE_ENV === 'development') {
                  console.log('Early termination: skipping to Results step');
                }
                setActiveStep(7); // Skip directly to Results step
                setAssessmentState(getCurrentAssessmentState());
              }}
            />
          )}
          {activeStep === 7 && (
            <AssessmentResultsStep
              previousStep={() => setActiveStep((s) => s - 1)}
              assessmentState={assessmentState}
              company={assessmentState?.company}
              aiSystem={assessmentState?.aiSystem}
              applicableNotes={applicableNotes}
              applicableObligations={applicableObligations}
              assessmentManager={assessmentManagerRef.current}
            />
          )}
        </Paper>

        {/* Backtrack Confirmation Dialog */}
        <BacktrackConfirmationDialog
          isOpen={showBacktrackDialog}
          onClose={handleBacktrackCancel}
          onConfirm={handleBacktrackConfirm}
          targetStep={pendingTargetStep || 0}
          currentStep={activeStep}
        />
      </Flex>

      {/* Save/Load Buttons - Mobile (Below content) */}
      {isMobile && (
        <Box p="md">
          <AssessmentSaveLoadButtons
            assessmentManager={assessmentManagerRef.current}
            currentStep={activeStep}
            isComplete={activeStep === 7}
            onAssessmentLoaded={handleAssessmentLoaded}
          />
        </Box>
      )}

      {/* Results panel below the wizard, same width as content */}

      {/* Only show results panel when not on the Results step */}
      {activeStep !== 7 && (
        <AssessmentResultsPanel
          _assessmentState={assessmentState}
          company={assessmentState?.company}
          aiSystem={assessmentState?.aiSystem}
          applicableNotes={applicableNotes}
          applicableObligations={applicableObligations}
          assessmentManager={assessmentManagerRef.current}
        />
      )}
    </Box>
  );
}
