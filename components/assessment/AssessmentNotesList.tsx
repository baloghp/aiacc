import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Badge, Box, Group, List, Text, Title } from '@mantine/core';
import { Note } from '@/entities/Note';

interface AssessmentNotesListProps {
  notes: Note[];
}

export default function AssessmentNotesList({ notes }: AssessmentNotesListProps) {
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
                <Text fw={500} size="sm">
                  {note.title}
                </Text>
              </Group>
              <Box mt={2}>
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    a: ({ href, children, ...props }) => (
                      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
                        {children}
                      </a>
                    ),
                  }}
                >
                  {note.description}
                </ReactMarkdown>
              </Box>
              <Group gap="xs" mt={4}>
                {note.requiredTags &&
                  note.requiredTags.map((tag: string) => (
                    <Badge key={tag} size="xs" variant="light" color="blue">
                      {tag}
                    </Badge>
                  ))}
                {(note as any).requiredAllTags &&
                  (note as any).requiredAllTags.map((tag: string) => (
                    <Badge key={tag} size="xs" variant="light" color="green">
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
