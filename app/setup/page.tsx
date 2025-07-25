"use client";
import { Tabs } from '@mantine/core';
import QuestionsCRUD from '../../components/QuestionsCRUD';
import ObligationsCRUD from '../../components/ObligationsCRUD';
import NotesCRUD from '../../components/NotesCRUD';

export default function SetupPage() {
  return (
    <Tabs defaultValue="questions">
      <Tabs.List>
        <Tabs.Tab value="questions">Questions</Tabs.Tab>
        <Tabs.Tab value="obligations">Obligations</Tabs.Tab>
        <Tabs.Tab value="notes">Notes</Tabs.Tab>
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
    </Tabs>
  );
} 