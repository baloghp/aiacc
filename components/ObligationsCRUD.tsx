import { Table, Button, Modal, TextInput, Textarea, Group, Badge, MultiSelect, NumberInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconDeviceFloppy } from '@tabler/icons-react';
import { useState } from 'react';
import obligationsData from '../data/obligations.json';
import tagsData from '../data/tags.json';
import { Tag } from '../entities/Tag';

export default function ObligationsCRUD() {
  const [obligations, setObligations] = useState<any[]>(obligationsData);
  const [saving, setSaving] = useState(false);
  
  // Tag options from catalog
  const tagOptions = (tagsData as Tag[]).map(tag => ({
    value: tag.id,
    label: `${tag.id} - ${tag.description}`
  })).filter(option => option.value && option.label);

  // Add modal state
  const [addOpen, setAddOpen] = useState(false);
  const [addId, setAddId] = useState('');
  const [addArticle, setAddArticle] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addRequiredTags, setAddRequiredTags] = useState<string[]>([]);
  const [addOrder, setAddOrder] = useState<number | ''>('');
  const [addError, setAddError] = useState('');

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editId, setEditId] = useState('');
  const [editArticle, setEditArticle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editRequiredTags, setEditRequiredTags] = useState<string[]>([]);
  const [editOrder, setEditOrder] = useState<number | ''>('');
  const [editError, setEditError] = useState('');

  // Delete modal state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);

  const handleAdd = () => {
    setAddId('');
    setAddArticle('');
    setAddDescription('');
    setAddRequiredTags([]);
    setAddOrder('');
    setAddError('');
    setAddOpen(true);
  };

  const handleAddSubmit = () => {
    setAddError('');
    if (!addId.trim() || !addArticle.trim() || !addDescription.trim()) {
      setAddError('ID, Article, and Description are required');
      return;
    }
    if (obligations.some(o => o.id === addId)) {
      setAddError('ID must be unique');
      return;
    }
    setObligations([
      ...obligations,
      {
        id: addId,
        article: addArticle,
        description: addDescription,
        requiredTags: addRequiredTags.length > 0 ? addRequiredTags : undefined,
        order: addOrder !== '' ? addOrder : undefined,
      },
    ]);
    setAddOpen(false);
  };

  const openEditModal = (idx: number) => {
    const obl = obligations[idx];
    setEditIdx(idx);
    setEditId(obl.id);
    setEditArticle(obl.article);
    setEditDescription(obl.description);
    setEditRequiredTags(obl.requiredTags || []);
    setEditOrder(obl.order || '');
    setEditError('');
    setEditOpen(true);
  };

  const handleEditSubmit = () => {
    setEditError('');
    if (!editId.trim() || !editArticle.trim() || !editDescription.trim()) {
      setEditError('ID, Article, and Description are required');
      return;
    }
    if (editIdx === null) {return;}
    if (obligations.some((o, i) => o.id === editId && i !== editIdx)) {
      setEditError('ID must be unique');
      return;
    }
    setObligations(obls =>
      obls.map((o, i) =>
        i === editIdx
          ? {
              id: editId,
              article: editArticle,
              description: editDescription,
              requiredTags: editRequiredTags.length > 0 ? editRequiredTags : undefined,
              order: editOrder !== '' ? editOrder : undefined,
            }
          : o
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
    setObligations(obls => obls.filter((_, i) => i !== deleteIdx));
    setDeleteOpen(false);
  };



  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch('/api/save-obligations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obligations),
      });
      const result = await res.json();
      if (result.success) {
        notifications.show({
          color: 'green',
          title: 'Saved',
          message: 'Obligations saved successfully.',
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
        Add Obligation
      </Button>
      <Button leftSection={<IconDeviceFloppy size={16} />} mb="md" ml="sm" color="teal" onClick={handleSave} loading={saving}>
        Save
      </Button>
      {/* Add Modal */}
      <Modal opened={addOpen} onClose={() => setAddOpen(false)} title="Add Obligation" centered>
        <TextInput
          label="ID"
          value={addId}
          onChange={e => setAddId(e.currentTarget.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Article"
          value={addArticle}
          onChange={e => setAddArticle(e.currentTarget.value)}
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
        <NumberInput
          label="Order"
          value={addOrder}
          onChange={(value) => setAddOrder(value as number | '')}
          placeholder="Optional order for sorting"
          mb="sm"
          min={0}
        />
        {addError && <div style={{ color: 'red', marginBottom: 8 }}>{addError}</div>}
        <Button onClick={handleAddSubmit} fullWidth>Add Obligation</Button>
      </Modal>
      {/* Edit Modal */}
      <Modal opened={editOpen} onClose={() => setEditOpen(false)} title="Edit Obligation" centered>
        <TextInput
          label="ID"
          value={editId}
          onChange={e => setEditId(e.currentTarget.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Article"
          value={editArticle}
          onChange={e => setEditArticle(e.currentTarget.value)}
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
        <NumberInput
          label="Order"
          value={editOrder}
          onChange={(value) => setEditOrder(value as number | '')}
          placeholder="Optional order for sorting"
          mb="sm"
          min={0}
        />
        {editError && <div style={{ color: 'red', marginBottom: 8 }}>{editError}</div>}
        <Button onClick={handleEditSubmit} fullWidth>Save Changes</Button>
      </Modal>
      {/* Delete Modal */}
      <Modal opened={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Obligation" centered>
        <div style={{ marginBottom: 16 }}>
          Are you sure you want to delete this obligation?
        </div>
        <Button color="red" onClick={handleDelete} fullWidth>Delete</Button>
      </Modal>
      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Article</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Order</Table.Th>
            <Table.Th>Required Tags</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {obligations.map((obl, _idx) => (
            <Table.Tr key={obl.id}>
              <Table.Td>{obl.id}</Table.Td>
              <Table.Td>{obl.article}</Table.Td>
              <Table.Td>{obl.description}</Table.Td>
              <Table.Td>{obl.order || '-'}</Table.Td>
              <Table.Td>
                {obl.requiredTags && obl.requiredTags.length > 0 ? (
                  <Group gap={4}>
                    {obl.requiredTags.map((tag: string) => (
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