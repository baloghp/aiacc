import { useState, useEffect } from "react";
import { 
  Button, 
  Group, 
  Text, 
  Box, 
  Progress,
  Alert,
  Badge,
  SimpleGrid
} from "@mantine/core";
import { IconAlertCircle } from "@tabler/icons-react";
import ReactMarkdown from 'react-markdown';
import { AssessmentManager } from "@/entities/AssessmentManager";
import { Question } from "@/entities/Question";

interface QuestionRendererProps {
  questions: Question[];
  assessmentManager: AssessmentManager;
  onComplete: () => void;
  onBack?: () => void;
  onStateChange?: () => void;
  onEarlyTermination?: () => void;
}

export default function QuestionRenderer({ 
  questions, 
  assessmentManager, 
  onComplete, 
  onBack,
  onStateChange,
  onEarlyTermination
}: QuestionRendererProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sort questions by order and filter by dependencies
  const sortedQuestions = [...questions]
    .filter(question => {
      // If no dependencies, show the question
      if (!question.dependencies || question.dependencies.length === 0) {
        return true;
      }
      
      // Check if any of the required dependencies are present in active tags
      const activeTags = assessmentManager.getActiveTags();
      
      return question.dependencies.some(dependency => 
        activeTags.includes(dependency)
      );
    })
    .sort((a, b) => (a.order || 1) - (b.order || 1));

  // Load existing answers from AssessmentManager
  useEffect(() => {
    // For now, we don't load existing answers since we're using the tag-based approach
    // This can be enhanced later if needed
  }, [sortedQuestions, assessmentManager]);

  const currentQuestion = sortedQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / sortedQuestions.length) * 100;

  // If no questions are applicable after filtering, show a message and allow navigation
  if (sortedQuestions.length === 0) {
    return (
      <Box>
        <Text mt="md" c="dimmed">
          Based on your previous answers, there are no applicable questions for this phase at this time.
        </Text>
        <Text mt="sm" size="sm" c="dimmed">
          This could be because:
        </Text>
        <Text size="sm" c="dimmed" mt="xs">
          • Your previous answers indicate this phase doesn't apply to your situation
        </Text>
        <Text size="sm" c="dimmed">
          • Required conditions for questions in this phase are not met
        </Text>
        <Text size="sm" c="dimmed">
          • You may need to complete earlier phases first
        </Text>
        <Group mt="xl">
          {onBack && (
            <Button variant="default" onClick={onBack}>
              Back
            </Button>
          )}
          <Button onClick={onComplete}>
            Continue to Next Step
          </Button>
        </Group>
      </Box>
    );
  }

  const validateAnswer = (questionId: string, value: any): boolean => {
    const question = sortedQuestions.find(q => q.id === questionId);
    if (!question) {return false;}

    if (question.type === 'yesNo') {
      return value === true || value === false;
    }
    
    if (question.type === 'singleChoice') {
      return value && typeof value === 'string';
    }
    
    if (question.type === 'multipleChoice') {
      return Array.isArray(value) && value.length > 0;
    }
    
    return false;
  };

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[questionId];
      return newErrors;
    });
  };

  const handleNext = () => {
    const currentAnswer = answers[currentQuestion.id];
    
    if (!validateAnswer(currentQuestion.id, currentAnswer)) {
      setErrors(prev => ({ 
        ...prev, 
        [currentQuestion.id]: "Please provide an answer to this question." 
      }));
      return;
    }

    // Process the current answer using AssessmentManager's processQuestionAnswer
    const question = sortedQuestions.find(q => q.id === currentQuestion.id);
    if (question) {
      // Convert boolean to string for yesNo questions
      let processedAnswer = currentAnswer;
      if (question.type === 'yesNo') {
        processedAnswer = currentAnswer ? 'Yes' : 'No';
      }
      
      // Process the answer and any associated tags
      assessmentManager.processQuestionAnswer(
        currentQuestion.id,
        processedAnswer,
        question.type,
        question.tags 
      );
      
      // Trigger state update
      onStateChange?.();
    }

    // Check for early termination after processing the answer
    if (assessmentManager.shouldTerminateEarly()) {
      console.log('Early termination triggered - moving to results');
      onEarlyTermination?.();
      return;
    }

    if (currentQuestionIndex < sortedQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // All questions answered, complete the phase
      console.log('Answers processed and saved to AssessmentManager:', answers);
      console.log('Current assessment state:', assessmentManager.getState());

      // Complete the phase
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const renderQuestion = (question: Question) => {
    const currentAnswer = answers[question.id];
    
    switch (question.type) {
      case 'yesNo':
        return (
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <Button
              size="lg"
              variant={currentAnswer === true ? "filled" : "outline"}
              color={currentAnswer === true ? "blue" : "gray"}
              onClick={() => handleAnswerChange(question.id, true)}
              style={{ height: '60px', fontSize: '16px' }}
            >
              Yes
            </Button>
            <Button
              size="lg"
              variant={currentAnswer === false ? "filled" : "outline"}
              color={currentAnswer === false ? "blue" : "gray"}
              onClick={() => handleAnswerChange(question.id, false)}
              style={{ height: '60px', fontSize: '16px' }}
            >
              No
            </Button>
          </SimpleGrid>
        );
        
      case 'singleChoice':
        return (
          <SimpleGrid 
            cols={{ 
              base: 1, 
              sm: question.options?.length === 2 ? 2 : 2, 
              md: question.options?.length === 2 ? 2 : 3 
            }} 
            spacing="md"
          >
            {question.options?.map((option) => (
              <Button
                key={option.value}
                size="lg"
                variant={currentAnswer === option.value ? "filled" : "outline"}
                color={currentAnswer === option.value ? "blue" : "gray"}
                onClick={() => handleAnswerChange(question.id, option.value)}
                style={{ height: '60px', fontSize: '16px', justifyContent: 'flex-start', textAlign: 'left' }}
              >
                {option.label}
              </Button>
            ))}
          </SimpleGrid>
        );
        
      case 'multipleChoice': {
        const selectedValues = Array.isArray(currentAnswer) ? currentAnswer : [];
        return (
          <SimpleGrid 
            cols={{ 
              base: 1, 
              sm: question.options?.length === 2 ? 2 : 2, 
              md: question.options?.length === 2 ? 2 : 3 
            }} 
            spacing="md"
          >
            {question.options?.map((option) => (
              <Button
                key={option.value}
                size="lg"
                variant={selectedValues.includes(option.value) ? "filled" : "outline"}
                color={selectedValues.includes(option.value) ? "blue" : "gray"}
                onClick={() => {
                  const newSelection = selectedValues.includes(option.value)
                    ? selectedValues.filter(v => v !== option.value)
                    : [...selectedValues, option.value];
                  handleAnswerChange(question.id, newSelection);
                }}
                style={{ height: '60px', fontSize: '16px', justifyContent: 'flex-start', textAlign: 'left' }}
              >
                {option.label}
              </Button>
            ))}
          </SimpleGrid>
        );
      }

        
      default:
        return <Text color="red">Unsupported question type</Text>;
    }
  };

  const getAnswerSummary = () => {
    const answeredCount = sortedQuestions.filter(q => 
      answers[q.id] !== undefined && validateAnswer(q.id, answers[q.id])
    ).length;
    
    return `${answeredCount}/${sortedQuestions.length} questions answered`;
  };

  const isCurrentQuestionValid = () => {
    const currentAnswer = answers[currentQuestion.id];
    return validateAnswer(currentQuestion.id, currentAnswer);
  };

  return (
    <Box>
    
      {/* Progress */}
      <Group mb="lg" justify="space-between">
        <Text size="sm" c="dimmed">
          Question {currentQuestion.order || currentQuestionIndex + 1} of {sortedQuestions.length}
        </Text>
        <Badge variant="light" color="blue">
          {getAnswerSummary()}
        </Badge>
      </Group>
      
      <Progress value={progress} mb="lg" />

      {/* Current Question */}
      <Box mb="xl">
        <Box mb="md">
          <ReactMarkdown>{currentQuestion.text}</ReactMarkdown>
        </Box>
        
        {renderQuestion(currentQuestion)}
        
        {errors[currentQuestion.id] && (
          <Alert 
            icon={<IconAlertCircle size={16} />} 
            title="Answer Required" 
            color="red" 
            mt="sm"
          >
            {errors[currentQuestion.id]}
          </Alert>
        )}
      </Box>

      {/* Navigation */}
      <Group justify="space-between" mt="xl">
        <Button 
          variant="outline" 
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </Button>
        
        <Button 
          onClick={handleNext}
          disabled={!isCurrentQuestionValid()}
        >
          {currentQuestionIndex === sortedQuestions.length - 1 ? 'Complete Step' : 'Next'}
        </Button>
      </Group>
    </Box>
  );
} 