import { supabase } from "../config/supabaseConfig";

export async function addComment(postId: string, content: string, userId: string) {
  if (!content) {
    alert("El comentario no puede estar vacío");
    return;
  }

  if (!userId) {
    alert("Debes iniciar sesión para comentar");
    return;
  }

  await supabase.from("comments").insert({
    post_id: postId,
    user_id: userId,
    content
  });
}

export async function getComments(postId: string) {
  const { data } = await supabase
    .from("comments")
    .select("*")
    .eq("post_id", postId)
    .order("created_at", { ascending: true });

  return data ?? [];
}
