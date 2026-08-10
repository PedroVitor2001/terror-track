export default function MovieModalSkeleton() {
  return (
    <div className="animate-pulse">
      {/* imagem de fundo */}
      <div className="h-52 w-full rounded-xl bg-zinc-800" />

      <div className="p-6">
        <div className="flex gap-5">
          {/* poster */}
          <div className="h-40 w-28 rounded-lg bg-zinc-800" />

          <div className="flex-1 space-y-4">
            {/* título */}
            <div className="h-8 w-72 rounded bg-zinc-800" />

            {/* ano */}
            <div className="h-4 w-20 rounded bg-zinc-800" />

            {/* tags */}
            <div className="flex gap-2">
              <div className="h-6 w-16 rounded bg-zinc-800" />
              <div className="h-6 w-20 rounded bg-zinc-800" />
            </div>
          </div>
        </div>

        {/* nota e duração */}
        <div className="mt-6 flex gap-8">
          <div className="h-5 w-24 rounded bg-zinc-800" />
          <div className="h-5 w-28 rounded bg-zinc-800" />
        </div>

        {/* descrição */}
        <div className="mt-8 space-y-3">
          <div className="h-4 w-full rounded bg-zinc-800" />
          <div className="h-4 w-5/6 rounded bg-zinc-800" />
          <div className="h-4 w-3/4 rounded bg-zinc-800" />
        </div>

        {/* elenco */}
        <div className="mt-8">
          <div className="mb-4 h-3 w-16 rounded bg-zinc-800" />

          <div className="flex gap-4">
            {Array.from({ length: 7 }).map((_, index) => (
              <div key={index} className="h-16 w-16 rounded-full bg-zinc-800" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
