'use client';

import { useState } from 'react';
import { Button, Group } from '@mantine/core';
import { IconDeviceFloppy, IconFolderOpen } from '@tabler/icons-react';
import { AssessmentManager } from '@/entities/AssessmentManager';
import { SavedAssessment } from '@/services/AssessmentStorage';
import SaveAssessmentDialog from './SaveAssessmentDialog';
import LoadAssessmentDialog from './LoadAssessmentDialog';

interface AssessmentSaveLoadButtonsProps {
  assessmentManager: AssessmentManager;
  currentStep: number;
  isComplete: boolean;
  onAssessmentLoaded?: (assessment: SavedAssessment) => void;
}

export default function AssessmentSaveLoadButtons({
  assessmentManager,
  currentStep,
  isComplete,
  onAssessmentLoaded,
}: AssessmentSaveLoadButtonsProps) {
  const [saveDialogOpened, setSaveDialogOpened] = useState(false);
  const [loadDialogOpened, setLoadDialogOpened] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSave = (assessmentId: string) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Assessment saved with ID:', assessmentId);
    }
    // Trigger refresh of load dialog
    setRefreshTrigger(prev => prev + 1);
  };

  const handleLoad = (assessment: SavedAssessment) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Assessment loaded:', assessment);
    }
    onAssessmentLoaded?.(assessment);
  };

  return (
    <>
      <Group gap="xs">
        <Button
          variant="light"
          size="sm"
          leftSection={<IconFolderOpen size={16} />}
          onClick={() => setLoadDialogOpened(true)}
        >
          Load
        </Button>
        <Button
          variant="light"
          size="sm"
          leftSection={<IconDeviceFloppy size={16} />}
          onClick={() => setSaveDialogOpened(true)}
        >
          Save
        </Button>
      </Group>

      <SaveAssessmentDialog
        opened={saveDialogOpened}
        onClose={() => setSaveDialogOpened(false)}
        assessmentManager={assessmentManager}
        currentStep={currentStep}
        isComplete={isComplete}
        onSaved={handleSave}
      />

      <LoadAssessmentDialog
        opened={loadDialogOpened}
        onClose={() => setLoadDialogOpened(false)}
        assessmentManager={assessmentManager}
        onLoad={handleLoad}
        refreshTrigger={refreshTrigger}
      />
    </>
  );
}
