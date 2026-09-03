import { motion } from "framer-motion";

const variants = {
  primary: "border-stone-900 bg-stone-900 text-white hover:bg-stone-800",
  secondary: "border-stone-300 bg-white text-stone-800 hover:border-stone-900 hover:bg-stone-50",
  soft: "border-stone-200 bg-stone-100 text-stone-800 hover:border-stone-400 hover:bg-stone-200",
  danger: "border-stone-900 bg-white text-stone-900 hover:bg-stone-900 hover:text-white",
};

export default function ActionButton({
  children,
  variant = "secondary",
  className = "",
  disabled = false,
  type = "button",
  ...props
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      whileHover={disabled ? undefined : { y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ duration: 0.16 }}
      className={`rounded-full border px-5 py-2.5 text-[8px] font-bold uppercase tracking-widest shadow-sm transition-colors duration-200 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
