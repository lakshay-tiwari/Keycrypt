import { Hero } from "@/components/Hero";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const isLoggedIn = !!data;
  if (isLoggedIn) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen flex flex-col justify-between">
      <div>
        <Hero />
        <FeaturesSection />
        <HowItWorksSection />
        <CtaBanner />
      </div>
      <Footer />
    </main>
  );
}
