import { ContentPage } from "@/components/ContentPage";
import { NavBar } from "@/components/NavBar";
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";

async function userDetails(){
    const supabase = await createClient();
    const { data , error } = await supabase.auth.getClaims();
    if (error || !data?.claims){
        redirect("/auth/login");
    }
    return data.claims.email;
}

export default async function Dashboard(){
    const userEmail = await userDetails();
    return <div className="flex flex-col h-screen">
        <NavBar />
        <ContentPage />
    </div>
}

/*
    navbar
    content
    add button
*/