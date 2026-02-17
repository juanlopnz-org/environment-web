import { supabase } from "src/config/supabaseConfig";
import { useAuth } from "src/hooks/useAuth";

export default function NavbarButton() {
  const { user, loading } = useAuth();

  async function signIn() {
    await supabase.auth.signInWithOAuth({ provider: "google" });
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  if (loading) return <span className="text-white/80 text-sm">...</span>;

  if (!user) {
    return (
      <button
        onClick={signIn}
        className="bg-white text-primary px-4 py-2 rounded-full font-semibold shadow hover:scale-105 transition"
      >
        Iniciar sesión
      </button>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <img
        src={user.user_metadata?.avatar_url}
        className="w-8 h-8 rounded-full border-2 border-white"
      />

      <span className="text-sm hidden md:block">
        {user.user_metadata?.full_name}
      </span>

      <button
        onClick={signOut}
        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
      >
        Salir
      </button>
    </div>
  );
}
