/* eslint-disable @typescript-eslint/no-explicit-any */
import { geolocationdata } from "@/app/actions/location";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
    const { ip } = await req.json()
    try {
        const data = await geolocationdata(ip);
        return NextResponse.json(data, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 400 });
    }
}