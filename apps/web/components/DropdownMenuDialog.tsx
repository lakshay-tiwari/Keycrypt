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
import { PasswordArrType } from "@/lib/types/PasswordArrType"
import { deletePassword } from "@/actions/delete-password";
import { encryptPassword, verifyMasterPassword } from "@/lib/crypto-utils";
import { toast } from "sonner";
import { editStoredPassword } from "@/actions/edit-password";

export function DropdownMenuDialog({ passwordRecord , master_key_salt, master_key_hash }: { 
  passwordRecord: PasswordArrType,
  master_key_salt: string,
  master_key_hash: string
}) {
  // Dialog state
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  // Input state
  const [deleteMasterPassword, setDeleteMasterPassword] = useState("");
  const [editMasterPassword, setEditMasterPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");


  // Ref state for change focus in edit password Dialog
  const input2Ref = useRef<HTMLInputElement>(null);


  // state used to control the state of button so that we see loading
  const [deleteButtonLoading, setDeleteButtonLoading] = useState(false);
  const [editButtonLoading, setEditButtonLoading] = useState(false);


  async function handleDeleteSubmit() {

    if (deleteButtonLoading) return; // if one operation processing then to stop

    setDeleteButtonLoading(true);
    // verify master password
    const verify = await verifyMasterPassword(deleteMasterPassword,master_key_hash,master_key_salt);

    if (!verify){
      toast.error("Master Password is Wrong")
      setDeleteMasterPassword("")
      setShowDeleteDialog(false)
      setDeleteButtonLoading(false)
      return;
    } 

    // Delete password from DB
    const deleteStorePassword = await deletePassword(passwordRecord.id);

    if (deleteStorePassword.status == 500){
      toast.error("Server Error")
      setDeleteMasterPassword("");
      setShowDeleteDialog(false);
      setDeleteButtonLoading(false);
      return; 
    }
    
    toast.success("Password Deleted Successfully!")
    setDeleteMasterPassword("");
    setShowDeleteDialog(false);
    setDeleteButtonLoading(false);
    return;
  }

  async function handleEditSubmit() {
    if(editButtonLoading){ // This is to prevent multiple clicks
      return; 
    }
    setEditButtonLoading(true);

    const verify = await verifyMasterPassword(editMasterPassword,master_key_hash,master_key_salt);

    if (!verify){
      toast.error("Master Password is wrong")
      setEditMasterPassword("");
      setNewPassword("");
      setShowEditDialog(false);
      setEditButtonLoading(false)
      return;
    }

    const encryptPasswordBeforeStore = await encryptPassword(newPassword,editMasterPassword,master_key_salt);
    
    const editPasswordInDB = await editStoredPassword(passwordRecord.id,
          encryptPasswordBeforeStore.cipherText,
          encryptPasswordBeforeStore.iv
    )

    if (editPasswordInDB.status == 500){
      toast.error("Server Error or SignIn again")
      setEditMasterPassword("");
      setNewPassword("");
      setShowEditDialog(false);
      setEditButtonLoading(false)
      return;
    }
    
    toast.success('Password Edited Successfully')
    setEditMasterPassword("");
    setNewPassword("");
    setShowEditDialog(false);
    setEditButtonLoading(false)
    return;
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
            onSubmit={async (e) => {
              e.preventDefault();
              await handleDeleteSubmit();
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

              <Button type="submit" className={deleteButtonLoading ? "cursor-default":"cursor-pointer"} variant="destructive">
                { deleteButtonLoading ? "Processing..." :"Delete" }
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

              <Button type="submit" className={editButtonLoading ? "cursor-default" : "cursor-pointer"}>
                {editButtonLoading ? "Processing..." : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

