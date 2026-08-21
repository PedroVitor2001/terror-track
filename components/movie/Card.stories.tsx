import type { Meta, StoryObj } from "@storybook/react";
import MovieCard from "./Card";
import { FavoritesProvider } from "@/lib/favorites-context";

const meta: Meta<typeof MovieCard> = {
  title: "Movie/MovieCard",
  component: MovieCard,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#0a0a0d" }],
    },
  },
  // decorator: envolve todas as stories desse arquivo com o FavoritesProvider
  decorators: [
    (Story) => (
      <FavoritesProvider>
        <Story />
      </FavoritesProvider>
    ),
  ],
  // props padrão compartilhadas entre todas as stories
  args: {
    id: 1,
    title: "Hereditary",
    poster_path: "/card_wallpaper.jpg",
    release_date: "2018-06-08",
    vote_average: 7.3,
    favorite: false,
    onFavoriteToggle: () => console.log("toggle favorito"),
    onCardClick: () => console.log("card clicado"),
    showFavoriteButton: true,
  },
};

export default meta;
type Story = StoryObj<typeof MovieCard>;

export const Default: Story = {};

export const Favoritado: Story = {
  args: { favorite: true },
};

export const NivelMaximo: Story = {
  args: { vote_average: 10 },
};

export const NivelMinimo: Story = {
  args: { vote_average: 0 },
};

export const TituloLongo: Story = {
  args: {
    title: "O Exorcismo de Emily Rose: A História Completa",
  },
};

export const SemBotaoFavorito: Story = {
  args: { showFavoriteButton: false },
};
