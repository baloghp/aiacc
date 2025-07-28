import { useState, useEffect } from "react";
import { Button, Group, Title, Text, Box, TextInput, Textarea, Stack, Collapse, ActionIcon } from "@mantine/core";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import type { StepNavProps } from "./AssessmentIntroStep";
import { AssessmentManager } from "@/entities/AssessmentManager";

interface AISystemForm {
  name: string;
  intendedPurpose: string;
  description: string;
  functionality: string;
  deploymentContext: string;
  version: string;
  assessmentDate: string;
}

const initialForm: AISystemForm = {
  name: "",
  intendedPurpose: "",
  description: "",
  functionality: "",
  deploymentContext: "",
  version: "",
  assessmentDate: new Date().toISOString().split('T')[0], // Today's date as default
};

interface AssessmentAISystemStepProps extends StepNavProps {
  previousStep?: () => void;
  assessmentManager: AssessmentManager;
}

export default function AssessmentAISystemStep({ nextStep, previousStep, assessmentManager }: AssessmentAISystemStepProps) {
  const [form, setForm] = useState<AISystemForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof AISystemForm, string>>>({});
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  // Load existing data from AssessmentManager when component mounts
  useEffect(() => {
    const currentState = assessmentManager.getState();
    if (currentState.aiSystem && (currentState.aiSystem.name || currentState.aiSystem.intendedPurpose || currentState.aiSystem.description || currentState.aiSystem.functionality || currentState.aiSystem.deploymentContext || currentState.aiSystem.version || currentState.aiSystem.assessmentDate)) {
      setForm(currentState.aiSystem);
    }
  }, [assessmentManager]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof AISystemForm, string>> = {};
    if (!form.name.trim()) {
      newErrors.name = "AI System name is required.";
    }
    if (!form.intendedPurpose.trim()) {
      newErrors.intendedPurpose = "Intended purpose is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof AISystemForm, value: any) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const handleNext = () => {
    if (validate() && nextStep) {
      // Save form data to AssessmentManager
      assessmentManager.updateAISystem(form);
      console.log('AI System data saved:', form);
      console.log('Current assessment state:', assessmentManager.getState());
      nextStep();
    }
  };

  return (
    <Box>
      <Title order={3}>AI System Details</Title>
      <Text c="dimmed" mb="md">Describe the AI system you want to assess for compliance. Only the system name and intended purpose are required.</Text>
      
      <Stack gap="sm">
        <TextInput
          label="AI System Name"
          placeholder="e.g. Customer Support Chatbot"
          value={form.name}
          onChange={(e) => handleChange("name", e.currentTarget.value)}
          error={errors.name}
          required
        />
        
        <Textarea
          label="Intended Purpose"
          placeholder="e.g. Provide automated customer support responses to common inquiries"
          value={form.intendedPurpose}
          onChange={(e) => handleChange("intendedPurpose", e.currentTarget.value)}
          error={errors.intendedPurpose}
          required
          minRows={3}
          autosize
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
            Additional AI system information (optional)
          </Text>
        </Group>
        
        <Collapse in={showOptionalFields}>
          <Stack gap="sm" mt="sm">
            <Textarea
              label="Description"
              placeholder="Detailed description of the AI system's capabilities and features"
              value={form.description}
              onChange={(e) => handleChange("description", e.currentTarget.value)}
              minRows={3}
              autosize
            />
            
            <Textarea
              label="Functionality"
              placeholder="Specific functions and operations the AI system performs"
              value={form.functionality}
              onChange={(e) => handleChange("functionality", e.currentTarget.value)}
              minRows={3}
              autosize
            />
            
            <TextInput
              label="Deployment Context"
              placeholder="e.g. Web application, mobile app, internal system"
              value={form.deploymentContext}
              onChange={(e) => handleChange("deploymentContext", e.currentTarget.value)}
            />
            
            <TextInput
              label="Version"
              placeholder="e.g. 1.0.0"
              value={form.version}
              onChange={(e) => handleChange("version", e.currentTarget.value)}
            />
            
            <TextInput
              label="Assessment Date"
              type="date"
              value={form.assessmentDate}
              onChange={(e) => handleChange("assessmentDate", e.currentTarget.value)}
            />
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