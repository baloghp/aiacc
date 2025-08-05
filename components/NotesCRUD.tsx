import { useState } from 'react';
import { IconDeviceFloppy, IconPlus } from '@tabler/icons-react';
import {
  Badge,
  Button,
  Group,
  Modal,
  MultiSelect,
  NumberInput,
  Table,
  Textarea,
  TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import notesData from '../data/notes.json';
import tagsData from '../data/tags.json';
import { Tag } from '../entities/Tag';
import { MarkdownRenderer } from './common/MarkdownRenderer';
import { trimTags } from '../utils/tagUtils';

export default function NotesCRUD() {
  const [notes, setNotes] = useState<any[]>(notesData);
  const [_saving, setSaving] = useState(false);



  // Tag options from catalog
  const tagOptions = (tagsData as Tag[])
    .map((tag) => ({
      value: tag.id,
      label: tag.id,
    }))
    .filter((option) => option.value && option.label);

  // Add modal state
  const [addOpen, setAddOpen] = useState(false);
  const [addId, setAddId] = useState('');
  const [addTitle, setAddTitle] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addRequiredTags, setAddRequiredTags] = useState<string[]>([]);
  const [addRequiredAllTags, setAddRequiredAllTags] = useState<string[]>([]);
  const [addOrder, setAddOrder] = useState<number | ''>('');
  const [addError, setAddError] = useState('');

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editId, setEditId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editRequiredTags, setEditRequiredTags] = useState<string[]>([]);
  const [editRequiredAllTags, setEditRequiredAllTags] = useState<string[]>([]);
  const [editOrder, setEditOrder] = useState<number | ''>('');
  const [editError, setEditError] = useState('');

  // Delete modal state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);

  const handleAdd = () => {
    setAddId('');
    setAddTitle('');
    setAddDescription('');
    setAddRequiredTags([]);
    setAddRequiredAllTags([]);
    setAddOrder('');
    setAddError('');
    setAddOpen(true);
  };

  const handleAddSubmit = async () => {
    setAddError('');
    if (!addId.trim() || !addTitle.trim() || !addDescription.trim()) {
      setAddError('ID, Title, and Description are required');
      return;
    }
    if (notes.some((o) => o.id === addId)) {
      setAddError('ID must be unique');
      return;
    }

    const newNotes = [
      ...notes,
      {
        id: addId,
        title: addTitle,
        description: addDescription,
        requiredTags: addRequiredTags.length > 0 ? trimTags(addRequiredTags) : undefined,
        requiredAllTags: addRequiredAllTags.length > 0 ? trimTags(addRequiredAllTags) : undefined,
        order: addOrder !== '' ? addOrder : undefined,
      },
    ];

    setNotes(newNotes);
    setAddOpen(false);

    // Auto-save
    setSaving(true);
    try {
      const res = await fetch('/api/save-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNotes),
      });
      const result = await res.json();
      if (result.success) {
        notifications.show({
          color: 'green',
          title: 'Saved',
          message: 'Note added and saved successfully.',
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

  const openEditModal = (idx: number) => {
    const note = notes[idx];
    setEditIdx(idx);
    setEditId(note.id);
    setEditTitle(note.title);
    setEditDescription(note.description);
    setEditRequiredTags(note.requiredTags || []);
    setEditRequiredAllTags(note.requiredAllTags || []);
    setEditOrder(note.order || '');
    setEditError('');
    setEditOpen(true);
  };

  const handleEditSubmit = async () => {
    setEditError('');
    if (!editId.trim() || !editTitle.trim() || !editDescription.trim()) {
      setEditError('ID, Title, and Description are required');
      return;
    }
    if (editIdx === null) {
      return;
    }
    if (notes.some((o, i) => o.id === editId && i !== editIdx)) {
      setEditError('ID must be unique');
      return;
    }

    const updatedNotes = notes.map((n, i) =>
      i === editIdx
        ? {
            id: editId,
            title: editTitle,
            description: editDescription,
            requiredTags: editRequiredTags.length > 0 ? trimTags(editRequiredTags) : undefined,
            requiredAllTags: editRequiredAllTags.length > 0 ? trimTags(editRequiredAllTags) : undefined,
            order: editOrder !== '' ? editOrder : undefined,
          }
        : n
    );

    setNotes(updatedNotes);
    setEditOpen(false);

    // Auto-save
    setSaving(true);
    try {
      const res = await fetch('/api/save-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedNotes),
      });
      const result = await res.json();
      if (result.success) {
        notifications.show({
          color: 'green',
          title: 'Saved',
          message: 'Note updated and saved successfully.',
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

  const openDeleteModal = (idx: number) => {
    setDeleteIdx(idx);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (deleteIdx === null) {
      return;
    }

    const updatedNotes = notes.filter((_, i) => i !== deleteIdx);
    setNotes(updatedNotes);
    setDeleteOpen(false);

    // Auto-save
    setSaving(true);
    try {
      const res = await fetch('/api/save-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedNotes),
      });
      const result = await res.json();
      if (result.success) {
        notifications.show({
          color: 'green',
          title: 'Saved',
          message: 'Note deleted and saved successfully.',
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

  return (
    <div>
      <Button leftSection={<IconPlus size={16} />} mb="md" onClick={handleAdd}>
        Add Note
      </Button>
      {/* Add Modal */}
      <Modal opened={addOpen} onClose={() => setAddOpen(false)} title="Add Note" centered>
        <TextInput
          label="ID"
          value={addId}
          onChange={(e) => setAddId(e.currentTarget.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Title"
          value={addTitle}
          onChange={(e) => setAddTitle(e.currentTarget.value)}
          required
          mb="sm"
        />
        <Textarea
          label="Description (Markdown supported)"
          value={addDescription}
          onChange={(e) => setAddDescription(e.currentTarget.value)}
          required
          mb="sm"
          minRows={6}
          autosize
        />
        <MultiSelect
          label="Required Tags (Any)"
          data={tagOptions || []}
          value={addRequiredTags || []}
          onChange={setAddRequiredTags}
          searchable
          mb="sm"
          placeholder="Select tags from catalog"
        />
        <MultiSelect
          label="Required All Tags (All must be present)"
          data={tagOptions || []}
          value={addRequiredAllTags || []}
          onChange={setAddRequiredAllTags}
          searchable
          mb="sm"
          placeholder="Select tags that must ALL be present"
        />
        <NumberInput
          label="Order"
          value={addOrder}
          onChange={(value) => setAddOrder(value as number | '')}
          placeholder="Optional order for sorting"
          mb="sm"
          min={0}
        />
        {addError && <div style={{ color: 'red', marginBottom: 8 }}>{addError}</div>}
        <Button onClick={handleAddSubmit} fullWidth>
          Add Note
        </Button>
      </Modal>
      {/* Edit Modal */}
      <Modal opened={editOpen} onClose={() => setEditOpen(false)} title="Edit Note" centered>
        <TextInput
          label="ID"
          value={editId}
          onChange={(e) => setEditId(e.currentTarget.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Title"
          value={editTitle}
          onChange={(e) => setEditTitle(e.currentTarget.value)}
          required
          mb="sm"
        />
        <Textarea
          label="Description (Markdown supported)"
          value={editDescription}
          onChange={(e) => setEditDescription(e.currentTarget.value)}
          required
          mb="sm"
          minRows={6}
          autosize
        />
        <MultiSelect
          label="Required Tags (Any)"
          data={tagOptions || []}
          value={editRequiredTags || []}
          onChange={setEditRequiredTags}
          searchable
          mb="sm"
          placeholder="Select tags from catalog"
        />
        <MultiSelect
          label="Required All Tags (All must be present)"
          data={tagOptions || []}
          value={editRequiredAllTags || []}
          onChange={setEditRequiredAllTags}
          searchable
          mb="sm"
          placeholder="Select tags that must ALL be present"
        />
        <NumberInput
          label="Order"
          value={editOrder}
          onChange={(value) => setEditOrder(value as number | '')}
          placeholder="Optional order for sorting"
          mb="sm"
          min={0}
        />
        {editError && <div style={{ color: 'red', marginBottom: 8 }}>{editError}</div>}
        <Button onClick={handleEditSubmit} fullWidth>
          Save Changes
        </Button>
      </Modal>
      {/* Delete Modal */}
      <Modal opened={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Note" centered>
        <div style={{ marginBottom: 16 }}>Are you sure you want to delete this note?</div>
        <Button color="red" onClick={handleDelete} fullWidth>
          Delete
        </Button>
      </Modal>
      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Order</Table.Th>
            <Table.Th>Required ANY Tags</Table.Th>
            <Table.Th>Required ALL Tags</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {notes.map((note, _idx) => (
            <Table.Tr key={note.id}>
              <Table.Td>{note.id}</Table.Td>
              <Table.Td>{note.title}</Table.Td>
              <Table.Td>
                <MarkdownRenderer content={note.description} />
              </Table.Td>
              <Table.Td>{note.order || '-'}</Table.Td>
              <Table.Td>
                {note.requiredTags && note.requiredTags.length > 0 ? (
                  <Group gap={4}>
                    {note.requiredTags.map((tag: string) => (
                      <Badge key={tag} size="xs" variant="light">
                        {tag}
                      </Badge>
                    ))}
                  </Group>
                ) : (
                  '-'
                )}
              </Table.Td>
              <Table.Td>
                {note.requiredAllTags && note.requiredAllTags.length > 0 ? (
                  <Group gap={4}>
                    {note.requiredAllTags.map((tag: string) => (
                      <Badge key={tag} size="xs" variant="light" color="blue">
                        {tag}
                      </Badge>
                    ))}
                  </Group>
                ) : (
                  '-'
                )}
              </Table.Td>
              <Table.Td>
                <Button size="xs" variant="light" mr={4} onClick={() => openEditModal(_idx)}>
                  Edit
                </Button>
                <Button size="xs" color="red" variant="light" onClick={() => openDeleteModal(_idx)}>
                  Delete
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
}
