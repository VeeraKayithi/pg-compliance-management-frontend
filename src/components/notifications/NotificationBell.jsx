import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { getMyUnreadCount } from "../../services/notificationService.js";

export default function NotificationBell({
  destination = "/notifications",
}) {
  const navigate = useNavigate();
  const [unreadCount, setUnreadCount] = useState(0);

  const loadUnreadCount = useCallback(async () => {
    try {
      const response = await getMyUnreadCount();
      setUnreadCount(Number(response?.unreadCount) || 0);
    } catch (error) {
      console.error(
        "Unable to load unread notification count:",
        error
      );
    }
  }, []);

  useEffect(() => {
    loadUnreadCount();

    const refreshUnreadCount = () => {
      loadUnreadCount();
    };

    window.addEventListener(
      "notifications:updated",
      refreshUnreadCount
    );

    const intervalId = window.setInterval(
      loadUnreadCount,
      30000
    );

    return () => {
      window.clearInterval(intervalId);
      window.removeEventListener(
        "notifications:updated",
        refreshUnreadCount
      );
    };
  }, [loadUnreadCount]);

  const openNotifications = () => {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navigate(destination);
      });
      return;
    }

    navigate(destination);
  };

  return (
    <motion.button
      type="button"
      whileHover={{ y: -2, scale: 1.03 }}
      whileTap={{ scale: 0.92 }}
      transition={{ duration: 0.16 }}
      onClick={openNotifications}
      className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-800 shadow-sm transition-colors duration-200 hover:border-stone-900 hover:bg-stone-50 hover:shadow-md"
      aria-label={
        unreadCount > 0
          ? `${unreadCount} unread notifications`
          : "Open notifications"
      }
    >
      <motion.svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        animate={
          unreadCount > 0
            ? { rotate: [0, -8, 8, -5, 5, 0] }
            : { rotate: 0 }
        }
        transition={{ duration: 0.55, delay: 0.2 }}
      >
        <path
          d="M18 8A6 6 0 0 0 6 8c0 7-3 7-3 9h18c0-2-3-2-3-9Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 21h4"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </motion.svg>

      {unreadCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{
            type: "spring",
            stiffness: 450,
            damping: 22,
          }}
          className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-stone-900 px-1 text-[7px] font-black text-white ring-2 ring-white"
        >
          {unreadCount > 99 ? "99+" : unreadCount}
        </motion.span>
      )}
    </motion.button>
  );
}
