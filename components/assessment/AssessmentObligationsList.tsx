import { Box, Title, List, Text } from "@mantine/core";

export interface Obligation {
  id: string;
  article: string;
  description: string;
}

interface AssessmentObligationsListProps {
  obligations: Obligation[];
}

export default function AssessmentObligationsList({ obligations }: AssessmentObligationsListProps) {
  return (
    <Box>
      <Title order={5} mb="sm">Obligations</Title>
      {obligations.length > 0 ? (
        <List spacing="xs" size="sm">
          {obligations.map((o) => (
            <List.Item key={o.id}>
              <Text fw={500}>{o.article}: {o.description}</Text>
            </List.Item>
          ))}
        </List>
      ) : (
        <Text c="dimmed">No obligations found.</Text>
      )}
    </Box>
  );
} 