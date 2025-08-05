import questionsData from '../data/questions.json';
import notesData from '../data/notes.json';
import obligationsData from '../data/obligations.json';
import rulesData from '../data/rules.json';
import tagsData from '../data/tags.json';

export interface TagUsageAnalysis {
  totalTags: number;
  unusedTags: string[];
  unusedTagsCount: number;
  questionUnusedTags: string[];
  questionUnusedTagsCount: number;
  noteUnusedTags: string[];
  noteUnusedTagsCount: number;
  obligationUnusedTags: string[];
  obligationUnusedTagsCount: number;
  ruleUsedTags: string[];
  ruleUsedTagsCount: number;
}

export function analyzeTagUsage(): TagUsageAnalysis {
  // Get all tag IDs
  const allTagIds = tagsData.map(tag => tag.id);
  const totalTags = allTagIds.length;

  // Extract all tags used in questions
  const questionUsedTags = new Set<string>();
  
  questionsData.forEach(group => {
    if (group.questions) {
      group.questions.forEach(question => {
        // Add tags from question.tags
        if (question.tags && Array.isArray(question.tags)) {
          question.tags.forEach(tag => {
            // Handle comma-separated tags
            if (tag.includes(',')) {
              tag.split(',').forEach(singleTag => {
                questionUsedTags.add(singleTag.trim());
              });
            } else {
              questionUsedTags.add(tag);
            }
          });
        }
        
        // Add tags from question.options
        if (question.options && Array.isArray(question.options)) {
          question.options.forEach(option => {
            if (option.value && option.value.includes(',')) {
              option.value.split(',').forEach(singleTag => {
                questionUsedTags.add(singleTag.trim());
              });
            } else if (option.value) {
              questionUsedTags.add(option.value);
            }
          });
        }
      });
    }
  });

  // Extract all tags used in notes
  const noteUsedTags = new Set<string>();
  
  notesData.forEach(note => {
    // Add tags from requiredTags
    if (note.requiredTags && Array.isArray(note.requiredTags)) {
      note.requiredTags.forEach(tag => {
        noteUsedTags.add(tag);
      });
    }
    
    // Add tags from requiredAllTags
    if (note.requiredAllTags && Array.isArray(note.requiredAllTags)) {
      note.requiredAllTags.forEach(tag => {
        noteUsedTags.add(tag);
      });
    }
  });

  // Extract all tags used in obligations
  const obligationUsedTags = new Set<string>();
  
  obligationsData.forEach(obligation => {
    // Add tags from requiredTags
    if (obligation.requiredTags && Array.isArray(obligation.requiredTags)) {
      obligation.requiredTags.forEach(tag => {
        obligationUsedTags.add(tag);
      });
    }
    
    // Add tags from requiredAllTags
    if (obligation.requiredAllTags && Array.isArray(obligation.requiredAllTags)) {
      obligation.requiredAllTags.forEach(tag => {
        obligationUsedTags.add(tag);
      });
    }
  });

  // Extract all tags used in rules
  const ruleUsedTags = new Set<string>();
  
  rulesData.forEach(rule => {
    // Add tags from inputTags
    if (rule.inputTags && Array.isArray(rule.inputTags)) {
      rule.inputTags.forEach(tag => {
        ruleUsedTags.add(tag);
      });
    }
    
    // Add tags from outputTags
    if (rule.outputTags && Array.isArray(rule.outputTags)) {
      rule.outputTags.forEach(tag => {
        ruleUsedTags.add(tag);
      });
    }
  });

  // Find unused tags
  const allUsedTags = new Set([
    ...questionUsedTags,
    ...noteUsedTags,
    ...obligationUsedTags,
    ...ruleUsedTags
  ]);

  const unusedTags = allTagIds.filter(tagId => !allUsedTags.has(tagId));
  const unusedTagsCount = unusedTags.length;

  // Find tags unused in questions
  const questionUnusedTags = allTagIds.filter(tagId => !questionUsedTags.has(tagId));
  const questionUnusedTagsCount = questionUnusedTags.length;

  // Find tags unused in notes
  const noteUnusedTags = allTagIds.filter(tagId => !noteUsedTags.has(tagId));
  const noteUnusedTagsCount = noteUnusedTags.length;

  // Find tags unused in obligations
  const obligationUnusedTags = allTagIds.filter(tagId => !obligationUsedTags.has(tagId));
  const obligationUnusedTagsCount = obligationUnusedTags.length;

  // Tags used in rules
  const ruleUsedTagsArray = Array.from(ruleUsedTags);
  const ruleUsedTagsCount = ruleUsedTagsArray.length;

  return {
    totalTags,
    unusedTags,
    unusedTagsCount,
    questionUnusedTags,
    questionUnusedTagsCount,
    noteUnusedTags,
    noteUnusedTagsCount,
    obligationUnusedTags,
    obligationUnusedTagsCount,
    ruleUsedTags: ruleUsedTagsArray,
    ruleUsedTagsCount,
  };
} 