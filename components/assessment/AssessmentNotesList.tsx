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

    const filtered = notes.filter(note => {
      // Check if any of the user's roles match the note's applicable roles
      const hasMatchingRole = assessmentState.roleAssignment.roles.some(userRole => 
        note.applicableRoles.includes(userRole)
      );

      // Check if the risk level matches
      const hasMatchingRisk = note.riskCategory.includes(assessmentState.riskClassification.riskLevel);

      // Check GPAI applicability
      const gpaIMatches = !note.isGPAIApplicable || 
        (note.isGPAIApplicable && assessmentState.riskClassification.isGPAI);

      // Check systemic risk applicability
      const systemicRiskMatches = !note.hasSystemicRiskApplicable || 
        (note.hasSystemicRiskApplicable && assessmentState.riskClassification.hasSystemicRisk);

      // Apply OR logic: note applies if ANY of the conditions match
      return hasMatchingRole || hasMatchingRisk || gpaIMatches || systemicRiskMatches;
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
                {note.applicableRoles.map(role => (
                  <Badge key={role} size="xs" variant="light" color="blue">
                    {role}
                  </Badge>
                ))}
                {note.riskCategory.map(risk => (
                  <Badge key={risk} size="xs" variant="light" color="orange">
                    {risk}
                  </Badge>
                ))}
                {note.isGPAIApplicable && (
                  <Badge size="xs" variant="light" color="purple">
                    GPAI
                  </Badge>
                )}
                {note.hasSystemicRiskApplicable && (
                  <Badge size="xs" variant="light" color="red">
                    Systemic Risk
                  </Badge>
                )}
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