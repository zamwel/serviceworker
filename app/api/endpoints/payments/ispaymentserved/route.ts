/* eslint-disable @typescript-eslint/no-explicit-any */
import { isPaymentServed } from "@/app/actions/payments";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { paymentId } = await req.json();
    try {
        const data = await isPaymentServed(paymentId);
        return NextResponse.json( data , { status: 201 });
    } catch (error: any) {
         return NextResponse.json({message:error.message}, { status: 400 });
    }
}