import { render, screen } from '@/test-utils';
import { act } from '@testing-library/react';
import { MarkdownRenderer } from './MarkdownRenderer';

// Mock react-markdown
jest.mock('react-markdown', () => {
  return function MockReactMarkdown({ children }: { children: string }) {
    return <div data-testid="markdown">{children}</div>;
  };
});

// Mock Mantine Modal
jest.mock('@mantine/core', () => {
  const original = jest.requireActual('@mantine/core');
  return {
    ...original,
    Modal: ({ children, opened, onClose, title }: any) => {
      if (!opened) return null;
      return (
        <div data-testid="modal">
          <div data-testid="modal-title">{title}</div>
          <div data-testid="modal-content">{children}</div>
          <button data-testid="modal-close" onClick={onClose}>
            Close
          </button>
        </div>
      );
    },
  };
});

describe('MarkdownRenderer component', () => {
  it('renders plain text correctly', () => {
    render(<MarkdownRenderer content="Simple text" />);
    expect(screen.getByTestId('markdown')).toBeInTheDocument();
    expect(screen.getByText('Simple text')).toBeInTheDocument();
  });

  it('renders markdown content', () => {
    render(<MarkdownRenderer content="# Heading 1\n## Heading 2" />);
    expect(screen.getByTestId('markdown')).toBeInTheDocument();
  });

  it('renders empty content as dash', () => {
    render(<MarkdownRenderer content="" />);
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('renders null content as dash', () => {
    render(<MarkdownRenderer content={null as any} />);
    expect(screen.getByText('-')).toBeInTheDocument();
  });

  it('shows ellipsis for long content when not showing full content', () => {
    const longContent = 'A'.repeat(300);
    render(<MarkdownRenderer content={longContent} />);
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('does not show ellipsis when showing full content', () => {
    const longContent = 'A'.repeat(300);
    render(<MarkdownRenderer content={longContent} showFullContent />);
    expect(screen.queryByText('...')).not.toBeInTheDocument();
  });

  it('opens modal when ellipsis is clicked', async () => {
    const longContent = 'A'.repeat(300);
    render(<MarkdownRenderer content={longContent} />);
    
    const ellipsis = screen.getByText('...');
    
    await act(async () => {
      ellipsis.click();
    });
    
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByTestId('modal-title')).toHaveTextContent('Full Content');
  });

  it('closes modal when close button is clicked', async () => {
    const longContent = 'A'.repeat(300);
    render(<MarkdownRenderer content={longContent} />);
    
    const ellipsis = screen.getByText('...');
    
    await act(async () => {
      ellipsis.click();
    });
    
    expect(screen.getByTestId('modal')).toBeInTheDocument();
    
    const closeButton = screen.getByTestId('modal-close');
    
    await act(async () => {
      closeButton.click();
    });
    
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});
