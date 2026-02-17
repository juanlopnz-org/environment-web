import { useEffect, useState } from "react";
import { addComment, getComments } from "../../services/comment";
import type { User } from "@supabase/supabase-js";

type Comment = {
  id: string;
  content: string;
  created_at: string;
  profiles: {
    full_name: string | null;
    avatar_url: string | null;
  } | null;
};

type Props = {
  postId: string;
  user: User | null;
};

export default function CommentList({ postId, user }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [sending, setSending] = useState(false);

  async function load() {
    const c = await getComments(postId);
    setComments(c as any);
  }

  useEffect(() => {
    load();
  }, [postId]);

  async function handleComment() {
    if (!user) {
      alert("Debes iniciar sesión");
      return;
    }

    if (!newComment.trim()) return;

    setSending(true);

    await addComment(postId, newComment, user.id);

    setNewComment("");
    setSending(false);
    load();
  }

  return (
    <div className="space-y-3">

      <div className="border-t pt-3 space-y-3 max-h-64 overflow-y-auto pr-1">

        {comments.length === 0 && (
          <p className="text-xs text-gray-400 text-center">
            Sé el primero en comentar 👀
          </p>
        )}

        {comments.map((c) => (
          <div key={c.id} className="flex gap-3 items-start">
            <img
              src={c.profiles?.avatar_url || "/default-avatar.png"}
              alt="avatar"
              className="w-8 h-8 rounded-full object-cover border"
            />
            <div className="bg-gray-100 rounded-xl px-3 py-2 text-sm max-w-[85%]">
              <p className="font-semibold text-xs text-gray-700">
                {c.profiles?.full_name || "Usuario"}
              </p>

              <p className="text-gray-800 break-words">
                {c.content}
              </p>
            </div>
          </div>
        ))}
      </div>

      {user && (
        <div className="flex gap-2 items-center pt-2">
          <img
            src={user.user_metadata?.avatar_url}
            className="w-8 h-8 rounded-full"
          />

          <input
            className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Escribe un comentario..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />

          <button
            onClick={handleComment}
            disabled={sending}
            className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:scale-105 transition disabled:opacity-50"
          >
            {sending ? "..." : "Enviar"}
          </button>
        </div>
      )}
    </div>
  );
}
