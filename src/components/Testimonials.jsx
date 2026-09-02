import { TESTIMONIALS } from "../data/testimonials.js";

export default function Testimonials() {
  return (
    <section className="bg-stone-900 py-24 px-6 mx-4 sm:mx-8 rounded-[2rem] sm:rounded-[3rem] mb-16 overflow-hidden shadow-2xl">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-16 text-center text-white">
          Resident Experiences
        </h2>

        <div className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x">
          {TESTIMONIALS.map((review, index) => (
            <div
              key={`${review.author}-${index}`}
              className="min-w-[300px] sm:min-w-[400px] bg-stone-800/50 backdrop-blur-md p-8 rounded-3xl snap-center border border-stone-700/50"
            >
              <div className="text-yellow-500 mb-4 text-lg">
                ★★★★★
              </div>

              <p className="text-stone-300 italic mb-6 leading-relaxed">
                "{review.text}"
              </p>

              <div>
                <h4 className="text-white font-bold">
                  {review.author}
                </h4>

                <span className="text-[10px] font-bold uppercase tracking-widest text-stone-400">
                  {review.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}