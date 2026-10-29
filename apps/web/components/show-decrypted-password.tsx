"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordArrType } from "@/lib/types/PasswordArrType";
import { decryptPassword } from "@/lib/crypto-utils";
import { toast } from "sonner";

export function ShowDecryptedPassword({
  masterPassword,
  open,
  onOpenChange,
  password,
  master_key_salt
}: {
  masterPassword: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  password: PasswordArrType,
  master_key_salt: string
}) {
  const [decryptedPassword, setDecryptedPassword] = useState("");
  const [isCalculating, setIsCalculating] = useState(false);
  const [copied, setCopied] = useState(false);

 useEffect(() => {
  if (!open) {
    // Dialog CLOSED
    setDecryptedPassword("");
    setCopied(false);
    setIsCalculating(false);
    return;
  }

  // Dialog OPENED
  setIsCalculating(true);
  setDecryptedPassword("");
  setCopied(false);

  decryptPassword(
    password.password_cipher,
    masterPassword,
    password.password_iv,
    master_key_salt
  )
    .then((result) => {
      setIsCalculating(false);

      if (!result.ok) {
        toast.error("Wrong Master Password");
        return;
      }

      setDecryptedPassword(result.value!);
    })
    .catch(() => {
      // Should not happen unless something is truly wrong (network error)
      setIsCalculating(false);
      toast.error("Unexpected error occurred");
    });
  }, [open]);



  function handleCopy() {
    if (!decryptedPassword) return;

    navigator.clipboard.writeText(decryptedPassword);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#0c1f38] tracking-tight">
            Your Password
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-sm sm:text-base">
            Here is your decrypted password
          </DialogDescription>
        </DialogHeader>

        <div className="py-2">
          <Label htmlFor="password" className="text-sm font-semibold text-[#0c1f38] mb-2 block">
            Decrypted Password
          </Label>

          {isCalculating ? (
            <div className="text-sm text-sky-700 py-3 flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
              Decrypting password…
            </div>
          ) : (
            <div className="relative">
              <Input
                id="password"
                value={decryptedPassword}
                readOnly
                className="h-12 rounded-2xl border-2 border-sky-300/90 font-mono text-base px-4 pr-11 text-slate-800 bg-sky-50/40 select-all"
              />

              {/* Copy Button */}
              <button
                type="button"
                onClick={handleCopy}
                disabled={!decryptedPassword}
                className="absolute inset-y-0 right-3.5 flex items-center text-slate-500 hover:text-[#008be3] transition-colors cursor-pointer"
                title={copied ? "Copied!" : "Copy password"}
                aria-label={copied ? "Copied!" : "Copy password"}
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
            </div>
          )}
        </div>

        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <button
              type="button"
              disabled={isCalculating}
              className="px-6 py-2.5 rounded-xl bg-[#0c1f38] hover:bg-[#183254] text-white font-semibold text-sm sm:text-base shadow-xs cursor-pointer active:scale-95 transition-all"
            >
              Close
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* example decrypt function */
// function decryptPassword(masterPassword: string): string {
//   return masterPassword ? "my-decrypted-password" : "";
// }

/* SVG Icons */

function CopyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
