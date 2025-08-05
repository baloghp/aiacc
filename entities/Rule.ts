export interface Rule {
  id: string;
  name: string;
  inputTags: string[]; // Tags that must be present to trigger this rule
  outputTags: string[]; // Tags that will be added when the rule is triggered
  order?: number; // Optional order for sorting
}
