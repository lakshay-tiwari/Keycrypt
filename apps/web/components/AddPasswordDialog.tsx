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
        <Button
          size="icon"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg"
          disabled={isSubmitting}
        >
          <Plus className="w-7 h-7" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add New Password</DialogTitle>
            <DialogDescription>
              Enter details to store a new password.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="master">Master Password</Label>
              <PasswordInputWithEye
                id="master"
                type="password"
                value={masterPassword}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
                  setMasterPassword(e.target.value)
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInputWithEye
                id="password"
                type="password"
                value={password}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting} className="cursor-pointer">
              {isSubmitting ? "Saving..." : "Save"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
