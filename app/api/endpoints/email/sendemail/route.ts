/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { sendEmail } from "../implementation";


export async function POST(req: Request) {
    const { payload } = await req.json();

    try {
        const data = await sendEmail(payload);
        return NextResponse.json({ message: "You have successfully sent an email to " + data.envelope.to }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}