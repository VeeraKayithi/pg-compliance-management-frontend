import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F5F5F0] px-6">
      <section className="w-full max-w-lg rounded-[2rem] border border-stone-200 bg-white p-8 text-center shadow-sm sm:p-12">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50">
          /nandu-logo.svg
        </div>

        <p className="mt-6 text-[10px] font-bold uppercase tracking-widest text-stone-400">
          Access Restricted
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tighter text-stone-900">
          Unauthorized
        </h1>

        <p className="mt-4 text-sm leading-relaxed text-stone-500">
          Your account does not have permission to
          access this page.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex rounded-full bg-stone-900 px-7 py-3 text-[10px] font-bold uppercase tracking-widest text-white transition hover:bg-stone-800"
        >
          Return Home
        </Link>
      </section>
    </main>
  );
}
