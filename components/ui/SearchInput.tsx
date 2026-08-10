"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(searchParams.get("search") ?? "");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (value) {
        router.push(`/?search=${encodeURIComponent(value)}`);
      } else {
        router.push("/");
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [value, router]);

  return (
    <InputGroup className="max-w-xs bg-black/35 backdrop-blur-md border-white/20 has-[[data-slot=input-group-control]:focus-visible]:ring-blue-300/50 has-[[data-slot=input-group-control]:focus-visible]:border-blue-300">
      <InputGroupAddon>
        <Search size={16} color="#F2EFE3" />
      </InputGroupAddon>
      <InputGroupInput
        placeholder="Buscar filmes..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="placeholder:text-[#F2EFE3] text-[#F2EFE3]"
      />
    </InputGroup>
  );
}
