"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export function AuthButton() {
  const router = useRouter();
  const supabase = createClient();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setIsLoggedIn(!!data?.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setIsLoggedIn(!!session?.user);
      }
    );

    return () => { // unsubscribe because muliple mount create multiple subscription
      listener.subscription.unsubscribe();
    };
  }, []);

  // Avoid hydration mismatch
  if (isLoggedIn === null) return null;

  async function onClickHandle() {
    if (loading) return;

    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }

    
    setLoading(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Unable to log out");
      setLoading(false);
      return;
    }

    toast.success("Signed out successfully");
    router.push("/");
  }

  return (
    <div className="flex justify-center">
      <button
        onClick={onClickHandle}
        disabled={loading}
        className="
          px-5 sm:px-6 py-2
          rounded-full
          font-bold
          text-white
          bg-linear-to-r from-blue-600 to-cyan-500
          shadow-md shadow-blue-900/20
          hover:shadow-lg hover:from-blue-700 hover:to-cyan-600
          active:scale-95
          transition-all duration-200 ease-out
          cursor-pointer
          disabled:opacity-50 disabled:cursor-not-allowed
        "
      >
        {loading
          ? "Processing..."
          : isLoggedIn
          ? "Logout"
          : "Login"}
      </button>
    </div>
  );
}
