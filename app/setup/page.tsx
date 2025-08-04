"use client";
import { Tabs, Alert, Center, Text } from '@mantine/core';
import { IconLock } from '@tabler/icons-react';
import QuestionsCRUD from '../../components/QuestionsCRUD';
import ObligationsCRUD from '../../components/ObligationsCRUD';
import NotesCRUD from '../../components/NotesCRUD';
import TagsCRUD from '../../components/TagsCRUD';

export default function SetupPage() {
  // Check if the setup access is enabled via environment variable
  const isSetupEnabled = process.env.NEXT_PUBLIC_SETUP_ENABLED === 'true';

  if (!isSetupEnabled) {
    return (
      <Center style={{ minHeight: '50vh' }}>
        <Alert 
          icon={<IconLock size={16} />} 
          title="Access Denied" 
          color="red"
          style={{ maxWidth: 500 }}
        >
          <Text size="sm" mb="md">
            The setup page is not available in this environment.
          </Text>

        </Alert>
      </Center>
    );
  }

  return (
    <Tabs defaultValue="questions">
      <Tabs.List>
        <Tabs.Tab value="questions">Questions</Tabs.Tab>
        <Tabs.Tab value="obligations">Obligations</Tabs.Tab>
        <Tabs.Tab value="notes">Notes</Tabs.Tab>
        <Tabs.Tab value="tags">Tags</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="questions">
        
        <QuestionsCRUD /> 
      </Tabs.Panel>
      <Tabs.Panel value="obligations">
        
        <ObligationsCRUD /> 
      </Tabs.Panel>
      <Tabs.Panel value="notes">
         <NotesCRUD /> 
      </Tabs.Panel>
      <Tabs.Panel value="tags">
         <TagsCRUD /> 
      </Tabs.Panel>
    </Tabs>
  );
} 