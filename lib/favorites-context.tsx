"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

type FavoritesContextType = {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  loading: boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // busca favoritos do banco quando o componente monta
  useEffect(() => {
    async function fetchFavorites() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setFavorites([]);
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("favoritos")
        .select("movie_id")
        .eq("user_id", user.id);

      if (data) {
        setFavorites(data.map((row) => row.movie_id));
      }

      setLoading(false);
    }

    fetchFavorites();

    // quando o usuário faz login/logout, recarrega os favoritos
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      fetchFavorites();
    });

    return () => subscription.unsubscribe();
  }, []);

  async function toggleFavorite(id: number) {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      // se não está logado, redireciona pro login
      window.location.href = "/login";
      return;
    }

    const isFavorited = favorites.includes(id);

    // atualiza o estado local imediatamente (optimistic update)
    setFavorites((prev) =>
      isFavorited ? prev.filter((favId) => favId !== id) : [...prev, id],
    );

    // depois sincroniza com o banco
    if (isFavorited) {
      await supabase
        .from("favoritos")
        .delete()
        .eq("user_id", user.id)
        .eq("movie_id", id);
    } else {
      await supabase
        .from("favoritos")
        .insert({ user_id: user.id, movie_id: id });
    }
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites deve ser usado dentro de FavoritesProvider");
  }
  return context;
}
