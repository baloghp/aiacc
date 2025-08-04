import { TextInput, Textarea, Select, Group, Stack, Button, NumberInput, MultiSelect } from '@mantine/core';
import { useState, useEffect } from 'react';
import { ModalWrapper } from '../common/ModalWrapper';
import { useFormValidation } from '../../hooks/useFormValidation';
import tagsData from '../../data/tags.json';
import { Tag } from '../../entities/Tag';

interface QuestionOption {
  value: string;
  label: string;
}

interface QuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (question: any) => void;
  question?: any; // For editing
}

export function QuestionModal({ isOpen, onClose, onSubmit, question }: QuestionModalProps) {
  const [id, setId] = useState('');
  const [text, setText] = useState('');
  const [order, setOrder] = useState(1);
  const [type, setType] = useState<'yesNo' | 'multipleChoice' | 'singleChoice'>('yesNo');
  const [options, setOptions] = useState<QuestionOption[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [optionLabel, setOptionLabel] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [dependencies, setDependencies] = useState<string[]>([]);
  const { errors, validate, clearErrors } = useFormValidation();

  // Tag options from catalog
  const tagOptions = (tagsData as Tag[]).map(tag => ({
    value: tag.id,
    label: `${tag.id} - ${tag.description}`
  })).filter(option => option.value && option.label);

  useEffect(() => {
    if (question) {
      setId(question.id);
      setText(question.text);
      setOrder(question.order || 1);
      setType(question.type);
      setOptions(question.options || []);
      // For choice questions, don't set tags from the question
      // For Yes/No questions, use the tags from the question
      if (question.type === 'yesNo') {
        setTags(question.tags || []);
      } else {
        setTags([]);
      }
      setDependencies(question.dependencies || []);
    } else {
      setId('');
      setText('');
      setOrder(1);
      setType('yesNo');
      setOptions([]);
      setSelectedTags([]);
      setTags([]);
      setDependencies([]);
    }
    clearErrors();
  }, [question, clearErrors]);

  const addOption = () => {
    if (selectedTags.length > 0 && optionLabel.trim()) {
      const optionValue = selectedTags.join(',');
      if (!options.some(opt => opt.value === optionValue)) {
        setOptions([...options, { value: optionValue, label: optionLabel.trim() }]);
        setSelectedTags([]);
        setOptionLabel('');
      }
    }
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    const data = { id, text, order };
    const rules = {
      id: [
        { test: (value: string) => value.trim().length > 0, message: 'ID is required' }
      ],
      text: [
        { test: (value: string) => value.trim().length > 0, message: 'Text is required' }
      ],
      order: [
        { test: (value: number) => value > 0, message: 'Order must be greater than 0' }
      ]
    };

    if (validate(data, rules)) {
      const newQuestion: any = {
        id: id.trim(),
        text: text.trim(),
        order,
        type,
        dependencies: dependencies.length > 0 ? dependencies : undefined,
      };

      if (type === 'multipleChoice' || type === 'singleChoice') {
        newQuestion.options = options;
        newQuestion.allowMultiple = type === 'multipleChoice';
        // For choice questions, use option values as tags
        newQuestion.tags = options.map(opt => opt.value);
      } else if (type === 'yesNo') {
        // For Yes/No questions, use manually entered tags
        newQuestion.tags = tags.length > 0 ? tags : undefined;
      }

      onSubmit(newQuestion);
      onClose();
    }
  };

  return (
    <ModalWrapper
      isOpen={isOpen}
      onClose={onClose}
      title={question ? 'Edit Question' : 'Add Question'}
      onSubmit={handleSubmit}
      submitText={question ? 'Save Changes' : 'Add Question'}
      size="xl"
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
        onChange={(v: string | number) => setOrder(typeof v === 'number' && !isNaN(v) ? v : 1)}
        min={1}
        required
        mb="sm"
      />
      <Textarea
        label="Text (Markdown supported)"
        value={text}
        onChange={(e) => setText(e.currentTarget.value)}
        required
        mb="sm"
        minRows={3}
        autosize
        error={errors.text}
      />
      <Select
        label="Type"
        value={type}
        onChange={(v) => setType((v as any) || 'yesNo')}
        data={[
          { value: 'yesNo', label: 'Yes/No' },
          { value: 'multipleChoice', label: 'Multiple Choice' },
          { value: 'singleChoice', label: 'Single Choice' },
        ]}
        required
        mb="sm"
      />
      {(type === 'multipleChoice' || type === 'singleChoice') && (
        <>
          <Group mb="xs">
            <MultiSelect
              label="Option Tags"
              data={tagOptions || []}
              value={selectedTags}
              onChange={setSelectedTags}
              searchable
              style={{ flex: 1 }}
              placeholder="Select tags for this option"
            />
            <TextInput
              label="Option Label"
              value={optionLabel}
              onChange={(e) => setOptionLabel(e.currentTarget.value)}
              style={{ flex: 2 }}
            />
            <Button onClick={addOption} variant="light" size="xs" mt={22}>
              Add Option
            </Button>
          </Group>
          {selectedTags.length > 0 && (
            <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '8px' }}>
              <strong>Preview:</strong> {selectedTags.join(', ')}
            </div>
          )}
          <Stack mb="sm">
            {options.map((opt, idx) => (
              <Group key={opt.value} gap="xs">
                <MultiSelect
                  data={tagOptions || []}
                  value={opt.value.split(',').filter(tag => tag.trim())}
                  onChange={(newTags) => {
                    const updatedOptions = [...options];
                    updatedOptions[idx] = {
                      ...updatedOptions[idx],
                      value: newTags.join(',')
                    };
                    setOptions(updatedOptions);
                  }}
                  searchable
                  style={{ flex: 1 }}
                  placeholder="Select tags"
                />
                <div style={{ flex: 2 }}>{opt.label}</div>
                <Button size="xs" color="red" variant="subtle" onClick={() => removeOption(idx)}>
                  Remove
                </Button>
              </Group>
            ))}
          </Stack>
        </>
      )}
      {/* Only show tags input for Yes/No questions */}
      {type === 'yesNo' && (
        <>
          <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '8px' }}>
            For Yes/No questions, select tags that will be set when the answer is "Yes".
          </div>
          <MultiSelect
            label="Tags"
            data={tagOptions || []}
            value={tags || []}
            onChange={setTags}
            searchable
            mb="sm"
            placeholder="Select tags from catalog"
          />
        </>
      )}
      
      {/* Show info for choice questions */}
      {(type === 'multipleChoice' || type === 'singleChoice') && (
        <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '8px' }}>
          For choice questions, select tags for each option. The selected tags will be set when this option is chosen.
        </div>
      )}

      {/* Dependencies field */}
      <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '8px' }}>
        Dependencies: Tags that must be present in the assessment state for this question to be shown.
      </div>
      <MultiSelect
        label="Dependencies"
        data={tagOptions || []}
        value={dependencies || []}
        onChange={setDependencies}
        searchable
        mb="sm"
        placeholder="Select dependency tags from catalog"
      />
    </ModalWrapper>
  );
} 