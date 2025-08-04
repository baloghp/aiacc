import { Table, Button, Modal, TextInput, Textarea, Group, Badge, MultiSelect, NumberInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconDeviceFloppy } from '@tabler/icons-react';
import { useState } from 'react';
import rulesData from '../data/rules.json';
import tagsData from '../data/tags.json';
import { Tag } from '../entities/Tag';

export default function RulesCRUD() {
  const [rules, setRules] = useState<any[]>(rulesData);
  const [saving, setSaving] = useState(false);
  
  // Tag options from catalog
  const tagOptions = (tagsData as Tag[]).map(tag => ({
    value: tag.id,
    label: tag.id
  })).filter(option => option.value && option.label);

  // Add modal state
  const [addOpen, setAddOpen] = useState(false);
  const [addId, setAddId] = useState('');
  const [addName, setAddName] = useState('');
  const [addInputTags, setAddInputTags] = useState<string[]>([]);
  const [addOutputTags, setAddOutputTags] = useState<string[]>([]);
  const [addOrder, setAddOrder] = useState<number | ''>('');
  const [addError, setAddError] = useState('');

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [editInputTags, setEditInputTags] = useState<string[]>([]);
  const [editOutputTags, setEditOutputTags] = useState<string[]>([]);
  const [editOrder, setEditOrder] = useState<number | ''>('');
  const [editError, setEditError] = useState('');

  // Delete modal state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);

  const handleAdd = () => {
    setAddId('');
    setAddName('');
    setAddInputTags([]);
    setAddOutputTags([]);
    setAddOrder('');
    setAddError('');
    setAddOpen(true);
  };

  const handleAddSubmit = async () => {
    setAddError('');
    if (!addId.trim() || !addName.trim()) {
      setAddError('ID and Name are required');
      return;
    }
    if (rules.some(r => r.id === addId)) {
      setAddError('ID must be unique');
      return;
    }
    
    const newRules = [
      ...rules,
      {
        id: addId,
        name: addName,
        inputTags: addInputTags.length > 0 ? addInputTags : [],
        outputTags: addOutputTags.length > 0 ? addOutputTags : [],
        order: addOrder !== '' ? addOrder : undefined,
      },
    ];
    
    setRules(newRules);
    setAddOpen(false);
    
    // Auto-save
    setSaving(true);
    try {
      const res = await fetch('/api/save-rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRules),
      });
      const result = await res.json();
      if (result.success) {
        notifications.show({
          color: 'green',
          title: 'Saved',
          message: 'Rule added and saved successfully.',
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

  const openEditModal = (idx: number) => {
    const rule = rules[idx];
    setEditIdx(idx);
    setEditId(rule.id);
    setEditName(rule.name);
    setEditInputTags(rule.inputTags || []);
    setEditOutputTags(rule.outputTags || []);
    setEditOrder(rule.order || '');
    setEditError('');
    setEditOpen(true);
  };

  const handleEditSubmit = async () => {
    setEditError('');
    if (!editId.trim() || !editName.trim()) {
      setEditError('ID and Name are required');
      return;
    }
    if (editIdx === null) {return;}
    if (rules.some((r, i) => r.id === editId && i !== editIdx)) {
      setEditError('ID must be unique');
      return;
    }
    
    const updatedRules = rules.map((r, i) =>
      i === editIdx
        ? {
            id: editId,
            name: editName,
            inputTags: editInputTags.length > 0 ? editInputTags : [],
            outputTags: editOutputTags.length > 0 ? editOutputTags : [],
            order: editOrder !== '' ? editOrder : undefined,
          }
        : r
    );
    
    setRules(updatedRules);
    setEditOpen(false);
    
    // Auto-save
    setSaving(true);
    try {
      const res = await fetch('/api/save-rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRules),
      });
      const result = await res.json();
      if (result.success) {
        notifications.show({
          color: 'green',
          title: 'Saved',
          message: 'Rule updated and saved successfully.',
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

  const openDeleteModal = (idx: number) => {
    setDeleteIdx(idx);
    setDeleteOpen(true);
  };

  const handleDelete = async () => {
    if (deleteIdx === null) {return;}
    
    const updatedRules = rules.filter((_, i) => i !== deleteIdx);
    setRules(updatedRules);
    setDeleteOpen(false);
    
    // Auto-save
    setSaving(true);
    try {
      const res = await fetch('/api/save-rules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRules),
      });
      const result = await res.json();
      if (result.success) {
        notifications.show({
          color: 'green',
          title: 'Saved',
          message: 'Rule deleted and saved successfully.',
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
        Add Rule
      </Button>
      {/* Add Modal */}
      <Modal opened={addOpen} onClose={() => setAddOpen(false)} title="Add Rule" centered>
        <TextInput
          label="ID"
          value={addId}
          onChange={e => setAddId(e.currentTarget.value)}
          required
          mb="sm"
          placeholder="e.g., rule1"
        />
        <TextInput
          label="Name"
          value={addName}
          onChange={e => setAddName(e.currentTarget.value)}
          required
          mb="sm"
          placeholder="e.g., Non-EU Entity Rule"
        />
        <MultiSelect
          label="Input Tags (When these tags are present)"
          data={tagOptions || []}
          value={addInputTags || []}
          onChange={setAddInputTags}
          searchable
          mb="sm"
          placeholder="Select input tags from catalog"
        />
        <MultiSelect
          label="Output Tags (Add these tags when rule triggers)"
          data={tagOptions || []}
          value={addOutputTags || []}
          onChange={setAddOutputTags}
          searchable
          mb="sm"
          placeholder="Select output tags from catalog"
        />
        <NumberInput
          label="Order"
          value={addOrder}
          onChange={(value) => setAddOrder(value as number | '')}
          placeholder="Optional order for processing"
          mb="sm"
          min={0}
        />
        {addError && <div style={{ color: 'red', marginBottom: 8 }}>{addError}</div>}
        <Button onClick={handleAddSubmit} fullWidth>Add Rule</Button>
      </Modal>
      {/* Edit Modal */}
      <Modal opened={editOpen} onClose={() => setEditOpen(false)} title="Edit Rule" centered>
        <TextInput
          label="ID"
          value={editId}
          onChange={e => setEditId(e.currentTarget.value)}
          required
          mb="sm"
          placeholder="e.g., rule1"
        />
        <TextInput
          label="Name"
          value={editName}
          onChange={e => setEditName(e.currentTarget.value)}
          required
          mb="sm"
          placeholder="e.g., Non-EU Entity Rule"
        />
        <MultiSelect
          label="Input Tags (When these tags are present)"
          data={tagOptions || []}
          value={editInputTags || []}
          onChange={setEditInputTags}
          searchable
          mb="sm"
          placeholder="Select input tags from catalog"
        />
        <MultiSelect
          label="Output Tags (Add these tags when rule triggers)"
          data={tagOptions || []}
          value={editOutputTags || []}
          onChange={setEditOutputTags}
          searchable
          mb="sm"
          placeholder="Select output tags from catalog"
        />
        <NumberInput
          label="Order"
          value={editOrder}
          onChange={(value) => setEditOrder(value as number | '')}
          placeholder="Optional order for processing"
          mb="sm"
          min={0}
        />
        {editError && <div style={{ color: 'red', marginBottom: 8 }}>{editError}</div>}
        <Button onClick={handleEditSubmit} fullWidth>Save Changes</Button>
      </Modal>
      {/* Delete Modal */}
      <Modal opened={deleteOpen} onClose={() => setDeleteOpen(false)} title="Delete Rule" centered>
        <div style={{ marginBottom: 16 }}>
          Are you sure you want to delete this rule?
        </div>
        <Button color="red" onClick={handleDelete} fullWidth>Delete</Button>
      </Modal>
      <Table striped>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Order</Table.Th>
            <Table.Th>Input Tags</Table.Th>
            <Table.Th>Output Tags</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {rules.map((rule, _idx) => (
            <Table.Tr key={rule.id}>
              <Table.Td>{rule.id}</Table.Td>
              <Table.Td>{rule.name}</Table.Td>
              <Table.Td>{rule.order || '-'}</Table.Td>
              <Table.Td>
                {rule.inputTags && rule.inputTags.length > 0 ? (
                  <Group gap={4}>
                    {rule.inputTags.map((tag: string) => (
                      <Badge key={tag} size="xs" variant="light" color="green">
                        {tag}
                      </Badge>
                    ))}
                  </Group>
                ) : '-'}
              </Table.Td>
              <Table.Td>
                {rule.outputTags && rule.outputTags.length > 0 ? (
                  <Group gap={4}>
                    {rule.outputTags.map((tag: string) => (
                      <Badge key={tag} size="xs" variant="light" color="blue">
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