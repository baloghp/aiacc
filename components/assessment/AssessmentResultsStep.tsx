import { Button, Group, Title, Text, Box, Center, Card, Stack, Divider } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import type { StepNavProps } from "./AssessmentIntroStep";
import AssessmentCompanySummary from "./AssessmentCompanySummary";
import AssessmentAISystemSummary from "./AssessmentAISystemSummary";
import AssessmentLegalDisclaimer from "./AssessmentLegalDisclaimer";
import AssessmentObligationsList from "./AssessmentObligationsList";
import AssessmentNotesList from "./AssessmentNotesList";
import { Company } from "@/entities/Company";
import { AISystem } from "@/entities/AISystem";
import { Note } from "@/entities/Note";
import { Obligation } from "@/entities/Obligation";

interface AssessmentResultsStepProps extends StepNavProps {
  previousStep?: () => void;
  assessmentState?: any;
  company?: Company;
  aiSystem?: AISystem;
  applicableNotes: Note[];
  applicableObligations: Obligation[];
}

export default function AssessmentResultsStep({ 
  previousStep: _previousStep, 
  assessmentState: _assessmentState, 
  company, 
  aiSystem, 
  applicableNotes, 
  applicableObligations 
}: AssessmentResultsStepProps) {
  
  const showCompanySummary = company && company.name;
  const showAISystemSummary = aiSystem && aiSystem.name;

  const handleExportPDF = async () => {
    const element = document.getElementById('assessment-results-step');
    if (!element) {
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Generate filename with timestamp
      const timestamp = new Date().toISOString().slice(0, 10);
      const companyName = company?.name || 'Assessment';
      const filename = `ai-act-compliance-${companyName}-${timestamp}.pdf`;
      
      pdf.save(filename);
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
                <Title order={3} mb={4}>Assessment Results</Title>
                <Text c="dimmed" size="sm">
                  Here are your currently applicable obligations and advisory notes based on your answers.
                </Text>
              </Box>
              <Button 
                leftSection={<IconDownload size={16} />}
                onClick={handleExportPDF}
                color="blue"
                size="sm"
                variant="outline"
              >
                Export PDF
              </Button>
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