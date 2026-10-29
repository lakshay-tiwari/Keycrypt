"use client";

import { useState } from "react";
import { EyeIcon } from "./EyeIcon";
import { EyeOffIcon } from "./EyeOffIcon";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

export function PasswordInputWithEdye({
  ref,
  value,
  onChange,
  placeholder,
  onKeyDown,
}: {
  ref ?: React.Ref<HTMLInputElement>;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  onKeyDown ?: React.KeyboardEventHandler<HTMLInputElement>;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        ref={ref}
        type={show ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="pr-10"
        autoComplete="new-password"
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOffIcon /> : <EyeIcon />}
      </button>
    </div>
  );
}


export function PasswordInputWithEye({
  className,
  ...props
}: React.ComponentProps<"input">) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative w-full">
      <Input
        {...props}
        type={show ? "text" : "password"}
        className={cn("pr-11", className)}
      />

      <button
        type="button"
        onClick={() => setShow(!show)}
        className="absolute inset-y-0 right-3.5 flex items-center text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOffIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
      </button>
    </div>
  );
}

