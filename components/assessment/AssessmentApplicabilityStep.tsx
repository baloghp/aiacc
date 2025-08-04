import { useState, useEffect } from "react";
import { Button, Group, Title, Text, Box, Alert } from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import type { StepNavProps } from "./AssessmentIntroStep";
import { AssessmentManager } from "@/entities/AssessmentManager";
import { AssessmentPhase } from "@/entities/enums";
import QuestionRenderer from "@/components/assessment/QuestionRenderer";
import { Question } from "@/entities/Question";
import questionsData from "@/data/questions.json";

interface AssessmentApplicabilityStepProps extends StepNavProps {
  previousStep?: () => void;
  assessmentManager: AssessmentManager;
  onStateChange?: () => void;
  onEarlyTermination?: () => void;
}

export default function AssessmentApplicabilityStep({ nextStep, previousStep, assessmentManager, onStateChange, onEarlyTermination }: AssessmentApplicabilityStepProps) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load and flatten questions for this phase
  useEffect(() => {
    try {
      const phaseQuestionGroups = questionsData.filter(
        (group: any) => group.phase === AssessmentPhase.Applicability
      );
      
      if (phaseQuestionGroups.length === 0) {
        setError("No questions found for the Applicability phase.");
        return;
      }

      // Sort groups by order, then flatten all questions into a single array
      const sortedGroups = phaseQuestionGroups.sort((a: any, b: any) => a.order - b.order);
      
      const flattenedQuestions: Question[] = [];
      
      sortedGroups.forEach((group: any) => {
        // Sort questions within each group by their order property
        const sortedQuestions = group.questions.sort((a: any, b: any) => a.order - b.order);
        
        const typedQuestions = sortedQuestions.map((q: any) => ({
          ...q,
          type: q.type as 'yesNo' | 'multipleChoice' | 'singleChoice'
        }));
        flattenedQuestions.push(...typedQuestions);
      });
      
      if (flattenedQuestions.length === 0) {
        setError("No questions found for the Applicability phase.");
        return;
      }

      setQuestions(flattenedQuestions);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to load questions.");
      setIsLoading(false);
    }
  }, []);

  const handleQuestionsComplete = () => {
    // QuestionRenderer has already saved the answers to AssessmentManager
    console.log('Applicability phase completed');
    console.log('Current assessment state:', assessmentManager.getState());

    // Complete the step
    nextStep?.();
  };

  if (isLoading) {
    return (
      <Box>
        <Title order={3}>Loading Applicability Assessment...</Title>
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

  if (questions.length === 0) {
    return (
      <Box>
        <Title order={3}>No Questions Available</Title>
        <Text c="dimmed" mb="md">
          No questions are configured for the Applicability phase.
        </Text>
        <Group mt="xl">
          <Button variant="default" onClick={previousStep}>Back</Button>
          <Button onClick={nextStep}>Skip to Next Step</Button>
        </Group>
      </Box>
    );
  }

  return (
    <Box>
      <QuestionRenderer
        questions={questions}
        phaseTitle="Applicability"
        assessmentManager={assessmentManager}
        onComplete={handleQuestionsComplete}
        onBack={previousStep}
        onStateChange={onStateChange}
        onEarlyTermination={onEarlyTermination}
      />
    </Box>
  );
} 