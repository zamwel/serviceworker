import { getTransfer } from "@/app/actions/database";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    
    const params = await req.json(); // TODO: parse URL or headers if needed
    const result = await getTransfer(params.userId, params.id);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}