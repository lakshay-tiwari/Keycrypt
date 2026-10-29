"use client";

import { useState } from "react";
import { Lock, Eye, EyeOff } from "lucide-react";

interface VaultItem {
  id: string;
  name: string;
  masked: string;
  sample: string;
}

const VAULT_ITEMS: VaultItem[] = [
  { id: "email", name: "Email", masked: "••••••••••", sample: "g00gl3-p@ss!" },
  { id: "banking", name: "Banking", masked: "••••••••••••", sample: "ch@se-S3cure$99" },
  { id: "work", name: "Work", masked: "•••••••••", sample: "w0rk-vPn#24" },
];

export function VaultCard() {
  const [revealedId, setRevealedId] = useState<string | null>(null);

  const toggleReveal = (id: string) => {
    setRevealedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="relative group w-full max-w-[360px] sm:max-w-[390px] mx-auto">
      {/* Background glow effect */}
      <div className="absolute -inset-1.5 bg-linear-to-r from-sky-300 to-cyan-300 rounded-[32px] blur-xl opacity-30 group-hover:opacity-50 transition duration-500" />

      {/* Main card */}
      <div className="relative bg-white rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(12,74,110,0.12)] border border-white/80 transition-all duration-300 group-hover:shadow-[0_25px_60px_rgba(12,74,110,0.16)]">
        {/* Header */}
        <div className="flex items-center justify-between pb-5">
          <h2 className="text-xl font-bold text-[#0c2340] tracking-tight">
            My Vault
          </h2>
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#00c2f3] text-[#08203e] text-xs font-semibold tracking-wide">
            Synced
          </span>
        </div>

        {/* Credentials list */}
        <div className="pt-2 space-y-4">
          {VAULT_ITEMS.map((item) => {
            const isRevealed = revealedId === item.id;
            return (
              <div
                key={item.id}
                className="flex items-center justify-between group/row p-1.5 rounded-xl hover:bg-sky-50/50 transition-colors duration-150"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-full bg-[#008be3] text-white flex items-center justify-center shrink-0 shadow-xs shadow-blue-500/20 group-hover/row:scale-105 transition-transform duration-200">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm sm:text-base font-semibold text-[#0c2340] leading-none mb-1.5">
                      {item.name}
                    </div>
                    <div className="text-xs sm:text-sm font-mono tracking-widest text-slate-400 select-all">
                      {isRevealed ? (
                        <span className="text-[#008be3] font-sans font-medium tracking-normal">
                          {item.sample}
                        </span>
                      ) : (
                        item.masked
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toggleReveal(item.id)}
                  className="opacity-0 group-hover/row:opacity-100 p-1.5 text-slate-400 hover:text-[#008be3] transition-all rounded-md hover:bg-white"
                  title={isRevealed ? "Hide password" : "Show password"}
                  aria-label={isRevealed ? "Hide password" : "Show password"}
                >
                  {isRevealed ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
