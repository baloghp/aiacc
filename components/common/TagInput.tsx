import { useState } from 'react';
import { Badge, Button, Group, Stack, TextInput } from '@mantine/core';

interface TagInputProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  placeholder?: string;
  label?: string;
}

export function TagInput({
  tags,
  onTagsChange,
  placeholder = 'Enter tag and click Add',
  label = 'Tags',
}: TagInputProps) {
  const [inputValue, setInputValue] = useState('');

  const addTag = () => {
    if (inputValue.trim() && !tags.includes(inputValue.trim())) {
      onTagsChange([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div>
      <Group mb="xs">
        <TextInput
          label={label}
          value={inputValue}
          onChange={(e) => setInputValue(e.currentTarget.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          style={{ flex: 1 }}
        />
        <Button onClick={addTag} variant="light" size="xs" mt={22}>
          Add Tag
        </Button>
      </Group>
      {tags.length > 0 && (
        <Stack mb="sm">
          {tags.map((tag) => (
            <Group key={tag} gap="xs">
              <Badge size="sm">{tag}</Badge>
              <Button size="xs" color="red" variant="subtle" onClick={() => removeTag(tag)}>
                Remove
              </Button>
            </Group>
          ))}
        </Stack>
      )}
    </div>
  );
}
