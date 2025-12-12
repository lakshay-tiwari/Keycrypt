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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Your Password</DialogTitle>
          <DialogDescription>
            Here is your decrypted password
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="password">Decrypted Password</Label>

            {isCalculating ? (
              <div className="text-sm text-muted-foreground py-2">
                Decrypting password…
              </div>
            ) : (
              <div className="relative">
                <Input
                  id="password"
                  value={decryptedPassword}
                  readOnly
                  className="pr-10"
                />

                {/* Copy Button */}
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!decryptedPassword}
                  className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                </button>
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isCalculating}>
              Close
            </Button>
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
