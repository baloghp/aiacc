import { IconBuilding } from '@tabler/icons-react';
import { Badge, Box, Group, Text, Title } from '@mantine/core';
import { Company } from '@/entities/Company';

interface AssessmentCompanySummaryProps {
  company: Company;
}

export default function AssessmentCompanySummary({ company }: AssessmentCompanySummaryProps) {
  const hasOptionalInfo =
    company.legalEntity ||
    company.location ||
    company.contactPerson ||
    company.stakeholders.length > 0 ||
    company.certifications.length > 0;

  return (
    <Box>
      <Group mb={8} gap={8}>
        <IconBuilding size={20} color="var(--mantine-color-blue-7)" />
        <Title order={5} fw={600}>
          Company Information
        </Title>
      </Group>

      <Text size="sm" mb="xs">
        This assessment is for <strong>{company.name}</strong>
        {hasOptionalInfo && ' with the following details:'}
      </Text>

      {hasOptionalInfo && (
        <Box ml="md">
          {company.legalEntity && (
            <Text size="sm" mb={4}>
              <strong>Legal Entity:</strong> {company.legalEntity}
            </Text>
          )}

          {company.location && (
            <Text size="sm" mb={4}>
              <strong>Location:</strong> {company.location}
            </Text>
          )}

          {company.contactPerson && (
            <Text size="sm" mb={4}>
              <strong>Contact Person:</strong> {company.contactPerson}
            </Text>
          )}

          {company.stakeholders.length > 0 && (
            <Box mb={4}>
              <Text size="sm" fw={500} mb={2}>
                Stakeholders:
              </Text>
              <Group gap={4}>
                {company.stakeholders.map((stakeholder, index) => (
                  <Badge key={index} size="xs" variant="light" color="blue">
                    {stakeholder}
                  </Badge>
                ))}
              </Group>
            </Box>
          )}

          {company.certifications.length > 0 && (
            <Box>
              <Text size="sm" fw={500} mb={2}>
                Certifications:
              </Text>
              <Group gap={4}>
                {company.certifications.map((certification, index) => (
                  <Badge key={index} size="xs" variant="light" color="green">
                    {certification}
                  </Badge>
                ))}
              </Group>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
}
