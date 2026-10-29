"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ShowDecryptedPassword } from "./show-decrypted-password";
import { PasswordArrType } from "@/lib/types/PasswordArrType";
import { PasswordInputWithEye } from "./PasswordInputWithEye";

export function ShowPasswordDialog({ password, master_key_salt } : { password: PasswordArrType, master_key_salt: string}) {
  const [masterPassword, setMasterPassword] = useState("");
  const [open, setOpen] = useState(false);            
  const [showDecrypted, setShowDecrypted] = useState(false); 

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button
            type="button"
            className="bg-[#0c1f38] hover:bg-[#183254] text-white text-xs sm:text-sm font-semibold rounded-full px-4 sm:px-5 py-1.5 shadow-xs cursor-pointer active:scale-95 transition-all duration-150 shrink-0"
            onClick={() => setOpen(true)}
          >
            Show
          </button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#0c1f38] tracking-tight">
              Your Password
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-sm sm:text-base">
              Enter your master password to decrypt.
            </DialogDescription>
          </DialogHeader>

          <div className="py-2">
            <Label htmlFor="name-1" className="text-sm font-semibold text-[#0c1f38] mb-2 block">
              Master Password
            </Label>
            <PasswordInputWithEye
              id="name-1"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMasterPassword(e.target.value)
              }
              name="name"
              defaultValue=""
              className="h-12 rounded-2xl border-2 border-sky-300/90 focus:border-sky-500 focus:ring-4 focus:ring-sky-100 text-base px-4 text-slate-800"
            />
          </div>

          <DialogFooter className="mt-4 flex flex-row justify-end gap-3">
            <DialogClose asChild>
              <button
                type="button"
                className="px-6 py-2.5 rounded-xl border border-slate-300/80 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm sm:text-base cursor-pointer active:scale-95 transition-all"
              >
                Cancel
              </button>
            </DialogClose>

            <button
              type="button"
              className="px-6 py-2.5 rounded-xl bg-[#0c1f38] hover:bg-[#183254] text-white font-semibold text-sm sm:text-base shadow-xs cursor-pointer active:scale-95 transition-all"
              onClick={() => {
                setOpen(false);
                setShowDecrypted(true);
              }}
            >
              Show Password
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Second dialog is rendered at root level, controlled by state */}

      <ShowDecryptedPassword 
        masterPassword={masterPassword}
        master_key_salt={master_key_salt}
        open={showDecrypted}
        onOpenChange={setShowDecrypted}
        password={password}
      />
    </>
  );
}
