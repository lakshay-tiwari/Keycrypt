"use server"

import { prisma } from "@repo/db/client";
import { revalidatePath } from "next/cache";

export const deletePassword = async (password_id: string)=>{
    try {
        await prisma.passwords.delete({
            where: { id: password_id}
        })
        revalidatePath('/dashboard')
        return { status: 204 , message: "Deleted Successfully"}
    } catch (error) {
        return { status: 500 , message: "Either Wrong Password or Server Error"}
    }
}
