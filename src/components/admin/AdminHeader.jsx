import { useAuth } from "../../context/AuthContext";

export default function AdminHeader() {
  const { user } = useAuth();

  return (
    <header className="bg-surface shadow-md p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold font-josefin">
          Welcome, {user?.username}
        </h1>
        <div className="flex items-center gap-4">
          <span className="">{user?.email}</span>
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name}`}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </header>
  );
}
