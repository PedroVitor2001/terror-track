import { createServerSupabaseClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function FavoritosPage() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="p-8">
      <h1 className="font-heading text-[#E0F3FF] text-3xl uppercase tracking-widest mb-4">
        Meus Favoritos
      </h1>
      <p className="text-[#90D5FF]">Logado como: {user.email}</p>
    </div>
  );
}
