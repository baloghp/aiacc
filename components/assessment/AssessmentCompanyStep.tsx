import { useState, useEffect } from "react";
import { Button, Group, Title, Text, Box, TextInput, Stack, Collapse, ActionIcon, Badge } from "@mantine/core";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
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

interface AssessmentCompanyStepProps extends StepNavProps {
  previousStep?: () => void;
  assessmentManager: AssessmentManager;
}

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

  return (
    <Box>
      <Title order={3}>Company Details</Title>
      <Text c="dimmed" mb="md">Enter your organization's basic information. Only the company name is required.</Text>
      
      <Stack gap="sm">
        <TextInput
          label="Company Name"
          placeholder="e.g. Acme Corp."
          value={form.name}
          onChange={(e) => handleChange("name", e.currentTarget.value)}
          error={errors.name}
          required
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
          <Stack gap="sm" mt="sm">
            <TextInput
              label="Legal Entity"
              placeholder="e.g. Acme Corporation Ltd."
              value={form.legalEntity}
              onChange={(e) => handleChange("legalEntity", e.currentTarget.value)}
            />
            <TextInput
              label="Location"
              placeholder="e.g. Berlin, Germany"
              value={form.location}
              onChange={(e) => handleChange("location", e.currentTarget.value)}
            />
            <TextInput
              label="Contact Person"
              placeholder="e.g. Jane Doe"
              value={form.contactPerson}
              onChange={(e) => handleChange("contactPerson", e.currentTarget.value)}
            />
            <Box>
              <Text size="sm" fw={500} mb={8}>Stakeholders</Text>
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
              <Text size="sm" fw={500} mb={8}>Certifications</Text>
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