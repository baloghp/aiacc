import { Table, Button, Modal, TextInput, Textarea, Group,  Badge, ActionIcon } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconDeviceFloppy, IconChevronUp, IconChevronDown } from '@tabler/icons-react';
import { useState } from 'react';
import tagsData from '../data/tags.json';

export default function TagsCRUD() {
  const [tags, setTags] = useState<any[]>(tagsData);
  const [saving, setSaving] = useState(false);
  const [sortField, setSortField] = useState<'id' | 'category' | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Add modal state
  const [addOpen, setAddOpen] = useState(false);
  const [addId, setAddId] = useState('');
  const [addCategory, setAddCategory] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addError, setAddError] = useState('');

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editId, setEditId] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editError, setEditError] = useState('');

  // Delete modal state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);

  const handleAdd = () => {
    setAddId('');
    setAddCategory('');
    setAddDescription('');
    setAddError('');
    setAddOpen(true);
  };

  const handleAddSubmit = () => {
    setAddError('');
    if (!addId.trim() || !addCategory.trim()) {
      setAddError('ID and Category are required');
      return;
    }
    if (tags.some(t => t.id === addId)) {
      setAddError('ID must be unique');
      return;
    }
    setTags([
      ...tags,
      {
        id: addId,
        category: addCategory,
        description: addDescription.trim() || undefined,
      },
    ]);
    setAddOpen(false);
  };

  const openEditModal = (idx: number) => {
    const tag = tags[idx];
    setEditIdx(idx);
    setEditId(tag.id);
    setEditCategory(tag.category);
    setEditDescription(tag.description || '');
    setEditError('');
    setEditOpen(true);
  };

  const handleEditSubmit = () => {
    setEditError('');
    if (!editId.trim() || !editCategory.trim()) {
      setEditError('ID and Category are required');
      return;
    }
    if (editIdx === null) {return;}
    if (tags.some((t, i) => t.id === editId && i !== editIdx)) {
      setEditError('ID must be unique');
      return;
    }
    setTags(ts =>
      ts.map((t, i) =>
        i === editIdx
          ? {
              id: editId,
              category: editCategory,
              description: editDescription.trim() || undefined,
            }
          : t
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
    setTags(ts => ts.filter((_, i) => i !== deleteIdx));
    setDeleteOpen(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/save-tags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tags),
      });
      const result = await res.json();
      if (result.success) {
        notifications.show({
          color: 'green',
          title: 'Saved',
          message: 'Tags saved successfully.',
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

  const handleSort = (field: 'id' | 'category') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedTags = [...tags].sort((a, b) => {
    if (!sortField) {return 0;}
    
    const aValue = a[sortField].toLowerCase();
    const bValue = b[sortField].toLowerCase();
    
    if (sortDirection === 'asc') {
      return aValue.localeCompare(bValue);
    } 
      return bValue.localeCompare(aValue);
    
  });

  const getSortIcon = (field: 'id' | 'category') => {
    if (sortField !== field) {
      return <IconChevronUp size={16} style={{ opacity: 0.3 }} />;
    }
    return sortDirection === 'asc' ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />;
  };

  return (
    <div>
      <Button leftSection={<IconPlus size={16} />} mb="md" onClick={handleAdd}>
        Add Tag
      </Button>
      <Button leftSection={<IconDeviceFloppy size={16} />} mb="md" ml="sm" color="teal" onClick={handleSave} loading={saving}>
        Save
      </Button>
      {/* Add Modal */}
      <Modal opened={addOpen} onClose={() => setAddOpen(false)} title="Add Tag" centered>
        <TextInput
          label="ID"
          value={addId}
          onChange={e => setAddId(e.currentTarget.value)}
          required
          mb="sm"
          placeholder="e.g., legal:eu-entity"
        />
        <TextInput
          label="Category"
          value={addCategory}
          onChange={e => setAddCategory(e.currentTarget.value)}
          required
          mb="sm"
          placeholder="e.g., Legal Scope"
        />
        <Textarea
          label="Description (Optional)"
          value={addDescription}
          onChange={e => setAddDescription(e.currentTarget.value)}
          mb="sm"
          minRows={3}
          autosize
          placeholder="Brief description of what this tag represents (optional)"
        />
        {addError && <div style={{ color: 'red', marginBottom: 8 }}>{addError}</div>}
        <Button onClick={handleAddSubmit} fullWidth>Add Tag</Button>
      </Modal>
      {/* Edit Modal */}
      <Modal opened={editOpen} onClose={() => setEditOpen(false)} title="Edit Tag" centered>
        <TextInput
          label="ID"
          value={editId}
          onChange={e => setEditId(e.currentTarget.value)}
          required
          mb="sm"
          placeholder="e.g., legal:eu-entity"
        />
        <TextInput
          label="Category"
          value={editCategory}
          onChange={e => setEditCategory(e.currentTarget.value)}
          required
          mb="sm"
          placeholder="e.g., Legal Scope"
        />
        <Textarea
          label="Description (Optional)"
          value={editDescription}
          onChange={e => setEditDescription(e.currentTarget.value)}
          mb="sm"
          minRows={3}
          autosize
          placeholder="Brief description of what this tag represents (optional)"
        />
        {editError && <div style={{ color: 'red', marginBottom: 8 }}>{editError}</div>}
        <Button onClick={handleEditSubmit} fullWidth>Save Changes</Button>
      </Modal>
      {/* Delete Modal */}
      <Modal opened={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Tag" centered>
        <div style={{ marginBottom: 16 }}>
          Are you sure you want to delete this tag?
        </div>
        <Button color="red" onClick={handleDelete} fullWidth>Delete</Button>
      </Modal>
      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>
              <Group gap={4}>
                ID
                <ActionIcon 
                  variant="subtle" 
                  size="xs" 
                  onClick={() => handleSort('id')}
                  style={{ cursor: 'pointer' }}
                >
                  {getSortIcon('id')}
                </ActionIcon>
              </Group>
            </Table.Th>
            <Table.Th>
              <Group gap={4}>
                Category
                <ActionIcon 
                  variant="subtle" 
                  size="xs" 
                  onClick={() => handleSort('category')}
                  style={{ cursor: 'pointer' }}
                >
                  {getSortIcon('category')}
                </ActionIcon>
              </Group>
            </Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {sortedTags.map((tag, _idx) => {
            // Find the original index for edit/delete operations
            const originalIdx = tags.findIndex(t => t.id === tag.id);
            return (
              <Table.Tr key={tag.id}>
                <Table.Td>
                  <Badge size="sm" variant="light">
                    {tag.id}
                  </Badge>
                </Table.Td>
                <Table.Td>{tag.category}</Table.Td>
                <Table.Td>{tag.description || '-'}</Table.Td>
                <Table.Td>
                  <Button size="xs" variant="light" mr={4} onClick={() => openEditModal(originalIdx)}>Edit</Button>
                  <Button size="xs" color="red" variant="light" onClick={() => openDeleteModal(originalIdx)}>Delete</Button>
                </Table.Td>
              </Table.Tr>
            );
          })}
        </Table.Tbody>
      </Table>
    </div>
  );
} 