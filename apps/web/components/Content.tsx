"use client"

import { useState } from "react"
import { ShowPasswordDialog } from "./show-password-dialog"
import { SquareChevronDownIcon } from "lucide-react"


const titles = ["Gmail Password","ATM Pasword BOB","ATM Pasword Indian Bank","Gmail Password2","Gmail Password2","Gmail Password2","Gmail Password2"]

export function Content(){

    return <div className="md:mx-30 mx-8 pb-2">
        {titles.map(title => {
            return <ContentShow title={title} />
        })}
    </div>
}

function ContentShow({ title }: { title: string}){
    return <div className="flex justify-between items-center bg-amber-200 mt-2 px-1 h-16">
        <p className="sm:text-lg text-sm font-semibold">{title}</p>
        <div>
            <ShowPasswordDialog />
        </div>
    </div>
}