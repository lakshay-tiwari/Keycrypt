"use client"

import { useEffect, useState } from "react"
import { DropdownMenuDialog } from "./DropdownMenuDialog"
import { ShowPasswordDialog } from "./show-password-dialog"
import { PasswordArrType } from "@/lib/types/PasswordArrType"
import { Search } from "lucide-react"

export function Content({ passwordArr , master_key_salt , master_key_hash } : { 
    passwordArr: PasswordArrType[], 
    master_key_salt:string,
    master_key_hash: string
}){
    const [searchList, setSearchList] = useState<PasswordArrType[]>(passwordArr);

    /*
        this useEffect is important because as passwordArr change setSearchList call
        so that when password is added and remove it show in screen
    */
    
    useEffect(()=>{
        setSearchList(passwordArr)
    },[passwordArr])

    return <div className="pb-2 px-4 mx-auto max-w-3xl">
        <SearchBox passwordArr={passwordArr} setSearchList={setSearchList} />
        {searchList.map(password => {
            return <ContentShow master_key_salt={master_key_salt} master_key_hash={master_key_hash} key={password.id} password={password} />
        })}
    </div>
}

function ContentShow({
  password,
  master_key_salt,
  master_key_hash
}: {
  password: PasswordArrType,
  master_key_salt: string,
  master_key_hash: string
}) {
  return (
    <div
      className="
        flex items-center justify-between
        bg-cyan-50
        border border-cyan-300
        mt-3
        px-4 py-3
        rounded-xl
        shadow-sm
        hover:shadow-md
        transition
      "
    >
      {/* LEFT: Label */}
      <p
        className="
          text-slate-800
          text-sm sm:text-lg
          font-semibold
          truncate
          max-w-[60%]
        "
      >
        {password.label}
      </p>

      {/* RIGHT: Buttons */}
      <div className="flex items-center gap-2 shrink-0">
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
  )
}



function SearchBox({
  passwordArr,
  setSearchList
}: {
  passwordArr: PasswordArrType[],
  setSearchList: any
}) {

  const [input, setInput] = useState("")

  // debounce logic
  useEffect(() => { 
    const timer = setTimeout(() => {
      const result = searchByLabel(passwordArr, input)
      setSearchList(result)
    }, 400) // 400ms debounce

    return () => clearTimeout(timer)
  }, [input, passwordArr, setSearchList])

  return (
    <div className="w-full flex justify-center mt-4 mb-6">
      <div className="relative w-full max-w-xl">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-600"
          size={20}
        />

        <input
          type="text"
          value={input}
          placeholder="Search passwords..."
          className="
            w-full pl-12 pr-4 py-3
            bg-white/80 backdrop-blur-md
            border border-cyan-200
            rounded-2xl
            shadow-sm
            focus:outline-none
            focus:ring-2 focus:ring-cyan-500
            focus:border-transparent
            transition-all duration-200
            text-gray-800
            placeholder-gray-400
          "
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </div>
  )
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