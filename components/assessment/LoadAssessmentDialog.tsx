'use client';

import { useState, useEffect } from 'react';
import {
  Button,
  Group,
  Modal,
  Text,
  Stack,
  Card,
  Badge,
  ActionIcon,
  Alert,
  Divider,
  FileInput,
} from '@mantine/core';
import {
  IconTrash,
  IconDownload,
  IconAlertCircle,
  IconFileImport,
} from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { AssessmentStorage, SavedAssessment } from '@/services/AssessmentStorage';
import { AssessmentManager } from '@/entities/AssessmentManager';
import { downloadFile } from '@/utils/fileUtils';

interface LoadAssessmentDialogProps {
  opened: boolean;
  onClose: () => void;
  assessmentManager: AssessmentManager;
  onLoad: (assessment: SavedAssessment) => void;
  refreshTrigger?: number;
}

export default function LoadAssessmentDialog({
  opened,
  onClose,
  assessmentManager,
  onLoad,
  refreshTrigger,
}: LoadAssessmentDialogProps) {
  const [assessments, setAssessments] = useState<SavedAssessment[]>([]);
  const [selectedAssessment, setSelectedAssessment] = useState<SavedAssessment | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [storage, setStorage] = useState<AssessmentStorage | null>(null);

  useEffect(() => {
    setStorage(new AssessmentStorage());
  }, []);

  useEffect(() => {
    if (opened) {
      loadAssessments();
    }
  }, [opened, refreshTrigger]);

  const loadAssessments = () => {
    if (!storage) {
      return;
    }
    const savedAssessments = storage.getAllAssessments();
    setAssessments(savedAssessments);
  };

  const handleLoad = () => {
    if (!selectedAssessment) {
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Restore the assessment state
      assessmentManager.fromJSON(selectedAssessment.assessmentState);
      
      notifications.show({
        color: 'green',
        title: 'Assessment Loaded',
        message: `Assessment "${selectedAssessment.name}" has been loaded successfully.`,
        autoClose: 3000,
      });

      onLoad(selectedAssessment);
      handleClose();
    } catch (error) {
      setError('Failed to load assessment. The data may be corrupted.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = (assessmentId: string) => {
    if (!storage) {
      return;
    }
    if (storage.deleteAssessment(assessmentId)) {
      loadAssessments();
      if (selectedAssessment?.id === assessmentId) {
        setSelectedAssessment(null);
      }
      
      notifications.show({
        color: 'green',
        title: 'Assessment Deleted',
        message: 'Assessment has been deleted successfully.',
        autoClose: 3000,
      });
    }
  };

  const handleExport = (assessmentId: string) => {
    if (!storage) {
      return;
    }
    const jsonData = storage.exportAssessment(assessmentId);
    if (!jsonData) {
      notifications.show({
        color: 'red',
        title: 'Export Failed',
        message: 'Failed to export assessment.',
      });
      return;
    }

    // Create and download file
    downloadFile(jsonData, `assessment_${assessmentId}.json`);

    notifications.show({
      color: 'green',
      title: 'Assessment Exported',
      message: 'Assessment has been exported successfully.',
      autoClose: 3000,
    });
  };

  const handleImport = async (file: File | null) => {
    if (!file) {
      return;
    }

    if (!storage) {
      setError('Storage not initialized');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const text = await file.text();
      const importedAssessment = storage.importAssessment(text);
      
      if (importedAssessment) {
        loadAssessments();
        notifications.show({
          color: 'green',
          title: 'Assessment Imported',
          message: `Assessment "${importedAssessment.name}" has been imported successfully.`,
          autoClose: 3000,
        });
      } else {
        setError('Failed to import assessment. Please check the file format.');
      }
    } catch (error) {
      setError('Failed to import assessment. Please check the file format.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedAssessment(null);
    setError('');
    setIsLoading(false);
    onClose();
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStepLabel = (step: number): string => {
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
    return stepLabels[step] || `Step ${step}`;
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Load Assessment"
      size="lg"
      closeOnClickOutside={!isLoading}
      closeOnEscape={!isLoading}
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Load a previously saved assessment or import one from a file.
        </Text>

        {/* Import Section */}
        <Card withBorder p="md">
          <Stack gap="sm">
            <Text size="sm" fw={500}>
              Import Assessment
            </Text>
            <FileInput
              placeholder="Select JSON file to import"
              accept=".json"
              leftSection={<IconFileImport size={16} />}
              onChange={handleImport}
              disabled={isLoading}
            />
          </Stack>
        </Card>

        <Divider />

        {/* Saved Assessments Section */}
        <Stack gap="sm">
          <Text size="sm" fw={500}>
            Saved Assessments ({assessments.length}/10)
          </Text>

          {assessments.length === 0 ? (
            <Alert
              icon={<IconAlertCircle size={16} />}
              title="No Saved Assessments"
              color="blue"
              variant="light"
            >
              You don't have any saved assessments yet. Complete an assessment and save it to see it here.
            </Alert>
          ) : (
            <Stack gap="xs">
              {assessments.map((assessment) => (
                <Card
                  key={assessment.id}
                  withBorder
                  p="md"
                  style={{
                    cursor: 'pointer',
                    borderColor: selectedAssessment?.id === assessment.id ? 'var(--mantine-color-blue-6)' : undefined,
                    backgroundColor: selectedAssessment?.id === assessment.id ? 'var(--mantine-color-blue-0)' : undefined,
                  }}
                  onClick={() => setSelectedAssessment(assessment)}
                >
                  <Group justify="space-between" align="flex-start">
                    <Stack gap="xs" style={{ flex: 1 }}>
                      <Text fw={500} size="sm">
                        {assessment.name}
                      </Text>
                      <Group gap="xs">
                        <Badge
                          variant="light"
                          color={assessment.isComplete ? 'green' : 'blue'}
                          size="sm"
                        >
                          {assessment.isComplete ? 'Complete' : 'In Progress'}
                        </Badge>
                        <Badge variant="light" size="sm">
                          {getStepLabel(assessment.currentStep)}
                        </Badge>
                      </Group>
                      <Text size="xs" c="dimmed">
                        Last modified: {formatDate(assessment.lastModified)}
                      </Text>
                    </Stack>
                    <Group gap="xs">
                      <ActionIcon
                        variant="subtle"
                        color="blue"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExport(assessment.id);
                        }}
                        title="Export"
                      >
                        <IconDownload size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant="subtle"
                        color="red"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(assessment.id);
                        }}
                        title="Delete"
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Group>
                </Card>
              ))}
            </Stack>
          )}
        </Stack>

        {error && (
          <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red" variant="light">
            {error}
          </Alert>
        )}

        <Group justify="flex-end" gap="sm">
          <Button variant="subtle" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleLoad}
            loading={isLoading}
            disabled={!selectedAssessment}
          >
            Load Assessment
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
