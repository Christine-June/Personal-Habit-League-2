import { useState } from "react";
import { updateUser } from "../api"; // You need to implement this API call

export default function UserSettings({ currentUser, setCurrentUser }) {
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatar_url || "");
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await updateUser(currentUser.id, { avatar_url: avatarUrl });
      setCurrentUser(updated.user);
      alert("Avatar updated!");
    } catch {
      alert("Failed to update avatar.");
    }
    setSaving(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-8 bg-white dark:bg-zinc-900 rounded-3xl shadow-xl transition-colors duration-300">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800 dark:text-white">
        Profile Settings
      </h2>

      <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
        Avatar Image URL
      </label>
      <input
        type="url"
        value={avatarUrl}
        onChange={e => setAvatarUrl(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl bg-white dark:bg-zinc-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
        placeholder="Paste image URL here"
      />

      {avatarUrl && (
        <div className="flex justify-center mb-6">
          <img
            src={avatarUrl}
            alt="Avatar Preview"
            className="w-24 h-24 rounded-full object-cover shadow-md border border-gray-300 dark:border-gray-600"
          />
        </div>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
