import { Table, Button, Modal, TextInput, Textarea, Group, Badge, MultiSelect } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconDeviceFloppy } from '@tabler/icons-react';
import { useState } from 'react';
import notesData from '../data/notes.json';
import tagsData from '../data/tags.json';

export default function NotesCRUD() {
  const [notes, setNotes] = useState<any[]>(notesData);
  const [saving, setSaving] = useState(false);
  
  // Tag options from catalog
  const tagOptions = Array.isArray(tagsData) ? tagsData.map(tag => ({
    value: tag.id,
    label: `${tag.id} - ${tag.description}`
  })).filter(option => option.value && option.label) : [];

  // Add modal state
  const [addOpen, setAddOpen] = useState(false);
  const [addId, setAddId] = useState('');
  const [addTitle, setAddTitle] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addRequiredTags, setAddRequiredTags] = useState<string[]>([]);
  const [addError, setAddError] = useState('');

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editId, setEditId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editRequiredTags, setEditRequiredTags] = useState<string[]>([]);
  const [editError, setEditError] = useState('');

  // Delete modal state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);

  const handleAdd = () => {
    setAddId('');
    setAddTitle('');
    setAddDescription('');
    setAddRequiredTags([]);
    setAddError('');
    setAddOpen(true);
  };

  const handleAddSubmit = () => {
    setAddError('');
    if (!addId.trim() || !addTitle.trim() || !addDescription.trim()) {
      setAddError('ID, Title, and Description are required');
      return;
    }
    if (notes.some(o => o.id === addId)) {
      setAddError('ID must be unique');
      return;
    }
    setNotes([
      ...notes,
      {
        id: addId,
        title: addTitle,
        description: addDescription,
        requiredTags: addRequiredTags.length > 0 ? addRequiredTags : undefined,
      },
    ]);
    setAddOpen(false);
  };

  const openEditModal = (idx: number) => {
    const note = notes[idx];
    setEditIdx(idx);
    setEditId(note.id);
    setEditTitle(note.title);
    setEditDescription(note.description);
    setEditRequiredTags(note.requiredTags || []);
    setEditError('');
    setEditOpen(true);
  };

  const handleEditSubmit = () => {
    setEditError('');
    if (!editId.trim() || !editTitle.trim() || !editDescription.trim()) {
      setEditError('ID, Title, and Description are required');
      return;
    }
    if (editIdx === null) {return;}
    if (notes.some((o, i) => o.id === editId && i !== editIdx)) {
      setEditError('ID must be unique');
      return;
    }
    setNotes(ns =>
      ns.map((n, i) =>
        i === editIdx
          ? {
              id: editId,
              title: editTitle,
              description: editDescription,
              requiredTags: editRequiredTags.length > 0 ? editRequiredTags : undefined,
            }
          : n
      )
    );
    setEditOpen(false);
  };

  const openDeleteModal = (idx: number) => {
    setDeleteIdx(idx);
    setDeleteOpen(true);
  };

  const handleDelete = () => {
    if (deleteIdx === null) {return;}
    setNotes(ns => ns.filter((_, i) => i !== deleteIdx));
    setDeleteOpen(false);
  };



  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/save-notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notes),
      });
      const result = await res.json();
      if (result.success) {
        notifications.show({
          color: 'green',
          title: 'Saved',
          message: 'Notes saved successfully.',
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
      <Button leftSection={<IconPlus size={16} />} mb="md" onClick={handleAdd}>
        Add Note
      </Button>
      <Button leftSection={<IconDeviceFloppy size={16} />} mb="md" ml="sm" color="teal" onClick={handleSave} loading={saving}>
        Save
      </Button>
      {/* Add Modal */}
      <Modal opened={addOpen} onClose={() => setAddOpen(false)} title="Add Note" centered>
        <TextInput
          label="ID"
          value={addId}
          onChange={e => setAddId(e.currentTarget.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Title"
          value={addTitle}
          onChange={e => setAddTitle(e.currentTarget.value)}
          required
          mb="sm"
        />
        <Textarea
          label="Description (Markdown supported)"
          value={addDescription}
          onChange={e => setAddDescription(e.currentTarget.value)}
          required
          mb="sm"
          minRows={6}
          autosize
        />
        <MultiSelect
          label="Required Tags"
          data={tagOptions || []}
          value={addRequiredTags || []}
          onChange={setAddRequiredTags}
          searchable
          mb="sm"
          placeholder="Select tags from catalog"
        />
        {addError && <div style={{ color: 'red', marginBottom: 8 }}>{addError}</div>}
        <Button onClick={handleAddSubmit} fullWidth>Add Note</Button>
      </Modal>
      {/* Edit Modal */}
      <Modal opened={editOpen} onClose={() => setEditOpen(false)} title="Edit Note" centered>
        <TextInput
          label="ID"
          value={editId}
          onChange={e => setEditId(e.currentTarget.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Title"
          value={editTitle}
          onChange={e => setEditTitle(e.currentTarget.value)}
          required
          mb="sm"
        />
        <Textarea
          label="Description (Markdown supported)"
          value={editDescription}
          onChange={e => setEditDescription(e.currentTarget.value)}
          required
          mb="sm"
          minRows={6}
          autosize
        />
        <MultiSelect
          label="Required Tags"
          data={tagOptions || []}
          value={editRequiredTags || []}
          onChange={setEditRequiredTags}
          searchable
          mb="sm"
          placeholder="Select tags from catalog"
        />
        {editError && <div style={{ color: 'red', marginBottom: 8 }}>{editError}</div>}
        <Button onClick={handleEditSubmit} fullWidth>Save Changes</Button>
      </Modal>
      {/* Delete Modal */}
      <Modal opened={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Note" centered>
        <div style={{ marginBottom: 16 }}>
          Are you sure you want to delete this note?
        </div>
        <Button color="red" onClick={handleDelete} fullWidth>Delete</Button>
      </Modal>
      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Title</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Required Tags</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {notes.map((note, _idx) => (
            <Table.Tr key={note.id}>
              <Table.Td>{note.id}</Table.Td>
              <Table.Td>{note.title}</Table.Td>
              <Table.Td>{note.description}</Table.Td>
              <Table.Td>
                {note.requiredTags && note.requiredTags.length > 0 ? (
                  <Group gap={4}>
                    {note.requiredTags.map((tag: string) => (
                      <Badge key={tag} size="xs" variant="light">
                        {tag}
                      </Badge>
                    ))}
                  </Group>
                ) : '-'}
              </Table.Td>
              <Table.Td>
                <Button size="xs" variant="light" mr={4} onClick={() => openEditModal(_idx)}>Edit</Button>
                <Button size="xs" color="red" variant="light" onClick={() => openDeleteModal(_idx)}>Delete</Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
} 