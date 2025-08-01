import { Button, Title, Text, Box, Grid, Card, Group, Image, Paper } from "@mantine/core";
import { IconShieldCheck, IconGavel, IconWorld, IconUsers, IconBrandGithub } from '@tabler/icons-react';
import classes from './AssessmentIntroStep.module.css';

export type StepNavProps = {
  nextStep?: () => void;
};

export default function AssessmentIntroStep({ nextStep }: StepNavProps) {
  return (
    <Box>
      {/* Hero Section */}
      <Box ta="center" mb="xl">
        <Box mb="md">
          <Image 
            src="/ITTD_1.svg" 
            alt="ITTD Logo" 
            width={60}
            height={60}
            mx="auto" 
            mb="sm"
            className={classes.logo}
          />
          <Title order={1} size="2.5rem">
            AI Act Compliance Checker
          </Title>
        </Box>
        
      </Box>

      {/* Key Benefits */}
      <Grid mb="xl">
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
            <Group mb="md">
              <IconWorld size="2rem" color="var(--mantine-color-blue-6)" />
              <Text fw={600} size="lg">EU AI Act</Text>
            </Group>
            <Text size="sm" c="dimmed" lh={1.5}>
              The EU AI Act is a landmark regulation guiding the responsible development and use of artificial intelligence across Europe and beyond. Understanding your compliance obligations from the outset protects your organization, your users, and our society as AI systems become increasingly powerful and pervasive.
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
            <Group mb="md">
              <IconUsers size="2rem" color="var(--mantine-color-green-6)" />
              <Text fw={600} size="lg">Step-by-Step</Text>
            </Group>
            <Text size="sm" c="dimmed" lh={1.5}>
              This wizard will guide you step-by-step through a preliminary assessment. By answering a few targeted questions, you'll discover which obligations may apply to your AI system and receive actionable advisory notes—customized based on your responses so far.
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
            <Group mb="md">
              <IconBrandGithub size="2rem" color="var(--mantine-color-violet-6)" />
              <Text fw={600} size="lg">Open Source</Text>
            </Group>
            <Text size="sm" c="dimmed" lh={1.5}>
              This platform is a free and open source initiative. Our mission is to democratize access to AI compliance expertise and support organizations of all sizes in their responsible AI journey. At the end of the wizard, you'll have the option to export your results for internal use or sharing with compliance stakeholders.
            </Text>
          </Card>
        </Grid.Col>
      </Grid>

      {/* Trust Indicators */}
      <Box mb="xl">
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Group gap="sm" mb="sm">
              <IconShieldCheck size="1.25rem" color="var(--mantine-color-green-6)" />
              <Text size="sm" fw={500}>100% Private & Secure</Text>
            </Group>
            <Text size="xs" c="dimmed" ml="2.25rem">
              All data processed locally in your browser. Nothing stored on our servers.
            </Text>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Group gap="sm" mb="sm">
              <IconGavel size="1.25rem" color="var(--mantine-color-yellow-6)" />
              <Text size="sm" fw={500}>Legal Disclaimer</Text>
            </Group>
            <Text size="xs" c="dimmed" ml="2.25rem">
              General guidance only. Consult legal professionals or visit <a href="https://ittd.space" target="_blank" rel="noopener noreferrer">ittd.space</a> for specific advice.
            </Text>
          </Grid.Col>
        </Grid>
      </Box>

      {/* CTA Section */}
      <Paper ta="center" p="lg" withBorder>
         <Button size="md" onClick={nextStep}>
          Begin Assessment
        </Button>
      </Paper>
    </Box>
  );
} 