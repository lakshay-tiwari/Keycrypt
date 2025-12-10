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
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { hashMasterPassword } from "@/lib/crypto-utils";
import { putUsersHashedPass } from "@/actions/enter-hashed-password";

type Props = {
  forceOpen: boolean;
  userId: string
};

export function EnterAndSaveMasterPassword({ forceOpen , userId }: Props) {
  const [open, setOpen] = useState(false);
  const [masterPassword, setMasterPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (forceOpen) {
      setOpen(true);
    }
  }, [forceOpen]);

  const handleSave = async () => {
    if (!masterPassword) return;

    try {
      setSaving(true);
      setError(null);

      //  CALL API ROUTE HERE
      const masterHash = await hashMasterPassword(masterPassword);

      await putUsersHashedPass(userId,masterHash.hash,masterHash.salt);

      //  close ONLY after success
      setOpen(false);
    } catch (err) {
      setError("Unable to save password. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        //  block closing if master password is required
        if (forceOpen) return;
        setOpen(next);
      }}
    >
      <DialogContent
        className="sm:max-w-[425px]"
        //  prevent ESC & overlay click
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Set Master Password</DialogTitle>
          <DialogDescription>
            You must set a master password to continue using the app.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="master-password">Master Password</Label>
            <Input
              id="master-password"
              type="password"
              value={masterPassword}
              onChange={(e) => setMasterPassword(e.target.value)}
              disabled={saving}
            />
          </div>

          {error && (
            <p className="text-sm text-red-500">{error}</p>
          )}
        </div>

        <DialogFooter>
          <Button
            onClick={handleSave}
            disabled={!masterPassword || saving}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
