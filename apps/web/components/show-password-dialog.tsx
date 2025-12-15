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
          <Button
            variant="default"
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          >
            Show
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Your Password</DialogTitle>
            <DialogDescription>
              Enter Your Master Password to Decrypt
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Master Password</Label>
              <PasswordInputWithEye
                id="name-1"
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setMasterPassword(e.target.value)}
                name="name"
                defaultValue=""
              />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            {/* when opening second dialog, close this one */}
            <Button
              variant="default"
              className="cursor-pointer"
              onClick={() => {
                setOpen(false);        
                setShowDecrypted(true); 
              }}
            >
              Show Password
            </Button>
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
