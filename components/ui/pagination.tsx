"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

type PaginationProps = {
  currentPage: number;
  search?: string;
};

export default function Pagination({ currentPage, search }: PaginationProps) {
  const router = useRouter();

  function goToPage(page: number) {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    params.set("page", String(page));
    router.push(`/?${params.toString()}`);
  }

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black border border-[#1f2730] text-white hover:border-white/10 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer text-sm"
      >
        <ChevronLeft size={16} />
        Anterior
      </button>

      <span className="text-white text-sm">
        Página <span className="font-medium">{currentPage}</span>
      </span>

      <button
        onClick={() => goToPage(currentPage + 1)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black border border-[#1f2730] text-white hover:border-white/10 transition-colors cursor-pointer text-sm"
      >
        Próxima
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
