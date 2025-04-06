/* eslint-disable @typescript-eslint/no-explicit-any */
import { bankpyment } from "@/app/actions/payments";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const {id, amount, rate } = await req.json();
    try {
        const data = await bankpyment(id, amount, rate);
        return NextResponse.json( data , { status: 201 });
    } catch (error: any) {
         return NextResponse.json({message:error.message}, { status: 400 });
    }
}