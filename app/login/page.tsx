"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Ghost } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit() {
    setLoading(true);
    setError(null);

    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-content p-4">
      <div className="w-full max-w-sm mx-auto">
        {/* card */}
        <div className="bg-[#111] border border-[#1f2730] rounded-2xl p-8">
          {/* header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Ghost size={22} color="#40B7FF" />
              <span className="font-heading text-[#E0F3FF] text-xl uppercase tracking-widest">
                Terror<span className="text-blue-500">Track</span>
              </span>
            </div>
            <p className="text-[#90D5FF] text-xs tracking-wide">
              {isLogin ? "Acesse seu catálogo" : "Crie sua conta"}
            </p>
          </div>

          {/* campos */}
          <div className="flex flex-col gap-4 mb-6">
            <div>
              <label className="text-[#90D5FF] text-[10px] tracking-widest uppercase mb-1.5 block">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="w-full bg-[#0a0a0d] border border-[#1f2730] rounded-lg px-4 py-2.5 text-sm text-[#E0F3FF] placeholder:text-white/20 focus:outline-none focus:border-blue-300 transition-colors"
              />
            </div>
            <div>
              <label className="text-[#90D5FF] text-[10px] tracking-widest uppercase mb-1.5 block">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#0a0a0d] border border-[#1f2730] rounded-lg px-4 py-2.5 pr-10 text-sm text-[#E0F3FF] placeholder:text-white/20 focus:outline-none focus:border-blue-300 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#90D5FF] hover:text-[#E0F3FF] transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>
          </div>

          {/* erro */}
          {error && (
            <p className="text-red-400 text-xs mb-4 text-center">{error}</p>
          )}

          {/* botão principal */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-2.5 bg-blue-500 text-[#0a0a0d] rounded-lg text-sm font-medium tracking-widest uppercase hover:bg-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mb-4"
          >
            {loading ? "Aguarde..." : isLogin ? "Entrar" : "Criar conta"}
          </button>

          {/* toggle login/cadastro */}
          <p className="text-center text-xs text-[#90D5FF]">
            {isLogin ? "Não tem conta?" : "Já tem conta?"}{" "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError(null);
              }}
              className="text-blue-500 hover:text-blue-300 transition-colors cursor-pointer"
            >
              {isLogin ? "Criar conta" : "Entrar"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
