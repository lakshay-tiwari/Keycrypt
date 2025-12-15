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
import { Spinner } from "./ui/spinner";
import { PasswordInputWithEye } from "./PasswordInputWithEye";

export function AddPasswordDialog({ master_key_salt , master_key_hash } : { master_key_salt: string , master_key_hash: string}) {
  const [open, setOpen] = useState(false);
  const [masterPassword, setMasterPassword] = useState("");
  const [title, setTitle] = useState("");
  const [password, setPassword] = useState("");
  const { userId , loading } = useUserId();
  const router = useRouter()
  
  useEffect(()=>{
    if (!loading && userId == null){
      router.push("/auth/login")
    }
  },[loading,userId,router])

  if (!loading && userId == null){ // upper one push it, before pushing it show redirectin...
    return <div>Redirecting...</div>
  }

  if (loading){
    return <div className="flex justify-center items-center h-screen">
          <div className="flex items-center space-x-2">
            <Spinner className="size-8" />
            <span>Loading...</span>
          </div>
        </div>
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      // simulate API / DB save
      const verifyPassword = await verifyMasterPassword(masterPassword,master_key_hash,master_key_salt);
      if (!verifyPassword){
          toast.error("Invalid Master Password")
          return;
      }
      const encryptedPassword = await encryptPassword(password,masterPassword,master_key_salt);
      console.log(encryptedPassword)
      const data = {
          userId: userId!,
          label: title,
          password_cipher: encryptedPassword.cipherText,
          password_iv: encryptedPassword.iv
      }
      await addPasswordToDB(data)

      toast.success("Password added successfully");

      // reset + close
      setMasterPassword("");
      setTitle("");
      setPassword("");
      setOpen(false);
    } catch (error) {
      toast.error("Failed to add password");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="icon"
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg"
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
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setMasterPassword(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <PasswordInputWithEye
                id="password"
                type="password"
                value={password}
                onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
