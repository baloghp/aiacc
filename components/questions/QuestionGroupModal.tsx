import { useEffect, useState } from 'react';
import { NumberInput, Select, TextInput } from '@mantine/core';
import { AssessmentPhase } from '../../entities/enums';
import { useFormValidation } from '../../hooks/useFormValidation';
import { ModalWrapper } from '../common/ModalWrapper';

interface QuestionGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (group: any) => void;
  group?: any; // For editing
}

export function QuestionGroupModal({ isOpen, onClose, onSubmit, group }: QuestionGroupModalProps) {
  const [id, setId] = useState('');
  const [order, setOrder] = useState(1);
  const [phase, setPhase] = useState('');
  const { errors, validate, clearErrors } = useFormValidation();

  // Create phase options for the dropdown
  const phaseOptions = Object.values(AssessmentPhase).map((phase) => ({
    value: phase,
    label: phase,
  }));

  useEffect(() => {
    if (group) {
      setId(group.id);
      setOrder(group.order);
      setPhase(group.phase);
    } else {
      setId('');
      setOrder(1);
      setPhase('');
    }
    clearErrors();
  }, [group, clearErrors]);

  const handleSubmit = () => {
    const data = { id, order, phase };
    const rules = {
      id: [{ test: (value: string) => value.trim().length > 0, message: 'ID is required' }],
      phase: [{ test: (value: string) => value.trim().length > 0, message: 'Phase is required' }],
    };

    if (validate(data, rules)) {
      onSubmit({
        id: id.trim(),
        order,
        phase: phase.trim(),
        questions: group?.questions || [],
        isComplete: false,
      });
      onClose();
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={group ? 'Edit QuestionGroup' : 'Add QuestionGroup'}
      onSubmit={handleSubmit}
      submitText={group ? 'Save Changes' : 'Add'}
    >
      <TextInput
        label="ID"
        value={id}
        onChange={(e) => setId(e.currentTarget.value)}
        required
        mb="sm"
        error={errors.id}
      />
      <NumberInput
        label="Order"
        value={order}
        onChange={(v) => setOrder(typeof v === 'number' && !isNaN(v) ? v : 1)}
        min={1}
        required
        mb="sm"
      />
      <Select
        label="Phase"
        value={phase}
        onChange={(v) => setPhase(v || '')}
        data={phaseOptions}
        required
        mb="sm"
        error={errors.phase}
      />
    </ModalWrapper>
  );
}
