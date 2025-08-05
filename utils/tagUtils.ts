/**
 * Utility functions for tag processing
 */

/**
 * Trims all tags in an array and filters out empty ones
 * @param tags - Array of tag strings
 * @returns Array of trimmed, non-empty tags
 */
export function trimTags(tags: string[]): string[] {
  return tags.map(tag => tag.trim()).filter(tag => tag.length > 0);
} 