"use client";

import { useRouter } from "next/navigation";

const GENEROS = [
  { id: "27", label: "Todos" },
  { id: "27,53", label: "Slasher" },
  { id: "27,9648", label: "Sobrenatural" },
  { id: "27,99", label: "Found Footage" },
  { id: "27,878", label: "Psicológico" },
];

const ORDENACAO = [
  { value: "popularity.desc", label: "Mais populares" },
  { value: "vote_average.desc", label: "Melhor avaliados" },
  { value: "primary_release_date.desc", label: "Mais recentes" },
];

type FilterBarProps = {
  currentGeneros: string;
  currentOrdem: string;
};

export default function FilterBar({
  currentGeneros,
  currentOrdem,
}: FilterBarProps) {
  const router = useRouter();

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(window.location.search);
    params.set(key, value);
    params.set("page", "1"); // volta pra página 1 ao filtrar
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-3 px-4 pb-2">
      {/* chips de gênero */}
      <div className="flex flex-wrap gap-2">
        {GENEROS.map((genero) => (
          <button
            key={genero.id}
            onClick={() => updateParams("generos", genero.id)}
            className={`px-3 py-1.5 rounded-full text-xs tracking-wide transition-colors cursor-pointer border ${
              currentGeneros === genero.id
                ? "bg-blue-500 text-[#0a0a0d] border-blue-500 font-medium"
                : "bg-transparent text-[#90D5FF] border-[#1f2730] hover:border-blue-300"
            }`}
          >
            {genero.label}
          </button>
        ))}
      </div>

      {/* separador */}
      <div className="w-px h-5 bg-[#1f2730] hidden sm:block" />

      {/* ordenação */}
      <div className="flex gap-2">
        {ORDENACAO.map((op) => (
          <button
            key={op.value}
            onClick={() => updateParams("ordem", op.value)}
            className={`px-3 py-1.5 rounded-full text-xs tracking-wide transition-colors cursor-pointer border ${
              currentOrdem === op.value
                ? "bg-black text-white border-white/40 font-medium"
                : "bg-transparent text-[#90D5FF] border-[#1f2730] hover:border-blue-300"
            }`}
          >
            {op.label}
          </button>
        ))}
      </div>
    </div>
  );
}
