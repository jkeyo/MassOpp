"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import type { User } from "@supabase/supabase-js";

const supabase = createClient();

export default function AuthStatus() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  async function handleLogOut() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return null;
  }

  if (user) {
    return (
      <div className="flex items-center gap-3 text-sm">
        <span className="text-gray-600">
          {user.user_metadata?.full_name ?? user.email}
        </span>
        <button
          onClick={handleLogOut}
          className="rounded-md border px-3 py-1.5 hover:bg-gray-50"
        >
          Log Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <a href="/login" className="rounded-md border px-3 py-1.5 hover:bg-gray-50">
        Log In
      </a>
      <a href="/signup" className="rounded-md bg-black px-3 py-1.5 text-white hover:opacity-90">
        Sign Up
      </a>
    </div>
  );
}