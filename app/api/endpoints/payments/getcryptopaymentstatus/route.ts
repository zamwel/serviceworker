/* eslint-disable @typescript-eslint/no-explicit-any */
import { getcryptopaymentStatus } from "@/app/actions/payments";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { pid } = await req.json();
    try {
        const data = await getcryptopaymentStatus(pid);
        return NextResponse.json( data , { status: 201 });
    } catch (error: any) {
         return NextResponse.json({message:error.message}, { status: 400 });
    }
}