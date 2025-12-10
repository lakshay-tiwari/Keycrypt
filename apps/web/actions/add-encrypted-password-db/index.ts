"use server"

import { prisma } from "@repo/db/client"
import { revalidatePath } from "next/cache"

type Props = {
    userId: string
    label: string 
    username?: string
    password_cipher: string
    password_iv: string
}

export const addPasswordToDB = async (data: Props)=>{
    try {
        const addPassword = await prisma.passwords.create({
            data: {
                user_id: data.userId,
                label: data.label,
                username: data.username,
                password_cipher: data.password_cipher,
                password_iv: data.password_iv
            }
        })

        revalidatePath('/dashboard')
        return {
            userDetail : addPassword,
            message: "Added to DB successfully",
            status: 201
        }
    } catch (error) {
        
        return {
            message: "Something went wrong",
            status: 500
        }
    }
}