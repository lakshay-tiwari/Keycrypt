"use client";

import { KeyCrypt } from "./KeyCrypt";

export function Footer() {
  return (
    <footer className="w-full">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10 md:py-12 flex flex-col sm:flex-row items-center justify-between gap-4">
        <KeyCrypt className="text-xl sm:text-2xl" />
        <p className="text-[#47667b] text-xs sm:text-sm font-medium">
          © 2026 KeyCrypt. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
