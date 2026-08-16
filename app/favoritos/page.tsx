import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getMovieById } from "@/lib/tmdb";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MovieList from "@/components/movie/MovieList";

export default async function FavoritosPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // busca os IDs dos favoritos do banco
  const { data: favoritos } = await supabase
    .from("favoritos")
    .select("movie_id")
    .eq("user_id", user.id);

  // busca os detalhes de cada filme no TMDB em paralelo
  const movies = await Promise.all(
    (favoritos ?? []).map((fav) => getMovieById(fav.movie_id)),
  );

  return (
    <div className="p-4">
      {/* header da página */}
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-[#90D5FF] hover:text-[#E0F3FF] transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Voltar
        </Link>
        <h1 className="font-heading text-[#E0F3FF] text-2xl uppercase tracking-widest">
          Meus Favoritos
        </h1>
      </div>

      {/* lista de filmes ou estado vazio */}
      {movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 gap-3">
          <p className="text-[#90D5FF] text-sm">
            Você ainda não favoritou nenhum filme.
          </p>
          <Link
            href="/"
            className="text-xs text-blue-500 border border-blue-500/30 rounded-lg px-4 py-2 hover:border-blue-300 transition-colors"
          >
            Explorar filmes
          </Link>
        </div>
      ) : (
        <MovieList movies={movies} />
      )}
    </div>
  );
}
