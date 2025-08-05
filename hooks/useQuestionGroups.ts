import { useCallback, useState } from 'react';
import questionsData from '../data/questions.json';

interface QuestionGroup {
  id: string;
  order: number;
  phase: string;
  questions: any[];
  isComplete: boolean;
}

interface UseQuestionGroupsReturn {
  questionGroups: QuestionGroup[];
  addGroup: (group: QuestionGroup) => void;
  updateGroup: (id: string, updates: Partial<QuestionGroup>) => void;
  deleteGroup: (id: string) => void;
  addQuestionToGroup: (groupId: string, question: any) => void;
  updateQuestionInGroup: (groupId: string, questionId: string, updates: any) => void;
  deleteQuestionFromGroup: (groupId: string, questionId: string) => void;
}

export function useQuestionGroups(): UseQuestionGroupsReturn {
  const [questionGroups, setQuestionGroups] = useState<QuestionGroup[]>(questionsData);

  const addGroup = useCallback((group: QuestionGroup) => {
    setQuestionGroups((prev) => [...prev, group]);
  }, []);

  const updateGroup = useCallback((id: string, updates: Partial<QuestionGroup>) => {
    setQuestionGroups((prev) => prev.map((g) => (g.id === id ? { ...g, ...updates } : g)));
  }, []);

  const deleteGroup = useCallback((id: string) => {
    setQuestionGroups((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const addQuestionToGroup = useCallback((groupId: string, question: any) => {
    setQuestionGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, questions: [...g.questions, question] } : g))
    );
  }, []);

  const updateQuestionInGroup = useCallback((groupId: string, questionId: string, updates: any) => {
    setQuestionGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              questions: g.questions.map((q) => (q.id === questionId ? { ...q, ...updates } : q)),
            }
          : g
      )
    );
  }, []);

  const deleteQuestionFromGroup = useCallback((groupId: string, questionId: string) => {
    setQuestionGroups((prev) =>
      prev.map((g) =>
        g.id === groupId ? { ...g, questions: g.questions.filter((q) => q.id !== questionId) } : g
      )
    );
  }, []);

  return {
    questionGroups,
    addGroup,
    updateGroup,
    deleteGroup,
    addQuestionToGroup,
    updateQuestionInGroup,
    deleteQuestionFromGroup,
  };
}
