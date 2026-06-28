import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 1. IMPORT YOUR IMAGES HERE ---
import mainImg from './assets/main.jpg';

import ashwa1 from './assets/ashwamedha-1.jpg';
import ashwa2 from './assets/ashwamedha-2.jpg';
import ashwa3 from './assets/ashwamedha-3.jpg';
import ashwa4 from './assets/ashwamedha-4.jpg'; 
import ashwa5 from './assets/ashwamedha-5.jpg';
import ashwa6 from './assets/ashwamedha-6.jpg';

import tri1 from './assets/trinetra-1.jpg';
import tri2 from './assets/trinetra-2.jpg';
import tri3 from './assets/trinetra-3.jpg';
import tri4 from './assets/trinetra-4.jpg';

import sindhoor1 from './assets/sindhoor-1.jpg';
import sindhoor2 from './assets/sindhoor-2.jpg';
import sindhoor3 from './assets/sindhoor-3.jpg';
import sindhoor4 from './assets/sindhoor-4.jpg';

import skanda1 from './assets/skanda-1.jpg';
import skanda2 from './assets/skanda-2.jpg';
import skanda3 from './assets/skanda-3.jpg';
import skanda4 from './assets/skanda-4.jpg';
import skanda5 from './assets/skanda-5.jpg';
import skanda6 from './assets/skanda-6.jpg';

// --- DATA CONFIGURATION ---
const CAMPUS_DATA = {
  men: [
    {
      id: 'ashwamedha',
      name: 'Campus Ashwamedha',
      tagline: 'Independent Men\'s PG',
      location: 'Patrika Nagar, HITEC City, Hyderabad',
      mapLink: 'https://maps.app.goo.gl/toGoRZRHaNWJv3dC7?g_st=ic',
      whatsapp: '7569913989', 
      images: [ashwa1, ashwa2, ashwa3, ashwa4, ashwa5, ashwa6], 
      neighborhood: ['🚶‍♂️ 5 mins to Raheja Mindspace', '🚇 10 mins to Raidurg Metro'],
      sharingOptions: [
        { type: 'Single Room', priceNonAC: '₹15,000', priceAC: '₹17,000' },
        { type: 'Two Sharing', priceNonAC: '₹8,500', priceAC: '₹10,500' },
        { type: 'Three Sharing', priceNonAC: '₹6,500', priceAC: '₹8,500' },
        { type: 'Four Sharing', priceNonAC: '₹5,500', priceAC: '₹7,500' }
      ],
      dailyPricing: { priceNonAC: '₹500', priceAC: '₹800' }
    },
    {
      id: 'trinetra',
      name: 'Campus Trinetra',
      tagline: 'Independent Men\'s PG',
      location: 'Khajaguda - Nanakramguda Rd, Rai Durg, Hyderabad',
      mapLink: 'https://maps.app.goo.gl/W93VqEoiVtTGbPas7', 
      whatsapp: '7569913989', 
      images: [tri1, tri2, tri3, tri4],
      neighborhood: ['🏢 5 mins to Financial District', '☕ 2 mins to Starbucks'],
      sharingOptions: [
        { type: 'Single Room', priceNonAC: '₹15,000', priceAC: '₹17,000' },
        { type: 'Two Sharing', priceNonAC: '₹8,500', priceAC: '₹10,500' },
        { type: 'Three Sharing', priceNonAC: '₹6,500', priceAC: '₹8,500' },
        { type: 'Four Sharing', priceNonAC: '₹5,500', priceAC: '₹7,500' }
      ],
      dailyPricing: { priceNonAC: '₹500', priceAC: '₹800' }
    }
  ],
  women: [
    {
      id: 'sindhoor',
      name: 'Campus Sindhoor',
      tagline: 'Secure Women\'s PG',
      location: 'Ayyappa Society, Mega Hills, Madhapur, Hyderabad',
      mapLink: 'https://maps.app.goo.gl/aEGCvCFps7VJvMhb6', 
      whatsapp: '7569913989', 
      images: [sindhoor1, sindhoor2, sindhoor3, sindhoor4], 
      neighborhood: ['🛒 2 mins to Ratnadeep Supermarket', '🚇 8 mins to Madhapur Metro'],
      sharingOptions: [
       { type: 'Single Room', priceNonAC: '₹15,000', priceAC: '₹17,000' },
       { type: 'Two Sharing', priceNonAC: '₹8,500', priceAC: '₹10,500' },
       { type: 'Three Sharing', priceNonAC: '₹6,500', priceAC: '₹8,500' },
       { type: 'Four Sharing', priceNonAC: '₹5,500', priceAC: '₹7,500' }
      ],
      dailyPricing: { priceNonAC: '₹500', priceAC: '₹800' }
    },
    {
      id: 'skanda',
      name: 'Campus Skanda',
      tagline: 'Secure Women\'s PG',
      location: 'Rai Durg, Hyderabad',
      mapLink: 'https://maps.app.goo.gl/jWMHjRkthCGGvorq9', 
      whatsapp: '7569913989', 
      images: [skanda1, skanda2, skanda3, skanda4, skanda5, skanda6], 
      neighborhood: ['🏢 5 mins to Knowledge City', '🏥 3 mins to Care Hospitals'],
      sharingOptions: [
       { type: 'Single Room', priceNonAC: '₹15,000', priceAC: '₹17,000' },
       { type: 'Two Sharing', priceNonAC: '₹8,500', priceAC: '₹10,500' },
       { type: 'Three Sharing', priceNonAC: '₹6,500', priceAC: '₹8,500' },
       { type: 'Four Sharing', priceNonAC: '₹5,500', priceAC: '₹7,500' }
      ],
      dailyPricing: { priceNonAC: '₹500', priceAC: '₹800' }
    }
  ]
};

const FAQ_DATA = [
  { question: 'What is included in the monthly rent?', answer: 'Your monthly rent covers your fully furnished room, 3 times daily homestyle meals, high-speed Wi-Fi, daily housekeeping, and 24/7 security. AC options include dedicated air conditioning for your room.' },
  { question: 'Is there a security deposit?', answer: 'Yes, we require a standard 1-month security deposit at the time of booking. This is fully refundable at the end of your stay, provided a 30-day notice is given. (Daily stays do not require a standard month deposit).' },
  { question: 'What are the timing restrictions?', answer: 'As a premium PG for working professionals, there are no restrictive curfews. However, biometric access is strictly monitored 24/7 for your safety.' },
  { question: 'Are the Men\'s and Women\'s campuses entirely separate?', answer: 'Absolutely. Our campuses are strictly independent buildings in different locations to ensure complete privacy, comfort, and top-tier security for all residents.' }
];

const TESTIMONIALS = [
  { text: "The cleanliness and food quality here are unmatched. It genuinely feels like a premium hotel rather than a PG. Best decision I made since moving to Hyderabad.", author: "Rahul V.", role: "Software Engineer, TCS" },
  { text: "Security was my top priority. The biometric access, CCTV, and strict management make me feel completely safe. The Wi-Fi is also perfect for my WFH days.", author: "Priya S.", role: "Data Analyst, Deloitte" },
  { text: "I've stayed in multiple PGs in Madhapur, and Nandu PG is by far the most professional. Maintenance issues are resolved within hours, not days.", author: "Karthik M.", role: "Product Manager" }
];

// --- ANIMATION VARIANTS ---
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

// --- CUSTOM INTERACTIVE CAMPUS CARD ---
function CampusCard({ campus, gender, openLightbox }) {
  const [activeImage, setActiveImage] = useState(campus.images[0]);
  const isMen = gender === 'men';
  
  return (
    <motion.div 
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className="flex flex-col lg:flex-row gap-6 lg:gap-10 bg-white p-5 sm:p-8 rounded-[2rem] shadow-[0_15px_35px_-15px_rgba(0,0,0,0.05)] border border-stone-200/60"
    >
      <div className="w-full lg:w-1/2 flex flex-col gap-3">
        <div 
          className="w-full h-[260px] sm:h-[340px] bg-stone-100 rounded-[1.25rem] overflow-hidden relative cursor-zoom-in group"
          onClick={() => openLightbox(activeImage)}
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
        </div>
        
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide snap-x">
          {campus.images.map((img, i) => (
            <button 
              key={i} 
              onClick={() => setActiveImage(img)}
              className={`relative h-16 w-20 sm:h-20 sm:w-28 shrink-0 snap-start rounded-xl overflow-hidden transition-all duration-300 ${
                activeImage === img 
                  ? (isMen ? 'ring-2 ring-slate-800 ring-offset-2 opacity-100' : 'ring-2 ring-rose-800 ring-offset-2 opacity-100') 
                  : 'opacity-50 hover:opacity-100'
              }`}
            >
              <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <div className="flex items-center justify-between gap-2">
          <span className={`inline-block px-3 py-1 text-[9px] font-bold uppercase tracking-widest rounded-full ${
            isMen ? 'bg-slate-100 text-slate-700' : 'bg-rose-50 text-rose-700'
          }`}>
            {campus.tagline}
          </span>
          {campus.mapLink !== '#' && (
            <a href={campus.mapLink} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest transition-colors px-2 py-1 rounded-full ${isMen ? 'text-slate-500 hover:bg-slate-50' : 'text-rose-500 hover:bg-rose-50'}`}>
              📍 Map
            </a>
          )}
        </div>
        
        <h3 className="text-2xl sm:text-4xl font-black text-stone-900 mt-3 tracking-tighter leading-none">{campus.name}</h3>
        <p className="text-xs text-stone-500 font-medium mt-1">{campus.location}</p>
        
        <div className="mt-3 flex flex-wrap gap-1.5">
          {campus.neighborhood.map((perk, idx) => (
            <span key={idx} className="px-2.5 py-1 bg-stone-50 border border-stone-200 text-stone-600 text-[9px] font-bold rounded-md shadow-sm">
              {perk}
            </span>
          ))}
        </div>

        <hr className="my-5 border-stone-100" />

        <h4 className="text-[9px] font-bold uppercase tracking-widest text-stone-400 mb-3">Leasing Structure</h4>
        
        <div className="space-y-2 mb-4">
          {campus.sharingOptions.map((option, i) => (
            <div key={i} className="flex justify-between items-center border-b border-stone-50 pb-2 gap-2 group">
              <span className="text-xs font-semibold text-stone-600">{option.type}</span>
              
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-stone-400">Non-AC</span>
                  <span className="text-sm font-black text-stone-700 leading-none">{option.priceNonAC}</span>
                </div>
                
                <div className="w-px h-5 bg-stone-200"></div>
                
                <div className="flex flex-col items-end">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-blue-400">AC</span>
                  <span className="text-sm font-black text-stone-900 leading-none">{option.priceAC}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- DAILY PRICING BLOCK --- */}
        {campus.dailyPricing && (
          <div className="flex justify-between items-center bg-stone-50 py-2.5 px-4 rounded-lg border border-stone-100 mb-5">
            <div>
              <span className="block text-[9px] font-bold uppercase tracking-widest text-emerald-600 mb-0.5">Flexible Stay</span>
              <span className="text-xs font-semibold text-stone-700">Daily Basis</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-bold uppercase tracking-widest text-stone-400">Non-AC</span>
                <span className="text-sm font-black text-stone-700 leading-none">
                  {campus.dailyPricing.priceNonAC}<span className="text-[9px] font-normal text-stone-500">/day</span>
                </span>
              </div>
              <div className="w-px h-5 bg-stone-200"></div>
              <div className="flex flex-col items-end">
                <span className="text-[8px] font-bold uppercase tracking-widest text-blue-400">AC</span>
                <span className="text-sm font-black text-stone-900 leading-none">
                  {campus.dailyPricing.priceAC}<span className="text-[9px] font-normal text-stone-500">/day</span>
                </span>
              </div>
            </div>
          </div>
        )}

        <a 
          href={`https://wa.me/${campus.whatsapp}?text=Hi!%20I'm%20inquiring%20about%20${encodeURIComponent(campus.name)}.`}
          target="_blank" rel="noreferrer"
          className={`inline-flex w-full px-6 py-3 text-white text-[10px] font-bold uppercase tracking-widest rounded-full transition-all justify-center active:scale-95 shadow-sm mt-auto ${
            isMen ? 'bg-slate-800 hover:bg-slate-900' : 'bg-rose-800 hover:bg-rose-900'
          }`}
        >
          Check Availability
        </a>
      </div>
    </motion.div>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [genderTab, setGenderTab] = useState('men');
  const [lightboxImg, setLightboxImg] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const globalWhatsappNumber = "7569913989"; 
  const currentCampuses = CAMPUS_DATA[genderTab];

  useEffect(() => {
    if (lightboxImg) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [lightboxImg]);

  return (
    <div className="min-h-screen bg-[#F5F5F0] text-stone-900 antialiased font-sans selection:bg-stone-300 selection:text-stone-900 overflow-x-hidden relative">
      
      {/* --- CINEMATIC LIGHTBOX OVERLAY --- */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-10 cursor-zoom-out"
            onClick={() => setLightboxImg(null)}
          >
            <button className="absolute top-6 right-6 text-white bg-white/10 hover:bg-white/20 rounded-full p-3 transition-colors">
              ✕
            </button>
            <motion.img 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", bounce: 0 }}
              src={lightboxImg} alt="Enlarged Campus" 
              className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain cursor-default"
              onClick={(e) => e.stopPropagation()} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FLOATING CONCIERGE (WHATSAPP) --- */}
      <motion.a
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: "spring" }}
        href={`https://wa.me/${globalWhatsappNumber}?text=Hi!%20I%20have%20a%20few%20questions%20about%20Nandu%20PG.`}
        target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center group"
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-75"></span>
        <svg className="w-8 h-8 relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824z"/></svg>
      </motion.a>

      {/* --- ELEGANT HEADER --- */}
      <motion.header 
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex flex-col shadow-sm"
      >
        <div className="bg-stone-900 text-amber-500 overflow-hidden py-2 flex items-center relative w-full border-b border-stone-800">
          <div className="animate-marquee text-[9px] sm:text-[10px] font-black uppercase tracking-widest inline-block whitespace-nowrap cursor-default">
            🚨 OFFICIAL NOTICE: Beware of fraudulent websites or individuals asking for booking amounts. This is the ONLY official Nandu PG website. We do not accept advance payments through unauthorized third-party portals. 🚨
          </div>
        </div>

        <div className="bg-[#F5F5F0]/90 backdrop-blur-xl border-b border-stone-200/60 px-3 sm:px-6 py-3 sm:py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 cursor-pointer group shrink" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="flex items-center justify-center h-9 w-9 sm:h-12 sm:w-12 bg-white rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.03)] border border-stone-100 shrink-0 transition-transform duration-300 group-hover:scale-105">
                <img src="/nandu-logo.svg" alt="Nandu PG" className="h-5 w-5 sm:h-8 sm:w-8 object-contain" />
              </div>
              <div className="flex flex-col justify-center mt-0.5 min-w-0">
                <h2 className="text-base sm:text-xl font-black tracking-tighter text-stone-900 uppercase leading-none mb-1 truncate">Nandu</h2>
                <span className="text-[7px] sm:text-[9px] font-bold tracking-[0.1em] sm:tracking-[0.25em] text-stone-400 uppercase leading-none truncate">Premium PG</span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-8">
              <button onClick={() => { setGenderTab('men'); window.scrollTo({ top: 600, behavior: 'smooth' }); }} className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${genderTab === 'men' ? 'text-stone-900 border-b-2 border-stone-900 pb-1' : 'text-stone-400 hover:text-stone-900'}`}>
                Men's PG
              </button>
              <button onClick={() => { setGenderTab('women'); window.scrollTo({ top: 600, behavior: 'smooth' }); }} className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${genderTab === 'women' ? 'text-stone-900 border-b-2 border-stone-900 pb-1' : 'text-stone-400 hover:text-stone-900'}`}>
                Women's PG
              </button>
            </nav>
            
            <a href={`https://wa.me/${globalWhatsappNumber}?text=Hi!%20I%20want%20to%20schedule%20a%20visit.`} target="_blank" rel="noreferrer" className="shrink-0 whitespace-nowrap px-4 sm:px-7 py-2 sm:py-2.5 bg-stone-900 text-white text-[9px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest rounded-full hover:bg-stone-800 transition-transform active:scale-95 shadow-sm">
              Book a Visit
            </a>
          </div>
        </div>
      </motion.header>

      {/* --- HERO SECTION (FLOATING CARD DESIGN) --- */}
      <motion.section 
        initial="hidden" 
        animate="visible" 
        variants={fadeUpVariant} 
        className="relative h-[70vh] min-h-[500px] flex items-center justify-center px-6 mt-[130px] lg:mt-[140px] rounded-[2rem] sm:rounded-[3rem] overflow-hidden mx-4 sm:mx-8 shadow-2xl border border-stone-200/50"
      >
        <div className="absolute inset-0 z-0">
          <img src={mainImg} alt="Premium Building" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-900/60 via-stone-900/40 to-stone-900/80 mix-blend-multiply"></div>
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto mt-12">
          <span className="inline-block px-5 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-8">
            Now Leasing in Hyderabad
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter leading-tight text-white drop-shadow-md">
            Premium PG Living. <br />
            <span className="text-stone-300 font-light">Zero Compromise.</span>
          </h1>
          <p className="mt-6 text-sm md:text-base text-stone-200 max-w-2xl mx-auto leading-relaxed">
            Strictly separate, highly secure residential campuses for Men and Women. Experience top-tier corporate living in a carefully curated environment.
          </p>
        </div>
      </motion.section>

      {/* --- TAB SWITCHER --- */}
      <motion.section initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="max-w-7xl mx-auto px-6 mt-16 mb-12">
        <div className="flex justify-center p-1.5 bg-white border border-stone-200/80 rounded-full w-fit mx-auto shadow-sm">
          <button onClick={() => setGenderTab('men')} className={`px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${genderTab === 'men' ? 'bg-slate-800 text-white shadow-md' : 'bg-transparent text-stone-400 hover:text-stone-800'}`}>
            Men's PG
          </button>
          <button onClick={() => setGenderTab('women')} className={`px-8 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-full transition-all duration-300 ${genderTab === 'women' ? 'bg-rose-800 text-white shadow-md' : 'bg-transparent text-stone-400 hover:text-stone-800'}`}>
            Women's PG
          </button>
        </div>
      </motion.section>

      {/* --- CAMPUS LIST --- */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-24 space-y-10">
        {currentCampuses.map((campus) => (
          <CampusCard key={campus.id} campus={campus} gender={genderTab} openLightbox={setLightboxImg} />
        ))}
      </section>

      {/* --- TESTIMONIAL CAROUSEL --- */}
      <section className="bg-stone-900 py-24 px-6 mx-4 sm:mx-8 rounded-[2rem] sm:rounded-[3rem] mb-16 overflow-hidden shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-16 text-center text-white">Resident Experiences</h2>
          <div className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x">
            {TESTIMONIALS.map((review, i) => (
              <div key={i} className="min-w-[300px] sm:min-w-[400px] bg-stone-800/50 backdrop-blur-md p-8 rounded-3xl snap-center border border-stone-700/50">
                <div className="text-yellow-500 mb-4 text-lg">★★★★★</div>
                <p className="text-stone-300 italic mb-6 leading-relaxed">"{review.text}"</p>
                <div>
                  <h4 className="text-white font-bold">{review.author}</h4>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{review.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FAQ ACCORDION --- */}
      <section className="max-w-3xl mx-auto px-6 py-16 mb-16">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-12 text-center text-stone-900">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <div key={index} className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full text-left px-6 py-5 flex justify-between items-center font-bold text-stone-900 focus:outline-none"
              >
                {faq.question}
                <span className="text-stone-400 text-xl font-light">{openFaq === index ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {openFaq === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-5 text-sm text-stone-500 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER (FLOATING CARD DESIGN) --- */}
      <footer className="bg-stone-950 text-stone-300 py-16 sm:py-20 px-6 rounded-[2rem] sm:rounded-[3rem] mx-4 sm:mx-8 mb-6 sm:mb-8 shadow-2xl border border-stone-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">
          <div className="md:col-span-5 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="flex items-center justify-center h-12 w-12 bg-white rounded-xl shadow-[0_4px_15px_rgba(0,0,0,0.3)] shrink-0 transition-transform duration-300 group-hover:scale-105">
                <img src="/nandu-logo.svg" alt="Nandu PG" className="h-8 w-8 object-contain" />
              </div>
              <div className="flex flex-col justify-center mt-0.5">
                <h2 className="text-xl font-black tracking-tighter text-white uppercase leading-none mb-1">Nandu</h2>
                <span className="text-[9px] font-bold tracking-[0.25em] text-stone-400 uppercase leading-none">Premium PG</span>
              </div>
            </div>
            <p className="text-sm text-stone-400 leading-relaxed max-w-sm mb-8">
              Redefining premium PG spaces in Hyderabad. We offer strictly separate, highly secure residential campuses with zero compromise on quality and comfort.
            </p>
          </div>
          
          <div className="md:col-span-3 md:col-start-7">
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-6">Explore</h4>
            <ul className="space-y-4">
              <li><button onClick={() => { setGenderTab('men'); window.scrollTo(0,0); }} className="text-sm text-stone-400 hover:text-white transition-colors">Men's PG</button></li>
              <li><button onClick={() => { setGenderTab('women'); window.scrollTo(0,0); }} className="text-sm text-stone-400 hover:text-white transition-colors">Women's PG</button></li>
              <li><a href={`https://wa.me/${globalWhatsappNumber}`} className="text-sm text-stone-400 hover:text-white transition-colors">Book a Tour</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-6">Headquarters</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3"><span className="text-lg">📍</span><span className="text-sm text-stone-400 leading-relaxed">Madhapur, HITEC City,<br/>Hyderabad, Telangana</span></li>
              <li className="flex items-center gap-3"><span className="text-lg">📞</span><a href={`tel:+91${globalWhatsappNumber}`} className="text-sm text-stone-400 hover:text-white transition-colors">+91 {globalWhatsappNumber}</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-stone-800/60 gap-4">
          <p className="text-[11px] font-bold text-stone-500 uppercase tracking-widest">© {new Date().getFullYear()} Nandu PG Accommodation. All rights reserved.</p>
        </div>
      </footer>
      
      {/* CSS Styles for Ticker Animation & Scrollbar Hiding */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
        @keyframes marquee {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 25s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}} />
    </div>
  );
}