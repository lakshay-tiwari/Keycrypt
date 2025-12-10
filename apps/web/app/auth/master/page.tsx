import { EnterAndSaveMasterPassword } from "@/components/enter-masterpassword-dialog";
import { NavBar } from "@/components/NavBar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


async function userDetailsfetch(){
    const supabase = await createClient();
    const { data , error } = await supabase.auth.getClaims();
    if (error || !data?.claims){
        redirect("/auth/login");
    }
    return data.claims;
}
export default async function Master() {
    const userDetails = await userDetailsfetch();
    return (<div>
        <NavBar />
    </div>);
}
