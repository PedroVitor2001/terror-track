"use client";

import { useState } from "react";
import MovieCard from "./Card";
import MovieModal from "./MovieModal";
import type { TMDBMovie } from "@/lib/tmdb";

type MovieListProps = {
  movies: TMDBMovie[];
};

export default function MovieList({ movies }: MovieListProps) {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | null>(null);

  function handleFavoriteToggle(id: number) {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  }

  return (
    <>
      <div className="flex flex-wrap gap-4 p-4">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
            vote_average={movie.vote_average}
            favorite={favorites.includes(movie.id)}
            onFavoriteToggle={() => handleFavoriteToggle(movie.id)}
            onCardClick={() => setSelectedMovie(movie)}
          />
        ))}
      </div>

      {/* modal — só renderiza quando tem filme selecionado */}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}
