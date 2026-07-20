import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

export default function SearchInput() {
  return (
    <InputGroup className="max-w-xs bg-black/35 backdrop-blur-md border-white/20 has-[[data-slot=input-group-control]:focus-visible]:ring-blue-300/50 has-[[data-slot=input-group-control]:focus-visible]:border-blue-300">
      <InputGroupAddon>
        <Search size={16} color="#F2EFE3" />
      </InputGroupAddon>
      <InputGroupInput
        placeholder="Buscar filmes..."
        className="placeholder:text-[#F2EFE3] text-[#F2EFE3]"
      />
    </InputGroup>
  );
}
