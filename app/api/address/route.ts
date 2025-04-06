/* eslint-disable @typescript-eslint/no-explicit-any */
import { generateipaddress } from "@/app/actions/location";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
    try {
        const res = await generateipaddress(req);
        const data = await res.json()
        //console.log("IP address: ", data.ip)
        return NextResponse.json({ ip: data.ip }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}