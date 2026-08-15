"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-black/40 backdrop-blur-md border border-white/20 rounded-xl p-8 w-full max-w-md">
        {/* logo */}
        <h1 className="font-heading text-[#E0F3FF] text-3xl uppercase tracking-widest text-center mb-8">
          TerrorTrack
        </h1>

        {/* toggle login/cadastro */}
        <div className="flex mb-6 bg-black/30 rounded-lg p-1">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              isLogin
                ? "bg-blue-500 text-[#0a0a0d]"
                : "text-[#90D5FF] hover:text-[#E0F3FF]"
            }`}
          >
            Entrar
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              !isLogin
                ? "bg-blue-500 text-[#0a0a0d]"
                : "text-[#90D5FF] hover:text-[#E0F3FF]"
            }`}
          >
            Cadastrar
          </button>
        </div>

        {/* campos */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-[#90D5FF] text-xs tracking-widest uppercase mb-2 block">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-[#E0F3FF] placeholder:text-white/30 focus:outline-none focus:border-blue-300 transition-colors"
            />
          </div>
          <div>
            <label className="text-[#90D5FF] text-xs tracking-widest uppercase mb-2 block">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 text-[#E0F3FF] placeholder:text-white/30 focus:outline-none focus:border-blue-300 transition-colors"
            />
          </div>
        </div>

        {/* erro */}
        {error && (
          <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
        )}

        {/* botão */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 py-3 bg-blue-500 text-[#0a0a0d] rounded-lg font-medium tracking-wide hover:bg-blue-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {loading ? "Aguarde..." : isLogin ? "Entrar" : "Criar conta"}
        </button>
      </div>
    </div>
  );
}
