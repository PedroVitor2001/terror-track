import type { Meta, StoryObj } from "@storybook/react";
import ScareBar from "./ScareBar";

const meta: Meta<typeof ScareBar> = {
  title: "Movie/ScareBar",
  component: ScareBar,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0d" }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ScareBar>;

export const Baixo: Story = {
  args: { rating: 1 },
};

export const Medio: Story = {
  args: { rating: 3 },
};

export const Alto: Story = {
  args: { rating: 4 },
};

export const Extremo: Story = {
  args: { rating: 5 },
};

export const Zerado: Story = {
  args: { rating: 0 },
};
