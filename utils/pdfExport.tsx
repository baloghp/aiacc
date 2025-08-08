import { pdf } from '@react-pdf/renderer';
import AssessmentPDFDocument from '@/components/assessment/AssessmentPDFDocument';
import { AISystem } from '@/entities/AISystem';
import { Company } from '@/entities/Company';
import { Note } from '@/entities/Note';
import { Obligation } from '@/entities/Obligation';

export const generateAssessmentPDF = async (
  company?: Company,
  aiSystem?: AISystem,
  notes: Note[] = [],
  obligations: Obligation[] = []
): Promise<Blob> => {
  try {
    const blob = await pdf(
      <AssessmentPDFDocument
        company={company}
        aiSystem={aiSystem}
        notes={notes}
        obligations={obligations}
      />
    ).toBlob();
    return blob;
  } catch (error) {
    console.error('PDF generation failed:', error);
    throw new Error('Failed to generate PDF');
  }
};

export const downloadAssessmentPDF = async (
  company?: Company,
  aiSystem?: AISystem,
  notes: Note[] = [],
  obligations: Obligation[] = []
): Promise<void> => {
  try {
    const blob = await generateAssessmentPDF(company, aiSystem, notes, obligations);
    
    // Create download link
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    
    // Generate filename
    const timestamp = new Date().toISOString().slice(0, 10);
    const companyName = company?.name || 'Assessment';
    const filename = `ai-act-compliance-${companyName}-${timestamp}.pdf`;
    
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up URL
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('PDF download failed:', error);
    throw error;
  }
};
