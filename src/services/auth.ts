import { supabase } from "src/config/supabaseConfig";

export async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google"
  });

  if (error) {
    alert("Error al iniciar sesión: " + error.message);
  }
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    alert("Error al cerrar sesión: " + error.message);
  }
}