import { prisma } from "@repo/db/client";
import { NextResponse } from "next/server";

// API for health checking the backend and database

// add secret which authorize the request is legitimate or rate limiting if you want to prevent currently I don't use because no need. 

export async function GET(){

    const start = Date.now();

    try {

        const result = await prisma.$queryRaw`SELECT 1`; 
        // you don't have to write LIMIT 1 because there is no table it run only for 1 row.
        // to check the is schema correct, table correct and other thing do SELECT 1 FROM user LIMIT 1. 
        const responseTime = Date.now() - start;

        return NextResponse.json({
            status: "ok",
            server: "up",
            db: "up",
            responseTime: `${responseTime}ms`,
            timeStamp: new Date().toISOString()
        }, {
            status: 200
        })
        
    } catch (error) {
        return NextResponse.json({
            status: "error",
            server: "up",
            db: "down",
            timeStamp: new Date().toISOString()
        }, {
            status: 500
        })
    }
}