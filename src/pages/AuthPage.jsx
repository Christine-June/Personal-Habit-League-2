import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"; // ✅ Toast import

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";



function AuthPage({ setIsAuthenticated }) {
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState({ username: "", password: "", avatar_url: "" });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = formType === "login" ? "/login" : "/signup";

    try {
      toast.loading(`${formType === "login" ? "Logging in..." : "Signing up..."}`);

      const res = await axios.post(`${BASE_URL}${endpoint}`, formData);

      toast.dismiss();

      if (res.data.success) {
        if (res.data.user) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setIsAuthenticated(true);
        }
        toast.success(
          formType === "login"
            ? "Logged in successfully!"
            : "Signup successful! You're now logged in 🎉"
        );
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      toast.dismiss();
      console.error("❌ Auth Error:", err);
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          {formType === "login" ? "Login" : "Sign Up"}
        </h2>
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full mb-3 px-3 py-2 border rounded"
          required
        />
        {formType === "signup" && (
          <>
            <label className="block mt-4 mb-1 font-medium">Choose an Avatar</label>
            <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
              {AVATAR_OPTIONS.map((url) => (
                <button
                  type="button"
                  key={url}
                  onClick={() => setFormData({ ...formData, avatar_url: url })}
                  className={`border-2 rounded-full p-1 ${formData.avatar_url === url ? "border-blue-500" : "border-transparent"}`}
                >
                  <img src={url} alt="avatar" className="w-12 h-12 rounded-full object-cover" />
                </button>
              ))}
            </div>
            <label className="block mb-1 font-medium">Or paste your own image URL</label>
            <input
              type="url"
              name="avatar_url"
              value={formData.avatar_url}
              onChange={handleChange}
              className="w-full p-2 border rounded mb-2"
              placeholder="Paste image URL here"
            />
            {formData.avatar_url && (
              <img
                src={formData.avatar_url}
                alt="Avatar Preview"
                className="w-16 h-16 rounded-full mb-2 object-cover"
              />
            )}
          </>
        )}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {formType === "login" ? "Login" : "Sign Up"}
        </button>
        <p className="mt-4 text-center">
          {formType === "login" ? "New here?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() =>
              setFormType((prev) => (prev === "login" ? "signup" : "login"))
            }
            className="text-blue-600 underline"
          >
            {formType === "login" ? "Sign up" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
}

export default AuthPage;
