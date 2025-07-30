import { Card, Title, Text, Divider, Stack, Center, Box, Button, Group } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useEffect, useState } from "react";
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
  const [currentState, setCurrentState] = useState<AssessmentState | undefined>(undefined);
  const [updateTrigger, setUpdateTrigger] = useState(0);

  console.log('AssessmentResultsPanel received state:', assessmentState);

  // Update internal state when props change
  useEffect(() => {
    console.log('AssessmentResultsPanel useEffect triggered with assessmentState:', assessmentState);
    if (assessmentState) {
      console.log('AssessmentResultsPanel updating internal state:', assessmentState);
      setCurrentState(assessmentState);
      setUpdateTrigger(prev => {
        const newTrigger = prev + 1;
        console.log('Update trigger incremented to:', newTrigger);
        return newTrigger;
      });
    } else {
      console.log('AssessmentResultsPanel: assessmentState is undefined or null');
    }
  }, [assessmentState]);

  const showCompanySummary = company && company.name;
  const showAISystemSummary = aiSystem && aiSystem.name;

  const handleExportPDF = async () => {
    const element = document.getElementById('assessment-results');
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
    <Center mt="xxl">
      <Card id="assessment-results" shadow="lg" radius="md" p="xxl" w="100%">
        <Stack gap="md">
          <Box>
            <Group justify="space-between" align="flex-start">
              <Box>
                <Title order={3} mb={4}>Assessment Results</Title>
                <Text c="dimmed" size="sm">
                  Here are your currently applicable obligations and advisory notes based on your answers so far.
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
          <AssessmentNotesList key={`notes-${updateTrigger}-${Date.now()}`} assessmentState={currentState} />
          
          <Divider my="sm" />
          
          {/* Obligations Section */}
          <AssessmentObligationsList key={`obligations-${updateTrigger}-${Date.now()}`} assessmentState={currentState} />
          
          {/* Legal Disclaimer */}
          <AssessmentLegalDisclaimer />
        </Stack>
      </Card>
    </Center>
  );
} 