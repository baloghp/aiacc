import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer';
import { AISystem } from '@/entities/AISystem';
import { Company } from '@/entities/Company';
import { Note } from '@/entities/Note';
import { Obligation } from '@/entities/Obligation';
import { markdownToReadableText } from '@/utils/markdownToText';

// Using default fonts - React-PDF will use system fonts

// Create styles - optimized for maximum content
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 15,
  },
  header: {
    marginBottom: 10,
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: 8,
  },
  logoSection: {
    marginBottom: 8,
    textAlign: 'center',
  },
  logoText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    backgroundColor: '#f8f9fa',
    padding: '4px 8px',
    borderRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 9,
    color: '#666666',
    marginBottom: 6,
    lineHeight: 1.3,
  },
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: 2,
  },
  summaryBox: {
    backgroundColor: '#f8f9fa',
    padding: 8,
    marginBottom: 8,
    border: '1px solid #e0e0e0',
  },
  summaryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  summaryText: {
    fontSize: 9,
    lineHeight: 1.2,
  },
  noteItem: {
    marginBottom: 6,
    padding: 6,
    backgroundColor: '#fff3cd',
    border: '1px solid #ffeaa7',
  },
  obligationItem: {
    marginBottom: 6,
    padding: 6,
    backgroundColor: '#d1ecf1',
    border: '1px solid #bee5eb',
  },
  itemTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  itemContent: {
    fontSize: 8,
    lineHeight: 1.1,
  },
  tag: {
    fontSize: 7,
    backgroundColor: '#e9ecef',
    padding: '1px 3px',
    marginRight: 2,
    marginBottom: 2,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2,
  },
  footer: {
    marginTop: 15,
    paddingTop: 8,
    borderTop: '1px solid #e0e0e0',
    fontSize: 7,
    color: '#666666',
    textAlign: 'center',
  },
  disclaimer: {
    fontSize: 7,
    color: '#666666',
    marginTop: 8,
    padding: 6,
    backgroundColor: '#f8f9fa',
    border: '1px solid #e0e0e0',
  },
});

interface AssessmentPDFDocumentProps {
  company?: Company;
  aiSystem?: AISystem;
  notes: Note[];
  obligations: Obligation[];
}

const AssessmentPDFDocument: React.FC<AssessmentPDFDocumentProps> = ({
  company,
  aiSystem,
  notes,
  obligations,
}) => {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

    return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoSection}>
            <Text style={styles.logoText}>ITTD</Text>
          </View>
          <Text style={styles.title}>AI Act Compliance Checker</Text>
          <Text style={styles.subtitle}>
            The EU AI Act is a landmark regulation guiding the responsible development and use of artificial intelligence across Europe and beyond. 
            This assessment tool helps organizations understand their compliance obligations.
          </Text>
          <Text style={styles.subtitle}>
            This platform is a free and open source initiative. Our mission is to democratize access to AI compliance expertise and support organizations of all sizes in their responsible AI journey.
          </Text>
          <Text style={styles.subtitle}>
            Available at: https://aiacc.ittd.app/assessment
          </Text>
          <Text style={styles.subtitle}>Generated on {formatDate(new Date())}</Text>
        </View>

        {/* Company Summary */}
        {company && company.name && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Company Information</Text>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryTitle}>{company.name}</Text>
              <Text style={styles.summaryText}>Legal Entity: {company.legalEntity || 'Not specified'}</Text>
              {company.location && (
                <Text style={styles.summaryText}>Location: {company.location}</Text>
              )}
              {company.contactPerson && (
                <Text style={styles.summaryText}>Contact Person: {company.contactPerson}</Text>
              )}
              {company.stakeholders && company.stakeholders.length > 0 && (
                <Text style={styles.summaryText}>Stakeholders: {company.stakeholders.join(', ')}</Text>
              )}
              {company.certifications && company.certifications.length > 0 && (
                <Text style={styles.summaryText}>Certifications: {company.certifications.join(', ')}</Text>
              )}
            </View>
          </View>
        )}

        {/* AI System Summary */}
        {aiSystem && aiSystem.name && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>AI System Information</Text>
            <View style={styles.summaryBox}>
              <Text style={styles.summaryTitle}>{aiSystem.name}</Text>
              <Text style={styles.summaryText}>Intended Purpose: {aiSystem.intendedPurpose || 'Not specified'}</Text>
              {aiSystem.description && (
                <Text style={styles.summaryText}>Description: {markdownToReadableText(aiSystem.description)}</Text>
              )}
              {aiSystem.functionality && (
                <Text style={styles.summaryText}>Functionality: {markdownToReadableText(aiSystem.functionality)}</Text>
              )}
              {aiSystem.deploymentContext && (
                <Text style={styles.summaryText}>Deployment Context: {markdownToReadableText(aiSystem.deploymentContext)}</Text>
              )}
              {aiSystem.version && (
                <Text style={styles.summaryText}>Version: {aiSystem.version}</Text>
              )}
              {aiSystem.assessmentDate && (
                <Text style={styles.summaryText}>Assessment Date: {aiSystem.assessmentDate}</Text>
              )}
            </View>
          </View>
        )}

        {/* Notes Section */}
        {notes.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Advisory Notes ({notes.length})</Text>
            {notes
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((note, index) => (
                <View key={index} style={styles.noteItem}>
                  <Text style={styles.itemTitle}>{markdownToReadableText(note.title)}</Text>
                  <Text style={styles.itemContent}>{markdownToReadableText(note.description)}</Text>
                  {note.requiredTags && note.requiredTags.length > 0 && (
                    <View style={styles.tagsContainer}>
                      {note.requiredTags.map((tag: string, tagIndex: number) => (
                        <Text key={tagIndex} style={styles.tag}>{tag}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
          </View>
        )}

        {/* Obligations Section */}
        {obligations.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Applicable Obligations ({obligations.length})</Text>
            {obligations
              .sort((a, b) => (a.order || 0) - (b.order || 0))
              .map((obligation, index) => (
                <View key={index} style={styles.obligationItem}>
                  <Text style={styles.itemTitle}>Article {markdownToReadableText(obligation.article)}</Text>
                  <Text style={styles.itemContent}>{markdownToReadableText(obligation.description)}</Text>
                  {obligation.requiredTags && obligation.requiredTags.length > 0 && (
                    <View style={styles.tagsContainer}>
                      {obligation.requiredTags.map((tag: string, tagIndex: number) => (
                        <Text key={tagIndex} style={styles.tag}>{tag}</Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.disclaimer}>
            This assessment tool is provided for informational purposes only and does not constitute legal advice. 
            The results and recommendations are based on the information provided and current understanding of the EU AI Act, 
            but should not be relied upon as a substitute for professional legal counsel.
          </Text>
          <Text style={styles.disclaimer}>
            Organizations should consult with qualified legal professionals to ensure compliance with applicable laws and regulations. 
            The developers of this tool are not responsible for any decisions made based on the information provided.
          </Text>
          <Text style={styles.disclaimer}>Generated by AI Act Compliance Assessment Tool - Open Source Initiative</Text>
        </View>
      </Page>
    </Document>
  );
};

export default AssessmentPDFDocument;
