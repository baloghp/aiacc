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
          <ReactMarkdown
            components={{
              // Override paragraph to remove default margins
              p: ({ children }) => <span>{children}</span>,
              // Override headings to be smaller
              h1: ({ children }) => (
                <Text size="sm" fw={600}>
                  {children}
                </Text>
              ),
              h2: ({ children }) => (
                <Text size="sm" fw={600}>
                  {children}
                </Text>
              ),
              h3: ({ children }) => (
                <Text size="sm" fw={600}>
                  {children}
                </Text>
              ),
              h4: ({ children }) => (
                <Text size="sm" fw={600}>
                  {children}
                </Text>
              ),
              h5: ({ children }) => (
                <Text size="sm" fw={600}>
                  {children}
                </Text>
              ),
              h6: ({ children }) => (
                <Text size="sm" fw={600}>
                  {children}
                </Text>
              ),
              // Override lists to be more compact
              ul: ({ children }) => <div style={{ margin: 0, paddingLeft: '1rem' }}>{children}</div>,
              ol: ({ children }) => <div style={{ margin: 0, paddingLeft: '1rem' }}>{children}</div>,
              li: ({ children }) => (
                <Text size="sm" component="li">
                  {children}
                </Text>
              ),
              // Override code blocks
              code: ({ children }) => (
                <Text
                  size="xs"
                  component="code"
                  style={{
                    backgroundColor: 'var(--mantine-color-gray-1)',
                    padding: '2px 4px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                  }}
                >
                  {children}
                </Text>
              ),
              // Override blockquotes
              blockquote: ({ children }) => (
                <div
                  style={{
                    borderLeft: '3px solid var(--mantine-color-gray-4)',
                    paddingLeft: '0.5rem',
                    margin: '0.25rem 0',
                    fontStyle: 'italic',
                  }}
                >
                  {children}
                </div>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
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
          <ReactMarkdown
            components={{
              // Override paragraph to remove default margins
              p: ({ children }) => <span>{children}</span>,
              // Override headings to be smaller
              h1: ({ children }) => (
                <Text size="lg" fw={600}>
                  {children}
                </Text>
              ),
              h2: ({ children }) => (
                <Text size="md" fw={600}>
                  {children}
                </Text>
              ),
              h3: ({ children }) => (
                <Text size="sm" fw={600}>
                  {children}
                </Text>
              ),
              h4: ({ children }) => (
                <Text size="sm" fw={600}>
                  {children}
                </Text>
              ),
              h5: ({ children }) => (
                <Text size="sm" fw={600}>
                  {children}
                </Text>
              ),
              h6: ({ children }) => (
                <Text size="sm" fw={600}>
                  {children}
                </Text>
              ),
              // Override lists to be more compact
              ul: ({ children }) => <div style={{ margin: 0, paddingLeft: '1rem' }}>{children}</div>,
              ol: ({ children }) => <div style={{ margin: 0, paddingLeft: '1rem' }}>{children}</div>,
              li: ({ children }) => (
                <Text size="sm" component="li">
                  {children}
                </Text>
              ),
              // Override code blocks
              code: ({ children }) => (
                <Text
                  size="xs"
                  component="code"
                  style={{
                    backgroundColor: 'var(--mantine-color-gray-1)',
                    padding: '2px 4px',
                    borderRadius: '4px',
                    fontFamily: 'monospace',
                  }}
                >
                  {children}
                </Text>
              ),
              // Override blockquotes
              blockquote: ({ children }) => (
                <div
                  style={{
                    borderLeft: '3px solid var(--mantine-color-gray-4)',
                    paddingLeft: '0.5rem',
                    margin: '0.25rem 0',
                    fontStyle: 'italic',
                  }}
                >
                  {children}
                </div>
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
        <Button onClick={() => setShowFullModal(false)} fullWidth mt="md">
          Close
        </Button>
      </Modal>
    </>
  );
}
