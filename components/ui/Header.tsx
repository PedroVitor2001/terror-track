import { Ghost } from "lucide-react";
import SearchInput from "./SearchInput";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4">
      <Image
        src="/wallpaper.png"
        alt="TerrorTrack logo"
        width={220}
        height={40}
      />
      <SearchInput />
      <div>
        <ThemeToggle />
      </div>
    </header>
  );
}
