import { setUser } from "@/app/actions/database";
  import { NextResponse } from "next/server";
  
  export async function POST(req: Request) {
    try {
      const body = await req.json();
      //const params = {}; // TODO: parse URL or headers if needed
      const result = await setUser(body);
      return NextResponse.json({ result }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }