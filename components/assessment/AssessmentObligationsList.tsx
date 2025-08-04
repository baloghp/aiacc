import { Box, Title, List, Text, Badge, Group } from "@mantine/core";
import ReactMarkdown from 'react-markdown';
import { Obligation } from "@/entities/Obligation";

interface AssessmentObligationsListProps {
  obligations: Obligation[];
}

export default function AssessmentObligationsList({ obligations }: AssessmentObligationsListProps) {

  return (
    <Box>
      <Title order={5} mb="sm">
        Applicable Obligations 
        {obligations.length > 0 && (
          <Badge size="sm" ml="xs" color="blue">
            {obligations.length}
          </Badge>
        )}
      </Title>
      {obligations.length > 0 ? (
        <List spacing="xs" size="sm">
          {obligations.map((obligation) => (
            <List.Item key={obligation.id}>
              <Box>
                <Box mb="xs">
                  <ReactMarkdown>{`${obligation.article}:`}</ReactMarkdown>
                </Box>
                <Box>
                  <ReactMarkdown>{obligation.description}</ReactMarkdown>
                </Box>
              </Box>
              <Group gap="xs" mt={4}>
                {obligation.requiredTags && obligation.requiredTags.map((tag: string) => (
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
          No obligations match your current assessment criteria.
        </Text>
      )}
    </Box>
  );
} 