import { Table, Button, ActionIcon, Group, Badge } from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import { useState } from 'react';

interface QuestionGroupsTableProps {
  questionGroups: any[];
  onEditGroup: (group: any) => void;
  onDeleteGroup: (groupId: string) => void;
  onAddQuestion: (groupId: string) => void;
  onEditQuestion: (groupId: string, question: any) => void;
  onDeleteQuestion: (groupId: string, questionId: string) => void;
}

export function QuestionGroupsTable({ 
  questionGroups, 
  onEditGroup, 
  onDeleteGroup, 
  onAddQuestion, 
  onEditQuestion, 
  onDeleteQuestion 
}: QuestionGroupsTableProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleExpand = (groupId: string) => {
    setExpanded(expanded === groupId ? null : groupId);
  };

  return (
    <Table striped>
      <Table.Thead>
        <Table.Tr>
          <Table.Th style={{ width: 40 }} />
          <Table.Th>ID</Table.Th>
          <Table.Th>Order</Table.Th>
          <Table.Th>Phase</Table.Th>
          <Table.Th>Questions</Table.Th>
          <Table.Th>Actions</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {questionGroups.map((group: any, _idx: number) => [
          <Table.Tr key={group.id}>
            <Table.Td>
              <ActionIcon
                variant="subtle"
                onClick={(e) => { e.stopPropagation(); handleExpand(group.id); }}
                aria-label={expanded === group.id ? 'Collapse' : 'Expand'}
              >
                {expanded === group.id ? <IconChevronDown size={18} /> : <IconChevronRight size={18} />}
              </ActionIcon>
            </Table.Td>
            <Table.Td>{group.id}</Table.Td>
            <Table.Td>{group.order}</Table.Td>
            <Table.Td>{group.phase}</Table.Td>
            <Table.Td>{group.questions.length}</Table.Td>
            <Table.Td>
              <Button size="xs" variant="light" mr={4} onClick={() => onEditGroup(group)}>Edit</Button>
              <Button size="xs" color="red" variant="light" onClick={() => onDeleteGroup(group.id)}>Delete</Button>
            </Table.Td>
          </Table.Tr>,
          expanded === group.id && (
            <Table.Tr key={`${group.id}-questions`}>
              <Table.Td colSpan={6} style={{ padding: 0 }}>
                <Button size="xs" mb="xs" onClick={() => onAddQuestion(group.id)}>
                  Add Question
                </Button>
                <Table withColumnBorders striped={false} style={{ margin: 0 }}>
                                     <Table.Thead>
                                           <Table.Tr>
                        <Table.Th>Order</Table.Th>
                        <Table.Th>ID</Table.Th>
                        <Table.Th>Text</Table.Th>
                        <Table.Th>Type</Table.Th>
                        <Table.Th>Options</Table.Th>
                        <Table.Th>Tags</Table.Th>
                        <Table.Th>Dependencies</Table.Th>
                        <Table.Th>Actions</Table.Th>
                      </Table.Tr>
                   </Table.Thead>
                  <Table.Tbody>
                                         {group.questions.map((q: any, _qIdx: number) => (
                       <Table.Tr key={q.id}>
                         <Table.Td>{q.order || 1}</Table.Td>
                         <Table.Td>{q.id}</Table.Td>
                         <Table.Td>{q.text}</Table.Td>
                         <Table.Td>{q.type}</Table.Td>
                        <Table.Td>
                          {(q.type === 'multipleChoice' || q.type === 'singleChoice') && q.options && q.options.length > 0
                            ? q.options.map((opt: any) => opt.label).join(', ')
                            : '-'}
                        </Table.Td>
                                                 <Table.Td>
                           {(() => {
                             let displayTags: string[] = [];
                             if (q.type === 'yesNo') {
                               displayTags = q.tags || [];
                             } else if ((q.type === 'multipleChoice' || q.type === 'singleChoice') && q.options) {
                               displayTags = q.options.map((opt: any) => opt.value);
                             }
                             
                             return displayTags.length > 0 ? (
                               <Group gap={4}>
                                 {displayTags.map((tag: string) => (
                                   <Badge key={tag} size="xs" variant="light">
                                     {tag}
                                   </Badge>
                                 ))}
                               </Group>
                             ) : '-';
                           })()}
                         </Table.Td>
                         <Table.Td>
                           {q.dependencies && q.dependencies.length > 0 ? (
                             <Group gap={4}>
                               {q.dependencies.map((dep: string) => (
                                 <Badge key={dep} size="xs" variant="light" color="orange">
                                   {dep}
                                 </Badge>
                               ))}
                             </Group>
                           ) : '-'}
                         </Table.Td>
                        <Table.Td>
                          <Button size="xs" variant="light" mr={4} onClick={() => onEditQuestion(group.id, q)}>Edit</Button>
                          <Button size="xs" color="red" variant="light" onClick={() => onDeleteQuestion(group.id, q.id)}>Delete</Button>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              </Table.Td>
            </Table.Tr>
          )
        ])}
      </Table.Tbody>
    </Table>
  );
} 