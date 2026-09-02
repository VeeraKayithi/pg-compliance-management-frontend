import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { FAQ_DATA } from "../data/faqs.js";

export default function FAQAccordion() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq((currentOpenFaq) =>
      currentOpenFaq === index ? null : index
    );
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-16 mb-16">
      <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-12 text-center text-stone-900">
        Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {FAQ_DATA.map((faq, index) => (
          <div
            key={`${faq.question}-${index}`}
            className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm"
          >
            <button
              type="button"
              onClick={() => toggleFaq(index)}
              className="w-full text-left px-6 py-5 flex justify-between items-center font-bold text-stone-900 focus:outline-none"
              aria-expanded={openFaq === index}
            >
              {faq.question}

              <span className="text-stone-400 text-xl font-light">
                {openFaq === index ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {openFaq === index && (
                <motion.div
                  initial={{
                    height: 0,
                    opacity: 0,
                  }}
                  animate={{
                    height: "auto",
                    opacity: 1,
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                  }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 text-sm text-stone-500 leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}