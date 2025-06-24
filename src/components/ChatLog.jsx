import React, { useEffect, useState } from "react";

function ChatLog({ currentUser }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [replyTo, setReplyTo] = useState(null);

  useEffect(() => {
    fetch("/messages")
      .then((r) => r.json())
      .then(setMessages);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: currentUser.id,
        content,
        reply_to_id: replyTo,
      }),
    })
      .then((r) => r.json())
      .then((newMsg) => {
        setMessages([newMsg, ...messages]);
        setContent("");
        setReplyTo(null);
      });
  }

  function handleReply(id) {
    setReplyTo(id);
  }

  function renderReplies(replies) {
    return replies.map((reply) => (
      <div key={reply.id} style={{ marginLeft: 20 }}>
        <strong>{reply.username}:</strong> {reply.content}
        <button onClick={() => handleReply(reply.id)}>Reply</button>
        {reply.replies && renderReplies(reply.replies)}
      </div>
    ));
  }

  return (
    <div>
      <h2>Chat Log</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
        {replyTo && <span>Replying to message #{replyTo}</span>}
      </form>
      <div>
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginTop: 10 }}>
            <strong>{msg.username}:</strong> {msg.content}
            <button onClick={() => handleReply(msg.id)}>Reply</button>
            {msg.replies && renderReplies(msg.replies)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatLog;