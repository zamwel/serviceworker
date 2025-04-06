/* eslint-disable @typescript-eslint/no-explicit-any */
import { checkTransactionStatus } from "@/app/actions/payments";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { txRef } = await req.json();
    try {
        const data = await checkTransactionStatus(txRef);
        return NextResponse.json( data , { status: 201 });
    } catch (error: any) {
         return NextResponse.json({message:error.message}, { status: 400 });
    }
}