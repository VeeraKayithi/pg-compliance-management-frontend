import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import NotificationBell from "../../components/notifications/NotificationBell.jsx";


import { getMyTenantProfile } from "../../services/tenantService.js";
import {
  getUsername,
  logoutUser,
} from "../../services/authService.js";

function formatValue(value) {
  if (value === null || value === undefined || value === "") {
    return "Not available";
  }

  return String(value).replaceAll("_", " ");
}

function formatDate(value) {
  if (!value) {
    return "Not available";
  }

  const date = new Date(`${value}T00:00:00`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
}

export default function TenantDashboard() {
  const navigate = useNavigate();
  const username = getUsername() || "Tenant";

  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getMyTenantProfile();
      setProfile(response);
    } catch (requestError) {
      console.error("Tenant profile loading error:", requestError);

      setError(
        requestError.response?.data?.message ||
        "Unable to load your tenant profile."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate("/login", { replace: true });
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#F5F5F0] px-4 py-6 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="h-32 animate-pulse rounded-[2rem] bg-white" />

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-40 animate-pulse rounded-[2rem] bg-white"
              />
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F5F0] px-4 py-6 text-stone-900 sm:px-8 sm:py-8">
      <div className="mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-6 rounded-[2rem] border border-stone-200/70 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-400 hover:bg-white hover:shadow-md active:scale-95"
              aria-label="Open Nandu PG website"
            >
              <img
                src="/nandu-logo.svg"
                alt="Nandu PG"
                className="h-8 w-8 object-contain"
              />
            </button>

            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-stone-400">
                Resident Portal
              </p>

              <h1 className="mt-1 text-3xl font-black tracking-tighter sm:text-4xl">
                Welcome, {profile?.name || username}
              </h1>

              <p className="mt-1 text-sm text-stone-500">
                Review your accommodation and profile information.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={loadProfile}
              className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest text-stone-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-stone-900 hover:shadow-md active:scale-[0.97]"
            >
              Refresh
            </button>

            <NotificationBell destination="/tenant/notifications" />


            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full bg-stone-900 px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-md active:scale-[0.97]"
            >
              Logout
            </button>
          </div>
        </motion.header>

        {error && (
          <section className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-5 text-sm text-rose-700">
            <p className="font-semibold">Unable to load profile</p>
            <p className="mt-1">{error}</p>

            <button
              type="button"
              onClick={loadProfile}
              className="mt-4 rounded-full border border-rose-300 bg-white px-5 py-2.5 text-[8px] font-bold uppercase tracking-widest transition hover:border-rose-700"
            >
              Try Again
            </button>
          </section>
        )}

        {profile && (
          <>
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 overflow-hidden rounded-[2rem] bg-stone-900 p-6 text-white shadow-xl sm:p-8"
            >
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-stone-400">
                    Current Accommodation
                  </p>

                  <h2 className="mt-3 text-4xl font-black tracking-tighter sm:text-5xl">
                    {profile.buildingName}
                  </h2>

                  <p className="mt-2 text-sm text-stone-300">
                    Room {profile.roomNumber} · {formatValue(profile.sharingType)} Sharing
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full border px-4 py-2 text-[8px] font-bold uppercase tracking-widest ${profile.tenantStatus === "ACTIVE"
                    ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
                    : "border-stone-500 bg-stone-800 text-stone-300"
                    }`}
                >
                  {formatValue(profile.tenantStatus)} Tenant
                </span>
              </div>
            </motion.section>

            <section className="mt-8">
              <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-stone-400">
                Accommodation Details
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tighter">
                Your room at a glance
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    label: "Building",
                    value: profile.buildingName,
                    helper: `Building ID ${profile.buildingId}`,
                  },
                  {
                    label: "Room Number",
                    value: profile.roomNumber,
                    helper: `Room ID ${profile.roomId}`,
                  },
                  {
                    label: "Sharing Type",
                    value: formatValue(profile.sharingType),
                    helper: "Current room category",
                  },
                  {
                    label: "Room Status",
                    value: formatValue(profile.roomStatus),
                    helper: "Current availability status",
                  },
                  {
                    label: "Joining Date",
                    value: formatDate(profile.joiningDate),
                    helper: "PG joining date",
                  },
                  {
                    label: "Tenant Status",
                    value: formatValue(profile.tenantStatus),
                    helper: "Current resident status",
                  },
                ].map((item, index) => (
                  <motion.article
                    key={item.label}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -4 }}
                    transition={{ delay: index * 0.05 }}
                    className="rounded-[2rem] border border-stone-200/70 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-lg"
                  >
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-stone-400">
                      {item.label}
                    </p>

                    <p className="mt-4 text-2xl font-black tracking-tighter text-stone-900">
                      {item.value || "Not available"}
                    </p>

                    <p className="mt-2 text-xs text-stone-500">
                      {item.helper}
                    </p>
                  </motion.article>
                ))}
              </div>
            </section>

            <section className="mt-8 rounded-[2rem] border border-stone-200/70 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-stone-400">
                    Personal Profile
                  </p>

                  <h2 className="mt-2 text-3xl font-black tracking-tighter">
                    {profile.name}
                  </h2>
                </div>

                <span className="w-fit rounded-full border border-stone-200 bg-stone-100 px-4 py-2 text-[8px] font-bold uppercase tracking-widest text-stone-600">
                  @{profile.username}
                </span>
              </div>

              <div className="mt-7 grid gap-5 border-t border-stone-100 pt-7 sm:grid-cols-2">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400">
                    Mobile Number
                  </p>
                  <p className="mt-2 text-base font-semibold text-stone-800">
                    {profile.mobileNumber || "Not available"}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-stone-400">
                    Email Address
                  </p>
                  <p className="mt-2 break-all text-base font-semibold text-stone-800">
                    {profile.email || "Not available"}
                  </p>
                </div>
              </div>
            </section>

          </>
        )}
      </div>
    </main>
  );
}
