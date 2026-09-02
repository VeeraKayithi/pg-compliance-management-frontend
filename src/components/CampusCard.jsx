import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function CampusCard({ campus, gender, openLightbox }) {
  const [activeImage, setActiveImage] = useState(campus.images[0]);
  const isMen = gender === "men";

  useEffect(() => {
    setActiveImage(campus.images[0]);
  }, [campus]);

  return (
    <motion.div
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="flex flex-col lg:flex-row gap-6 lg:gap-10 bg-white p-5 sm:p-8 rounded-[2rem] shadow-[0_15px_35px_-15px_rgba(0,0,0,0.05)] border border-stone-200/60"
    >
      <div className="w-full lg:w-1/2 flex flex-col gap-3">
        <button
          type="button"
          className="w-full h-[260px] sm:h-[340px] bg-stone-100 rounded-[1.25rem] overflow-hidden relative cursor-zoom-in group text-left"
          onClick={() => openLightbox(activeImage)}
          aria-label={`Expand ${campus.name} image`}
        >
          <img
            src={activeImage}
            alt={campus.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 bg-white/90 backdrop-blur-sm text-stone-900 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-opacity shadow-lg">
              Expand Image
            </span>
          </div>
        </button>

        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide snap-x">
          {campus.images.map((image, index) => (
            <button
              type="button"
              key={`${campus.id}-${index}`}
              onClick={() => setActiveImage(image)}
              className={`relative h-16 w-20 sm:h-20 sm:w-28 shrink-0 snap-start rounded-xl overflow-hidden transition-all duration-300 ${
                activeImage === image
                  ? isMen
                    ? "ring-2 ring-slate-800 ring-offset-2 opacity-100"
                    : "ring-2 ring-rose-800 ring-offset-2 opacity-100"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              <img
                src={image}
                alt={`${campus.name} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`inline-block px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full ${
              isMen
                ? "bg-slate-100 text-slate-700"
                : "bg-rose-50 text-rose-700"
            }`}
          >
            {campus.tagline}
          </span>

          {campus.mapLink !== "#" && (
            <a
              href={campus.mapLink}
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest transition-colors px-2 py-1 rounded-full ${
                isMen
                  ? "text-slate-500 hover:bg-slate-50"
                  : "text-rose-500 hover:bg-rose-50"
              }`}
            >
              Map
            </a>
          )}
        </div>

        <h3 className="text-2xl sm:text-4xl font-black text-stone-900 mt-3 tracking-tighter leading-none">
          {campus.name}
        </h3>

        <p className="text-xs text-stone-500 font-medium mt-1">
          {campus.location}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {campus.neighborhood.map((perk, index) => (
            <span
              key={`${campus.id}-perk-${index}`}
              className="px-2.5 py-1 bg-stone-50 border border-stone-200 text-stone-600 text-[9px] font-bold rounded-md shadow-sm"
            >
              {perk}
            </span>
          ))}
        </div>

        <hr className="my-5 border-stone-100" />

        <h4 className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-3">
          Leasing Structure
        </h4>

        <div className="space-y-2 mb-4">
          {campus.sharingOptions.map((option, index) => (
            <div
              key={`${campus.id}-sharing-${index}`}
              className="flex justify-between items-center border-b border-stone-50 pb-2 gap-2 group"
            >
              <span className="text-xs font-semibold text-stone-600">
                {option.type}
              </span>

              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-stone-400">
                    Non-AC
                  </span>
                  <span className="text-sm font-black text-stone-700 leading-none">
                    {option.priceNonAC}
                  </span>
                </div>

                <div className="w-px h-5 bg-stone-200" />

                <div className="flex flex-col items-end">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-blue-400">
                    AC
                  </span>
                  <span className="text-sm font-black text-stone-900 leading-none">
                    {option.priceAC}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {campus.dailyPricing && (
          <div className="flex justify-between items-center bg-stone-50 py-2.5 px-4 rounded-lg border border-stone-100 mb-5">
            <div>
              <span className="block text-[9px] font-bold uppercase tracking-widest text-emerald-600 mb-0.5">
                Flexible Stay
              </span>
              <span className="text-xs font-semibold text-stone-700">
                Daily Basis
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-bold uppercase tracking-widest text-stone-400">
                  Non-AC
                </span>
                <span className="text-sm font-black text-stone-700 leading-none">
                  {campus.dailyPricing.priceNonAC}
                  <span className="text-[9px] font-normal text-stone-500">
                    /day
                  </span>
                </span>
              </div>

              <div className="w-px h-5 bg-stone-200" />

              <div className="flex flex-col items-end">
                <span className="text-[8px] font-bold uppercase tracking-widest text-blue-400">
                  AC
                </span>
                <span className="text-sm font-black text-stone-900 leading-none">
                  {campus.dailyPricing.priceAC}
                  <span className="text-[9px] font-normal text-stone-500">
                    /day
                  </span>
                </span>
              </div>
            </div>
          </div>
        )}

        <a
          href={`https://wa.me/${campus.whatsapp}?text=Hi!%20I'm%20inquiring%20about%20${encodeURIComponent(
            campus.name
          )}.`}
          target="_blank"
          rel="noreferrer"
          className={`inline-flex w-full px-6 py-3 text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-all justify-center active:scale-95 shadow-sm mt-auto ${
            isMen
              ? "bg-slate-800 hover:bg-slate-900"
              : "bg-rose-800 hover:bg-rose-900"
          }`}
        >
          Check Availability
        </a>
      </div>
    </motion.div>
  );
}
