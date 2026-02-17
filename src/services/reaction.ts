import { supabase } from "../config/supabaseConfig";

export async function reactToPost(postId: string, type: "like" | "dislike", userId: string, visible = true) {
  if (!userId) {
    alert("Debes iniciar sesión para reaccionar");
    return;
  }

  await supabase
    .from("reactions")
    .upsert({
      post_id: postId,
      user_id: userId,
      type,
      visible
    });
}

export async function updateReaction(postId: string, userId: string, type: "like" | "dislike") {
  if (!userId) {
    alert("Debes iniciar sesión para eliminar tu reacción");
    return;
  }

  console.log("Actualizando reacción existente...");

  const { data } = await supabase
    .from("reactions")
    .select("*")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .single();

  await supabase
    .from("reactions")
    .update({
      visible: (data?.visible && data?.type === type ) ? false : true,
      type
    })
    .eq("post_id", postId)
    .eq("user_id", userId);
}

export async function getReactions(postId: string) {
  const { data } = await supabase
    .from("reactions")
    .select("type")
    .eq("post_id", postId)
    .eq("visible", true);

  let likes = 0;
  let dislikes = 0;

  data?.forEach(r => {
    if (r.type === "like") likes++;
    if (r.type === "dislike") dislikes++;
  });

  return { likes, dislikes };
}

export async function getUserReaction(postId: string, userId: string) {
  const { data } = await supabase
    .from("reactions")
    .select("type")
    .eq("post_id", postId)
    .eq("user_id", userId)

  return data?.[0]?.type ?? null;
}
