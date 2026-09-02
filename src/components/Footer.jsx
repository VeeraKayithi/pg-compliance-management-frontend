export default function Footer({
  globalWhatsappNumber,
  setGenderTab,
}) {
  const showCampusSection = (gender) => {
    setGenderTab(gender);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-stone-950 text-stone-300 py-16 sm:py-20 px-6 rounded-[2rem] sm:rounded-[3rem] mx-4 sm:mx-8 mb-6 sm:mb-8 shadow-2xl border border-stone-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
        <div className="md:col-span-5 flex flex-col items-start">
          <button
            type="button"
            className="flex items-center gap-3 mb-6 cursor-pointer group text-left"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
          >
            <div className="flex items-center justify-center h-12 w-12 bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] shrink-0 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/nandu-logo.svg"
                alt="Nandu PG"
                className="h-8 w-8 object-contain"
              />
            </div>

            <div className="flex flex-col justify-center mt-0.5">
              <h2 className="text-xl font-black tracking-tighter text-white uppercase leading-none mb-1">
                Nandu
              </h2>

              <span className="text-[9px] font-bold tracking-[0.25em] text-stone-400 uppercase leading-none">
                Premium PG
              </span>
            </div>
          </button>

          <p className="text-sm text-stone-400 leading-relaxed max-w-sm mb-8">
            Redefining premium PG spaces in Hyderabad. We offer strictly
            separate, highly secure residential campuses with zero compromise
            on quality and comfort.
          </p>
        </div>

        <div className="md:col-span-3 md:col-start-7">
          <h4 className="text-xs font-black uppercase tracking-widest text-white mb-6">
            Explore
          </h4>

          <ul className="space-y-4">
            <li>
              <button
                type="button"
                onClick={() => showCampusSection("men")}
                className="text-sm text-stone-400 hover:text-white transition-colors"
              >
                Men's PG
              </button>
            </li>

            <li>
              <button
                type="button"
                onClick={() => showCampusSection("women")}
                className="text-sm text-stone-400 hover:text-white transition-colors"
              >
                Women's PG
              </button>
            </li>

            <li>
              <a
                href={`https://wa.me/${globalWhatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-stone-400 hover:text-white transition-colors"
              >
                Book a Tour
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h4 className="text-xs font-black uppercase tracking-widest text-white mb-6">
            Headquarters
          </h4>

          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <span className="text-lg" aria-hidden="true">
                📍
              </span>

              <span className="text-sm text-stone-400 leading-relaxed">
                Madhapur, HITEC City,
                <br />
                Hyderabad, Telangana
              </span>
            </li>

            <li className="flex items-center gap-3">
              <span className="text-lg" aria-hidden="true">
                📞
              </span>

              <a
                href={`tel:+91${globalWhatsappNumber}`}
                className="text-sm text-stone-400 hover:text-white transition-colors"
              >
                +91 {globalWhatsappNumber}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-stone-800/60 gap-4">
        <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">
          © {new Date().getFullYear()} Nandu PG Accommodation. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
