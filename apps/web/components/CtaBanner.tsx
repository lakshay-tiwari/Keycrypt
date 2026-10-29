"use client";

import { useRouter } from "next/navigation";

export function CtaBanner() {
  const router = useRouter();

  function handleGetStarted() {
    router.push("/auth/sign-up");
  }

  return (
    <section className="max-w-6xl mx-auto px-6 sm:px-8 py-10 md:py-16">
      <div className="relative overflow-hidden rounded-3xl md:rounded-[36px] bg-[#18367a] text-white py-16 px-6 sm:px-12 md:px-16 text-center shadow-xl shadow-blue-950/20">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="font-serif font-bold text-white text-3xl sm:text-4xl md:text-[42px] leading-tight tracking-tight">
            Ready to never reset a password again?
          </h2>

          <p className="mt-4 mb-8 text-sky-200/90 text-sm sm:text-base md:text-lg">
            Join KeyCrypt and keep every password safe, synced, and close.
          </p>

          <button
            type="button"
            onClick={handleGetStarted}
            className="px-8 py-3 rounded-full font-bold text-sm sm:text-base text-[#08203e] bg-[#00c2f3] hover:bg-[#00b2e0] active:scale-95 transition-all duration-200 shadow-md cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </section>
  );
}
