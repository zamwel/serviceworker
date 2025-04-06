/* eslint-disable @typescript-eslint/no-explicit-any */
import { verifyMoMoOtp } from "@/app/actions/payments";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { url, otp } = await req.json();
    try {
        const data = await verifyMoMoOtp(url, otp);
        return NextResponse.json( data , { status: 201 });
    } catch (error: any) {
         return NextResponse.json({message:error.message}, { status: 400 });
    }
}