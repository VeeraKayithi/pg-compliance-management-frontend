import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { useNavigate } from "react-router-dom";

import {
  dismissNotification,
  getMyDismissedNotifications,
  getMyNotifications,
  getMyUnreadNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "../services/notificationService.js";
import { getRole } from "../services/authService.js";

const TABS = [
  { value: "unread", label: "Unread" },
  { value: "all", label: "All" },
  { value: "dismissed", label: "Dismissed" },
];

const PAGE_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 18,
    scale: 0.995,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.42,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const TAB_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: {
      duration: 0.16,
    },
  },
};

function formatDate(value) {
  if (!value) {
    return "Unknown time";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function severityStyle(severity) {
  if (severity === "ERROR") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  if (severity === "WARNING") {
    return "border-stone-300 bg-stone-100 text-stone-800";
  }

  return "border-slate-200 bg-slate-50 text-slate-700";
}

export default function Notifications() {
  const navigate = useNavigate();
  const role = getRole()?.toUpperCase();

  const dashboardPath =
    role === "ADMIN"
      ? "/admin/dashboard"
      : "/tenant/dashboard";

  const [activeTab, setActiveTab] = useState("unread");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState("");

  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        activeTab === "unread"
          ? await getMyUnreadNotifications()
          : activeTab === "dismissed"
            ? await getMyDismissedNotifications()
            : await getMyNotifications();

      setNotifications(
        Array.isArray(response) ? response : []
      );
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Unable to load notifications."
      );
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (item) => !item.read && !item.dismissed
      ).length,
    [notifications]
  );

  const changeTab = (tabValue) => {
    if (tabValue === activeTab) {
      return;
    }

    setActiveTab(tabValue);
  };

  const returnToDashboard = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navigate(dashboardPath);
      });
      return;
    }

    navigate(dashboardPath);
  };

  const openNotification = async (notification) => {
    try {
      setProcessingId(notification.notificationId);

      if (!notification.read) {
        await markNotificationAsRead(
          notification.notificationId
        );
      }

      if (notification.deepLink) {
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            navigate(notification.deepLink);
          });
        } else {
          navigate(notification.deepLink);
        }
      } else {
        await loadNotifications();
      }
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Unable to open notification."
      );
    } finally {
      setProcessingId(null);
    }
  };

  const markRead = async (notificationId) => {
    try {
      setProcessingId(notificationId);
      await markNotificationAsRead(notificationId);
      await loadNotifications();
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Unable to mark notification as read."
      );
    } finally {
      setProcessingId(null);
    }
  };

  const dismiss = async (notificationId) => {
    try {
      setProcessingId(notificationId);
      await dismissNotification(notificationId);
      await loadNotifications();
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Unable to dismiss notification."
      );
    } finally {
      setProcessingId(null);
    }
  };

  const markAllRead = async () => {
    try {
      await markAllNotificationsAsRead();
      await loadNotifications();
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
        "Unable to mark all notifications as read."
      );
    }
  };

  return (
    <motion.main
      variants={PAGE_VARIANTS}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-[#F5F5F0] px-4 py-6 text-stone-900 sm:px-8 sm:py-8"
    >
      <div className="mx-auto max-w-5xl">
        <header className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={returnToDashboard}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 transition hover:border-stone-400 hover:bg-white hover:shadow-md"
              >
                <img
                  src="/nandu-logo.svg"
                  alt="Nandu PG"
                  className="h-7 w-7"
                />
              </motion.button>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-stone-400">
                  Notification Center
                </p>
                <h1 className="mt-1 text-3xl font-black tracking-tighter">
                  Your notifications
                </h1>
                <p className="mt-1 text-sm text-stone-500">
                  Review account, room, and future complaint updates.
                </p>
              </div>
            </div>

            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={returnToDashboard}
              className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-[8px] font-bold uppercase tracking-widest transition hover:border-stone-900 hover:shadow-md"
            >
              Dashboard
            </motion.button>
          </div>
        </header>

        <section className="mt-6 flex flex-col gap-4 rounded-[2rem] border border-stone-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex gap-1 overflow-x-auto rounded-full bg-stone-100 p-1 app-scrollbar-horizontal">
            {TABS.map((tab) => (
              <motion.button
                key={tab.value}
                type="button"
                whileTap={{ scale: 0.96 }}
                onClick={() => changeTab(tab.value)}
                className={`relative shrink-0 rounded-full px-5 py-2.5 text-[8px] font-bold uppercase tracking-widest transition-colors duration-200 ${activeTab === tab.value
                    ? "text-white"
                    : "text-stone-500 hover:bg-white hover:text-stone-900"
                  }`}
              >
                {activeTab === tab.value && (
                  <motion.span
                    layoutId="notification-active-tab"
                    className="absolute inset-0 rounded-full bg-stone-900 shadow-sm"
                    transition={{
                      type: "spring",
                      stiffness: 420,
                      damping: 34,
                    }}
                  />
                )}
                <span className="relative z-10">
                  {tab.label}
                </span>
              </motion.button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {activeTab === "unread" && unreadCount > 0 && (
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={markAllRead}
                className="rounded-full border border-stone-300 px-5 py-2.5 text-[8px] font-bold uppercase tracking-widest transition hover:border-stone-900 hover:shadow-md"
              >
                Mark all as read
              </motion.button>
            )}

            <motion.button
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={loadNotifications}
              className="rounded-full bg-stone-900 px-5 py-2.5 text-[8px] font-bold uppercase tracking-widest text-white hover:bg-stone-800 hover:shadow-md"
            >
              Refresh
            </motion.button>
          </div>
        </section>

        {error && (
          <p className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            {error}
          </p>
        )}

        <AnimatePresence mode="wait">
          <motion.section
            key={activeTab}
            variants={TAB_VARIANTS}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mt-6"
          >
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-44 animate-pulse rounded-[2rem] bg-white"
                  />
                ))}
              </div>
            ) : notifications.length === 0 ? (
              <div className="rounded-[2rem] border border-stone-200 bg-white p-12 text-center shadow-sm">
                <h2 className="text-2xl font-black tracking-tighter">
                  No {activeTab} notifications
                </h2>
                <p className="mt-2 text-sm text-stone-500">
                  New updates will appear when a relevant event occurs.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {notifications.map((notification, index) => (
                    <motion.article
                      key={notification.notificationId}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 30 }}
                      transition={{
                        delay: index * 0.035,
                        duration: 0.24,
                      }}
                      whileHover={{ y: -2 }}
                      className={`rounded-[2rem] border bg-white p-6 shadow-sm transition-shadow hover:shadow-md ${notification.read
                          ? "border-stone-200"
                          : "border-stone-900"
                        }`}
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`rounded-full border px-3 py-1 text-[7px] font-bold uppercase tracking-widest ${severityStyle(notification.severity)}`}>
                              {notification.severity}
                            </span>
                            {!notification.read && (
                              <span className="rounded-full bg-stone-900 px-3 py-1 text-[7px] font-bold uppercase tracking-widest text-white">
                                Unread
                              </span>
                            )}
                            <span className="text-[8px] font-bold uppercase tracking-widest text-stone-400">
                              {notification.sourceModule}
                            </span>
                          </div>

                          <h2 className="mt-4 text-2xl font-black tracking-tighter">
                            {notification.title}
                          </h2>
                          <p className="mt-2 text-sm leading-relaxed text-stone-600">
                            {notification.message}
                          </p>
                          <p className="mt-4 text-xs text-stone-400">
                            {formatDate(notification.createdAt)}
                          </p>
                        </div>

                        <div className="flex shrink-0 flex-wrap gap-2">
                          {!notification.read && (
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.96 }}
                              disabled={processingId === notification.notificationId}
                              onClick={() => markRead(notification.notificationId)}
                              className="rounded-full border border-stone-300 px-4 py-2.5 text-[8px] font-bold uppercase tracking-widest hover:border-stone-900"
                            >
                              Mark read
                            </motion.button>
                          )}
                          {!notification.dismissed && (
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.96 }}
                              disabled={processingId === notification.notificationId}
                              onClick={() => dismiss(notification.notificationId)}
                              className="rounded-full border border-stone-900 bg-white px-4 py-2.5 text-[8px] font-bold uppercase tracking-widest text-stone-900 hover:bg-stone-900 hover:text-white"
                            >
                              Dismiss
                            </motion.button>
                          )}
                          {notification.deepLink && (
                            <motion.button
                              type="button"
                              whileTap={{ scale: 0.96 }}
                              disabled={processingId === notification.notificationId}
                              onClick={() => openNotification(notification)}
                              className="rounded-full bg-stone-900 px-4 py-2.5 text-[8px] font-bold uppercase tracking-widest text-white hover:bg-stone-800"
                            >
                              View
                            </motion.button>
                          )}
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </motion.section>
        </AnimatePresence>
      </div>
    </motion.main>
  );
}
