import { Button, Group, Text } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { AssessmentManager } from '@/entities/AssessmentManager';
import { Note } from '@/entities/Note';
import { Obligation } from '@/entities/Obligation';
import { exportAssessmentToExcel } from '@/utils/excelExport';

interface AssessmentExportButtonProps {
  assessmentManager: AssessmentManager;
  notes: Note[];
  obligations: Obligation[];
  disabled?: boolean;
}

export default function AssessmentExportButton({
  assessmentManager,
  notes,
  obligations,
  disabled = false,
}: AssessmentExportButtonProps) {
  const handleExport = () => {
    try {
      exportAssessmentToExcel(
        assessmentManager,
        notes,
        obligations
      );
    } catch (error) {
      console.error('Export failed:', error);
      // You could add a notification here if you have a notification system
    }
  };

  return (
    <Group>
      <Button
        leftSection={<IconDownload size={16} />}
        onClick={handleExport}
        disabled={disabled}
        variant="outline"
        color="blue"
      >
        Export to Excel
      </Button>
      <Text size="xs" c="dimmed">
        Downloads assessment data with multiple sheets
      </Text>
    </Group>
  );
} 