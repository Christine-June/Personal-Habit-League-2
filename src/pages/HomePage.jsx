import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CommentModal({ open, onClose, comments, onAddComment }) {
  const [newComment, setNewComment] = useState("");
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded shadow-lg w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-500 text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-lg font-bold mb-2">Comments</h2>
        <ul className="mb-4 max-h-40 overflow-y-auto">
          {comments.map((c) => (
            <li key={c.id} className="mb-2">
              <span className="font-bold">{c.user}:</span> {c.content}
            </li>
          ))}
        </ul>
        <form
          onSubmit={e => {
            e.preventDefault();
            onAddComment(newComment);
            setNewComment("");
          }}
        >
          <input
            className="w-full border rounded p-2 mb-2"
            placeholder="Write a comment..."
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            required
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" type="submit">
            Post
          </button>
          <button
            type="button"
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
            onClick={onClose}
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
}

export default function HomePage({ sidebarExpanded }) {
  const marginClass = sidebarExpanded ? 'md:ml-64' : 'md:ml-20';
  const navigate = useNavigate();

  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [commentModal, setCommentModal] = useState({ open: false, comments: [], itemId: null, itemType: null });

  useEffect(() => {
    fetch('http://localhost:5000/feed')
      .then(res => res.json())
      .then(data => {
        setFeed(data);
        setLoading(false);
        // Initialize likeCounts for each item (default to 0)
        const initialCounts = {};
        data.forEach(item => {
          const likeKey = `${item.type}-${item.id}`;
          initialCounts[likeKey] = 0;
        });
        setLikeCounts(initialCounts);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleAddComment = (content) => {
    setCommentModal((modal) => ({
      ...modal,
      comments: [...modal.comments, { id: Date.now(), user: "You", content }]
    }));
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-500">Loading feed...</div>;
  }

  return (
    <div className={`min-h-screen flex flex-col bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 transition-colors duration-300 pt-16 ${marginClass}`}>
      <div className="flex justify-center py-8">
        <div className="w-full max-w-xl flex flex-col gap-6">
          <h1 className="text-2xl font-bold mb-2">Feed</h1>
          {feed.map((item) => {
            const likeKey = `${item.type}-${item.id}`;
            return (
              <div
                key={likeKey}
                tabIndex={0}
                role="button"
                onClick={e => {
                  // Only navigate if the click is directly on the card, not a child (like button)
                  if (e.target === e.currentTarget) {
                    navigate(item.type === "habit" ? `/habits/${item.id}` : `/challenges/${item.id}`);
                  }
                }}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow p-6 flex flex-col gap-2 cursor-pointer transition-transform hover:scale-[1.02] hover:shadow-lg focus:ring-2 focus:ring-indigo-400 outline-none"
              >
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 flex items-center justify-center text-lg font-bold text-white overflow-hidden border border-gray-300">
                    {item.avatar_url ? (
                      <img
                        src={item.avatar_url}
                        alt={item.user}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      item.user?.[0]?.toUpperCase()
                    )}
                  </div>
                  <div>
                    <div className="font-semibold">{item.user}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(item.created_at).toLocaleString(undefined, {
                        weekday: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                  <span className={`ml-auto px-2 py-0.5 rounded-full text-xs font-semibold
                    ${item.type === "habit"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-pink-100 text-pink-600"}
                  `}>
                    {item.type === "habit" ? "Habit" : "Challenge"}
                  </span>
                </div>
                <div className="font-bold text-lg">{item.title}</div>
                <div className="text-gray-600 dark:text-gray-300">{item.description}</div>
                <div className="flex gap-4 mt-2">
                  {/* Like Button */}
                  <div className="flex flex-col items-center">
                    <button
                      onClick={e => {
                        e.stopPropagation(); // This prevents the card's onClick from firing!
                        setLiked(l => ({ ...l, [likeKey]: !l[likeKey] }));
                        setLikeCounts(counts => ({
                          ...counts,
                          [likeKey]: !liked[likeKey]
                            ? (counts[likeKey] || 0) + 1
                            : Math.max((counts[likeKey] || 0) - 1, 0)
                        }));
                      }}
                      className={`text-2xl transition transform ${liked[likeKey] ? "text-blue-500 scale-125" : "text-black scale-100"}`}
                      aria-label="Like"
                      title={liked[likeKey] ? "Unlike" : "Like"}
                    >
                      👍
                    </button>
                    <span className="text-xs text-gray-500 mt-1">{liked[likeKey] ? 1 : 0}</span>
                  </div>
                  {/* Comment Button */}
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      setCommentModal({ open: true, comments: item.comments || [], itemId: item.id, itemType: item.type });
                    }}
                    className="text-2xl text-gray-400 transition hover:text-blue-500"
                    aria-label="Comment"
                  >
                    💬
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Comment Modal */}
      <CommentModal
        open={commentModal.open}
        onClose={() => setCommentModal({ ...commentModal, open: false })}
        comments={commentModal.comments}
        onAddComment={handleAddComment}
      />
    </div>
  );
}