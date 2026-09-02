import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "../components/Navbar.jsx";
import HeroSection from "../components/HeroSection.jsx";
import CampusCard from "../components/CampusCard.jsx";
import Testimonials from "../components/Testimonials.jsx";
import FAQAccordion from "../components/FAQAccordion.jsx";
import Footer from "../components/Footer.jsx";
import Lightbox from "../components/Lightbox.jsx";

import { CAMPUS_DATA } from "../data/campuses.js";

export default function Home() {
  const [genderTab, setGenderTab] = useState("men");
  const [lightboxImg, setLightboxImg] = useState(null);

  const globalWhatsappNumber = "7569913989";
  const currentCampuses = CAMPUS_DATA[genderTab] || [];

  useEffect(() => {
    document.body.style.overflow = lightboxImg ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [lightboxImg]);

  const whatsappUrl =
    `https://wa.me/${globalWhatsappNumber}` +
    "?text=Hi!%20I%20have%20a%20few%20questions%20about%20Nandu%20PG.";

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-stone-900 antialiased font-sans selection:bg-stone-300 selection:text-stone-900 overflow-x-hidden relative">
      <Lightbox
        lightboxImg={lightboxImg}
        closeLightbox={() => setLightboxImg(null)}
      />

      <motion.a
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Contact Nandu PG on WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl transition-transform hover:scale-110"
      >
        <svg
          className="h-8 w-8"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z" />
        </svg>
      </motion.a>

      <Navbar
        genderTab={genderTab}
        setGenderTab={setGenderTab}
        globalWhatsappNumber={globalWhatsappNumber}
      />

      <HeroSection />

      <motion.section
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 mt-16 mb-12"
      >
        <div className="flex justify-center p-1.5 bg-white border border-stone-200/80 rounded-full w-fit mx-auto shadow-sm">
          <button
            type="button"
            onClick={() => setGenderTab("men")}
            className={`px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${
              genderTab === "men"
                ? "bg-slate-800 text-white shadow-md"
                : "bg-transparent text-stone-400 hover:text-stone-800"
            }`}
          >
            Men's PG
          </button>

          <button
            type="button"
            onClick={() => setGenderTab("women")}
            className={`px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${
              genderTab === "women"
                ? "bg-rose-800 text-white shadow-md"
                : "bg-transparent text-stone-400 hover:text-stone-800"
            }`}
          >
            Women's PG
          </button>
        </div>
      </motion.section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 space-y-10">
        {currentCampuses.map((campus) => (
          <CampusCard
            key={campus.id}
            campus={campus}
            gender={genderTab}
            openLightbox={setLightboxImg}
          />
        ))}
      </section>

      <Testimonials />
      <FAQAccordion />

      <Footer
        globalWhatsappNumber={globalWhatsappNumber}
        setGenderTab={setGenderTab}
      />

      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }

          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          @keyframes marquee {
            0% {
              transform: translateX(100vw);
            }

            100% {
              transform: translateX(-100%);
            }
          }

          .animate-marquee {
            display: inline-block;
            white-space: nowrap;
            animation: marquee 25s linear infinite;
          }

          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </div>
  );
}
