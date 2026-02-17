import { useEffect, useState } from "react";
import { getPosts } from "../../services/post";
import PostCard from "./PostCard";
import Modal from "./ui/Modal";
import UploadBox from "./UploadBox";
import { useAuth } from "src/hooks/useAuth";

export default function MosaicoInner() {
  const { user, loading } = useAuth();

  const [posts, setPosts] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);


  async function loadPosts() {
    const data = await getPosts();
    setPosts(data);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <span className="text-gray-500 text-lg">Cargando...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {user && (
        <div className="flex justify-center mb-10">
          <button
            onClick={() => setOpenModal(true)}
            className="
        bg-primary text-white px-6 py-3 rounded-full
        font-semibold shadow-lg
        hover:scale-105 hover:shadow-xl
        transition
      "
          >
            + Publicar fotografía
          </button>
        </div>
      )}

      {!user && (
        <p className="text-center text-gray-600 mb-10">
          Inicia sesión para subir fotos, comentar y reaccionar.
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} user={user} />
        ))}
      </div>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <h2 className="text-xl font-bold mb-4 text-primary">
          Subir nueva fotografía
        </h2>

        <UploadBox
          user={user}
          onUpload={loadPosts}
          onClose={() => setOpenModal(false)}
        />
      </Modal>

      {user && (
        <button
          onClick={() => setOpenModal(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-primary text-white text-3xl flex items-center justify-center shadow-2xl hover:scale-110 transition"
        >
          +
        </button>
      )}
    </div>

  );
}
