import { useEffect, useState } from "react";
import { getReactions, getUserReaction, reactToPost,  updateReaction } from "../../services/reaction";

export default function ReactionBar({ postId, user }: any) {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [currentReaction, setCurrentReaction] = useState<"like" | "dislike" | null>(null);

  async function load() {
    const r = await getReactions(postId);
    const ur = user ? await getUserReaction(postId, user.id) : null;

    setCurrentReaction(ur);
    setLikes(r.likes);
    setDislikes(r.dislikes);
  }

  useEffect(() => {
    load();
  }, [postId]);

  async function handleReaction(type: "like" | "dislike") {
    if (!user) return alert("Debes iniciar sesión");

    if (currentReaction) {
      console.log("Actualizando reacción existente...");
      await updateReaction(postId, user.id, type);
      load();
      return;
    }

    await reactToPost(postId, type, user.id);
    load();
  }

  return (
    <div className="flex gap-4">
      <button onClick={() => handleReaction("like")} className="hover:scale-110 transition">
        👍 {likes}
      </button>

      <button onClick={() => handleReaction("dislike")} className="hover:scale-110 transition">
        👎 {dislikes}
      </button>
    </div>
  );
}
