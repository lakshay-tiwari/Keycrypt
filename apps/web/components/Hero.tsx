"use client";

import { useRouter } from "next/navigation";
import { VaultCard } from "./VaultCard";

export function Hero() {
  const router = useRouter();

  function handleGetStarted() {
    router.push("/auth/sign-up");
  }

  function handleSeeHowItWorks() {
    const section = document.getElementById("how-it-works");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <section className="relative w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-8 pb-20 md:pt-12 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sky-300/80 bg-white/60 backdrop-blur-xs text-[#0284c7] font-medium text-xs sm:text-sm shadow-xs mb-6">
              Your passwords, always within reach
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-bold text-[#0c2340] text-4xl sm:text-5xl lg:text-[62px] leading-[1.12] tracking-tight">
              Never lose a<br />
              password again<br />
              with <span className="text-[#008be3]">KeyCrypt</span>
            </h1>

            {/* Subtitle / Description */}
            <p className="mt-6 text-[#47667b] text-base sm:text-lg leading-relaxed max-w-xl">
              Stop resetting forgotten passwords. Keep everything safe, synced, and easy to access. KeyCrypt handles the security — you enjoy the convenience.
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleGetStarted}
                className="px-7 py-3 rounded-full font-semibold text-base text-[#08203e] bg-[#00c2f3] hover:bg-[#00b2e0] active:scale-95 transition-all duration-200 shadow-xs cursor-pointer"
              >
                Get Started
              </button>

              <button
                type="button"
                onClick={handleSeeHowItWorks}
                className="px-7 py-3 rounded-full font-semibold text-base text-[#0c2340] border border-[#0c2340]/60 hover:border-[#0c2340] hover:bg-white/40 active:scale-95 transition-all duration-200 cursor-pointer"
              >
                See how it works
              </button>
            </div>
          </div>

          {/* Right Column: Vault Preview Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <VaultCard />
          </div>
        </div>
      </div>
    </section>
  );
}
