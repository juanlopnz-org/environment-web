import { supabase } from "../config/supabaseConfig";

export async function uploadPost(file: File, description: string, userId: string) {
  if (!file) {
    alert("Debes seleccionar una imagen");
    return;
  }

  if (!description) {
    alert("Debes agregar una descripción");
    return;
  }  

  if (!userId) {
    alert("Debes iniciar sesión");
    return;
  }

  const fileName = `${Date.now()}-${file.name}`;

  await supabase.storage
    .from("mosaic")
    .upload(fileName, file);

  const { data } = supabase.storage
    .from("mosaic")
    .getPublicUrl(fileName);

  await supabase.from("posts").insert({
    image_url: data.publicUrl,
    user_id: userId,
    description
  });
}

export async function getPosts() {
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return data ?? [];
}
