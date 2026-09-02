import { motion } from "framer-motion";

import mainImg from "../assets/main.jpg";

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

export default function HeroSection() {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeUpVariant}
      className="relative h-[70vh] min-h-[500px] flex items-center justify-center px-6 mt-[130px] lg:mt-[140px] rounded-[2rem] sm:rounded-[3rem] overflow-hidden mx-4 sm:mx-8 shadow-2xl border border-stone-200/50"
    >
      <div className="absolute inset-0 z-0">
        <img
          src={mainImg}
          alt="Nandu PG premium building"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-900/80 mix-blend-multiply" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto mt-12">
        <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-8">
          Now Leasing in Hyderabad
        </span>

        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-tight text-white drop-shadow-md">
          Premium PG Living.
          <br />
          <span className="text-stone-300 font-light">
            Zero Compromise.
          </span>
        </h1>

        <p className="mt-6 text-sm md:text-base text-stone-200 max-w-2xl mx-auto leading-relaxed">
          Strictly separate, highly secure residential campuses for Men and
          Women. Experience top-tier corporate living in a carefully curated
          environment.
        </p>
      </div>
    </motion.section>
  );
}
