"use client";

import { useRef, useState } from "react";
import { MoreVerticalIcon } from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { PasswordInputWithEye } from "./PasswordInputWithEye";

export function DropdownMenuDialog() {
  // Dialog state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Input state
  const [deleteMasterPassword, setDeleteMasterPassword] = useState("");
  const [editMasterPassword, setEditMasterPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");


  // Ref state for change focus in edit password Dialog
  const input2Ref = useRef<HTMLInputElement>(null);


  function handleDeleteSubmit() {
    console.log("DELETE with master password:", deleteMasterPassword);

    // reset + close
    setDeleteMasterPassword("");
    setShowDeleteDialog(false);
  }

  function handleEditSubmit() {
    console.log("EDIT with:", {
      masterPassword: editMasterPassword,
      newPassword,
    });

    // reset + close
    setEditMasterPassword("");
    setNewPassword("");
    setShowEditDialog(false);
  }

  return (
    <>
      {/* Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon-sm"
            aria-label="Open menu"
            className="bg-slate-300 hover:bg-amber-100"
          >
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => setShowEditDialog(true)}>
              Edit
            </DropdownMenuItem>

            <DropdownMenuItem
              className="text-red-600 focus:text-red-600"
              onSelect={() => setShowDeleteDialog(true)}
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* ===========================
          DELETE DIALOG
          =========================== */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleDeleteSubmit();
            }}
          >
            <DialogHeader>
              <DialogTitle>Delete Password</DialogTitle>
              <DialogDescription>
                Enter your master password to confirm
              </DialogDescription>
            </DialogHeader>

            <FieldGroup className="py-4">
              <Field>
                <FieldLabel>Master Password</FieldLabel>
                <PasswordInputWithEye
                  value={deleteMasterPassword}
                  onChange={setDeleteMasterPassword}
                  placeholder="Master password"
                />
              </Field>
            </FieldGroup>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit" variant="destructive">
                Delete
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ===========================
          EDIT DIALOG
          =========================== */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleEditSubmit();
            }}
          >
            <DialogHeader>
              <DialogTitle>Edit Password</DialogTitle>
              <DialogDescription>
                Enter your master password and a new password
              </DialogDescription>
            </DialogHeader>

            <FieldGroup className="py-4">
              <Field>
                <Label>Master Password</Label>
                <PasswordInputWithEye
                  value={editMasterPassword}
                  onChange={setEditMasterPassword}
                  placeholder="Master password"
                  onKeyDown={(e)=>{
                    if (e.key == 'Enter'){
                      e.preventDefault();
                      input2Ref.current?.focus();
                    }
                  }}
                />
              </Field>

              <Field>
                <FieldLabel>New Password</FieldLabel>
                <PasswordInputWithEye
                  value={newPassword}
                  ref={input2Ref}
                  onChange={setNewPassword}
                  placeholder="New password"
                />
              </Field>
            </FieldGroup>

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>

              <Button type="submit">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

