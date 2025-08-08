/**
 * Converts markdown to plain text for PDF rendering
 * Handles common markdown syntax like headers, lists, bold, italic, etc.
 */
export function markdownToText(markdown: string): string {
  if (!markdown) {return '';}

  return markdown
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    
    // Headers
    .replace(/^#{1,6}\s+/gm, '')
    
    // Bold and italic
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    
    // Strikethrough
    .replace(/~~(.*?)~~/g, '$1')
    
    // Code blocks
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    
    // Links
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\[[^\]]+\]/g, '$1')
    
    // Images
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    
    // Lists
    .replace(/^[\s]*[-*+]\s+/gm, '• ')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    
    // Blockquotes
    .replace(/^>\s+/gm, '')
    
    // Horizontal rules
    .replace(/^[\s]*[-*_]{3,}[\s]*$/gm, '')
    
    // Tables (simplified - just remove table syntax)
    .replace(/\|/g, ' ')
    .replace(/^[\s]*[-|]+[\s]*$/gm, '')
    
    // Line breaks and spacing
    .replace(/\n\s*\n/g, '\n\n')
    .replace(/\n{3,}/g, '\n\n')
    
    // Trim whitespace
    .trim();
}

/**
 * Converts markdown to a more readable format for PDF
 * Preserves some formatting while making it suitable for plain text
 */
export function markdownToReadableText(markdown: string): string {
  if (!markdown) {return '';}

  return markdown
    // Remove HTML tags
    .replace(/<[^>]*>/g, '')
    
    // Headers - convert to uppercase
    .replace(/^#{1}\s+(.*?)$/gm, '$1')
    .replace(/^#{2}\s+(.*?)$/gm, '$1')
    .replace(/^#{3,6}\s+(.*?)$/gm, '$1')
    
    // Bold - keep as is but remove asterisks
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    
    // Italic - keep as is but remove asterisks
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    
    // Strikethrough
    .replace(/~~(.*?)~~/g, '$1')
    
    // Code blocks - remove but keep inline code
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    
    // Links - keep text, remove URL
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\[[^\]]+\]/g, '$1')
    
    // Images - keep alt text
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    
    // Lists - convert to bullet points
    .replace(/^[\s]*[-*+]\s+/gm, '• ')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    
    // Blockquotes - remove quote markers
    .replace(/^>\s+/gm, '')
    
    // Horizontal rules
    .replace(/^[\s]*[-*_]{3,}[\s]*$/gm, '')
    
    // Tables - simplify to text
    .replace(/\|/g, ' ')
    .replace(/^[\s]*[-|]+[\s]*$/gm, '')
    
    // Clean up spacing
    .replace(/\n\s*\n/g, '\n\n')
    .replace(/\n{3,}/g, '\n\n')
    
    .trim();
}
