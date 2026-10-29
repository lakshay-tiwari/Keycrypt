"use client";

import { ShieldCheck, RefreshCw, Zap } from "lucide-react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-3xl p-8 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white/70 flex flex-col items-start text-left">
      <div className="w-12 h-12 rounded-xl bg-[#008be3] text-white flex items-center justify-center shadow-xs">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-[#0c2340] mt-6 mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-[#47667b] text-sm sm:text-[15px] leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Safe",
      description:
        "KeyCrypt handles the security, so your passwords stay protected without extra effort from you.",
    },
    {
      icon: <RefreshCw className="w-6 h-6" />,
      title: "Synced",
      description:
        "Save a password once and find it everywhere you log in, always up to date.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Easy to access",
      description:
        "No more reset emails. Open KeyCrypt and your password is right there when you need it.",
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 max-w-6xl mx-auto px-6 sm:px-8 scroll-mt-24">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
        <h2 className="font-serif font-bold text-[#0c2340] text-3xl sm:text-4xl md:text-5xl tracking-tight">
          Safe. Synced. Easy.
        </h2>
        <p className="mt-4 text-[#47667b] text-base sm:text-lg">
          Everything you need to stop worrying about passwords.
        </p>
      </div>

      {/* 3 Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {features.map((feature, idx) => (
          <FeatureCard
            key={idx}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
}
