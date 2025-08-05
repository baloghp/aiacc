'use client';

import { useState, useEffect } from 'react';
import { Card, Group, Text, Stack, Title, Grid, Paper, Badge, Accordion } from '@mantine/core';
import { IconQuestionMark, IconNotes, IconFileDescription, IconGavel, IconTag } from '@tabler/icons-react';
import questionsData from '../data/questions.json';
import notesData from '../data/notes.json';
import obligationsData from '../data/obligations.json';
import rulesData from '../data/rules.json';
import { analyzeTagUsage, TagUsageAnalysis } from '../utils/tagAnalysis';

interface DashboardStats {
  questionGroups: number;
  questions: number;
  notes: number;
  obligations: number;
  rules: number;
  tags: number;
  tagAnalysis: TagUsageAnalysis;
}

export default function SetupDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    questionGroups: 0,
    questions: 0,
    notes: 0,
    obligations: 0,
    rules: 0,
    tags: 0,
    tagAnalysis: {
      totalTags: 0,
      unusedTags: [],
      unusedTagsCount: 0,
      questionUnusedTags: [],
      questionUnusedTagsCount: 0,
      noteUnusedTags: [],
      noteUnusedTagsCount: 0,
      obligationUnusedTags: [],
      obligationUnusedTagsCount: 0,
      ruleUsedTags: [],
      ruleUsedTagsCount: 0,
    },
  });

  useEffect(() => {
    // Count question groups (items with "id" starting with "qg-")
    const questionGroups = questionsData.filter((item: any) => 
      item.id && item.id.startsWith('qg-')
    ).length;
    
    // Count total questions
    const questions = questionsData.reduce((total: number, item: any) => {
      if (item.questions && Array.isArray(item.questions)) {
        return total + item.questions.length;
      }
      return total;
    }, 0);

    // Analyze tag usage
    const tagAnalysis = analyzeTagUsage();

    setStats({
      questionGroups,
      questions,
      notes: notesData.length,
      obligations: obligationsData.length,
      rules: rulesData.length,
      tags: tagAnalysis.totalTags,
      tagAnalysis,
    });
  }, []);

  const statCards = [
    {
      title: 'Question Groups',
      value: stats.questionGroups,
      icon: IconQuestionMark,
      color: 'blue',
      description: 'Total question groups in the system',
    },
    {
      title: 'Questions',
      value: stats.questions,
      icon: IconQuestionMark,
      color: 'cyan',
      description: 'Total individual questions',
    },
    {
      title: 'Notes',
      value: stats.notes,
      icon: IconNotes,
      color: 'green',
      description: 'Total informational notes',
    },
    {
      title: 'Obligations',
      value: stats.obligations,
      icon: IconFileDescription,
      color: 'orange',
      description: 'Total compliance obligations',
    },
    {
      title: 'Rules',
      value: stats.rules,
      icon: IconGavel,
      color: 'red',
      description: 'Total business rules',
    },
    {
      title: 'Tags',
      value: stats.tags,
      icon: IconTag,
      color: 'violet',
      description: 'Total tags in the system',
    },
  ];

  return (
    <Stack gap="lg">
      <Title order={2} mb="md">System Dashboard</Title>
      
      <Grid>
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
              <Paper shadow="sm" p="md" radius="md">
                <Group justify="space-between" align="flex-start">
                  <div style={{ flex: 1 }}>
                    <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                      {stat.title}
                    </Text>
                    <Text size="xl" fw={700} mt={4}>
                      {stat.value}
                    </Text>
                    <Text size="xs" c="dimmed" mt={4}>
                      {stat.description}
                    </Text>
                  </div>
                  <Icon size={24} color={`var(--mantine-color-${stat.color}-6)`} />
                </Group>
              </Paper>
            </Grid.Col>
          );
        })}
      </Grid>

    

      <Card shadow="sm" p="lg" radius="md" mt="lg">
        <Title order={3} mb="md">Tag Usage Analysis</Title>
        <Accordion>
          <Accordion.Item value="unused-tags">
            <Accordion.Control>
              <Group>
                <Text>Unused Tags ({stats.tagAnalysis.unusedTagsCount})</Text>
                <Badge color="red" size="sm">Unused</Badge>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Text size="sm" mb="md">Tags that are not referenced anywhere in the system:</Text>
              <Group gap="xs">
                {stats.tagAnalysis.unusedTags.map((tag, index) => (
                  <Badge key={index} color="red" variant="light">
                    {tag}
                  </Badge>
                ))}
              </Group>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="question-unused-tags">
            <Accordion.Control>
              <Group>
                <Text>Tags Unused in Questions ({stats.tagAnalysis.questionUnusedTagsCount})</Text>
                <Badge color="orange" size="sm">Unused in Questions</Badge>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Text size="sm" mb="md">Tags that are not referenced in any question (tags, options, or dependencies):</Text>
              <Group gap="xs">
                {stats.tagAnalysis.questionUnusedTags.map((tag, index) => (
                  <Badge key={index} color="orange" variant="light">
                    {tag}
                  </Badge>
                ))}
              </Group>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="note-unused-tags">
            <Accordion.Control>
              <Group>
                <Text>Tags Unused in Notes ({stats.tagAnalysis.noteUnusedTagsCount})</Text>
                <Badge color="yellow" size="sm">Unused in Notes</Badge>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Text size="sm" mb="md">Tags that are not referenced in any note (requiredTags or requiredAllTags):</Text>
              <Group gap="xs">
                {stats.tagAnalysis.noteUnusedTags.map((tag, index) => (
                  <Badge key={index} color="yellow" variant="light">
                    {tag}
                  </Badge>
                ))}
              </Group>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="obligation-unused-tags">
            <Accordion.Control>
              <Group>
                <Text>Tags Unused in Obligations ({stats.tagAnalysis.obligationUnusedTagsCount})</Text>
                <Badge color="blue" size="sm">Unused in Obligations</Badge>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Text size="sm" mb="md">Tags that are not referenced in any obligation (requiredTags or requiredAllTags):</Text>
              <Group gap="xs">
                {stats.tagAnalysis.obligationUnusedTags.map((tag, index) => (
                  <Badge key={index} color="blue" variant="light">
                    {tag}
                  </Badge>
                ))}
              </Group>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="rule-used-tags">
            <Accordion.Control>
              <Group>
                <Text>Tags Used in Rules ({stats.tagAnalysis.ruleUsedTagsCount})</Text>
                <Badge color="green" size="sm">Used in Rules</Badge>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Text size="sm" mb="md">Tags that are referenced in rules (inputTags or outputTags):</Text>
              <Group gap="xs">
                {stats.tagAnalysis.ruleUsedTags.map((tag, index) => (
                  <Badge key={index} color="green" variant="light">
                    {tag}
                  </Badge>
                ))}
              </Group>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Card>
    </Stack>
  );
} 