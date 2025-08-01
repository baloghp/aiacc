import { useState, useEffect } from "react";
import { Button, Group, Title, Text, Box, TextInput, Stack, Collapse, ActionIcon, Badge, Tooltip, Card } from "@mantine/core";
import { IconChevronDown, IconChevronRight, IconInfoCircle, IconBuilding } from "@tabler/icons-react";
import type { StepNavProps } from "./AssessmentIntroStep";
import { AssessmentManager } from "@/entities/AssessmentManager";

interface CompanyForm {
  name: string;
  legalEntity: string;
  location: string;
  contactPerson: string;
  stakeholders: string[];
  certifications: string[];
}

interface AssessmentCompanyStepProps extends StepNavProps {
  previousStep?: () => void;
  assessmentManager: AssessmentManager;
}

const initialForm: CompanyForm = {
  name: "",
  legalEntity: "",
  location: "",
  contactPerson: "",
  stakeholders: [],
  certifications: [],
};

export default function AssessmentCompanyStep({ nextStep, previousStep, assessmentManager }: AssessmentCompanyStepProps) {
  const [form, setForm] = useState<CompanyForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof CompanyForm, string>>>({});
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [newStakeholder, setNewStakeholder] = useState("");
  const [newCertification, setNewCertification] = useState("");

  // Load existing data from AssessmentManager when component mounts
  useEffect(() => {
    const currentState = assessmentManager.getState();
    if (currentState.company && (currentState.company.name || currentState.company.legalEntity || currentState.company.location || currentState.company.contactPerson || currentState.company.stakeholders.length > 0 || currentState.company.certifications.length > 0)) {
      setForm(currentState.company);
    }
  }, [assessmentManager]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CompanyForm, string>> = {};
    if (!form.name.trim()) {
      newErrors.name = "Company name is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof CompanyForm, value: any) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleNext = () => {
    if (validate() && nextStep) {
      // Save form data to AssessmentManager
      assessmentManager.updateCompany(form);
      console.log('Company data saved:', form);
      console.log('Current assessment state:', assessmentManager.getState());
      nextStep();
    }
  };

  const renderFieldLabel = (label: string, tooltip: string, required: boolean = false) => (
    <Group gap="xs" mb={4}>
      <Text size="sm" fw={500}>
        {label} {required && <span style={{ color: 'var(--mantine-color-red-6)' }}>*</span>}
      </Text>
      <Tooltip label={tooltip} position="top" multiline w={300}>
        <ActionIcon size="xs" variant="subtle" color="gray">
          <IconInfoCircle size={12} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );

  return (
    <Box>
    
      
      <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
        <Group mb="md">
          <IconBuilding size="2rem" color="var(--mantine-color-blue-6)" />
          <Text fw={600} size="lg">Company Information</Text>
        </Group>
        <Text size="sm" c="dimmed" lh={1.5}>
          Enter your organization's essential information. This step helps tailor the compliance check to your business context. Only the company name is mandatory—the rest improve the precision and quality of your assessment.
        </Text>
      </Card>
      
      <Stack gap="md">
        <TextInput
          label={renderFieldLabel("Company Name", "The official or trading name of your organization. Required for record-keeping and for personalizing your compliance report. Ensures the assessment is unique to your company.", true)}
          placeholder="e.g. Acme Corp."
          value={form.name}
          onChange={(e) => handleChange("name", e.currentTarget.value)}
          error={errors.name}
        />
        
        <Group gap="xs" mt="md">
          <ActionIcon
            variant="subtle"
            onClick={() => setShowOptionalFields(!showOptionalFields)}
            aria-label="Toggle optional fields"
          >
            {showOptionalFields ? <IconChevronDown size={16} /> : <IconChevronRight size={16} />}
          </ActionIcon>
          <Text size="sm" c="dimmed" style={{ cursor: 'pointer' }} onClick={() => setShowOptionalFields(!showOptionalFields)}>
            Additional company information (optional)
          </Text>
        </Group>
        
        <Collapse in={showOptionalFields}>
          <Stack gap="md" mt="sm">
            <TextInput
              label={renderFieldLabel("Legal Entity", "The formal registered name (e.g., 'Acme Corporation Ltd.') used in business and legal transactions. Helps identify the precise legal party responsible for compliance obligations under the AI Act.")}
              placeholder="e.g. Acme Corporation Ltd."
              value={form.legalEntity}
              onChange={(e) => handleChange("legalEntity", e.currentTarget.value)}
            />
            <TextInput
              label={renderFieldLabel("Location", "City and country where the company is headquartered or legally registered (e.g., 'Berlin, Germany'). Essential for determining geographical scope and which regulatory jurisdictions may apply.")}
              placeholder="e.g. Berlin, Germany"
              value={form.location}
              onChange={(e) => handleChange("location", e.currentTarget.value)}
            />
            <TextInput
              label={renderFieldLabel("Contact Person", "The main point of contact for compliance-related matters (e.g., 'Jane Doe'). So we can direct obligations, recommendations, or follow-ups to the responsible person within your company.")}
              placeholder="e.g. Jane Doe"
              value={form.contactPerson}
              onChange={(e) => handleChange("contactPerson", e.currentTarget.value)}
            />
            <Box>
              {renderFieldLabel("Stakeholders", "Other individuals, roles, or teams who have an interest or responsibility in AI governance (add as many as needed). Ensures all relevant parties are included in the compliance journey, from developers to managers and board members.")}
              <Group gap="xs" mb={8}>
                <TextInput
                  placeholder="Add stakeholder"
                  value={newStakeholder}
                  onChange={(e) => setNewStakeholder(e.currentTarget.value)}
                  style={{ flex: 1 }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newStakeholder.trim()) {
                      setForm((f) => ({ ...f, stakeholders: [...f.stakeholders, newStakeholder.trim()] }));
                      setNewStakeholder("");
                    }
                  }}
                />
                <Button 
                  size="sm" 
                  onClick={() => {
                    if (newStakeholder.trim()) {
                      setForm((f) => ({ ...f, stakeholders: [...f.stakeholders, newStakeholder.trim()] }));
                      setNewStakeholder("");
                    }
                  }}
                >
                  Add
                </Button>
              </Group>
              {form.stakeholders.length > 0 && (
                <Group gap={4}>
                  {form.stakeholders.map((stakeholder, index) => (
                    <Badge key={index} size="sm" variant="light" color="blue">
                      {stakeholder}
                      <ActionIcon
                        size="xs"
                        variant="subtle"
                        color="red"
                        onClick={() => setForm((f) => ({ ...f, stakeholders: f.stakeholders.filter((_, i) => i !== index) }))}
                        style={{ marginLeft: 4 }}
                      >
                        ×
                      </ActionIcon>
                    </Badge>
                  ))}
                </Group>
              )}
            </Box>
            
            <Box>
              {renderFieldLabel("Certifications", "List any current certifications, such as ISO 27001, ISO/IEC 24028, or sector-specific accreditations. This helps identify where existing best practices or regulatory frameworks may overlap with or support AI Act compliance.")}
              <Group gap="xs" mb={8}>
                <TextInput
                  placeholder="Add certification"
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.currentTarget.value)}
                  style={{ flex: 1 }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newCertification.trim()) {
                      setForm((f) => ({ ...f, certifications: [...f.certifications, newCertification.trim()] }));
                      setNewCertification("");
                    }
                  }}
                />
                <Button 
                  size="sm" 
                  onClick={() => {
                    if (newCertification.trim()) {
                      setForm((f) => ({ ...f, certifications: [...f.certifications, newCertification.trim()] }));
                      setNewCertification("");
                    }
                  }}
                >
                  Add
                </Button>
              </Group>
              {form.certifications.length > 0 && (
                <Group gap={4}>
                  {form.certifications.map((certification, index) => (
                    <Badge key={index} size="sm" variant="light" color="green">
                      {certification}
                      <ActionIcon
                        size="xs"
                        variant="subtle"
                        color="red"
                        onClick={() => setForm((f) => ({ ...f, certifications: f.certifications.filter((_, i) => i !== index) }))}
                        style={{ marginLeft: 4 }}
                      >
                        ×
                      </ActionIcon>
                    </Badge>
                  ))}
                </Group>
              )}
            </Box>
          </Stack>
        </Collapse>
      </Stack>
      
      <Group mt="xl">
        <Button variant="default" onClick={previousStep}>Back</Button>
        <Button onClick={handleNext}>Next</Button>
      </Group>
    </Box>
  );
} 