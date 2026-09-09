import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import {
  completeAccountActivation,
  validateActivationToken,
} from "../services/accountActivationService.js";

const PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,72}$/;

function getErrorMessage(error, fallback) {
  const data = error.response?.data;

  if (typeof data?.message === "string") {
    return data.message;
  }

  if (data && typeof data === "object") {
    const messages = Object.values(data).filter(
      (value) => typeof value === "string"
    );

    if (messages.length > 0) {
      return messages.join(" ");
    }
  }

  return fallback;
}

export default function ActivateAccount() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [validation, setValidation] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const validate = async () => {
      if (!token) {
        setError("The activation link is missing its token.");
        setIsValidating(false);
        return;
      }

      try {
        const response = await validateActivationToken(token);
        setValidation(response);

        if (!response.valid) {
          setError(response.message || "This activation link is invalid.");
        }
      } catch (requestError) {
        setError(
          getErrorMessage(
            requestError,
            "This activation link is invalid or has expired."
          )
        );
      } finally {
        setIsValidating(false);
      }
    };

    validate();
  }, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!PASSWORD_PATTERN.test(newPassword)) {
      setError(
        "Password must be 8 to 72 characters and contain uppercase, lowercase, and a number."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await completeAccountActivation({
        token,
        newPassword,
        confirmPassword,
      });

      setSuccessMessage(
        response.message ||
          "Account activated successfully. You can now sign in."
      );

      window.setTimeout(() => {
        navigate("/login?activated=true", { replace: true });
      }, 1800);
    } catch (requestError) {
      setError(
        getErrorMessage(
          requestError,
          "Unable to activate your account."
        )
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F5F5F0] px-4 py-8 text-stone-900 sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-lg items-center justify-center">
        <motion.section
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full rounded-[2rem] border border-stone-200 bg-white p-6 shadow-xl sm:p-8"
        >
          <div className="flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50">
              <img
                src="/nandu-logo.svg"
                alt="Nandu PG"
                className="h-8 w-8 object-contain"
              />
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-stone-400">
              Account Activation
            </p>
            <h1 className="mt-2 text-3xl font-black tracking-tighter">
              Create your private password
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-stone-500">
              Complete email verification to activate your Nandu PG portal account.
            </p>
          </div>

          {isValidating ? (
            <div className="mt-8 space-y-4">
              <div className="h-14 animate-pulse rounded-xl bg-stone-100" />
              <div className="h-14 animate-pulse rounded-xl bg-stone-100" />
              <div className="h-12 animate-pulse rounded-full bg-stone-200" />
            </div>
          ) : (
            <>
              {validation?.valid && (
                <div className="mt-6 rounded-2xl border border-stone-200 bg-stone-50 p-4">
                  <p className="text-[8px] font-bold uppercase tracking-widest text-stone-400">
                    Activating account for
                  </p>
                  <p className="mt-1 font-black text-stone-900">
                    {validation.tenantName || validation.username}
                  </p>
                  <p className="mt-1 text-xs text-stone-500">
                    Username: {validation.username}
                  </p>
                </div>
              )}

              {error && (
                <div
                  role="alert"
                  className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700"
                >
                  {error}
                </div>
              )}

              {successMessage && (
                <div
                  role="status"
                  className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700"
                >
                  {successMessage}
                </div>
              )}

              {validation?.valid && !successMessage && (
                <form onSubmit={handleSubmit} className="mt-7 space-y-5">
                  <label className="block">
                    <span className="mb-2 block text-[9px] font-bold uppercase tracking-widest text-stone-500">
                      New Password
                    </span>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(event) => setNewPassword(event.target.value)}
                        autoComplete="new-password"
                        placeholder="Create a private password"
                        className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 pr-16 text-sm outline-none transition focus:border-stone-700 focus:bg-white focus:ring-4 focus:ring-stone-100"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        className="absolute inset-y-0 right-4 text-[8px] font-bold uppercase tracking-widest text-stone-500"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[9px] font-bold uppercase tracking-widest text-stone-500">
                      Confirm Password
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      autoComplete="new-password"
                      placeholder="Re-enter your private password"
                      className="w-full rounded-xl border border-stone-200 bg-stone-50 px-4 py-3.5 text-sm outline-none transition focus:border-stone-700 focus:bg-white focus:ring-4 focus:ring-stone-100"
                    />
                  </label>

                  <p className="text-xs leading-relaxed text-stone-500">
                    Use 8 to 72 characters with at least one uppercase letter,
                    one lowercase letter, and one number.
                  </p>

                  <motion.button
                    type="submit"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    disabled={isSubmitting}
                    className="w-full rounded-full bg-stone-900 px-6 py-3.5 text-[9px] font-bold uppercase tracking-widest text-white shadow-sm transition hover:bg-stone-800 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "Activating..." : "Activate Account"}
                  </motion.button>
                </form>
              )}

              {!validation?.valid && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-stone-500">
                    Ask the administrator to resend the activation email.
                  </p>
                  <Link
                    to="/login"
                    className="mt-5 inline-flex rounded-full border border-stone-300 px-6 py-3 text-[9px] font-bold uppercase tracking-widest transition hover:border-stone-900"
                  >
                    Return to Login
                  </Link>
                </div>
              )}
            </>
          )}
        </motion.section>
      </div>
    </main>
  );
}
