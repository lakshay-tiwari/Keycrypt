"use client";

import { Content } from "./Content";
import { AddPasswordDialog } from "./AddPasswordDialog";
import { PasswordArrType } from "@/lib/types/PasswordArrType";


export function ContentPage({ passwordArr, master_key_salt, master_key_hash } : { passwordArr: PasswordArrType[] , master_key_salt: string, master_key_hash: string}) {
  return (
    <div className="relative bg-slate-400 md:mx-[25%] mx-4 flex-1">
      <Content master_key_salt={master_key_salt} passwordArr={passwordArr} />
      <AddPasswordDialog master_key_salt={master_key_salt} master_key_hash={master_key_hash} />
    </div>
  );
}
