import { Table, Button, ActionIcon, Modal, TextInput, NumberInput, Select, Group, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconChevronDown, IconChevronRight, IconPlus, IconDeviceFloppy } from '@tabler/icons-react';
import { useState } from 'react';
import questionsData from '../data/questions.json';

export default function QuestionsCRUD() {
  const [questionGroups, setQuestionGroups] = useState<any[]>(questionsData);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Add modal state
  const [addOpen, setAddOpen] = useState(false);
  const [newGroupId, setNewGroupId] = useState('');
  const [newGroupOrder, setNewGroupOrder] = useState(1);
  const [newGroupPhase, setNewGroupPhase] = useState('');
  const [addError, setAddError] = useState('');

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editGroupId, setEditGroupId] = useState('');
  const [editGroupOrder, setEditGroupOrder] = useState(1);
  const [editGroupPhase, setEditGroupPhase] = useState('');
  const [editError, setEditError] = useState('');

  // Delete modal state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

  // Add Question modal state
  const [addQOpen, setAddQOpen] = useState(false);
  const [addQGroupIdx, setAddQGroupIdx] = useState<number | null>(null);
  const [qId, setQId] = useState('');
  const [qText, setQText] = useState('');
  const [qType, setQType] = useState<'yesNo' | 'multipleChoice' | 'singleChoice'>('yesNo');
  const [qTarget, setQTarget] = useState('');
  const [qOptions, setQOptions] = useState<{ value: string; label: string }[]>([]);
  const [qOptionValue, setQOptionValue] = useState('');
  const [qOptionLabel, setQOptionLabel] = useState('');
  const [qError, setQError] = useState('');

  // Edit Question modal state
  const [editQOpen, setEditQOpen] = useState(false);
  const [editQGroupIdx, setEditQGroupIdx] = useState<number | null>(null);
  const [editQIdx, setEditQIdx] = useState<number | null>(null);
  const [editQId, setEditQId] = useState('');
  const [editQText, setEditQText] = useState('');
  const [editQType, setEditQType] = useState<'yesNo' | 'multipleChoice' | 'singleChoice'>('yesNo');
  const [editQTarget, setEditQTarget] = useState('');
  const [editQOptions, setEditQOptions] = useState<{ value: string; label: string }[]>([]);
  const [editQOptionValue, setEditQOptionValue] = useState('');
  const [editQOptionLabel, setEditQOptionLabel] = useState('');
  const [editQError, setEditQError] = useState('');

  // Delete Question modal state
  const [deleteQOpen, setDeleteQOpen] = useState(false);
  const [deleteQGroupIdx, setDeleteQGroupIdx] = useState<number | null>(null);
  const [deleteQIdx, setDeleteQIdx] = useState<number | null>(null);

  const [saving, setSaving] = useState(false);

  const handleExpand = (groupId: string) => {
    setExpanded(expanded === groupId ? null : groupId);
  };

  const handleAdd = () => {
    setAddError('');
    if (!newGroupId.trim() || !newGroupPhase.trim()) {
      setAddError('ID and Phase are required');
      return;
    }
    if (questionGroups.some(g => g.id === newGroupId)) {
      setAddError('ID must be unique');
      return;
    }
    setQuestionGroups([
      ...questionGroups,
      { id: newGroupId, order: newGroupOrder, phase: newGroupPhase, questions: [], isComplete: false }
    ]);
    setNewGroupId('');
    setNewGroupOrder(1);
    setNewGroupPhase('');
    setAddOpen(false);
  };

  const openEditModal = (index: number) => {
    const group = questionGroups[index];
    setEditIndex(index);
    setEditGroupId(group.id);
    setEditGroupOrder(group.order);
    setEditGroupPhase(group.phase);
    setEditError('');
    setEditOpen(true);
  };

  const handleEdit = () => {
    setEditError('');
    if (!editGroupId.trim() || !editGroupPhase.trim()) {
      setEditError('ID and Phase are required');
      return;
    }
    if (
      questionGroups.some((g, i) => g.id === editGroupId && i !== editIndex)
    ) {
      setEditError('ID must be unique');
      return;
    }
    setQuestionGroups(qgs =>
      qgs.map((g, i) =>
        i === editIndex
          ? { ...g, id: editGroupId, order: editGroupOrder, phase: editGroupPhase }
          : g
      )
    );
    setEditOpen(false);
  };

  const openDeleteModal = (index: number) => {
    setDeleteIndex(index);
    setDeleteOpen(true);
  };

  const handleDelete = () => {
    if (deleteIndex === null) {return;}
    setQuestionGroups(qgs => qgs.filter((_, i) => i !== deleteIndex));
    setDeleteOpen(false);
  };

  const openAddQuestionModal = (groupIdx: number) => {
    setAddQGroupIdx(groupIdx);
    setQId('');
    setQText('');
    setQType('yesNo');
    setQTarget('');
    setQOptions([]);
    setQOptionValue('');
    setQOptionLabel('');
    setQError('');
    setAddQOpen(true);
  };

  const handleAddQOption = () => {
    if (!qOptionValue.trim() || !qOptionLabel.trim()) {return;}
    if (qOptions.some(opt => opt.value === qOptionValue)) {return;}
    setQOptions([...qOptions, { value: qOptionValue, label: qOptionLabel }]);
    setQOptionValue('');
    setQOptionLabel('');
  };

  const handleRemoveQOption = (idx: number) => {
    setQOptions(qOptions.filter((_, i) => i !== idx));
  };

  const handleAddQuestion = () => {
    setQError('');
    if (!qId.trim() || !qText.trim() || !qTarget.trim()) {
      setQError('ID, Text, and Target Attribute are required');
      return;
    }
    if (addQGroupIdx === null) {return;}
    const group = questionGroups[addQGroupIdx];
    if (group.questions.some((q: any) => q.id === qId)) {
      setQError('ID must be unique within the group');
      return;
    }
    if ((qType === 'multipleChoice' || qType === 'singleChoice') && qOptions.length === 0) {
      setQError('At least one option is required for choice questions');
      return;
    }
    const newQ: any = {
      id: qId,
      text: qText,
      type: qType,
      targetAttribute: qTarget,
    };
    if (qType === 'multipleChoice' || qType === 'singleChoice') {
      newQ.options = qOptions;
      if (qType === 'multipleChoice') {newQ.allowMultiple = true;}
      if (qType === 'singleChoice') {newQ.allowMultiple = false;}
    }
    setQuestionGroups(qgs =>
      qgs.map((g, i) =>
        i === addQGroupIdx ? { ...g, questions: [...g.questions, newQ] } : g
      )
    );
    setAddQOpen(false);
  };

  const openEditQuestionModal = (groupIdx: number, qIdx: number) => {
    const q = questionGroups[groupIdx].questions[qIdx];
    setEditQGroupIdx(groupIdx);
    setEditQIdx(qIdx);
    setEditQId(q.id);
    setEditQText(q.text);
    setEditQType(q.type);
    setEditQTarget(q.targetAttribute);
    setEditQOptions(q.options ? [...q.options] : []);
    setEditQOptionValue('');
    setEditQOptionLabel('');
    setEditQError('');
    setEditQOpen(true);
  };

  const handleEditQOption = () => {
    if (!editQOptionValue.trim() || !editQOptionLabel.trim()) {return;}
    if (editQOptions.some(opt => opt.value === editQOptionValue)) {return;}
    setEditQOptions([...editQOptions, { value: editQOptionValue, label: editQOptionLabel }]);
    setEditQOptionValue('');
    setEditQOptionLabel('');
  };

  const handleRemoveEditQOption = (idx: number) => {
    setEditQOptions(editQOptions.filter((_, i) => i !== idx));
  };

  const handleEditQuestion = () => {
    setEditQError('');
    if (!editQId.trim() || !editQText.trim() || !editQTarget.trim()) {
      setEditQError('ID, Text, and Target Attribute are required');
      return;
    }
    if (editQGroupIdx === null || editQIdx === null) {return;}
    const group = questionGroups[editQGroupIdx];
    if (group.questions.some((q: any, i: number) => q.id === editQId && i !== editQIdx)) {
      setEditQError('ID must be unique within the group');
      return;
    }
    if ((editQType === 'multipleChoice' || editQType === 'singleChoice') && editQOptions.length === 0) {
      setEditQError('At least one option is required for choice questions');
      return;
    }
    const updatedQ: any = {
      id: editQId,
      text: editQText,
      type: editQType,
      targetAttribute: editQTarget,
    };
    if (editQType === 'multipleChoice' || editQType === 'singleChoice') {
      updatedQ.options = editQOptions;
      if (editQType === 'multipleChoice') {updatedQ.allowMultiple = true;}
      if (editQType === 'singleChoice') {updatedQ.allowMultiple = false;}
    }
    setQuestionGroups(qgs =>
      qgs.map((g, gi) =>
        gi === editQGroupIdx
          ? { ...g, questions: g.questions.map((q: any, qi: number) => (qi === editQIdx ? updatedQ : q)) }
          : g
      )
    );
    setEditQOpen(false);
  };

  const openDeleteQuestionModal = (groupIdx: number, qIdx: number) => {
    setDeleteQGroupIdx(groupIdx);
    setDeleteQIdx(qIdx);
    setDeleteQOpen(true);
  };

  const handleDeleteQuestion = () => {
    if (deleteQGroupIdx === null || deleteQIdx === null) {return;}
    setQuestionGroups(qgs =>
      qgs.map((g, gi) =>
        gi === deleteQGroupIdx
          ? { ...g, questions: g.questions.filter((_: any, qi: number) => qi !== deleteQIdx) }
          : g
      )
    );
    setDeleteQOpen(false);
  };

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
          icon: <IconDeviceFloppy size={18} />, // add icon
          autoClose: 2000, // 2 seconds
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
      <Button leftSection={<IconPlus size={16} />} mb="md" onClick={() => setAddOpen(true)}>
        Add QuestionGroup
      </Button>
      <Button leftSection={<IconDeviceFloppy size={16} />} mb="md" ml="sm" color="teal" onClick={handleSave} loading={saving}>
        Save
      </Button>
      {/* Add Modal */}
      <Modal opened={addOpen} onClose={() => setAddOpen(false)} title="Add QuestionGroup" centered>
        <TextInput
          label="ID"
          value={newGroupId}
          onChange={e => setNewGroupId(e.currentTarget.value)}
          required
          mb="sm"
        />
        <NumberInput
          label="Order"
          value={newGroupOrder}
          onChange={v => setNewGroupOrder(typeof v === 'number' && !isNaN(v) ? v : 1)}
          min={1}
          required
          mb="sm"
        />
        <TextInput
          label="Phase"
          value={newGroupPhase}
          onChange={e => setNewGroupPhase(e.currentTarget.value)}
          required
          mb="sm"
        />
        {addError && <div style={{ color: 'red', marginBottom: 8 }}>{addError}</div>}
        <Button onClick={handleAdd} fullWidth>Add</Button>
      </Modal>
      {/* Edit Modal */}
      <Modal opened={editOpen} onClose={() => setEditOpen(false)} title="Edit QuestionGroup" centered>
        <TextInput
          label="ID"
          value={editGroupId}
          onChange={e => setEditGroupId(e.currentTarget.value)}
          required
          mb="sm"
        />
        <NumberInput
          label="Order"
          value={editGroupOrder}
          onChange={v => setEditGroupOrder(typeof v === 'number' && !isNaN(v) ? v : 1)}
          min={1}
          required
          mb="sm"
        />
        <TextInput
          label="Phase"
          value={editGroupPhase}
          onChange={e => setEditGroupPhase(e.currentTarget.value)}
          required
          mb="sm"
        />
        {editError && <div style={{ color: 'red', marginBottom: 8 }}>{editError}</div>}
        <Button onClick={handleEdit} fullWidth>Save Changes</Button>
      </Modal>
      {/* Delete Modal */}
      <Modal opened={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete QuestionGroup" centered>
        <div style={{ marginBottom: 16 }}>
          Are you sure you want to delete this QuestionGroup?
        </div>
        <Button color="red" onClick={handleDelete} fullWidth>Delete</Button>
      </Modal>
      {/* Add Question Modal */}
      <Modal opened={addQOpen} onClose={() => setAddQOpen(false)} title="Add Question" centered>
        <TextInput
          label="ID"
          value={qId}
          onChange={e => setQId(e.currentTarget.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Text"
          value={qText}
          onChange={e => setQText(e.currentTarget.value)}
          required
          mb="sm"
        />
        <Select
          label="Type"
          value={qType}
          onChange={v => setQType((v as any) || 'yesNo')}
          data={[
            { value: 'yesNo', label: 'Yes/No' },
            { value: 'multipleChoice', label: 'Multiple Choice' },
            { value: 'singleChoice', label: 'Single Choice' },
          ]}
          required
          mb="sm"
        />
        {(qType === 'multipleChoice' || qType === 'singleChoice') && (
          <>
            <Group mb="xs">
              <TextInput
                label="Option Value"
                value={qOptionValue}
                onChange={e => setQOptionValue(e.currentTarget.value)}
                style={{ flex: 1 }}
              />
              <TextInput
                label="Option Label"
                value={qOptionLabel}
                onChange={e => setQOptionLabel(e.currentTarget.value)}
                style={{ flex: 2 }}
              />
              <Button onClick={handleAddQOption} variant="light" size="xs" mt={22}>
                Add Option
              </Button>
            </Group>
            <Stack mb="sm">
              {qOptions.map((opt, idx) => (
                <Group key={opt.value} gap="xs">
                  <div style={{ flex: 1 }}>{opt.value}</div>
                  <div style={{ flex: 2 }}>{opt.label}</div>
                  <Button size="xs" color="red" variant="subtle" onClick={() => handleRemoveQOption(idx)}>
                    Remove
                  </Button>
                </Group>
              ))}
            </Stack>
          </>
        )}
        <TextInput
          label="Target Attribute"
          value={qTarget}
          onChange={e => setQTarget(e.currentTarget.value)}
          required
          mb="sm"
        />
        {qError && <div style={{ color: 'red', marginBottom: 8 }}>{qError}</div>}
        <Button onClick={handleAddQuestion} fullWidth>Add Question</Button>
      </Modal>
      {/* Edit Question Modal */}
      <Modal opened={editQOpen} onClose={() => setEditQOpen(false)} title="Edit Question" centered>
        <TextInput
          label="ID"
          value={editQId}
          onChange={e => setEditQId(e.currentTarget.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Text"
          value={editQText}
          onChange={e => setEditQText(e.currentTarget.value)}
          required
          mb="sm"
        />
        <Select
          label="Type"
          value={editQType}
          onChange={v => setEditQType((v as any) || 'yesNo')}
          data={[
            { value: 'yesNo', label: 'Yes/No' },
            { value: 'multipleChoice', label: 'Multiple Choice' },
            { value: 'singleChoice', label: 'Single Choice' },
          ]}
          required
          mb="sm"
        />
        {(editQType === 'multipleChoice' || editQType === 'singleChoice') && (
          <>
            <Group mb="xs">
              <TextInput
                label="Option Value"
                value={editQOptionValue}
                onChange={e => setEditQOptionValue(e.currentTarget.value)}
                style={{ flex: 1 }}
              />
              <TextInput
                label="Option Label"
                value={editQOptionLabel}
                onChange={e => setEditQOptionLabel(e.currentTarget.value)}
                style={{ flex: 2 }}
              />
              <Button onClick={handleEditQOption} variant="light" size="xs" mt={22}>
                Add Option
              </Button>
            </Group>
            <Stack mb="sm">
              {editQOptions.map((opt, idx) => (
                <Group key={opt.value} gap="xs">
                  <div style={{ flex: 1 }}>{opt.value}</div>
                  <div style={{ flex: 2 }}>{opt.label}</div>
                  <Button size="xs" color="red" variant="subtle" onClick={() => handleRemoveEditQOption(idx)}>
                    Remove
                  </Button>
                </Group>
              ))}
            </Stack>
          </>
        )}
        <TextInput
          label="Target Attribute"
          value={editQTarget}
          onChange={e => setEditQTarget(e.currentTarget.value)}
          required
          mb="sm"
        />
        {editQError && <div style={{ color: 'red', marginBottom: 8 }}>{editQError}</div>}
        <Button onClick={handleEditQuestion} fullWidth>Save Changes</Button>
      </Modal>
      {/* Delete Question Modal */}
      <Modal opened={deleteQOpen} onClose={() => setDeleteQOpen(false)} title="Delete Question" centered>
        <div style={{ marginBottom: 16 }}>
          Are you sure you want to delete this question?
        </div>
        <Button color="red" onClick={handleDeleteQuestion} fullWidth>Delete</Button>
      </Modal>
      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: 40 }} />
            <Table.Th>ID</Table.Th>
            <Table.Th>Order</Table.Th>
            <Table.Th>Phase</Table.Th>
            <Table.Th>Questions</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {questionGroups.map((group: any, idx: number) => [
            <Table.Tr key={group.id}>
              <Table.Td>
                <ActionIcon
                  variant="subtle"
                  onClick={e => { e.stopPropagation(); handleExpand(group.id); }}
                  aria-label={expanded === group.id ? 'Collapse' : 'Expand'}
                >
                  {expanded === group.id ? <IconChevronDown size={18} /> : <IconChevronRight size={18} />}
                </ActionIcon>
              </Table.Td>
              <Table.Td>{group.id}</Table.Td>
              <Table.Td>{group.order}</Table.Td>
              <Table.Td>{group.phase}</Table.Td>
              <Table.Td>{group.questions.length}</Table.Td>
              <Table.Td>
                <Button size="xs" variant="light" mr={4} onClick={() => openEditModal(idx)}>Edit</Button>
                <Button size="xs" color="red" variant="light" onClick={() => openDeleteModal(idx)}>Delete</Button>
              </Table.Td>
            </Table.Tr>,
            expanded === group.id && (
              <Table.Tr key={`${group.id  }-questions`}>
                <Table.Td colSpan={6} style={{ padding: 0 }}>
                  <Button size="xs" mb="xs" onClick={() => openAddQuestionModal(idx)}>
                    Add Question
                  </Button>
                  <Table withColumnBorders striped={false} style={{ margin: 0 }}>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>ID</Table.Th>
                        <Table.Th>Text</Table.Th>
                        <Table.Th>Type</Table.Th>
                        <Table.Th>Options</Table.Th>
                        <Table.Th>Target Attribute</Table.Th>
                        <Table.Th>Actions</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {group.questions.map((q: any, qIdx: number) => (
                        <Table.Tr key={q.id}>
                          <Table.Td>{q.id}</Table.Td>
                          <Table.Td>{q.text}</Table.Td>
                          <Table.Td>{q.type}</Table.Td>
                          <Table.Td>
                            {(q.type === 'multipleChoice' || q.type === 'singleChoice') && q.options && q.options.length > 0
                              ? q.options.map((opt: any) => opt.label).join(', ')
                              : '-'}
                          </Table.Td>
                          <Table.Td>{q.targetAttribute}</Table.Td>
                          <Table.Td>
                            <Button size="xs" variant="light" mr={4} onClick={() => openEditQuestionModal(idx, qIdx)}>Edit</Button>
                            <Button size="xs" color="red" variant="light" onClick={() => openDeleteQuestionModal(idx, qIdx)}>Delete</Button>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Table.Td>
              </Table.Tr>
            )
          ])}
        </Table.Tbody>
      </Table>
    </div>
  );
} 