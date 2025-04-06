import { setTransaction } from "@/app/actions/database";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const params = await req.json(); // TODO: parse URL or headers if needed
    const result = await setTransaction(body);
    return NextResponse.json({ result }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}