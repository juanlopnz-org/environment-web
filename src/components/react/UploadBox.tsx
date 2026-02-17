import { useState } from "react";
import { uploadPost } from "../../services/post";

export default function UploadBox({ user, onUpload, onClose}: any) {
  const [file, setFile] = useState<File | null>(null);
  const [desc, setDesc] = useState("");

  async function handleUpload() {
    if (!user) {
      alert("Debes iniciar sesión");
      return null;
    };
    if (!file) return alert("Selecciona una imagen");

    await uploadPost(file, desc, user.id);

    setDesc("");
    setFile(null);
    onUpload();
    onClose();
  }

  if (!user) {
    return (
      <p className="text-center text-gray-600 mb-10">
        Inicia sesión para subir fotos, comentar y reaccionar.
      </p>
    );
  }

  return (
    <div className="space-y-4 mb-12">
      <input type="file" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />

      <textarea
        placeholder="Describe tu fotografía..."
        className="w-full border rounded-md p-3"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button
        onClick={handleUpload}
        className="bg-primary text-white px-6 py-3 rounded-full font-semibold"
      >
        Subir fotografía
      </button>
    </div>
  );
}
