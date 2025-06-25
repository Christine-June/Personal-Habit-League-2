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
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Profile Settings</h2>
      <label className="block mb-2 font-medium">Avatar Image URL</label>
      <input
        type="url"
        value={avatarUrl}
        onChange={e => setAvatarUrl(e.target.value)}
        className="w-full p-2 border rounded mb-4"
        placeholder="Paste image URL here"
      />
      {avatarUrl && (
        <img
          src={avatarUrl}
          alt="Avatar Preview"
          className="w-24 h-24 rounded-full mb-4 object-cover"
        />
      )}
      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {saving ? "Saving..." : "Save"}
      </button>
    </div>
  );
}