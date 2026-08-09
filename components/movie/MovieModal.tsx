"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Clock, Star } from "lucide-react";
import { getMovieDetails } from "@/lib/tmdb";
import type { TMDBMovie, TMDBMovieDetails } from "@/lib/tmdb";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

type MovieModalProps = {
  movie: TMDBMovie;
  onClose: () => void;
};

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  const [details, setDetails] = useState<TMDBMovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetails() {
      setLoading(true);
      const data = await getMovieDetails(movie.id);
      setDetails(data);
      setLoading(false);
    }
    fetchDetails();
  }, [movie.id]);

  return (
    // backdrop — fundo escuro por trás do modal
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose} // clica fora → fecha
    >
      {/* container do modal — clique aqui NÃO fecha */}
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-[#0f0e0d] border border-[#3a3028]"
        onClick={(e) => e.stopPropagation()} // impede o clique de "subir" pro backdrop
      >
        {/* botão fechar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center cursor-pointer hover:bg-black/80 transition-colors"
        >
          <X size={16} className="text-[#F2EFE3]" />
        </button>

        {/* backdrop do filme (imagem horizontal) */}
        <div className="relative h-48 w-full">
          {details?.backdrop_path ? (
            <Image
              src={`${IMAGE_BASE_URL}w1280${details.backdrop_path}`}
              alt={movie.title}
              fill
              className="object-cover rounded-t-xl"
            />
          ) : (
            <div className="h-full w-full bg-[#1a1510] rounded-t-xl" />
          )}
          {/* gradiente pra fundir o backdrop com o conteúdo */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f0e0d] rounded-t-xl" />
        </div>

        {/* conteúdo do modal */}
        <div className="flex gap-4 p-5 -mt-16 relative">
          {/* pôster */}
          <div className="relative w-28 h-40 shrink-0 rounded-lg overflow-hidden border border-[#3a3028]">
            <Image
              src={`${IMAGE_BASE_URL}w500${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover"
            />
          </div>

          {/* info principal */}
          <div className="flex flex-col gap-1 pt-16">
            <h2 className="font-heading text-[#F2EFE3] text-xl uppercase tracking-wide">
              {movie.title}
            </h2>
            <p className="text-[#90D5FF] text-xs tracking-widest">
              {movie.release_date.slice(0, 4)}
            </p>

            {/* gêneros */}
            {details && (
              <div className="flex flex-wrap gap-1 mt-1">
                {details.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="text-[10px] px-2 py-0.5 rounded-full border border-[#3a3028] text-[#90D5FF]"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* detalhes extras */}
        <div className="px-5 pb-5 flex flex-col gap-4">
          {/* nota + duração */}
          {details && (
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <Star size={14} className="text-[#90D5FF]" />
                <span className="text-[#F2EFE3] text-sm">
                  {details.vote_average.toFixed(1)}
                  <span className="text-[#6b5a3e] text-xs ml-1">
                    ({details.vote_count.toLocaleString()} votos)
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock size={14} className="text-[#90D5FF]" />
                <span className="text-[#F2EFE3] text-sm">
                  {Math.floor(details.runtime / 60)}h {details.runtime % 60}min
                </span>
              </div>
            </div>
          )}

          {/* sinopse */}
          {loading ? (
            <p className="text-[#6b5a3e] text-sm">Carregando...</p>
          ) : (
            <p className="text-[#c4b89a] text-sm leading-relaxed">
              {details?.overview || "Sinopse não disponível."}
            </p>
          )}

          {/* elenco */}
          {details && details.credits.cast.length > 0 && (
            <div>
              <p className="text-[#90D5FF] text-[10px] tracking-widest uppercase mb-2">
                Elenco
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {details.credits.cast.slice(0, 8).map((member) => (
                  <div
                    key={member.id}
                    className="flex flex-col items-center gap-1 shrink-0 w-14"
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#3a3028] bg-[#1a1510]">
                      {member.profile_path ? (
                        <Image
                          src={`${IMAGE_BASE_URL}w185${member.profile_path}`}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[#3a3028] text-lg">
                          ?
                        </div>
                      )}
                    </div>
                    <p className="text-[#F2EFE3] text-[9px] text-center leading-tight line-clamp-2">
                      {member.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
