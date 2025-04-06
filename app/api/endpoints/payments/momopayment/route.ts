/* eslint-disable @typescript-eslint/no-explicit-any */
import { momopayment } from "@/app/actions/payments";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { id, amount, rate, phoneNumber, network } = await req.json();
    try {
        const data = await momopayment(id, amount, rate, phoneNumber, network);
        return NextResponse.json( data , { status: 201 });
    } catch (error: any) {
         return NextResponse.json({message:error.message}, { status: 400 });
    }
}