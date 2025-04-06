/* eslint-disable @typescript-eslint/no-explicit-any */
import { userregister } from "@/app/actions/auth";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { userdata } = await req.json()
    
    try {
        const data = await userregister(userdata)
        return NextResponse.json( data , { status: 200 })

    } catch (error: any) {
         return NextResponse.json({message:error.message}, { status: 400 })

    }

}