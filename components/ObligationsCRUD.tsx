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
import obligationsData from '../data/obligations.json';
import tagsData from '../data/tags.json';
import { Tag } from '../entities/Tag';
import { MarkdownRenderer } from './common/MarkdownRenderer';

export default function ObligationsCRUD() {
  const [obligations, setObligations] = useState<any[]>(obligationsData);
  const [saving, setSaving] = useState(false);

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
  const [addArticle, setAddArticle] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addRequiredTags, setAddRequiredTags] = useState<string[]>([]);
  const [addRequiredAllTags, setAddRequiredAllTags] = useState<string[]>([]);
  const [addOrder, setAddOrder] = useState<number | ''>('');
  const [addError, setAddError] = useState('');

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editId, setEditId] = useState('');
  const [editArticle, setEditArticle] = useState('');
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
    setAddArticle('');
    setAddDescription('');
    setAddRequiredTags([]);
    setAddRequiredAllTags([]);
    setAddOrder('');
    setAddError('');
    setAddOpen(true);
  };

  const handleAddSubmit = async () => {
    setAddError('');
    if (!addId.trim() || !addArticle.trim() || !addDescription.trim()) {
      setAddError('ID, Article, and Description are required');
      return;
    }
    if (obligations.some((o) => o.id === addId)) {
      setAddError('ID must be unique');
      return;
    }

    const newObligations = [
      ...obligations,
      {
        id: addId,
        article: addArticle,
        description: addDescription,
        requiredTags: addRequiredTags.length > 0 ? addRequiredTags : undefined,
        requiredAllTags: addRequiredAllTags.length > 0 ? addRequiredAllTags : undefined,
        order: addOrder !== '' ? addOrder : undefined,
      },
    ];

    setObligations(newObligations);
    setAddOpen(false);

    // Auto-save
    setSaving(true);
    try {
      const res = await fetch('/api/save-obligations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newObligations),
      });
      const result = await res.json();
      if (result.success) {
        notifications.show({
          color: 'green',
          title: 'Saved',
          message: 'Obligation added and saved successfully.',
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
    const obl = obligations[idx];
    setEditIdx(idx);
    setEditId(obl.id);
    setEditArticle(obl.article);
    setEditDescription(obl.description);
    setEditRequiredTags(obl.requiredTags || []);
    setEditRequiredAllTags(obl.requiredAllTags || []);
    setEditOrder(obl.order || '');
    setEditError('');
    setEditOpen(true);
  };

  const handleEditSubmit = async () => {
    setEditError('');
    if (!editId.trim() || !editArticle.trim() || !editDescription.trim()) {
      setEditError('ID, Article, and Description are required');
      return;
    }
    if (editIdx === null) {
      return;
    }
    if (obligations.some((o, i) => o.id === editId && i !== editIdx)) {
      setEditError('ID must be unique');
      return;
    }

    const updatedObligations = obligations.map((o, i) =>
      i === editIdx
        ? {
            id: editId,
            article: editArticle,
            description: editDescription,
            requiredTags: editRequiredTags.length > 0 ? editRequiredTags : undefined,
            requiredAllTags: editRequiredAllTags.length > 0 ? editRequiredAllTags : undefined,
            order: editOrder !== '' ? editOrder : undefined,
          }
        : o
    );

    setObligations(updatedObligations);
    setEditOpen(false);

    // Auto-save
    setSaving(true);
    try {
      const res = await fetch('/api/save-obligations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedObligations),
      });
      const result = await res.json();
      if (result.success) {
        notifications.show({
          color: 'green',
          title: 'Saved',
          message: 'Obligation updated and saved successfully.',
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

    const updatedObligations = obligations.filter((_, i) => i !== deleteIdx);
    setObligations(updatedObligations);
    setDeleteOpen(false);

    // Auto-save
    setSaving(true);
    try {
      const res = await fetch('/api/save-obligations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedObligations),
      });
      const result = await res.json();
      if (result.success) {
        notifications.show({
          color: 'green',
          title: 'Saved',
          message: 'Obligation deleted and saved successfully.',
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
        Add Obligation
      </Button>
      {/* Add Modal */}
      <Modal opened={addOpen} onClose={() => setAddOpen(false)} title="Add Obligation" centered>
        <TextInput
          label="ID"
          value={addId}
          onChange={(e) => setAddId(e.currentTarget.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Article"
          value={addArticle}
          onChange={(e) => setAddArticle(e.currentTarget.value)}
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
          Add Obligation
        </Button>
      </Modal>
      {/* Edit Modal */}
      <Modal opened={editOpen} onClose={() => setEditOpen(false)} title="Edit Obligation" centered>
        <TextInput
          label="ID"
          value={editId}
          onChange={(e) => setEditId(e.currentTarget.value)}
          required
          mb="sm"
        />
        <TextInput
          label="Article"
          value={editArticle}
          onChange={(e) => setEditArticle(e.currentTarget.value)}
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
      <Modal
        opened={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete Obligation"
        centered
      >
        <div style={{ marginBottom: 16 }}>Are you sure you want to delete this obligation?</div>
        <Button color="red" onClick={handleDelete} fullWidth>
          Delete
        </Button>
      </Modal>
      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Article</Table.Th>
            <Table.Th>Description</Table.Th>
            <Table.Th>Order</Table.Th>
            <Table.Th>Required Tags</Table.Th>
            <Table.Th>Required All Tags</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {obligations.map((obl, _idx) => (
            <Table.Tr key={obl.id}>
              <Table.Td>{obl.id}</Table.Td>
              <Table.Td>
                <MarkdownRenderer content={obl.article} />
              </Table.Td>
              <Table.Td>
                <MarkdownRenderer content={obl.description} />
              </Table.Td>
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
                ) : (
                  '-'
                )}
              </Table.Td>
              <Table.Td>
                {obl.requiredAllTags && obl.requiredAllTags.length > 0 ? (
                  <Group gap={4}>
                    {obl.requiredAllTags.map((tag: string) => (
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
