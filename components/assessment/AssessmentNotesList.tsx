import { Box, Title, List, Text } from "@mantine/core";

export interface Note {
  id: string;
  title: string;
  description: string;
}

interface AssessmentNotesListProps {
  notes: Note[];
}

export default function AssessmentNotesList({ notes }: AssessmentNotesListProps) {
  return (
    <Box>
      <Title order={5} mb="sm">Notes</Title>
      {notes.length > 0 ? (
        <List spacing="xs" size="sm">
          {notes.map((n) => (
            <List.Item key={n.id}>
              <Text fw={500}>{n.title}</Text>
              <Text size="sm" c="dimmed">{n.description}</Text>
            </List.Item>
          ))}
        </List>
      ) : (
        <Text c="dimmed">No notes found.</Text>
      )}
    </Box>
  );
} 