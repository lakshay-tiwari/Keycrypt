"use client";

import { useRouter } from "next/navigation";

export function KeyCrypt({ className = "" }: { className?: string }) {
  const router = useRouter();

  function handleOnClick() {
    router.push("/");
  }

  return (
    <div
      className={`font-bold cursor-pointer tracking-tight text-[#008be3] hover:opacity-90 transition-opacity select-none ${className}`}
      onClick={handleOnClick}
    >
      KeyCrypt
    </div>
  );
}