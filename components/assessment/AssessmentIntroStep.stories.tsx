import type { Meta, StoryObj } from '@storybook/react';
import AssessmentIntroStep from './AssessmentIntroStep';

const meta = {
  component: AssessmentIntroStep,
} satisfies Meta<typeof AssessmentIntroStep>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
