'use client';

import { useState, useEffect } from 'react';
import {
  Button,
  Group,
  Modal,
  Text,
  TextInput,
  Alert,
  Stack,
} from '@mantine/core';
import { IconAlertCircle, IconDeviceFloppy } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { AssessmentStorage } from '@/services/AssessmentStorage';
import { AssessmentManager } from '@/entities/AssessmentManager';

interface SaveAssessmentDialogProps {
  opened: boolean;
  onClose: () => void;
  assessmentManager: AssessmentManager;
  currentStep: number;
  isComplete: boolean;
  onSaved?: (assessmentId: string) => void;
}

export default function SaveAssessmentDialog({
  opened,
  onClose,
  assessmentManager,
  currentStep,
  isComplete,
  onSaved,
}: SaveAssessmentDialogProps) {
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [storage, setStorage] = useState<AssessmentStorage | null>(null);

  useEffect(() => {
    setStorage(new AssessmentStorage());
  }, []);

  const handleSave = async () => {
    if (!name.trim()) {
      setError('Please enter a name for your assessment');
      return;
    }

    if (!storage) {
      setError('Storage not initialized');
      return;
    }

    setIsSaving(true);
    setError('');

    try {
      // Check if storage is full
      if (storage.isStorageFull()) {
        setError('Storage is full. Please delete some saved assessments first.');
        return;
      }

      const assessmentData = {
        name: name.trim(),
        assessmentState: assessmentManager.toJSON(),
        currentStep,
        isComplete,
      };

      const assessmentId = storage.saveAssessment(assessmentData);

      notifications.show({
        color: 'green',
        title: 'Assessment Saved',
        message: `Assessment "${name.trim()}" has been saved successfully.`,
        icon: <IconDeviceFloppy size={18} />,
        autoClose: 3000,
      });

      onSaved?.(assessmentId);
      handleClose();
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to save assessment');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    setName('');
    setError('');
    setIsSaving(false);
    onClose();
  };

  const getDefaultName = (): string => {
    const state = assessmentManager.getState();
    const companyName = state.company.name.trim();
    const aiSystemName = state.aiSystem.name.trim();
    
    if (companyName && aiSystemName) {
      return `${companyName} - ${aiSystemName}`;
    } else if (companyName) {
      return `${companyName} Assessment`;
    } else if (aiSystemName) {
      return `${aiSystemName} Assessment`;
    } 
      return 'New Assessment';
    
  };

  // Set default name when dialog opens
  useEffect(() => {
    if (opened && !name) {
      setName(getDefaultName());
    }
  }, [opened]);

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Save Assessment"
      size="md"
      closeOnClickOutside={!isSaving}
      closeOnEscape={!isSaving}
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Save your current assessment progress to continue later or share with others.
        </Text>

        <TextInput
          label="Assessment Name"
          placeholder="Enter a name for your assessment"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error}
          disabled={isSaving}
          autoFocus
        />

        {storage?.isStorageFull() && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Storage Full"
            color="orange"
            variant="light"
          >
            You have reached the maximum of 10 saved assessments. 
            Please delete some saved assessments before saving a new one.
          </Alert>
        )}

        <Group justify="flex-end" gap="sm">
          <Button variant="subtle" onClick={handleClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            loading={isSaving}
            disabled={!name.trim() || storage?.isStorageFull() || false}
            leftSection={<IconDeviceFloppy size={16} />}
          >
            Save Assessment
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
