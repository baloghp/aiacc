# QuestionsCRUD Optimization

This directory contains the optimized version of the QuestionsCRUD component, following SOLID and DRY principles.

## Structure

### Components
- `QuestionsCRUD.tsx` - Main container component (reduced from 700+ lines to ~150 lines)
- `QuestionGroupModal.tsx` - Modal for adding/editing question groups
- `QuestionModal.tsx` - Modal for adding/editing questions
- `QuestionGroupsTable.tsx` - Table component for displaying question groups with expandable questions

### Hooks
- `useQuestionGroups.ts` - State management for question groups
- `useModalState.ts` - Reusable modal state management
- `useFormValidation.ts` - Form validation logic

### Common Components
- `ModalWrapper.tsx` - Reusable modal wrapper
- `TagInput.tsx` - Reusable tag input component
- `ConfirmationDialog.tsx` - Reusable confirmation dialog

## Benefits

1. **Single Responsibility Principle**: Each component has one clear purpose
2. **DRY Compliance**: No repeated modal/form logic
3. **Reusability**: Components can be reused across the application
4. **Testability**: Smaller components are easier to test
5. **Maintainability**: Changes are isolated to specific components
6. **Readability**: Code is more organized and easier to understand

## Usage

The original `QuestionsCRUD.tsx` now simply re-exports the optimized version:

```typescript
import QuestionsCRUD from './components/QuestionsCRUD';
```

## File Size Reduction

- **Original**: 700+ lines in a single file
- **Optimized**: ~150 lines in main component + smaller focused components
- **Total**: ~400 lines across multiple focused files

## Component Responsibilities

- **QuestionsCRUD**: Orchestrates the overall flow and manages high-level state
- **QuestionGroupModal**: Handles question group form logic
- **QuestionModal**: Handles question form logic
- **QuestionGroupsTable**: Handles table display and interactions
- **ModalWrapper**: Provides common modal functionality
- **TagInput**: Manages tag input/display
- **ConfirmationDialog**: Handles delete confirmations 