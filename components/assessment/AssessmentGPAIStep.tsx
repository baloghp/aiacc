import { useState, useEffect } from "react";
import { Button, Group, Title, Text, Box, Alert, Card } from "@mantine/core";
import { IconAlertCircle, IconBrain } from "@tabler/icons-react";
import type { StepNavProps } from "./AssessmentIntroStep";
import { AssessmentManager } from "@/entities/AssessmentManager";
import { AssessmentPhase } from "@/entities/enums";
import QuestionRenderer from "./QuestionRenderer";
import { Question } from "@/entities/Question";
import questionsData from "@/data/questions.json";

interface AssessmentGPAIStepProps extends StepNavProps {
  previousStep?: () => void;
  assessmentManager: AssessmentManager;
  onStateChange?: () => void;
  onEarlyTermination?: () => void;
}

export default function AssessmentGPAIStep({ nextStep, previousStep, assessmentManager, onStateChange, onEarlyTermination }: AssessmentGPAIStepProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load and flatten questions for this phase
  useEffect(() => {
    try {
      const phaseQuestionGroups = questionsData.filter(
        (group: any) => group.phase === AssessmentPhase.GPAI
      );
     
      // Sort groups by order, then flatten all questions into a single array
      const sortedGroups = phaseQuestionGroups.sort((a: any, b: any) => a.order - b.order);
      
      const flattenedQuestions: Question[] = [];
      
      sortedGroups.forEach((group: any) => {
        const typedQuestions = group.questions.map((q: any) => ({
          ...q,
          type: q.type as 'yesNo' | 'multipleChoice' | 'singleChoice'
        }));
        flattenedQuestions.push(...typedQuestions);
      });
      
      setQuestions(flattenedQuestions);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to load questions.");
      setIsLoading(false);
    }
  }, []);

  const handleQuestionsComplete = () => {
    // QuestionRenderer has already saved the answers to AssessmentManager

    // Complete the step
    nextStep?.();
  };

  if (isLoading) {
    return (
      <Box>
        <Title order={3}>Loading GPAI Assessment...</Title>
        <Text c="dimmed">Please wait while we load your questions.</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
          {error}
        </Alert>
        <Group mt="xl">
          <Button variant="default" onClick={previousStep}>Back</Button>
        </Group>
      </Box>
    );
  }



  return (
    <Box>
      <Card shadow="sm" padding="lg" radius="md" withBorder mb="md">
        <Group mb="md">
          <IconBrain size="2rem" color="var(--mantine-color-blue-6)" />
          <Text fw={600} size="lg">GPAI & Systemic Risk Assessment</Text>
        </Group>
        <Text size="sm" c="dimmed" lh={1.5}>
          Evaluate whether your AI system qualifies as a General Purpose AI system or poses systemic risks. This assessment determines additional compliance requirements under the EU AI Act.
        </Text>
      </Card>
      
      <QuestionRenderer
        questions={questions}
        assessmentManager={assessmentManager}
        onComplete={handleQuestionsComplete}
        onBack={previousStep}
        onStateChange={onStateChange}
        onEarlyTermination={onEarlyTermination}
      />
    </Box>
  );
} 