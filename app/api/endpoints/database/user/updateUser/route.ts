/* eslint-disable @typescript-eslint/no-explicit-any */
import { updateUser } from "@/app/actions/database";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  try {
    const { id, data } = await req.json()
    const result = await updateUser(id, data);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
} 