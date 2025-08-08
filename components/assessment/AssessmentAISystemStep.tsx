import { useEffect, useState } from 'react';
import { IconBrain, IconChevronDown, IconChevronRight, IconInfoCircle } from '@tabler/icons-react';
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Collapse,
  Group,
  Stack,
  Text,
  Textarea,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { AssessmentManager } from '@/entities/AssessmentManager';
import type { StepNavProps } from './AssessmentIntroStep';

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
  name: '',
  intendedPurpose: '',
  description: '',
  functionality: '',
  deploymentContext: '',
  version: '',
  assessmentDate: new Date().toISOString().split('T')[0], // Today's date as default
};

interface AssessmentAISystemStepProps extends StepNavProps {
  previousStep?: () => void;
  assessmentManager: AssessmentManager;
}

export default function AssessmentAISystemStep({
  nextStep,
  previousStep,
  assessmentManager,
}: AssessmentAISystemStepProps) {
  const [form, setForm] = useState<AISystemForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof AISystemForm, string>>>({});
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  // Load existing data from AssessmentManager when component mounts
  useEffect(() => {
    const currentState = assessmentManager.getState();
    if (
      currentState.aiSystem &&
      (currentState.aiSystem.name ||
        currentState.aiSystem.intendedPurpose ||
        currentState.aiSystem.description ||
        currentState.aiSystem.functionality ||
        currentState.aiSystem.deploymentContext ||
        currentState.aiSystem.version ||
        currentState.aiSystem.assessmentDate)
    ) {
      setForm(currentState.aiSystem);
    }
  }, [assessmentManager]);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof AISystemForm, string>> = {};
    if (!form.name.trim()) {
      newErrors.name = 'AI System name is required.';
    }
    if (!form.intendedPurpose.trim()) {
      newErrors.intendedPurpose = 'Intended purpose is required.';
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
      if (process.env.NODE_ENV === 'development') {
        console.log('AI System data saved:', form);
        console.log('Current assessment state:', assessmentManager.getState());
      }
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
          <IconBrain size="2rem" color="var(--mantine-color-blue-6)" />
          <Text fw={600} size="lg">
            AI System Information
          </Text>
        </Group>
        <Text size="sm" c="dimmed" lh={1.5}>
          Provide information about the specific AI system you wish to assess for EU AI Act
          compliance. Detailed, accurate information ensures a tailored assessment and relevant
          obligations. Only the system name and intended purpose are required—the other fields
          refine the quality and applicability of the results.
        </Text>
      </Card>

      <Stack gap="md">
        <TextInput
          label={renderFieldLabel(
            'AI System Name',
            "The formal or project name of your AI system. This uniquely identifies the system you're assessing and personalizes your compliance report.",
            true
          )}
          placeholder="e.g. Customer Support Chatbot"
          value={form.name}
          onChange={(e) => handleChange('name', e.currentTarget.value)}
          error={errors.name}
        />

        <Textarea
          label={renderFieldLabel(
            'Intended Purpose',
            "A short, clear statement about what your AI system is designed to do or deliver (e.g., 'Automated fraud detection in online banking', 'Medical image analysis for diagnostics'). The intended purpose is essential for risk assessment and legal classification under the AI Act.",
            true
          )}
          placeholder="e.g. Provide automated customer support responses to common inquiries"
          value={form.intendedPurpose}
          onChange={(e) => handleChange('intendedPurpose', e.currentTarget.value)}
          error={errors.intendedPurpose}
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
          <Text
            size="sm"
            c="dimmed"
            style={{ cursor: 'pointer' }}
            onClick={() => setShowOptionalFields(!showOptionalFields)}
          >
            Additional AI system information (optional)
          </Text>
        </Group>

        <Collapse in={showOptionalFields}>
          <Stack gap="md" mt="sm">
            <Textarea
              label={renderFieldLabel(
                'Description',
                "A high-level overview of the AI system's architecture, core capabilities, and main features. Helps clarify the technology, underlying methods, or context (e.g., 'Natural language processing chatbot using transformer models for customer inquiries')."
              )}
              placeholder="Detailed description of the AI system's capabilities and features"
              value={form.description}
              onChange={(e) => handleChange('description', e.currentTarget.value)}
              minRows={3}
              autosize
            />

            <Textarea
              label={renderFieldLabel(
                'Functionality',
                'List or describe key functions—what does the system actually do? (e.g., data analytics, diagnostic predictions, face matching, workflow automation). Useful for identifying risk level, applicable obligations, and transparency needs.'
              )}
              placeholder="Specific functions and operations the AI system performs"
              value={form.functionality}
              onChange={(e) => handleChange('functionality', e.currentTarget.value)}
              minRows={3}
              autosize
            />

            <TextInput
              label={renderFieldLabel(
                'Deployment Context',
                'Where and how is the AI system used or accessed? (e.g., Web application for consumers, embedded component in a medical device, internal tool for HR screening). Context determines sector-specific rules, user impact, and required safeguards.'
              )}
              placeholder="e.g. Web application, mobile app, internal system"
              value={form.deploymentContext}
              onChange={(e) => handleChange('deploymentContext', e.currentTarget.value)}
            />

            <TextInput
              label={renderFieldLabel(
                'Version',
                'The current version or release identifier (e.g., v1.5.7). Helps with technical documentation and indicates update or lifecycle status.'
              )}
              placeholder="e.g. 1.0.0"
              value={form.version}
              onChange={(e) => handleChange('version', e.currentTarget.value)}
            />

            <TextInput
              label={renderFieldLabel(
                'Assessment Date',
                'Date of this compliance check (auto-filled to today, but editable). Keeps assessment records current and traceable over time.'
              )}
              type="date"
              value={form.assessmentDate}
              onChange={(e) => handleChange('assessmentDate', e.currentTarget.value)}
            />
          </Stack>
        </Collapse>
      </Stack>

      <Group mt="xl">
        <Button variant="default" onClick={previousStep}>
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </Group>
    </Box>
  );
}
