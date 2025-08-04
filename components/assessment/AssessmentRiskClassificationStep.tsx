import { useState, useEffect } from "react";
import { Button, Group, Title, Text, Box, Alert, Card } from "@mantine/core";
import { IconAlertCircle, IconShieldExclamation } from "@tabler/icons-react";
import type { StepNavProps } from "./AssessmentIntroStep";
import { AssessmentManager } from "@/entities/AssessmentManager";
import { AssessmentPhase } from "@/entities/enums";
import QuestionRenderer from "./QuestionRenderer";
import { Question } from "@/entities/Question";
import questionsData from "@/data/questions.json";

interface AssessmentRiskClassificationStepProps extends StepNavProps {
  previousStep?: () => void;
  assessmentManager: AssessmentManager;
  onStateChange?: () => void;
  onEarlyTermination?: () => void;
}

export default function AssessmentRiskClassificationStep({ nextStep, previousStep, assessmentManager, onStateChange, onEarlyTermination }: AssessmentRiskClassificationStepProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load and flatten questions for this phase
  useEffect(() => {
    try {
      const phaseQuestionGroups = questionsData.filter(
        (group: any) => group.phase === AssessmentPhase.Risk
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
        <Title order={3}>Loading Risk Classification...</Title>
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
          <IconShieldExclamation size="2rem" color="var(--mantine-color-blue-6)" />
          <Text fw={600} size="lg">Risk Classification</Text>
        </Group>
        <Text size="sm" c="dimmed" lh={1.5}>
          Classify your AI system's risk level according to the EU AI Act. This determines the specific compliance requirements and obligations that apply to your system.
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