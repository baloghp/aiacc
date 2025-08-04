import { Box, Title, List, Text, Badge, Group } from "@mantine/core";
import { Note } from "@/entities/Note";

interface AssessmentNotesListProps {
  notes: Note[];
}

export default function AssessmentNotesList({ notes }: AssessmentNotesListProps) {
  console.log('AssessmentNotesList component rendered with notes:', notes);

  return (
    <Box>
      <Title order={5} mb="sm">
        Advisory Notes
        {notes.length > 0 && (
          <Badge size="sm" ml="xs" color="green">
            {notes.length}
          </Badge>
        )}
      </Title>
      {notes.length > 0 ? (
        <List spacing="xs" size="sm">
          {notes.map((note) => (
            <List.Item key={note.id}>
              <Group gap="xs" align="flex-start">
                <Text fw={500} size="sm">{note.title}</Text>
              </Group>
              <Text size="sm" c="dimmed" mt={2}>{note.description}</Text>
              <Group gap="xs" mt={4}>
                {note.requiredTags && note.requiredTags.map((tag: string) => (
                  <Badge key={tag} size="xs" variant="light" color="blue">
                    {tag}
                  </Badge>
                ))}
              </Group>
            </List.Item>
          ))}
        </List>
      ) : (
        <Text c="dimmed" size="sm">
          No advisory notes match your current assessment criteria.
        </Text>
      )}
    </Box>
  );
} 