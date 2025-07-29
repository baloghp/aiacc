import { Card, Title, Text, Group, Divider, List, Box, Badge, Stack, Center } from "@mantine/core";
import { IconAlertCircle, IconInfoCircle } from "@tabler/icons-react";
import AssessmentCompanySummary from "./AssessmentCompanySummary";
import AssessmentAISystemSummary from "./AssessmentAISystemSummary";
import AssessmentLegalDisclaimer from "./AssessmentLegalDisclaimer";
import { Company } from "@/entities/Company";
import { AISystem } from "@/entities/AISystem";

export interface Obligation {
  id: string;
  article: string;
  description: string;
}

export interface Note {
  id: string;
  title: string;
  description: string;
}

interface AssessmentResultsPanelProps {
  obligations: Obligation[];
  notes: Note[];
  company?: Company;
  aiSystem?: AISystem;
}

export default function AssessmentResultsPanel({ 
  obligations, 
  notes, 
  company, 
  aiSystem 
}: AssessmentResultsPanelProps) {
  const showCompanySummary = company && company.name;
  const showAISystemSummary = aiSystem && aiSystem.name;

  return (
    <Center mt="xxl">
      <Card shadow="lg" radius="md" p="xxl" w="100%">
        <Stack gap="md">
          <Box>
            <Title order={3} mb={4}>Assessment Results</Title>
            <Text c="dimmed" size="sm">
              Here are your currently applicable obligations and advisory notes based on your answers so far.
            </Text>
          </Box>
          
          <Divider my="sm" />
          
          {/* Company Summary */}
          {showCompanySummary && (
            <>
              <AssessmentCompanySummary company={company} />
              <Divider my="sm" />
            </>
          )}
          
          {/* AI System Summary */}
          {showAISystemSummary && (
            <>
              <AssessmentAISystemSummary aiSystem={aiSystem} />
              <Divider my="sm" />
            </>
          )}
          
          {/* Notes Section - Now First */}
          <Box>
            <Group mb={4} gap={8}>
              <IconInfoCircle size={20} color="var(--mantine-color-blue-7)" />
              <Title order={5} fw={600}>Notes</Title>
              <Badge color="blue" variant="light">{notes.length}</Badge>
            </Group>
            {notes.length > 0 ? (
              <List spacing="xs" size="sm" icon={<IconInfoCircle size={16} color="var(--mantine-color-blue-7)" />}>
                {notes.map((n) => (
                  <List.Item key={n.id}>
                    <Text fw={500}>{n.title}</Text>
                    <Text size="sm" c="dimmed">{n.description}</Text>
                  </List.Item>
                ))}
              </List>
            ) : (
              <Text c="dimmed" size="sm">No notes found yet.</Text>
            )}
          </Box>
          
          <Divider my="sm" />
          
          {/* Obligations Section - Now Second */}
          <Box>
            <Group mb={4} gap={8}>
              <IconAlertCircle size={20} color="var(--mantine-color-yellow-7)" />
              <Title order={5} fw={600}>Obligations</Title>
              <Badge color="yellow" variant="light">{obligations.length}</Badge>
            </Group>
            {obligations.length > 0 ? (
              <List spacing="xs" size="sm" icon={<IconAlertCircle size={16} color="var(--mantine-color-yellow-7)" />}>
                {obligations.map((o) => (
                  <List.Item key={o.id}>
                    <Text fw={500}>{o.article}: {o.description}</Text>
                  </List.Item>
                ))}
              </List>
            ) : (
              <Text c="dimmed" size="sm">No obligations found yet.</Text>
            )}
          </Box>
          
          {/* Legal Disclaimer */}
          <AssessmentLegalDisclaimer />
        </Stack>
      </Card>
    </Center>
  );
} 