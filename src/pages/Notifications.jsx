import {
  useCallback,
  useEffect,
  useRef,
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
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const CONTENT_VARIANTS = {
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

function getSeverityStyle(severity) {
  if (severity === "ERROR") {
    return "border-rose-200 bg-rose-50 text-rose-700";
  }

  if (severity === "WARNING") {
    return "border-stone-300 bg-stone-100 text-stone-800";
  }

  return "border-slate-200 bg-slate-50 text-slate-700";
}

function getErrorMessage(error, fallback) {
  const responseData = error.response?.data;

  if (typeof responseData?.message === "string") {
    return responseData.message;
  }

  if (responseData && typeof responseData === "object") {
    const messages = Object.values(responseData).filter(
      (value) => typeof value === "string"
    );

    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  return fallback;
}

export default function Notifications() {
  const navigate = useNavigate();
  const hasInitialized = useRef(false);

  const role = getRole()?.replace("ROLE_", "").toUpperCase();

  const dashboardPath =
    role === "ADMIN"
      ? "/admin/dashboard"
      : "/tenant/dashboard";

  /*
   * The page opens on All because unread notifications
   * are automatically marked as read when this page opens.
   */
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState(null);
  const [error, setError] = useState("");

  const loadNotifications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      let response;

      if (activeTab === "unread") {
        response = await getMyUnreadNotifications();
      } else if (activeTab === "dismissed") {
        response = await getMyDismissedNotifications();
      } else {
        response = await getMyNotifications();
      }

      setNotifications(
        Array.isArray(response) ? response : []
      );
    } catch (requestError) {
      setError(
        getErrorMessage(
          requestError,
          "Unable to load notifications."
        )
      );
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  /*
   * Opening the Notification Center means the recipient
   * has seen the notifications. Mark all current unread
   * notifications as read, update the bell immediately,
   * and keep the notifications visible under All.
   */
  useEffect(() => {
    if (hasInitialized.current) {
      return;
    }

    hasInitialized.current = true;

    const initializeNotificationCenter = async () => {
      try {
        setLoading(true);
        setError("");

        await markAllNotificationsAsRead();

        window.dispatchEvent(
          new CustomEvent("notifications:updated")
        );

        const response = await getMyNotifications();

        setNotifications(
          Array.isArray(response) ? response : []
        );
      } catch (requestError) {
        setError(
          getErrorMessage(
            requestError,
            "Unable to open the Notification Center."
          )
        );
      } finally {
        setLoading(false);
      }
    };

    initializeNotificationCenter();
  }, []);

  /*
   * This effect is only for user-triggered tab changes.
   * Initialization is handled separately above.
   */
  useEffect(() => {
    if (!hasInitialized.current) {
      return;
    }

    loadNotifications();
  }, [activeTab, loadNotifications]);

  const changeTab = (tabValue) => {
    if (tabValue !== activeTab) {
      setActiveTab(tabValue);
    }
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
      setError("");

      /*
       * This is kept as a safety check for a notification
       * that arrives after the page was initialized.
       */
      if (!notification.read) {
        await markNotificationAsRead(
          notification.notificationId
        );

        window.dispatchEvent(
          new CustomEvent("notifications:updated")
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
        getErrorMessage(
          requestError,
          "Unable to open the notification."
        )
      );
    } finally {
      setProcessingId(null);
    }
  };

  const dismiss = async (notificationId) => {
    const previousNotifications = notifications;

    try {
      setProcessingId(notificationId);
      setError("");

      /*
       * Remove the item locally first. AnimatePresence handles
       * the exit animation and Framer Motion layout smoothly
       * repositions the remaining cards without a full reload.
       */
      setNotifications((currentNotifications) =>
        currentNotifications.filter(
          (notification) =>
            notification.notificationId !== notificationId
        )
      );

      await dismissNotification(notificationId);

      window.dispatchEvent(
        new CustomEvent("notifications:updated")
      );
    } catch (requestError) {
      /* Restore the list when the backend operation fails. */
      setNotifications(previousNotifications);

      setError(
        getErrorMessage(
          requestError,
          "Unable to dismiss the notification."
        )
      );
    } finally {
      setProcessingId(null);
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
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 transition hover:border-stone-400 hover:bg-white hover:shadow-md"
                aria-label="Return to dashboard"
              >
                <img
                  src="/nandu-logo.svg"
                  alt="Nandu PG"
                  className="h-7 w-7 object-contain"
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
                  Opening this page automatically marks new notifications as read.
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
          <nav className="app-scrollbar-horizontal flex gap-1 overflow-x-auto rounded-full bg-stone-100 p-1">
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

          <motion.button
            type="button"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={loadNotifications}
            disabled={loading}
            className="rounded-full bg-stone-900 px-5 py-2.5 text-[8px] font-bold uppercase tracking-widest text-white transition hover:bg-stone-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Refreshing..." : "Refresh"}
          </motion.button>
        </section>

        {error && (
          <div
            role="alert"
            className="mt-5 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
          >
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.section
            key={activeTab}
            variants={CONTENT_VARIANTS}
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
                      exit={{
                        opacity: 0,
                        x: 36,
                        scale: 0.98,
                        height: 0,
                        marginBottom: 0,
                        transition: {
                          duration: 0.24,
                          ease: [0.4, 0, 1, 1],
                        },
                      }}
                      transition={{
                        layout: {
                          type: "spring",
                          stiffness: 380,
                          damping: 34,
                        },
                        opacity: {
                          delay: index * 0.025,
                          duration: 0.2,
                        },
                        y: {
                          delay: index * 0.025,
                          duration: 0.2,
                        },
                      }}
                      whileHover={{ y: -2 }}
                      className="overflow-hidden rounded-[2rem] border border-stone-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-full border px-3 py-1 text-[7px] font-bold uppercase tracking-widest ${getSeverityStyle(
                                notification.severity
                              )}`}
                            >
                              {notification.severity}
                            </span>

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
                          {!notification.dismissed && (
                            <motion.button
                              type="button"
                              whileHover={{ y: -1 }}
                              whileTap={{ scale: 0.96 }}
                              disabled={
                                processingId ===
                                notification.notificationId
                              }
                              onClick={() =>
                                dismiss(
                                  notification.notificationId
                                )
                              }
                              className="rounded-full border border-stone-900 bg-white px-4 py-2.5 text-[8px] font-bold uppercase tracking-widest text-stone-900 transition hover:bg-stone-900 hover:text-white disabled:opacity-50"
                            >
                              {processingId ===
                                notification.notificationId
                                ? "Updating..."
                                : "Dismiss"}
                            </motion.button>
                          )}

                          {notification.deepLink && (
                            <motion.button
                              type="button"
                              whileHover={{ y: -1 }}
                              whileTap={{ scale: 0.96 }}
                              disabled={
                                processingId ===
                                notification.notificationId
                              }
                              onClick={() =>
                                openNotification(notification)
                              }
                              className="rounded-full bg-stone-900 px-4 py-2.5 text-[8px] font-bold uppercase tracking-widest text-white transition hover:bg-stone-800 disabled:opacity-50"
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
