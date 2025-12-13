"use client"

import { DropdownMenuDialog } from "./DropdownMenuDialog"
import { ShowPasswordDialog } from "./show-password-dialog"
import { PasswordArrType } from "@/lib/types/PasswordArrType"


export function Content({ passwordArr , master_key_salt , master_key_hash } : { 
    passwordArr: PasswordArrType[], 
    master_key_salt:string,
    master_key_hash: string
}){

    return <div className="md:mx-30 mx-8 pb-2">
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
    return <div className="flex justify-between items-center bg-amber-200 mt-2 px-1 h-16">
        <p className="sm:text-lg text-sm font-semibold">{password.label}</p>
        <div className="flex items-center space-x-2">
            <ShowPasswordDialog master_key_salt={master_key_salt} password={password} />
            <DropdownMenuDialog master_key_hash={master_key_hash} master_key_salt={master_key_salt}  passwordRecord={password}  / >
        </div>
    </div>
}