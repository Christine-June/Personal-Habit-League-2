import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AVATAR_OPTIONS = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
  // Add more URLs as you like
];

export default function AuthPage({ setCurrentUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    bio: "",
    avatar_url: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAvatarSelect = (url) => {
    setForm({ ...form, avatar_url: url });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const url = isLogin
      ? "http://localhost:5000/login"
      : "http://localhost:5000/signup";
    const payload = isLogin
      ? { username: form.username, password: form.password }
      : form;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (res.ok && data.user) {
        localStorage.setItem("currentUser", JSON.stringify(data.user));
        setCurrentUser(data.user);
        navigate("/profile");
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded"
          required
        />
        {!isLogin && (
          <>
            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border rounded"
              required
            />
            <textarea
              name="bio"
              placeholder="Short bio"
              value={form.bio}
              onChange={handleChange}
              className="w-full mb-3 px-3 py-2 border rounded"
              rows={2}
            />
            <label className="block mb-1 font-medium">Choose an Avatar</label>
            <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
              {AVATAR_OPTIONS.map((url) => (
                <button
                  type="button"
                  key={url}
                  onClick={() => handleAvatarSelect(url)}
                  className={`border-2 rounded-full p-1 ${
                    form.avatar_url === url
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={url}
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </button>
              ))}
            </div>
            <label className="block mb-1 font-medium">
              Or paste your own image URL
            </label>
            <input
              type="url"
              name="avatar_url"
              value={form.avatar_url}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Paste image URL here"
            />
            {form.avatar_url && (
              <img
                src={form.avatar_url}
                alt="Avatar Preview"
                className="w-16 h-16 rounded-full mb-2 object-cover"
              />
            )}
          </>
        )}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded"
          required
        />
        {error && <div className="text-red-500 mb-2">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
        <p className="mt-4 text-center">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsLogin((prev) => !prev)}
            className="text-blue-600 underline"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}
