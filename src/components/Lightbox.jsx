import { AnimatePresence, motion } from "framer-motion";

export default function Lightbox({ lightboxImg, closeLightbox }) {
  return (
    <AnimatePresence>
      {lightboxImg && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex cursor-zoom-out items-center justify-center bg-black/90 p-4 backdrop-blur-xl sm:p-10"
          onClick={closeLightbox}
        >
          <button
            type="button"
            aria-label="Close enlarged image"
            className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            onClick={closeLightbox}
          >
            X
          </button>

          <motion.img
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ type: "spring", bounce: 0 }}
            src={lightboxImg}
            alt="Enlarged campus"
            className="max-h-full max-w-full cursor-default rounded-2xl object-contain shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
