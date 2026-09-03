import { useNavigate } from "react-router-dom";

import {
  getUsername,
  logoutUser,
} from "../../services/authService.js";

export default function TenantDashboard() {
  const navigate = useNavigate();
  const username = getUsername();

  const handleLogout = () => {
    logoutUser();
    navigate("/login", {
      replace: true,
    });
  };

  return (
    <main className="min-h-screen bg-[#F5F5F0] p-6 sm:p-10">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-[2rem] border border-stone-200/70 bg-white p-8 shadow-sm">
          <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
            Resident Portal
          </p>

          <h1 className="mt-2 text-4xl font-black tracking-tighter text-stone-900">
            Welcome, {username}
          </h1>

          <p className="mt-2 text-sm text-stone-500">
            Tenant dashboard development starts here.
          </p>

          <button
            type="button"
            onClick={handleLogout}
            className="mt-8 rounded-full bg-stone-900 px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-stone-800"
          >
            Logout
          </button>
        </div>
      </div>
    </main>
  );
}