"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { AuthButton } from "./AuthButton";
import { KeyCrypt } from "./KeyCrypt";

export function NavBar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isHome = pathname === "/";
  const isDashboard = pathname?.startsWith("/dashboard");
  const featuresHref = isHome ? "#features" : "/#features";
  const howItWorksHref = isHome ? "#how-it-works" : "/#how-it-works";

  return (
    <nav className="w-full sticky top-0 z-50 bg-[#e0f3fc]/85 backdrop-blur-md transition-all duration-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 flex items-center justify-between h-20">
        <KeyCrypt className="text-2xl sm:text-3xl" />

        {/* Desktop Nav items */}
        {!isDashboard ? (
          <div className="hidden md:flex items-center gap-8">
            <Link
              href={featuresHref}
              className="text-slate-700 hover:text-[#008be3] font-medium text-sm sm:text-base transition-colors duration-150"
            >
              Features
            </Link>
            <Link
              href={howItWorksHref}
              className="text-slate-700 hover:text-[#008be3] font-medium text-sm sm:text-base transition-colors duration-150"
            >
              How it works
            </Link>
            <AuthButton />
          </div>
        ) : (
          <div className="flex items-center">
            <AuthButton />
          </div>
        )}

        {/* Mobile menu button (only on non-dashboard pages) */}
        {!isDashboard && (
          <div className="flex md:hidden items-center gap-3">
            <AuthButton />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#008be3] focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        )}
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#e0f3fc] border-b border-sky-200/60 px-6 py-4 flex flex-col gap-4 shadow-sm">
          <Link
            href={featuresHref}
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-700 hover:text-[#008be3] font-medium text-base py-1 transition-colors"
          >
            Features
          </Link>
          <Link
            href={howItWorksHref}
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-700 hover:text-[#008be3] font-medium text-base py-1 transition-colors"
          >
            How it works
          </Link>
        </div>
      )}
    </nav>
  );
}
