import { useEffect, useState } from "react";
import { addComment, getComments } from "../../services/comment";

export default function CommentList({ postId, user }: any) {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");

  async function load() {
    const c = await getComments(postId);
    setComments(c);
  }

  useEffect(() => {
    load();
  }, [postId]);

  async function handleComment() {
    if (!user) return alert("Debes iniciar sesión");
    if (!newComment.trim()) return;

    await addComment(postId, newComment, user.id);
    setNewComment("");
    load();
  }

  return (
    <div className="space-y-3">

      <div className="border-t pt-3 space-y-2 max-h-40 overflow-y-auto">
        {comments.map(c => (
          <p key={c.id} className="text-xs bg-gray-100 p-2 rounded">
            {c.content}
          </p>
        ))}
      </div>

      {user && (
        <div className="flex gap-2">
          <input
            className="flex-1 border rounded p-2 text-sm"
            placeholder="Escribe un comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleComment}
            className="bg-primary text-white px-3 rounded"
          >
            Enviar
          </button>
        </div>
      )}

    </div>
  );
}
