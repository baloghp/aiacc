import { Card, Title, Text, Divider, Stack, Center, Box } from "@mantine/core";
import AssessmentCompanySummary from "./AssessmentCompanySummary";
import AssessmentAISystemSummary from "./AssessmentAISystemSummary";
import AssessmentLegalDisclaimer from "./AssessmentLegalDisclaimer";
import AssessmentObligationsList from "./AssessmentObligationsList";
import AssessmentNotesList from "./AssessmentNotesList";
import { Company } from "@/entities/Company";
import { AISystem } from "@/entities/AISystem";
import { AssessmentState } from "@/entities/AssessmentManager";

interface AssessmentResultsPanelProps {
  assessmentState?: AssessmentState;
  company?: Company;
  aiSystem?: AISystem;
}

export default function AssessmentResultsPanel({ 
  assessmentState, 
  company, 
  aiSystem 
}: AssessmentResultsPanelProps) {
  const showCompanySummary = company && company.name;
  const showAISystemSummary = aiSystem && aiSystem.name;

  return (
    <Center mt="xxl">
      <Card shadow="lg" radius="md" p="xxl" w="100%">
        <Stack gap="md">
          <Box>
            <Title order={3} mb={4}>Assessment Results</Title>
            <Text c="dimmed" size="sm">
              Here are your currently applicable obligations and advisory notes based on your answers so far.
            </Text>
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
          <AssessmentNotesList assessmentState={assessmentState} />
          
          <Divider my="sm" />
          
          {/* Obligations Section */}
          <AssessmentObligationsList assessmentState={assessmentState} />
          
          {/* Legal Disclaimer */}
          <AssessmentLegalDisclaimer />
        </Stack>
      </Card>
    </Center>
  );
} 