/* eslint-disable @typescript-eslint/no-explicit-any */
import { userlogout } from "@/app/actions/auth";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const data = await userlogout()
        return NextResponse.json( data , { status: 200 })

    } catch (error:any) {
         return NextResponse.json({message:error.message}, { status: 400 })

    }

}