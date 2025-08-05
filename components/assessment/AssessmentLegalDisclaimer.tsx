import { IconAlertTriangle } from '@tabler/icons-react';
import { Alert, Text } from '@mantine/core';

export default function AssessmentLegalDisclaimer() {
  return (
    <Alert
      icon={<IconAlertTriangle size={16} />}
      title="Legal Disclaimer"
      color="yellow"
      variant="light"
      mt="lg"
    >
      <Text size="sm">
        This assessment tool is provided for informational purposes only and does not constitute
        legal advice. The results and recommendations are based on the information provided and
        current understanding of the EU AI Act, but should not be relied upon as a substitute for
        professional legal counsel.
      </Text>
      <Text size="sm" mt="xs">
        Organizations should consult with qualified legal professionals to ensure compliance with
        applicable laws and regulations. The developers of this tool are not responsible for any
        decisions made based on the information provided.
      </Text>
    </Alert>
  );
}
