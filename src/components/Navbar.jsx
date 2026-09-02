import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Navbar({
  genderTab,
  setGenderTab,
  globalWhatsappNumber,
}) {
  const showCampusSection = (gender) => {
    setGenderTab(gender);

    window.scrollTo({
      top: 600,
      behavior: "smooth",
    });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed inset-x-0 top-0 z-50 flex flex-col shadow-sm"
    >
      <div className="flex w-full items-center overflow-hidden border-b border-stone-800 bg-stone-900 py-2 text-amber-500">
        <div className="animate-marquee inline-block cursor-default whitespace-nowrap text-[9px] font-black uppercase tracking-widest sm:text-[10px]">
          OFFICIAL NOTICE: Beware of fraudulent websites or individuals asking
          for booking amounts. This is the ONLY official Nandu PG website. We
          do not accept advance payments through unauthorized third-party
          portals.
        </div>
      </div>

      <div className="border-b border-stone-200/60 bg-[#F5F5F0]/90 px-3 py-3 backdrop-blur-xl sm:px-6 sm:py-4">
        <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 md:gap-6">
          <button
            type="button"
            className="group flex min-w-0 shrink-0 cursor-pointer items-center gap-2 text-left sm:gap-3"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-stone-100 bg-white shadow-[0_4px_10px_rgba(0,0,0,0.03)] transition-transform duration-300 group-hover:scale-105 sm:h-12 sm:w-12">
              <img
                src="/nandu-logo.svg"
                alt="Nandu PG"
                className="h-5 w-5 object-contain sm:h-8 sm:w-8"
              />
            </div>

            <div className="hidden min-w-0 flex-col justify-center sm:flex">
              <h2 className="mb-1 truncate text-base font-black uppercase leading-none tracking-tighter text-stone-900 sm:text-xl">
                Nandu
              </h2>

              <span className="truncate text-[7px] font-bold uppercase leading-none tracking-[0.1em] text-stone-400 sm:text-[9px] sm:tracking-[0.25em]">
                Premium PG
              </span>
            </div>
          </button>

          <nav className="hidden items-center justify-center gap-8 md:flex">
            <button
              type="button"
              onClick={() => showCampusSection("men")}
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                genderTab === "men"
                  ? "border-b-2 border-stone-900 pb-1 text-stone-900"
                  : "text-stone-400 hover:text-stone-900"
              }`}
            >
              Men's PG
            </button>

            <button
              type="button"
              onClick={() => showCampusSection("women")}
              className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                genderTab === "women"
                  ? "border-b-2 border-stone-900 pb-1 text-stone-900"
                  : "text-stone-400 hover:text-stone-900"
              }`}
            >
              Women's PG
            </button>
          </nav>

          <div className="col-start-3 flex shrink-0 items-center justify-end gap-2 sm:gap-3">
            <Link
              to="/login"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full border border-stone-300 bg-white px-3 py-2 text-[8px] font-bold uppercase tracking-wider text-stone-800 shadow-sm transition-all hover:border-stone-900 hover:bg-stone-50 active:scale-95 sm:px-5 sm:py-2.5 sm:text-[10px] sm:tracking-widest"
            >
              Login
            </Link>

            <a
              href={`https://wa.me/${globalWhatsappNumber}?text=Hi!%20I%20want%20to%20schedule%20a%20visit.`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-stone-900 px-3 py-2 text-[8px] font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-stone-800 active:scale-95 sm:px-6 sm:py-2.5 sm:text-[10px] sm:tracking-widest"
            >
              <span className="sm:hidden">Visit</span>
              <span className="hidden sm:inline">Book a Visit</span>
            </a>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
