import type { Meta, StoryObj } from "@storybook/react";
import GenreTag from "./GenreTag";

const meta: Meta<typeof GenreTag> = {
  title: "UI/GenreTag",
  component: GenreTag,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0d" }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof GenreTag>;

export const Terror: Story = {
  args: { name: "Terror" },
};

export const Slasher: Story = {
  args: { name: "Slasher" },
};

export const Sobrenatural: Story = {
  args: { name: "Sobrenatural" },
};

export const NomeLongo: Story = {
  args: { name: "Terror Psicológico" },
};
