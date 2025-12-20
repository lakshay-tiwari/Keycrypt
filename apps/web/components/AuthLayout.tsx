import Link from "next/link";
import { ReactNode } from "react";

export function AuthLayout({ children } : { children: ReactNode}) {
  return (
    <div>
      {children}
      <p className="mt-4 text-xs text-muted-foreground text-center">
        By continuing, you agree to our{" "}
        <Link href="/terms" className="underline">Terms</Link>{" "}
        and{" "}
        <Link href="/privacy" className="underline">Privacy Policy</Link>.
      </p>
    </div>
  )
}
