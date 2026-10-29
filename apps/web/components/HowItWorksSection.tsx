"use client";

interface StepProps {
  number: number;
  title: string;
  description: string;
}

function StepItem({ number, title, description }: StepProps) {
  return (
    <div className="flex flex-col items-start text-left">
      <div className="w-10 h-10 rounded-full bg-[#00c2f3] text-[#08203e] font-bold text-base flex items-center justify-center mb-5 shadow-xs">
        {number}
      </div>
      <h3 className="text-xl font-bold text-[#0c2340] mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-[#47667b] text-sm sm:text-base leading-relaxed">
        {description}
      </p>
    </div>
  );
}

export function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Create your account",
      description: "Sign up in moments and set your KeyCrypt login.",
    },
    {
      number: 2,
      title: "Save your passwords",
      description: "Add the accounts you use and let KeyCrypt keep them safe.",
    },
    {
      number: 3,
      title: "Access them anywhere",
      description: "Everything stays synced, so you never have to reset again.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 max-w-6xl mx-auto px-6 sm:px-8 scroll-mt-24">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-14 md:mb-16">
        <h2 className="font-serif font-bold text-[#0c2340] text-3xl sm:text-4xl md:text-5xl tracking-tight">
          Up and running in three steps
        </h2>
      </div>

      {/* 3 Step Items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        {steps.map((step) => (
          <StepItem
            key={step.number}
            number={step.number}
            title={step.title}
            description={step.description}
          />
        ))}
      </div>
    </section>
  );
}
