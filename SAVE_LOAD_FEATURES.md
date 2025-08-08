# Save/Load Assessment Features

This document describes the Save/Load functionality implemented for the AI Act Compliance Assessment tool.

## Features

### Save Assessment
- Save current assessment progress to localStorage
- Automatic naming based on company and AI system names
- Maximum of 10 saved assessments (oldest deleted when limit reached)
- Saves complete assessment state including all answers and tags

### Load Assessment
- Load previously saved assessments
- Continue from where you left off
- Restore all answers, tags, and progress

### Export/Import
- Export assessments as JSON files
- Import assessments from JSON files
- Share assessments between users

### Delete Assessments
- Delete individual saved assessments
- Free up storage space

## Usage

### Desktop
- Save/Load buttons are located in the top-right corner of the assessment page
- Click "Save" to save current progress
- Click "Load" to view and load saved assessments

### Mobile
- Save/Load buttons are located below the assessment content
- Same functionality as desktop

## Technical Details

### Storage
- Uses browser localStorage
- Key: `ai-act-assessments`
- Maximum 10 assessments stored
- Automatic cleanup of oldest assessments when limit reached

### Data Structure
```typescript
interface SavedAssessment {
  id: string;                    // Unique identifier
  name: string;                  // User-friendly name
  createdAt: string;             // ISO timestamp
  lastModified: string;          // ISO timestamp
  assessmentState: AssessmentState; // Complete state
  currentStep: number;           // Current step in wizard
  isComplete: boolean;           // Whether assessment is finished
  schemaVersion: string;         // For future migrations
}
```

### Files
- `services/AssessmentStorage.ts` - Core storage service
- `components/assessment/SaveAssessmentDialog.tsx` - Save dialog
- `components/assessment/LoadAssessmentDialog.tsx` - Load dialog
- `components/assessment/AssessmentSaveLoadButtons.tsx` - UI buttons
- `utils/fileUtils.ts` - File download utilities

### Integration
- Integrated into main assessment page (`app/assessment/page.tsx`)
- Enhanced `AssessmentManager` with serialization methods
- Automatic state restoration when loading assessments

## Error Handling
- Storage full notifications
- Invalid file format handling
- Corrupted data detection
- Graceful fallbacks for storage failures

## Future Enhancements
- Auto-save functionality
- Cloud storage integration
- Assessment sharing via links
- Version control for assessments
- Assessment templates
