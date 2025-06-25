import React, { useEffect, useState } from "react";

function ChatLog({ currentUser }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  // Fetch messages from the server
  const fetchMessages = () => {
    setLoading(true);
    fetch(`${API_URL}/messages`)
      .then((r) => r.json())
      .then((data) => {
        setMessages(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    if (!content.trim()) return;
    fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: currentUser.id,
        content,
        reply_to_id: replyTo,
      }),
    })
      .then((r) => r.json())
      .then(() => {
        setContent("");
        setReplyTo(null);
        fetchMessages(); // Refresh messages after sending
      });
  }

  function handleReply(id) {
    setReplyTo(id);
  }

  function renderReplies(replies, level = 1) {
    return replies.map((reply) => (
      <div
        key={reply.id}
        className={`ml-${level * 4} mt-2`}
      >
        <div className="flex items-start gap-2">
          <div className="bg-blue-200 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-bold text-base">
            {(reply.username && reply.username.charAt(0).toUpperCase()) || "?"}
          </div>
          <div>
            <span className="font-semibold text-blue-700">{reply.username || "Unknown"}</span>
            <div className="bg-blue-100 text-blue-900 rounded-lg px-3 py-2 shadow max-w-lg inline-block ml-2">
              {reply.content}
            </div>
            <button
              onClick={() => handleReply(reply.id)}
              className="text-xs text-blue-500 hover:underline mt-1 ml-2"
            >
              Reply
            </button>
            {reply.replies && reply.replies.length > 0 && renderReplies(reply.replies, level + 1)}
          </div>
        </div>
      </div>
    ));
  }

  if (loading) return <div>Loading chat...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Chat Log</h2>
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
          className="border border-gray-300 rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-semibold transition"
        >
          Send
        </button>
        {replyTo && (
          <span className="ml-2 text-sm text-gray-500 self-center">
            Replying to message #{replyTo}
          </span>
        )}
      </form>
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start gap-3">
            {/* User avatar or badge */}
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-400 flex items-center justify-center text-white font-bold text-lg">
              {(msg.username && msg.username.charAt(0).toUpperCase()) || "?"}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-blue-700">{msg.username || "Unknown"}</span>
                {/* Optionally, add a timestamp here */}
              </div>
              <div className="bg-gray-100 text-gray-900 rounded-lg px-4 py-2 shadow max-w-lg">
                {msg.content}
              </div>
              <button
                onClick={() => handleReply(msg.id)}
                className="text-xs text-blue-500 hover:underline mt-1"
              >
                Reply
              </button>
              {msg.replies && msg.replies.length > 0 && (
                <div className="w-full">{renderReplies(msg.replies)}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatLog;