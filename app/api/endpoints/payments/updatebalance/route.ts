/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateBalance } from "@/app/actions/payments";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { id, balance, record } = await req.json();
    try {
        const data = await updateBalance(id, balance, record);
        return NextResponse.json(data, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}