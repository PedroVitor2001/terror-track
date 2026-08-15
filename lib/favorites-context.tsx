"use client";

import { createContext, useContext, useState } from "react";

// 1. define o formato dos dados que o Context vai carregar
type FavoritesContextType = {
  favorites: number[];
  toggleFavorite: (id: number) => void;
};

// 2. cria o Context (começa vazio/undefined)
const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

// 3. cria o Provider — componente que envolve a árvore e fornece os dados
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);

  function toggleFavorite(id: number) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// 4. cria o Hook customizado — forma limpa de consumir o Context
export function useFavorites() {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites deve ser usado dentro de FavoritesProvider");
  }

  return context;
}
