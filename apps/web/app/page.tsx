import { Hero } from "@/components/Hero";
import { NavBar } from "@/components/NavBar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const isLoggedIn = !!data
  if (isLoggedIn){
    redirect('/dashboard')
  }
  return <div>
    <NavBar isLoggedIn={isLoggedIn} />
    <Hero />
  </div>
}
