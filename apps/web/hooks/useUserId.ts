"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function useUserId() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    // 1️ Initial auth check
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data.user) {
        setLoading(false);
        router.push("/auth/login");
        return;
      }

      setUserId(data.user.id);
      setLoading(false);
    });

    // 2️ Listen for auth changes (logout, token expiry, etc.)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        setUserId(null);
        router.push("/auth/login");
      } else {
        setUserId(session.user.id);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  return { userId, loading };
}
