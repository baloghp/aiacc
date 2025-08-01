import { Box, Title, List, Text, Badge, Group } from "@mantine/core";
import { useEffect, useState } from "react";
import obligationsData from "../../data/obligations.json";
import { AssessmentState } from "@/entities/AssessmentManager";
import { Obligation } from "@/entities/Obligation";

interface AssessmentObligationsListProps {
  assessmentState?: AssessmentState;
}

export default function AssessmentObligationsList({ assessmentState }: AssessmentObligationsListProps) {
  console.log('AssessmentObligationsList component rendered with state:', assessmentState);
  const [obligations, setObligations] = useState<Obligation[]>([]);
  const [filteredObligations, setFilteredObligations] = useState<Obligation[]>([]);

  // Load obligations from JSON
  useEffect(() => {
    console.log('Loading obligations from JSON:', obligationsData);
    setObligations(obligationsData);
  }, []);

  // Filter obligations based on assessment state
  useEffect(() => {
    console.log('AssessmentObligationsList filtering with state:', assessmentState);
    console.log('Available obligations:', obligations.length);
    
    if (!assessmentState || obligations.length === 0) {
      console.log('No assessment state or obligations, clearing filtered');
      setFilteredObligations([]);
      return;
    }

    // Check if assessment has started (company and AI system have basic info)
    const hasAssessmentStarted = assessmentState.company.name.trim() !== "" && 
                               assessmentState.aiSystem.name.trim() !== "" && 
                               assessmentState.aiSystem.intendedPurpose.trim() !== "";

    console.log('Assessment started check:', {
      companyName: assessmentState.company.name,
      aiSystemName: assessmentState.aiSystem.name,
      intendedPurpose: assessmentState.aiSystem.intendedPurpose,
      hasAssessmentStarted
    });

    if (!hasAssessmentStarted) {
      console.log('Assessment not started yet, clearing filtered');
      setFilteredObligations([]);
      return;
    }

    const filtered = obligations.filter(obligation => {
      // Tag-based filtering: obligation applies if any of its required tags are present in active tags
      if (obligation.requiredTags && obligation.requiredTags.length > 0) {
        const hasMatchingTag = obligation.requiredTags.some(requiredTag => 
          assessmentState.activeTags.includes(requiredTag)
        );
        
        console.log(`Obligation ${obligation.id} tag filtering:`, {
          requiredTags: obligation.requiredTags,
          activeTags: assessmentState.activeTags,
          hasMatchingTag
        });
        
        return hasMatchingTag;
      }
      
      // If no required tags are set, the obligation doesn't apply
      console.log(`Obligation ${obligation.id} has no required tags, not applicable`);
      return false;
    });

    setFilteredObligations(filtered);
  }, [assessmentState, obligations]);

  return (
    <Box>
      <Title order={5} mb="sm">
        Applicable Obligations 
        {filteredObligations.length > 0 && (
          <Badge size="sm" ml="xs" color="blue">
            {filteredObligations.length}
          </Badge>
        )}
      </Title>
      {filteredObligations.length > 0 ? (
        <List spacing="xs" size="sm">
          {filteredObligations.map((obligation) => (
            <List.Item key={obligation.id}>
              <Group gap="xs" align="flex-start">
                <Text fw={500} size="sm">{obligation.article}:</Text>
                <Text size="sm" style={{ flex: 1 }}>{obligation.description}</Text>
              </Group>
              <Group gap="xs" mt={4}>
                {obligation.requiredTags && obligation.requiredTags.map(tag => (
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
          {assessmentState ? "No obligations match your current assessment criteria." : "Complete the assessment to see applicable obligations."}
        </Text>
      )}
    </Box>
  );
} 