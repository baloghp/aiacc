import { Button, Group, Modal, Text, Stack } from '@mantine/core';
import { AssessmentPhase } from '@/entities/enums';

interface BacktrackConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  targetStep: number;
  currentStep: number;
}

export function BacktrackConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  targetStep,
  currentStep,
}: BacktrackConfirmationDialogProps) {
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

  const getPhaseLabel = (phase: AssessmentPhase | null): string => {
    if (!phase) {return '';}
    
    const phaseLabels = {
      [AssessmentPhase.Company]: 'Company Information',
      [AssessmentPhase.AISystem]: 'AI System Details',
      [AssessmentPhase.Applicability]: 'Applicability Assessment',
      [AssessmentPhase.Roles]: 'Role Assignment',
      [AssessmentPhase.Risk]: 'Risk Classification',
      [AssessmentPhase.GPAI]: 'GPAI Assessment',
      [AssessmentPhase.Results]: 'Results',
    };
    
    return phaseLabels[phase] || phase;
  };

  const targetPhase = getPhaseLabel(getPhaseForStep(targetStep));
  const currentPhase = getPhaseLabel(getPhaseForStep(currentStep));

  const title = `Go back to ${stepLabels[targetStep]}?`;
  const message = `Going back to the ${stepLabels[targetStep]} step will clear all your answers from ${targetPhase} onwards. You will need to re-answer all questions from that point forward.`;

  return (
    <Modal opened={isOpen} onClose={onClose} title={title} centered size="md">
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          {message}
        </Text>
        
        <Text size="sm" fw={500}>
          This will affect:
        </Text>
        
        <Text size="sm" c="red">
          • {targetPhase}
          {currentPhase && currentPhase !== targetPhase ? (
            <>
              <br />• {currentPhase}
            </>
          ) : null}
        </Text>
        
        <Text size="sm" c="dimmed">
          Are you sure you want to continue?
        </Text>
      </Stack>
      
      <Group justify="flex-end" mt="lg">
        <Button variant="light" onClick={onClose}>
          Cancel
        </Button>
        <Button color="orange" onClick={onConfirm}>
          Go Back & Clear Answers
        </Button>
      </Group>
    </Modal>
  );
}

// Helper function to get phase for step (duplicated from AssessmentManager for component use)
function getPhaseForStep(step: number): AssessmentPhase | null {
  const stepToPhaseMap = {
    0: null, // Welcome step has no phase
    1: AssessmentPhase.Company,
    2: AssessmentPhase.AISystem,
    3: AssessmentPhase.Applicability,
    4: AssessmentPhase.Roles,
    5: AssessmentPhase.Risk,
    6: AssessmentPhase.GPAI,
    7: null, // Results step has no phase
  };
  
  return stepToPhaseMap[step as keyof typeof stepToPhaseMap] || null;
}
