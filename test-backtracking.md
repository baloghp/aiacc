# Backtracking Functionality Test

## Implementation Summary

### Components Added:
1. **AssessmentManager.clearAnswersFromPhase()** - Clears answers from a specific phase onwards
2. **AssessmentManager.getPhaseForStep()** - Maps steps to phases
3. **BacktrackConfirmationDialog** - Warning dialog for backtracking
4. **Modified page.tsx** - Added backtracking logic to stepper

### How it works:
1. User clicks on a previous step in the stepper
2. System shows confirmation dialog with details about what will be cleared
3. If confirmed, clears all answers from that phase onwards
4. Navigates to the target step
5. UI refreshes to show cleared state

### Test Cases:
1. **Navigate forward through steps** - Should work normally
2. **Click on previous step** - Should show confirmation dialog
3. **Cancel backtracking** - Should stay on current step
4. **Confirm backtracking** - Should clear answers and navigate back
5. **Verify cleared answers** - Subsequent steps should show empty state

### Phase Mapping:
- Step 1 → Company phase
- Step 2 → AISystem phase  
- Step 3 → Applicability phase
- Step 4 → Roles phase
- Step 5 → Risk phase
- Step 6 → GPAI phase

### Expected Behavior:
- Going back to step N clears phases N onwards
- Tags are cleared for affected questions
- Rules are re-processed after clearing
- UI updates to reflect cleared state
