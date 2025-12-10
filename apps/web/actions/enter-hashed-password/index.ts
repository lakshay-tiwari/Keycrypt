"use server"

import { prisma } from "@repo/db/client"

type UUID = string

export const putUsersHashedPass = async (user_id: UUID ,master_key_hash: string, master_key_salt: string) => {
    try {
        const checkPresent = await prisma.user_master_keys.findFirst({
            where: { user_id }
        });
        if (checkPresent != null) {
            return { message: "Already present" , status: 409}
        }
    
        const entry = await prisma.user_master_keys.create({
            data: {
                user_id,
                master_key_hash,
                master_key_salt,
                created_at: new Date()
            }
        })
    
        return {
            message: "Putting in DB successfully",
            userDetail: entry,
            status: 201
        }
    } catch (error) {
        return {
            message: "Server Error",
            status: 500
        }
    }
}
