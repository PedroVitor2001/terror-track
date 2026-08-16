"use client";

import Image from "next/image";
import { Heart, LogOut } from "lucide-react";
import SearchInput from "./SearchInput";
import ThemeToggle from "./ThemeToggle";
import { useFavorites } from "@/lib/favorites-context";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import Link from "next/link";

export default function Header() {
  const { favorites } = useFavorites();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // pega o usuário atual
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setLoading(false);
    });

    // escuta mudanças de sessão (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? null;

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
        <Link href="/favoritos" className="relative">
          <Heart size={20} className="text-[#F2EFE3]" />
          {favorites.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-300 text-[#0a0a0d] text-[10px] flex items-center justify-center font-bold">
              {favorites.length}
            </span>
          )}
        </Link>

        <ThemeToggle />

        {/* avatar ou botão de login */}
        {loading ? (
          // placeholder enquanto carrega — evita o "flash" de "Entrar"
          <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
        ) : user ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-[#0a0a0d] text-xs font-bold">
              {initials}
            </div>
            <button
              onClick={handleLogout}
              className="cursor-pointer text-[#90D5FF] hover:text-[#E0F3FF] transition-colors"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="text-xs text-[#90D5FF] border border-white/20 rounded-lg px-3 py-1.5 hover:border-blue-300 transition-colors cursor-pointer"
          >
            Entrar
          </button>
        )}
      </div>
    </header>
  );
}
