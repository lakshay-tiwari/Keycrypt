"use client";

import { useState } from "react";
import { EyeIcon } from "./EyeIcon";
import { EyeOffIcon } from "./EyeOffIcon";
import { Input } from "./ui/input";

export function PasswordInputWithEye({
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
