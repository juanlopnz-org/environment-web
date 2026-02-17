import ReactionBar from "./ReactionBar";
import CommentList from "./CommentList";

export default function PostCard({ post, user }: any) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
      <img src={post.image_url} className="w-full h-64 object-cover" />

      <div className="p-4 space-y-3">

        <p className="text-sm">{post.description}</p>

        <ReactionBar postId={post.id} user={user} />

        <CommentList postId={post.id} user={user} />

      </div>
    </div>
  );
}
