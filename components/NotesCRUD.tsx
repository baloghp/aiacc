import { Table, Button, Modal, TextInput, MultiSelect, Checkbox, Textarea } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconDeviceFloppy } from '@tabler/icons-react';
import { useState } from 'react';
import notesData from '../data/notes.json';

const ROLES = [
  'Provider',
  'Deployer',
  'ProductManufacturer',
  'AuthorizedRepresentative',
  'Importer',
  'Distributor',
];
const RISK_CATEGORIES = ['No-risk', 'Limited', 'High'];

export default function NotesCRUD() {
  const [notes, setNotes] = useState<any[]>(notesData);
  const [saving, setSaving] = useState(false);

  // Add modal state
  const [addOpen, setAddOpen] = useState(false);
  const [addId, setAddId] = useState('');
  const [addTitle, setAddTitle] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addRoles, setAddRoles] = useState<string[]>([]);
  const [addRisk, setAddRisk] = useState<string[]>([]);
  const [addGPAI, setAddGPAI] = useState(false);
  const [addSysRisk, setAddSysRisk] = useState(false);
  const [addError, setAddError] = useState('');

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editId, setEditId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editRoles, setEditRoles] = useState<string[]>([]);
  const [editRisk, setEditRisk] = useState<string[]>([]);
  const [editGPAI, setEditGPAI] = useState(false);
  const [editSysRisk, setEditSysRisk] = useState(false);
  const [editError, setEditError] = useState('');

  // Delete modal state
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteIdx, setDeleteIdx] = useState<number | null>(null);

  const handleAdd = () => {
    setAddId('');
    setAddTitle('');
    setAddDescription('');
    setAddRoles([]);
    setAddRisk([]);
    setAddGPAI(false);
    setAddSysRisk(false);
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
    if (addRoles.length === 0) {
      setAddError('At least one role is required');
      return;
    }
    if (addRisk.length === 0) {
      setAddError('At least one risk category is required');
      return;
    }
    setNotes([
      ...notes,
      {
        id: addId,
        title: addTitle,
        description: addDescription,
        applicableRoles: addRoles,
        riskCategory: addRisk,
        isGPAIApplicable: addGPAI,
        hasSystemicRiskApplicable: addSysRisk,
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
    setEditRoles(note.applicableRoles || []);
    setEditRisk(note.riskCategory || []);
    setEditGPAI(note.isGPAIApplicable || false);
    setEditSysRisk(note.hasSystemicRiskApplicable || false);
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
    if (editRoles.length === 0) {
      setEditError('At least one role is required');
      return;
    }
    if (editRisk.length === 0) {
      setEditError('At least one risk category is required');
      return;
    }
    setNotes(ns =>
      ns.map((n, i) =>
        i === editIdx
          ? {
              id: editId,
              title: editTitle,
              description: editDescription,
              applicableRoles: editRoles,
              riskCategory: editRisk,
              isGPAIApplicable: editGPAI,
              hasSystemicRiskApplicable: editSysRisk,
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
          label="Applicable Roles"
          data={ROLES}
          value={addRoles}
          onChange={setAddRoles}
          required
          mb="sm"
        />
        <MultiSelect
          label="Risk Categories"
          data={RISK_CATEGORIES}
          value={addRisk}
          onChange={setAddRisk}
          required
          mb="sm"
        />
        <Checkbox
          label="GPAI Applicable?"
          checked={addGPAI}
          onChange={e => setAddGPAI(e.currentTarget.checked)}
          mb="sm"
        />
        <Checkbox
          label="Systemic Risk Applicable?"
          checked={addSysRisk}
          onChange={e => setAddSysRisk(e.currentTarget.checked)}
          mb="sm"
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
          label="Applicable Roles"
          data={ROLES}
          value={editRoles}
          onChange={setEditRoles}
          required
          mb="sm"
        />
        <MultiSelect
          label="Risk Categories"
          data={RISK_CATEGORIES}
          value={editRisk}
          onChange={setEditRisk}
          required
          mb="sm"
        />
        <Checkbox
          label="GPAI Applicable?"
          checked={editGPAI}
          onChange={e => setEditGPAI(e.currentTarget.checked)}
          mb="sm"
        />
        <Checkbox
          label="Systemic Risk Applicable?"
          checked={editSysRisk}
          onChange={e => setEditSysRisk(e.currentTarget.checked)}
          mb="sm"
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
            <Table.Th>Applicable Roles</Table.Th>
            <Table.Th>Risk Categories</Table.Th>
            <Table.Th>GPAI?</Table.Th>
            <Table.Th>Systemic Risk?</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {notes.map((note, idx) => (
            <Table.Tr key={note.id}>
              <Table.Td>{note.id}</Table.Td>
              <Table.Td>{note.title}</Table.Td>
              <Table.Td>{note.description}</Table.Td>
              <Table.Td>{note.applicableRoles?.join(', ')}</Table.Td>
              <Table.Td>{note.riskCategory?.join(', ')}</Table.Td>
              <Table.Td>{note.isGPAIApplicable ? 'Yes' : 'No'}</Table.Td>
              <Table.Td>{note.hasSystemicRiskApplicable ? 'Yes' : 'No'}</Table.Td>
              <Table.Td>
                <Button size="xs" variant="light" mr={4} onClick={() => openEditModal(idx)}>Edit</Button>
                <Button size="xs" color="red" variant="light" onClick={() => openDeleteModal(idx)}>Delete</Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </div>
  );
} 