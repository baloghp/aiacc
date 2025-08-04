import { Box, Title, List, Text, Badge, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import notesData from "../../data/notes.json";
import { AssessmentState } from "@/entities/AssessmentManager";
import { Note } from "@/entities/Note";

interface AssessmentNotesListProps {
  assessmentState?: AssessmentState;
}

export default function AssessmentNotesList({ assessmentState }: AssessmentNotesListProps) {
  console.log('AssessmentNotesList component rendered with state:', assessmentState);
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);

  // Load notes from JSON
  useEffect(() => {
    setNotes(notesData);
  }, []);

  // Filter notes based on assessment state
  useEffect(() => {
    if (!assessmentState || notes.length === 0) {
      setFilteredNotes([]);
      return;
    }

    // Check if assessment has started (company and AI system have basic info)
    const hasAssessmentStarted = assessmentState.company.name.trim() !== "" && 
                               assessmentState.aiSystem.name.trim() !== "" && 
                               assessmentState.aiSystem.intendedPurpose.trim() !== "";

    if (!hasAssessmentStarted) {
      setFilteredNotes([]);
      return;
    }

    // Flatten activeTags from Record<string, string[]> to string[]
    const flattenedActiveTags = Object.values(assessmentState.activeTags).flat();
    
    const filtered = notes.filter(note => {
      // Tag-based filtering: note applies if any of its required tags are present in active tags
      if (note.requiredTags && note.requiredTags.length > 0) {
        const hasMatchingTag = note.requiredTags.some(requiredTag => 
          flattenedActiveTags.includes(requiredTag)
        );
        
        console.log(`Note ${note.id} tag filtering:`, {
          requiredTags: note.requiredTags,
          activeTags: flattenedActiveTags,
          hasMatchingTag
        });
        
        return hasMatchingTag;
      }
      
      // If no required tags are set, the note doesn't apply
      console.log(`Note ${note.id} has no required tags, not applicable`);
      return false;
    });

    setFilteredNotes(filtered);
  }, [assessmentState, notes]);

  return (
    <Box>
      <Title order={5} mb="sm">
        Advisory Notes
        {filteredNotes.length > 0 && (
          <Badge size="sm" ml="xs" color="green">
            {filteredNotes.length}
          </Badge>
        )}
      </Title>
      {filteredNotes.length > 0 ? (
        <List spacing="xs" size="sm">
          {filteredNotes.map((note) => (
            <List.Item key={note.id}>
              <Group gap="xs" align="flex-start">
                <Text fw={500} size="sm">{note.title}</Text>
              </Group>
              <Text size="sm" c="dimmed" mt={2}>{note.description}</Text>
              <Group gap="xs" mt={4}>
                {note.requiredTags && note.requiredTags.map(tag => (
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
          {assessmentState ? "No advisory notes match your current assessment criteria." : "Complete the assessment to see applicable notes."}
        </Text>
      )}
    </Box>
  );
} 