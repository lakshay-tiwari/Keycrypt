import { ContentPage } from "@/components/ContentPage";
import { NavBar } from "@/components/NavBar";
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation";
import { prisma } from "@repo/db/client"
import { EnterAndSaveMasterPassword } from "@/components/enter-masterpassword-dialog";

async function userDetailsfetch(){
    const supabase = await createClient();
    const { data , error } = await supabase.auth.getClaims();
    if (error || !data?.claims){
        redirect("/auth/login");
    }
    return data.claims;
}


async function getUserSecurityData(userId: string){
    try {
        const response = await prisma.users.findUnique({
            where : { id: userId},
            select: {
                user_master_keys: true,
                passwords: true
            }
        })
        return response;
    } catch (error) {
        return null;
    }
}

async function checkMasterPassword(userId:string){
    const masterPassword = await prisma.user_master_keys.findUnique({
        where: {
            user_id: userId
        }
    })
    return masterPassword
}

async function usersPasswordList(userId: string){
    try {
        const passwordsArr = await prisma.passwords.findMany({
            where: {
                user_id: userId
            }
        })
        return passwordsArr; 
    } catch (error) {
        return null;
    }
}

export default async function Dashboard(){
    const userDetails = await userDetailsfetch();
    const userId = userDetails.sub;
    const data = await getUserSecurityData(userId);
    if (data == null){
        return <div>Fetching...</div>
    }
    const isLoggedIn = !!data
    const hasMasterPassword = !!data?.user_master_keys;
    const master_key_salt = data.user_master_keys?.master_key_salt || "";
    const master_key_hash = data.user_master_keys?.master_key_hash || "";

    const passwordArr = data?.passwords ?? []
    if (passwordArr == null){
        return <div className="flex justify-center">
            <p>Fetching password from server causes some problem</p>
        </div>
    }
    return <div className="flex flex-col h-screen">
        <NavBar isLoggedIn={isLoggedIn} />
        <ContentPage master_key_salt={master_key_salt} master_key_hash={master_key_hash} passwordArr={passwordArr}/>
        <EnterAndSaveMasterPassword forceOpen={!hasMasterPassword} userId={userId}/>
    </div>
}