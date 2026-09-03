import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function PremiumSelect({
  label,
  value,
  options,
  onChange,
  placeholder = "Select an option",
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const listId = useId();

  const selectedOption = options.find(
    (option) => String(option.value) === String(value)
  );

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const selectOption = (option) => {
    onChange(option.value);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative min-w-0">
      {label && (
        <span className="mb-2 block text-[9px] font-bold uppercase tracking-[0.18em] text-stone-400">
          {label}
        </span>
      )}

      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        className={`flex w-full items-center justify-between gap-4 rounded-xl border bg-white px-4 py-3.5 text-left text-sm font-medium shadow-sm outline-none transition-all duration-200 active:scale-[0.99] ${
          open
            ? "border-stone-900 ring-4 ring-stone-200/70"
            : "border-stone-200 hover:-translate-y-0.5 hover:border-stone-400 hover:shadow-md"
        } disabled:cursor-not-allowed disabled:bg-stone-100 disabled:text-stone-400`}
      >
        <span className={selectedOption ? "text-stone-800" : "text-stone-400"}>
          {selectedOption?.label || placeholder}
        </span>

        <motion.svg
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          width="15"
          height="15"
          viewBox="0 0 20 20"
          fill="none"
          className="shrink-0 text-stone-500"
          aria-hidden="true"
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && !disabled && (
          <motion.div
            id={listId}
            role="listbox"
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 6, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="absolute left-0 right-0 z-[150] max-h-72 overflow-y-auto rounded-2xl border border-stone-200 bg-white p-2 shadow-[0_20px_50px_-20px_rgba(28,25,23,0.35)]"
          >
            {options.map((option) => {
              const selected = String(option.value) === String(value);

              return (
                <button
                  key={`${option.value}-${option.label}`}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => selectOption(option)}
                  className={`flex w-full items-center justify-between rounded-xl px-3.5 py-3 text-left text-sm transition-all duration-150 active:scale-[0.99] ${
                    selected
                      ? "bg-stone-900 font-semibold text-white"
                      : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                  }`}
                >
                  <span>{option.label}</span>
                  {selected && <span className="text-xs">✓</span>}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
