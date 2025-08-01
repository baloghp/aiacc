import { Button } from '@mantine/core';
import { IconPlus, IconDeviceFloppy } from '@tabler/icons-react';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import { useQuestionGroups } from '../../hooks/useQuestionGroups';
import { useModalState } from '../../hooks/useModalState';
import { QuestionGroupsTable } from './QuestionGroupsTable';
import { QuestionGroupModal } from './QuestionGroupModal';
import { QuestionModal } from './QuestionModal';
import { ConfirmationDialog } from '../common/ConfirmationDialog';

export default function QuestionsCRUD() {
  const {
    questionGroups,
    addGroup,
    updateGroup,
    deleteGroup,
    addQuestionToGroup,
    updateQuestionInGroup,
    deleteQuestionFromGroup
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
  const [deletingQuestion, setDeletingQuestion] = useState<{ groupId: string; questionId: string } | null>(null);

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

  const handleGroupSubmit = (group: any) => {
    if (editingGroup) {
      updateGroup(editingGroup.id, group);
    } else {
      addGroup(group);
    }
  };

  const handleConfirmDeleteGroup = () => {
    deleteGroup(deletingGroupId);
    deleteGroupModal.closeModal();
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

  const handleQuestionSubmit = (question: any) => {
    if (editingQuestion) {
      updateQuestionInGroup(editingQuestion.groupId, editingQuestion.id, question);
    } else {
      // Add new question to the tracked group
      if (addingToGroupId) {
        addQuestionToGroup(addingToGroupId, question);
      }
    }
  };

  const handleConfirmDeleteQuestion = () => {
    if (deletingQuestion) {
      deleteQuestionFromGroup(deletingQuestion.groupId, deletingQuestion.questionId);
      deleteQuestionModal.closeModal();
    }
  };

  // Save functionality
  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/save-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questionGroups),
      });
      const result = await res.json();
      if (result.success) {
        notifications.show({
          color: 'green',
          title: 'Saved',
          message: 'Questions saved successfully.',
          icon: <IconDeviceFloppy size={18} />,
          autoClose: 2000,
          withCloseButton: true,
        });
      } else {
        notifications.show({ color: 'red', title: 'Error', message: result.error || 'Failed to save.' });
      }
    } catch (error: any) {
      notifications.show({ color: 'red', title: 'Error', message: error.message || 'Failed to save.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Button leftSection={<IconPlus size={16} />} mb="md" onClick={handleAddGroup}>
        Add QuestionGroup
      </Button>
      <Button 
        leftSection={<IconDeviceFloppy size={16} />} 
        mb="md" 
        ml="sm" 
        color="teal" 
        onClick={handleSave} 
        loading={saving}
      >
        Save
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