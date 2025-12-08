import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function userDetails(){
    const supabase = await createClient();
    const { data , error } = await supabase.auth.getClaims();
    console.log(data)
    if (error || !data?.claims){
        redirect("/auth/login");
    }
    return data.claims.email;
}

export default async function Dashboard(){
    const userEmail = await userDetails();
    return <div>
        <div>Dashboard</div>
        {userEmail}
    </div>
}