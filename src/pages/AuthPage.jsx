import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast"; // ✅ Toast import

const BASE_URL = "http://localhost:5000";

function AuthPage({ setIsAuthenticated }) {
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState({ username: "", password: "" });

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
        toast.success(
          formType === "login"
            ? "Logged in successfully!"
            : "Signup successful! You're now logged in 🎉"
        );
        setIsAuthenticated(true);
      } else {
        toast.error("Invalid credentials");
      }
    } catch (err) {
      toast.dismiss();
      console.error("❌ Auth Error:", err);
      toast.error(err.response?.data?.message || "Authentication failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
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
