"use client";

import { useRouter } from "next/navigation";

export function KeyCrypt(){
    const router = useRouter();

    function handleonClick(){
        router.push('/');
        return;
    }
    
    return <div className="font-bold cursor-pointer text-3xl flex" onClick={handleonClick}>
        <span className="bg-linear-to-r text-3xl font-bold from-blue-700 to-cyan-500 bg-clip-text text-transparent">
            KeyCrypt
        </span>
    </div>
}