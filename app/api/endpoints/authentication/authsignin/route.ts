/* eslint-disable @typescript-eslint/no-explicit-any */
import { userlogin } from "@/app/actions/auth";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
    const { userdata } = await req.json()
    try {
        const data = await userlogin(userdata)
        return NextResponse.json(data, { status: 200 })

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: error.status })
    }

}