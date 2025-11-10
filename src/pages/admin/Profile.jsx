import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export async function updateProfileAction({ request }) {
  try {
    await delay();
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    // Simulate profile update
    return {
      success: true,
      user: {
        id: 1,
        ...data,
        updatedAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    return handleError(error);
  }
}

export default function Profile() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    bio: user?.bio || "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update
    alert("Profile updated successfully!");
  };

  return (
    <main>
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>
      <div className=" p-6 max-w-2xl bg-surface">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium mb-2">
              Bio
            </label>
            <textarea
              id="bio"
              value={formData.bio}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, bio: e.target.value }))
              }
              rows="4"
              className="w-full p-2 border rounded"
            />
          </div>
          <button type="submit" className="btn bg-surfaceAlt">
            Save Changes
          </button>
        </form>
      </div>
    </main>
  );
}
