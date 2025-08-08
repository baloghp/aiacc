import { IconDownload } from '@tabler/icons-react';
import { Box, Button, Card, Center, Divider, Group, Stack, Text, Title } from '@mantine/core';
import { AISystem } from '@/entities/AISystem';
import { Company } from '@/entities/Company';
import { Note } from '@/entities/Note';
import { Obligation } from '@/entities/Obligation';
import AssessmentAISystemSummary from './AssessmentAISystemSummary';
import AssessmentCompanySummary from './AssessmentCompanySummary';
import type { StepNavProps } from './AssessmentIntroStep';
import AssessmentLegalDisclaimer from './AssessmentLegalDisclaimer';
import AssessmentNotesList from './AssessmentNotesList';
import AssessmentObligationsList from './AssessmentObligationsList';
import AssessmentExportButton from './AssessmentExportButton';
import { downloadAssessmentPDF } from '@/utils/pdfExport';

interface AssessmentResultsStepProps extends StepNavProps {
  previousStep?: () => void;
  assessmentState?: any;
  company?: Company;
  aiSystem?: AISystem;
  applicableNotes: Note[];
  applicableObligations: Obligation[];
  assessmentManager?: any;
}

export default function AssessmentResultsStep({
  previousStep: _previousStep,
  assessmentState: _assessmentState,
  company,
  aiSystem,
  applicableNotes,
  applicableObligations,
  assessmentManager,
}: AssessmentResultsStepProps) {
  const showCompanySummary = company && company.name;
  const showAISystemSummary = aiSystem && aiSystem.name;

  const handleExportPDF = async () => {
    try {
      await downloadAssessmentPDF(company, aiSystem, applicableNotes, applicableObligations);
    } catch (error) {
      console.error('PDF export failed:', error);
    }
  };

  return (
    <Center>
      <Card id="assessment-results-step" shadow="lg" radius="md" p="xxl" w="100%">
        <Stack gap="md">
          <Box>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Title order={3} mb={4}>
                  Assessment Results
                </Title>
                <Text c="dimmed" size="sm">
                  Here are your currently applicable obligations and advisory notes based on your
                  answers.
                </Text>
              </Box>
              <Group gap="xs">
                <Button
                  leftSection={<IconDownload size={16} />}
                  onClick={handleExportPDF}
                  color="blue"
                  size="sm"
                  variant="outline"
                >
                  Export PDF
                </Button>
                {assessmentManager && (
                  <AssessmentExportButton
                    assessmentManager={assessmentManager}
                    notes={applicableNotes}
                    obligations={applicableObligations}
                  />
                )}
              </Group>
            </Group>
          </Box>

          <Divider my="sm" />

          {/* Company Summary */}
          {showCompanySummary && (
            <>
              <AssessmentCompanySummary company={company} />
              <Divider my="sm" />
            </>
          )}

          {/* AI System Summary */}
          {showAISystemSummary && (
            <>
              <AssessmentAISystemSummary aiSystem={aiSystem} />
              <Divider my="sm" />
            </>
          )}

          {/* Notes Section */}
          <AssessmentNotesList notes={applicableNotes} />

          <Divider my="sm" />

          {/* Obligations Section */}
          <AssessmentObligationsList obligations={applicableObligations} />

          {/* Legal Disclaimer */}
          <AssessmentLegalDisclaimer />
        </Stack>
      </Card>
    </Center>
  );
}
