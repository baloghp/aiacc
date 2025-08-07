import * as XLSX from 'xlsx';
import { AssessmentManager } from '@/entities/AssessmentManager';
import { Note } from '@/entities/Note';
import { Obligation } from '@/entities/Obligation';

export function exportAssessmentToExcel(
  assessmentManager: AssessmentManager,
  notes: Note[],
  obligations: Obligation[]
): void {
  const state = assessmentManager.getState();
  const activeTags = assessmentManager.getActiveTags();

  // Create workbook
  const workbook = XLSX.utils.book_new();

  // Sheet 1: Assessment Summary
  const summaryData = [
    ['EU AI Act Compliance Assessment Report'],
    [''],
    ['This report contains the results of an AI Act compliance assessment conducted using our assessment tool.'],
    ['The assessment evaluates whether your AI system falls within the scope of the EU AI Act and identifies applicable obligations.'],
    [''],
    ['Assessment Date:', new Date().toLocaleDateString()],
    ['Company:', state.company.name || 'Not specified'],
    ['AI System:', state.aiSystem.name || 'Not specified'],
    [''],
    ['IMPORTANT DISCLAIMER:'],
    ['This assessment is for informational purposes only and does not constitute legal advice.'],
    ['The results should be reviewed by qualified legal professionals familiar with the EU AI Act.'],
    ['Compliance with the EU AI Act requires ongoing monitoring and may change based on regulatory updates.'],
    [''],
    ['Report Contents:'],
    ['• Company Information - Details about the assessed organization'],
    ['• AI System Information - Technical details of the AI system'],
    ['• Questions and Answers - Assessment responses with associated tags'],
    ['• Active Tags Summary - Current system properties and classifications'],
    ['• Advisory Notes - Relevant guidance and recommendations'],
    ['• Applicable Obligations - Legal requirements that apply to your system'],
    [''],
    ['Note: For better formatting, open this file in Excel and apply "Table Style Medium 2" to each sheet.'],
  ];
  const summarySheet = XLSX.utils.aoa_to_sheet(summaryData);
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Assessment Summary');

  // Sheet 2: Company Information
  const companyData = [
    ['Company Information'],
    [''],
    ['Name', state.company.name || 'Not specified'],
    ['Legal Entity', state.company.legalEntity || 'Not specified'],
    ['Location', state.company.location || 'Not specified'],
    ['Contact Person', state.company.contactPerson || 'Not specified'],
    [''],
    ['Stakeholders'],
    ...(state.company.stakeholders.length > 0 
      ? state.company.stakeholders.map(stakeholder => [stakeholder])
      : [['None specified']]
    ),
    [''],
    ['Certifications'],
    ...(state.company.certifications.length > 0 
      ? state.company.certifications.map(cert => [cert])
      : [['None specified']]
    ),
  ];
  const companySheet = XLSX.utils.aoa_to_sheet(companyData);
  XLSX.utils.book_append_sheet(workbook, companySheet, 'Company Info');

  // Sheet 3: AI System Information
  const aiSystemData = [
    ['AI System Information'],
    [''],
    ['Name', state.aiSystem.name || 'Not specified'],
    ['Intended Purpose', state.aiSystem.intendedPurpose || 'Not specified'],
    ['Description', state.aiSystem.description || 'Not specified'],
    ['Functionality', state.aiSystem.functionality || 'Not specified'],
    ['Deployment Context', state.aiSystem.deploymentContext || 'Not specified'],
    ['Version', state.aiSystem.version || 'Not specified'],
    ['Assessment Date', state.aiSystem.assessmentDate || 'Not specified'],
  ];
  const aiSystemSheet = XLSX.utils.aoa_to_sheet(aiSystemData);
  XLSX.utils.book_append_sheet(workbook, aiSystemSheet, 'AI System Info');

  // Sheet 4: Questions and Answers (from activeTags)
  const questionsData = [
    ['Questions and Answers'],
    [''],
    ['Explanation: The tags below represent properties and classifications of your company and AI system based on your assessment responses.'],
    ['These tags determine which obligations and notes apply to your situation.'],
    [''],
    ['Question ID', 'Answer Tags'],
    ...Object.entries(state.activeTags).map(([questionId, tags]) => [
      questionId,
      tags.join(', '),
    ]),
  ];
  const questionsSheet = XLSX.utils.aoa_to_sheet(questionsData);
  XLSX.utils.book_append_sheet(workbook, questionsSheet, 'Questions');

  // Sheet 5: Active Tags Summary
  const tagsData = [
    ['Active Tags Summary'],
    [''],
    ['These tags represent the current properties and classifications of your AI system and company:'],
    [''],
    ['Tag'],
    ...activeTags.map(tag => [tag]),
  ];
  const tagsSheet = XLSX.utils.aoa_to_sheet(tagsData);
  XLSX.utils.book_append_sheet(workbook, tagsSheet, 'Active Tags');

  // Sheet 6: Notes
  const notesData = [
    ['Advisory Notes'],
    [''],
    ['These notes provide guidance and recommendations based on your assessment:'],
    [''],
    ['ID', 'Title', 'Description', 'Required Tags', 'Required All Tags'],
    ...notes.map(note => [
      note.id,
      note.title,
      note.description,
      note.requiredTags?.join(', ') || '',
      (note as any).requiredAllTags?.join(', ') || '',
    ]),
  ];
  const notesSheet = XLSX.utils.aoa_to_sheet(notesData);
  XLSX.utils.book_append_sheet(workbook, notesSheet, 'Notes');

  // Sheet 7: Obligations
  const obligationsData = [
    ['Applicable Obligations'],
    [''],
    ['These obligations from the EU AI Act apply to your AI system based on your assessment:'],
    [''],
    ['ID', 'Article', 'Description', 'Required Tags', 'Required All Tags'],
    ...obligations.map(obligation => [
      obligation.id,
      obligation.article,
      obligation.description,
      obligation.requiredTags?.join(', ') || '',
      (obligation as any).requiredAllTags?.join(', ') || '',
    ]),
  ];
  const obligationsSheet = XLSX.utils.aoa_to_sheet(obligationsData);
  XLSX.utils.book_append_sheet(workbook, obligationsSheet, 'Obligations');

  // Generate filename with timestamp
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const filename = `AI_Act_Assessment_${timestamp}.xlsx`;

  // Apply basic formatting to all sheets
  const sheets = workbook.SheetNames;
  sheets.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    
    // Set column widths for better readability
    const range = XLSX.utils.decode_range(sheet['!ref'] || 'A1');
    if (!sheet['!cols']) {
      sheet['!cols'] = [];
    }
    for (let col = 0; col <= range.e.c; col++) {
      sheet['!cols'][col] = { width: 25 };
    }
    
    // Try to apply basic header styling (may not work in all Excel versions)
    try {
      for (let col = 0; col <= range.e.c; col++) {
        const colLetter = XLSX.utils.encode_col(col);
        const cellAddress = `${colLetter}1`;
        if (sheet[cellAddress]) {
          sheet[cellAddress].s = {
            font: { bold: true },
            fill: { fgColor: { rgb: '4472C4' } }
          };
        }
      }
    } catch (error) {
      console.log('Styling not supported in this XLSX version');
    }
  });

  // Export the workbook
  XLSX.writeFile(workbook, filename);
} 