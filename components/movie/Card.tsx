"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import ScareBar from "./ScareBar";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

type MovieCardProps = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  favorite: boolean;
  onFavoriteToggle?: () => void;
  onCardClick?: () => void;
};

export default function MovieCard({
  title,
  poster_path,
  release_date,
  vote_average,
  favorite,
  onFavoriteToggle,
  onCardClick,
}: MovieCardProps) {
  const year = release_date.slice(0, 4);
  const scareRating = Math.round(vote_average / 2);

  return (
    <div
      className="relative w-48 rounded-lg overflow-hidden bg-[#111] border border-[#2a2a2a] cursor-pointer"
      onClick={onCardClick}
    >
      {/* área da imagem */}
      <div className="relative h-64">
        <Image
          src={`${IMAGE_BASE_URL}${poster_path}`}
          alt={title}
          fill
          className="object-cover"
        />
        {/* textura vintage por cima da imagem */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: "url('/card_wallpaper.jpg')",
            backgroundSize: "cover",
          }}
        />
      </div>

      {/* área do conteúdo */}
      <div className="p-3 flex flex-col gap-2">
        {/* título */}
        <h2 className="font-heading text-[#F2EFE3] text-lg leading-tight uppercase">
          {title}
        </h2>

        {/* ano */}
        <p className="text-[#90D5FF] text-xs tracking-widest uppercase">
          {year}
        </p>

        {/* nível de medo + favoritar */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-[#90D5FF] text-[10px] tracking-widest uppercase">
              Nível de medo
            </span>
            <ScareBar rating={scareRating} />
          </div>

          {/* botão favoritar */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavoriteToggle?.();
            }}
            className="w-8 h-8 rounded-full border border-[#2a2a2a] flex items-center justify-center cursor-pointer hover:border-[#90D5FF] transition-colors"
          >
            <Heart
              size={14}
              className={
                favorite ? "fill-[#90D5FF] text-[#90D5FF]" : "text-[#F2EFE3]"
              }
            />
          </button>
        </div>
      </div>

      {/* textura vintage por cima do card inteiro */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay rounded-lg"
        style={{
          backgroundImage: "url('/card_wallpaper.jpg')",
          backgroundSize: "cover",
        }}
      />
    </div>
  );
}
