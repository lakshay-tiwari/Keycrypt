"use server"
import { prisma } from "@repo/db/client";
import { revalidatePath } from "next/cache";

export const editStoredPassword = async (password_id: string, cipher_text: string, iv:string)=> {
    try {
        await prisma.passwords.update({
            where: {id: password_id},
            data: {
                password_cipher: cipher_text,
                password_iv: iv
            }
        })
        revalidatePath('/dashboard')
        return { status: 204 , message: "Password Edited Successfully"}
    } catch (error) {
        return { status: 500 , message: "Either password record not found or Server Error"}
    }
}