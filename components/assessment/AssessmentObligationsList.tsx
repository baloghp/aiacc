import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Badge, Box, Group, List, Text, Title } from '@mantine/core';
import { Obligation } from '@/entities/Obligation';

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
                    {`${obligation.article}:`}
                  </ReactMarkdown>
                </Box>
                <Box>
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
                    {obligation.description}
                  </ReactMarkdown>
                </Box>
              </Box>
              <Group gap="xs" mt={4}>
                {obligation.requiredTags &&
                  obligation.requiredTags.map((tag: string) => (
                    <Badge key={tag} size="xs" variant="light" color="blue">
                      {tag}
                    </Badge>
                  ))}
                {(obligation as any).requiredAllTags &&
                  (obligation as any).requiredAllTags.map((tag: string) => (
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
          No obligations match your current assessment criteria.
        </Text>
      )}
    </Box>
  );
}
