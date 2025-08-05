import { useState } from 'react';
import { IconDeviceFloppy, IconPlus } from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useModalState } from '../../hooks/useModalState';
import { useQuestionGroups } from '../../hooks/useQuestionGroups';
import { ConfirmationDialog } from '../common/ConfirmationDialog';
import { QuestionGroupModal } from './QuestionGroupModal';
import { QuestionGroupsTable } from './QuestionGroupsTable';
import { QuestionModal } from './QuestionModal';

export default function QuestionsCRUD() {
  const {
    questionGroups,
    addGroup,
    updateGroup,
    deleteGroup,
    addQuestionToGroup,
    updateQuestionInGroup,
    deleteQuestionFromGroup,
  } = useQuestionGroups();

  // Modal states
  const groupModal = useModalState();
  const questionModal = useModalState();
  const deleteGroupModal = useModalState();
  const deleteQuestionModal = useModalState();

  // Current editing items
  const [editingGroup, setEditingGroup] = useState<any>(null);
  const [editingQuestion, setEditingQuestion] = useState<any>(null);
  const [addingToGroupId, setAddingToGroupId] = useState<string>('');
  const [deletingGroupId, setDeletingGroupId] = useState<string>('');
  const [deletingQuestion, setDeletingQuestion] = useState<{
    groupId: string;
    questionId: string;
  } | null>(null);

  // Save state
  const [saving, setSaving] = useState(false);

  // Group handlers
  const handleAddGroup = () => {
    setEditingGroup(null);
    groupModal.openModal();
  };

  const handleEditGroup = (group: any) => {
    setEditingGroup(group);
    groupModal.openModal();
  };

  const handleDeleteGroup = (groupId: string) => {
    setDeletingGroupId(groupId);
    deleteGroupModal.openModal();
  };

  const handleGroupSubmit = async (group: any) => {
    let updatedQuestionGroups;

    if (editingGroup) {
      // Update existing group
      updatedQuestionGroups = questionGroups.map((g) =>
        g.id === editingGroup.id ? { ...g, ...group } : g
      );
      updateGroup(editingGroup.id, group);
    } else {
      // Add new group
      updatedQuestionGroups = [...questionGroups, group];
      addGroup(group);
    }

    // Auto-save with updated data
    setSaving(true);
    try {
      const res = await fetch('/api/save-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedQuestionGroups),
      });
      const result = await res.json();
      if (result.success) {
        notifications.show({
          color: 'green',
          title: 'Saved',
          message: editingGroup
            ? 'QuestionGroup updated and saved successfully.'
            : 'QuestionGroup added and saved successfully.',
          icon: <IconDeviceFloppy size={18} />,
          autoClose: 2000,
          withCloseButton: true,
        });
      } else {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: result.error || 'Failed to save.',
        });
      }
    } catch (error: any) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: error.message || 'Failed to save.',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDeleteGroup = async () => {
    // Create updated data without the deleted group
    const updatedQuestionGroups = questionGroups.filter((g) => g.id !== deletingGroupId);

    deleteGroup(deletingGroupId);
    deleteGroupModal.closeModal();

    // Auto-save with updated data
    setSaving(true);
    try {
      const res = await fetch('/api/save-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedQuestionGroups),
      });
      const result = await res.json();
      if (result.success) {
        notifications.show({
          color: 'green',
          title: 'Saved',
          message: 'QuestionGroup deleted and saved successfully.',
          icon: <IconDeviceFloppy size={18} />,
          autoClose: 2000,
          withCloseButton: true,
        });
      } else {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: result.error || 'Failed to save.',
        });
      }
    } catch (error: any) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: error.message || 'Failed to save.',
      });
    } finally {
      setSaving(false);
    }
  };

  // Question handlers
  const handleAddQuestion = (groupId: string) => {
    setEditingQuestion(null);
    setAddingToGroupId(groupId);
    questionModal.openModal();
  };

  const handleEditQuestion = (groupId: string, question: any) => {
    setEditingQuestion({ ...question, groupId });
    questionModal.openModal();
  };

  const handleDeleteQuestion = (groupId: string, questionId: string) => {
    setDeletingQuestion({ groupId, questionId });
    deleteQuestionModal.openModal();
  };

  const handleQuestionSubmit = async (question: any) => {
    let updatedQuestionGroups;

    if (editingQuestion) {
      // Update existing question
      updatedQuestionGroups = questionGroups.map((g) =>
        g.id === editingQuestion.groupId
          ? {
              ...g,
              questions: g.questions.map((q) =>
                q.id === editingQuestion.id ? { ...q, ...question } : q
              ),
            }
          : g
      );
      updateQuestionInGroup(editingQuestion.groupId, editingQuestion.id, question);
    } else {
      // Add new question to the tracked group
      if (addingToGroupId) {
        updatedQuestionGroups = questionGroups.map((g) =>
          g.id === addingToGroupId ? { ...g, questions: [...g.questions, question] } : g
        );
        addQuestionToGroup(addingToGroupId, question);
      } else {
        updatedQuestionGroups = questionGroups;
      }
    }

    // Auto-save with updated data
    setSaving(true);
    try {
      const res = await fetch('/api/save-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedQuestionGroups),
      });
      const result = await res.json();
      if (result.success) {
        notifications.show({
          color: 'green',
          title: 'Saved',
          message: editingQuestion
            ? 'Question updated and saved successfully.'
            : 'Question added and saved successfully.',
          icon: <IconDeviceFloppy size={18} />,
          autoClose: 2000,
          withCloseButton: true,
        });
      } else {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: result.error || 'Failed to save.',
        });
      }
    } catch (error: any) {
      notifications.show({
        color: 'red',
        title: 'Error',
        message: error.message || 'Failed to save.',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmDeleteQuestion = async () => {
    if (deletingQuestion) {
      // Create updated data without the deleted question
      const updatedQuestionGroups = questionGroups.map((g) =>
        g.id === deletingQuestion.groupId
          ? { ...g, questions: g.questions.filter((q) => q.id !== deletingQuestion.questionId) }
          : g
      );

      deleteQuestionFromGroup(deletingQuestion.groupId, deletingQuestion.questionId);
      deleteQuestionModal.closeModal();

      // Auto-save with updated data
      setSaving(true);
      try {
        const res = await fetch('/api/save-questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedQuestionGroups),
        });
        const result = await res.json();
        if (result.success) {
          notifications.show({
            color: 'green',
            title: 'Saved',
            message: 'Question deleted and saved successfully.',
            icon: <IconDeviceFloppy size={18} />,
            autoClose: 2000,
            withCloseButton: true,
          });
        } else {
          notifications.show({
            color: 'red',
            title: 'Error',
            message: result.error || 'Failed to save.',
          });
        }
      } catch (error: any) {
        notifications.show({
          color: 'red',
          title: 'Error',
          message: error.message || 'Failed to save.',
        });
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <div>
      <Button leftSection={<IconPlus size={16} />} mb="md" onClick={handleAddGroup}>
        Add QuestionGroup
      </Button>

      <QuestionGroupsTable
        questionGroups={questionGroups}
        onEditGroup={handleEditGroup}
        onDeleteGroup={handleDeleteGroup}
        onAddQuestion={handleAddQuestion}
        onEditQuestion={handleEditQuestion}
        onDeleteQuestion={handleDeleteQuestion}
      />

      {/* Modals */}
      <QuestionGroupModal
        isOpen={groupModal.isOpen}
        onClose={groupModal.closeModal}
        onSubmit={handleGroupSubmit}
        group={editingGroup}
      />

      <QuestionModal
        isOpen={questionModal.isOpen}
        onClose={questionModal.closeModal}
        onSubmit={handleQuestionSubmit}
        question={editingQuestion}
      />

      <ConfirmationDialog
        isOpen={deleteGroupModal.isOpen}
        onClose={deleteGroupModal.closeModal}
        onConfirm={handleConfirmDeleteGroup}
        title="Delete QuestionGroup"
        message="Are you sure you want to delete this QuestionGroup?"
      />

      <ConfirmationDialog
        isOpen={deleteQuestionModal.isOpen}
        onClose={deleteQuestionModal.closeModal}
        onConfirm={handleConfirmDeleteQuestion}
        title="Delete Question"
        message="Are you sure you want to delete this question?"
      />
    </div>
  );
}
