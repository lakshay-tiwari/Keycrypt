"use client";

import { useEffect, useState } from "react";
import { DropdownMenuDialog } from "./DropdownMenuDialog";
import { ShowPasswordDialog } from "./show-password-dialog";
import { PasswordArrType } from "@/lib/types/PasswordArrType";
import { Search, Lock, KeyRound } from "lucide-react";

export function Content({
  passwordArr,
  master_key_salt,
  master_key_hash,
}: {
  passwordArr: PasswordArrType[];
  master_key_salt: string;
  master_key_hash: string;
}) {
  const [searchList, setSearchList] = useState<PasswordArrType[]>(passwordArr);

  /*
    Sync searchList when passwordArr updates from parent/server actions
  */
  useEffect(() => {
    setSearchList(passwordArr);
  }, [passwordArr]);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 pt-2 pb-28">
      {/* Search Bar matching PDF width & styling */}
      <SearchBox passwordArr={passwordArr} setSearchList={setSearchList} />

      {/* Passwords List */}
      <div className="space-y-3">
        {searchList.map((password) => (
          <ContentShow
            key={password.id}
            password={password}
            master_key_salt={master_key_salt}
            master_key_hash={master_key_hash}
          />
        ))}

        {/* Empty state */}
        {searchList.length === 0 && (
          <div className="text-center py-16 px-6 bg-white/70 border border-sky-200/70 rounded-2xl shadow-xs mt-3">
            <div className="w-12 h-12 rounded-full bg-sky-100 text-[#008be3] flex items-center justify-center mx-auto mb-3">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-base font-semibold text-[#0c1f38]">
              {passwordArr.length === 0
                ? "Your vault is empty"
                : "No matching passwords"}
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-sm mx-auto">
              {passwordArr.length === 0
                ? "Add your first password securely by clicking the + button at the bottom right."
                : "Try searching with a different keyword or domain."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function ContentShow({
  password,
  master_key_salt,
  master_key_hash,
}: {
  password: PasswordArrType;
  master_key_salt: string;
  master_key_hash: string;
}) {
  return (
    <div className="flex items-center justify-between bg-white/90 hover:bg-white border border-sky-200/80 px-4 sm:px-5 py-3 sm:py-3.5 rounded-2xl shadow-xs hover:shadow-md transition-all duration-200 gap-3 group">
      {/* LEFT: Lock circle icon + Label */}
      <div className="flex items-center gap-3.5 min-w-0 pr-2">
        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#008be3] text-white flex items-center justify-center shrink-0 shadow-xs shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
          <Lock className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
        </div>

        <p className="text-slate-800 text-sm sm:text-base font-semibold truncate tracking-tight">
          {password.label}
        </p>
      </div>

      {/* RIGHT: Show pill button + Dropdown 3-dots */}
      <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
        <ShowPasswordDialog
          master_key_salt={master_key_salt}
          password={password}
        />
        <DropdownMenuDialog
          master_key_hash={master_key_hash}
          master_key_salt={master_key_salt}
          passwordRecord={password}
        />
      </div>
    </div>
  );
}

function SearchBox({
  passwordArr,
  setSearchList,
}: {
  passwordArr: PasswordArrType[];
  setSearchList: (list: PasswordArrType[]) => void;
}) {
  const [input, setInput] = useState("");

  // Debounced search logic
  useEffect(() => {
    const timer = setTimeout(() => {
      const result = searchByLabel(passwordArr, input);
      setSearchList(result);
    }, 300);

    return () => clearTimeout(timer);
  }, [input, passwordArr, setSearchList]);

  return (
    <div className="w-full mb-4">
      <div className="relative w-full">
        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          size={18}
        />
        <input
          type="text"
          value={input}
          placeholder="Search passwords..."
          className="w-full pl-11 pr-4 py-3 sm:py-3.5 bg-white border border-sky-200/80 rounded-2xl shadow-xs focus:outline-none focus:ring-2 focus:ring-[#008be3]/40 focus:border-[#008be3] transition-all duration-150 text-slate-800 text-sm sm:text-base placeholder-slate-400"
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  );
}

export function searchByLabel(
  data: PasswordArrType[],
  query: string
): PasswordArrType[] {
  if (!query.trim()) return data;

  return data.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );
}