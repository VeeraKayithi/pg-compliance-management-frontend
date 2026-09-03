import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { getUsername, logoutUser } from "../../services/authService.js";
import ActionButton from "./ActionButton.jsx";

const links = [
  { label: "Overview", path: "/admin/dashboard" },
  { label: "Buildings", path: "/admin/buildings" },
  { label: "Rooms", path: "/admin/rooms" },
  { label: "Tenants", path: "/admin/tenants" },
];

export default function AdminHeader({ title, subtitle }) {
  const navigate = useNavigate();
  const username = getUsername() || "Admin";

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  return (
    <header className="rounded-[2rem] border border-stone-200/70 bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <motion.button
            type="button"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate("/admin/dashboard")}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 shadow-sm transition-colors hover:border-stone-400 hover:bg-white"
          >
            <img src="/nandu-logo.svg" alt="Nandu PG" className="h-7 w-7 object-contain" />
          </motion.button>

          <div>
            <p className="text-[8px] font-bold uppercase tracking-[0.22em] text-stone-400">
              Nandu Management Portal · {username}
            </p>
            <h1 className="mt-1 text-2xl font-black tracking-tighter text-stone-900 sm:text-3xl">
              {title}
            </h1>
            {subtitle && <p className="mt-1 text-sm text-stone-500">{subtitle}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <nav className="flex max-w-full gap-1 overflow-x-auto rounded-full border border-stone-200 bg-stone-50 p-1 shadow-inner">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `shrink-0 rounded-full px-4 py-2 text-[8px] font-bold uppercase tracking-widest transition-all duration-200 active:scale-95 ${
                    isActive
                      ? "bg-stone-900 text-white shadow-md"
                      : "text-stone-500 hover:-translate-y-0.5 hover:bg-white hover:text-stone-900 hover:shadow-sm"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <ActionButton onClick={handleLogout} variant="secondary">
            Logout
          </ActionButton>
        </div>
      </div>
    </header>
  );
}
