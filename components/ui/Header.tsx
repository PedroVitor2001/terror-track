"use client";

import Image from "next/image";
import { Heart } from "lucide-react";
import SearchInput from "./SearchInput";
import ThemeToggle from "./ThemeToggle";
import { useFavorites } from "@/lib/favorites-context";

export default function Header() {
  const { favorites } = useFavorites();

  return (
    <header className="flex items-center justify-between p-4">
      <Image
        src="/wallpaper.png"
        alt="TerrorTrack logo"
        width={220}
        height={40}
      />
      <SearchInput />
      <div className="flex items-center gap-3">
        {/* contador de favoritos */}
        <div className="relative">
          <Heart size={20} className="text-[#F2EFE3]" />
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-300 text-[#0a0a0d] text-[10px] flex items-center justify-center font-bold">
              {favorites.length}
            </span>
          )}
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
