"use client";

import { Content } from "./Content";
import { AddPasswordDialog } from "./AddPasswordDialog";

export function ContentPage() {
  return (
    <div className="relative bg-slate-400 md:mx-[25%] mx-4 flex-1">
      <Content />
      <AddPasswordDialog />
    </div>
  );
}
