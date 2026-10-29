"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { toast } from "sonner"; 
import { addPasswordToDB } from "@/actions/add-encrypted-password-db";
import { encryptPassword, verifyMasterPassword } from "@/lib/crypto-utils";
import { useUserId } from "@/hooks/useUserId";
import { useRouter } from "next/navigation";
import { PasswordInputWithEye } from "./PasswordInputWithEye";

export function AddPasswordDialog({
  master_key_salt,
  master_key_hash,
}: {
  master_key_salt: string;
  master_key_hash: string;
}) {
  const [open, setOpen] = useState(false);
  const [masterPassword, setMasterPassword] = useState("");
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { userId, loading } = useUserId();
  const router = useRouter();

  useEffect(() => {
    if (!loading && userId == null) {
      router.push("/auth/login");
    }
  }, [loading, userId, router]);

  if (!userId) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;

    if (!userId) {
      toast.error("User not authenticated");
      return;
    }

    setIsSubmitting(true);

    try {
      const verifyPassword = await verifyMasterPassword(
        masterPassword,
        master_key_hash,
        master_key_salt
      );

      if (!verifyPassword) {
        toast.error("Invalid Master Password");
        return;
      }

      const encryptedPassword = await encryptPassword(
        password,
        masterPassword,
        master_key_salt
      );

      await addPasswordToDB({
        userId, // ✅ safe, narrowed
        label: title,
        password_cipher: encryptedPassword.cipherText,
        password_iv: encryptedPassword.iv,
      });

      toast.success("Password added successfully");

      setMasterPassword("");
      setTitle("");
      setPassword("");
      setOpen(false);
    } catch {
      toast.error("Failed to add password");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          aria-label="Add new password"
          className="fixed bottom-8 right-8 sm:bottom-10 sm:right-10 z-40 w-14 h-14 rounded-full bg-[#0c1f38] hover:bg-[#183254] text-white flex items-center justify-center shadow-xl shadow-slate-950/25 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          <Plus className="w-7 h-7 stroke-[2.5]" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Password</DialogTitle>
            <DialogDescription>
              Enter details to store a new password.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-3">
            <div className="grid gap-2">
              <Label htmlFor="title" className="text-sm font-semibold text-[#0c1f38]">
                Title
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="h-11 rounded-xl border border-sky-200 focus:border-sky-500"
                placeholder="e.g. Gmail (personal)"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="master" className="text-sm font-semibold text-[#0c1f38]">
                Master Password
              </Label>
              <PasswordInputWithEye
                id="master"
                type="password"
                value={masterPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setMasterPassword(e.target.value)
                }
                required
                className="h-11 rounded-xl border border-sky-200 focus:border-sky-500"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password" className="text-sm font-semibold text-[#0c1f38]">
                Password
              </Label>
              <PasswordInputWithEye
                id="password"
                type="password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                required
                className="h-11 rounded-xl border border-sky-200 focus:border-sky-500"
              />
            </div>
          </div>

          <DialogFooter className="mt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-xl bg-[#0c1f38] hover:bg-[#183254] text-white font-semibold text-sm sm:text-base shadow-xs cursor-pointer active:scale-95 transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
