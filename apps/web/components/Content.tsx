"use client"

import { DropdownMenuDialog } from "./DropdownMenuDialog"
import { ShowPasswordDialog } from "./show-password-dialog"
import { PasswordArrType } from "@/lib/types/PasswordArrType"


export function Content({ passwordArr , master_key_salt , master_key_hash } : { 
    passwordArr: PasswordArrType[], 
    master_key_salt:string,
    master_key_hash: string
}){

    return <div className="pb-2 px-4 mx-auto max-w-3xl">
        {passwordArr.map(password => {
            return <ContentShow master_key_salt={master_key_salt} master_key_hash={master_key_hash} key={password.id} password={password} />
        })}
    </div>
}

function ContentShow({ password, master_key_salt , master_key_hash }: { 
    password: PasswordArrType,
    master_key_salt: string,
    master_key_hash: string
}){
    return <div className="flex justify-between items-center bg-cyan-50 border border-cyan-300 mt-3 px-4 h-16 rounded-xl shadow-sm hover:shadow-md transition">
        <p className="sm:text-lg text-slate-800 text-sm font-semibold">{password.label}</p>
        <div className="flex items-center space-x-2">
            <ShowPasswordDialog master_key_salt={master_key_salt} password={password} />
            <DropdownMenuDialog master_key_hash={master_key_hash} master_key_salt={master_key_salt}  passwordRecord={password}  / >
        </div>
    </div>
}