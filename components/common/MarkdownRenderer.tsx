import ReactMarkdown from 'react-markdown';
import { Box, Text, Modal, Button, Tooltip } from '@mantine/core';
import { useState } from 'react';

interface MarkdownRendererProps {
  content: string;
  maxHeight?: string;
  showFullContent?: boolean;
}

export function MarkdownRenderer({
  content,
  maxHeight = '100px',
  showFullContent = false,
}: MarkdownRendererProps) {
  const [showFullModal, setShowFullModal] = useState(false);

  if (!content) {
    return (
      <Text size="sm" c="dimmed">
        -
      </Text>
    );
  }

  const containerStyle = {
    maxHeight: showFullContent ? 'none' : maxHeight,
    overflow: showFullContent ? 'visible' : 'hidden',
    position: 'relative' as const,
  };

  const markdownStyle = {
    fontSize: '0.875rem',
    lineHeight: 1.4,
  };

  const fullMarkdownStyle = {
    fontSize: '1rem',
    lineHeight: 1.6,
  };

  return (
    <>
      <Box style={containerStyle}>
        <div style={markdownStyle}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        {!showFullContent && content.length > 200 && (
          <Tooltip label="Click to view full content" withArrow>
            <Text
              size="xs"
              c="dimmed"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                background: 'var(--mantine-color-body)',
                padding: '2px 4px',
                cursor: 'pointer',
                userSelect: 'none',
                borderRadius: '2px',
                transition: 'background-color 0.2s ease',
              }}
              onClick={() => setShowFullModal(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--mantine-color-gray-2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--mantine-color-body)';
              }}
            >
              ...
            </Text>
          </Tooltip>
        )}
      </Box>

      {/* Full Content Modal */}
      <Modal
        opened={showFullModal}
        onClose={() => setShowFullModal(false)}
        title="Full Content"
        size="lg"
        centered
      >
        <div style={fullMarkdownStyle}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
        <Button onClick={() => setShowFullModal(false)} fullWidth mt="md">
          Close
        </Button>
      </Modal>
    </>
  );
}
