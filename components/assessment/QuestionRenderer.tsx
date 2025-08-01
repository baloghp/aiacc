import { useState, useEffect } from "react";
import { 
  Button, 
  Group, 
  Title, 
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

export interface Question {
  id: string;
  text: string;
  type: 'yesNo' | 'multipleChoice' | 'singleChoice';
  order: number;
  methodName: string;
  options?: { value: string; label: string }[];
  allowMultiple?: boolean;
  dependencies?: string[];
}

interface QuestionRendererProps {
  questions: Question[];
  phaseTitle: string;
  assessmentManager: AssessmentManager;
  onComplete: () => void;
  onBack?: () => void;
}

export default function QuestionRenderer({ 
  questions, 
  phaseTitle,
  assessmentManager, 
  onComplete, 
  onBack 
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
      const currentState = assessmentManager.getState();
      const activeTags = currentState.activeTags || [];
      
      return question.dependencies.some(dependency => 
        activeTags.includes(dependency)
      );
    })
    .sort((a, b) => (a.order || 1) - (b.order || 1));

  // Load existing answers from AssessmentManager
  useEffect(() => {
    const currentState = assessmentManager.getState();
    const existingAnswers: Record<string, any> = {};
    
    sortedQuestions.forEach(question => {
      const value = getNestedValue(currentState, question.methodName);
      if (value !== undefined) {
        existingAnswers[question.id] = value;
      }
    });
    
    if (Object.keys(existingAnswers).length > 0) {
      setAnswers(existingAnswers);
    }
  }, [sortedQuestions, assessmentManager]);

  const currentQuestion = sortedQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / sortedQuestions.length) * 100;

  const getNestedValue = (obj: any, path: string): any => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

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

    if (currentQuestionIndex < sortedQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // All questions answered, save to AssessmentManager and complete
      Object.entries(answers).forEach(([questionId, answer]) => {
        const question = sortedQuestions.find(q => q.id === questionId);
        if (question && question.methodName) {
          // Call the AssessmentManager method directly
          const methodName = question.methodName as keyof AssessmentManager;
          if (typeof assessmentManager[methodName] === 'function') {
            (assessmentManager[methodName] as (value: any) => void)(answer);
          } else {
            console.warn(`Method ${methodName} not found in AssessmentManager`);
          }
        }
      });

      console.log('Answers saved to AssessmentManager:', answers);
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
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
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
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
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
      <Title order={3}>{phaseTitle} Assessment</Title>
      <Text c="dimmed" mb="md">
        Answer the following questions to assess your {phaseTitle.toLowerCase()} status.
      </Text>

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