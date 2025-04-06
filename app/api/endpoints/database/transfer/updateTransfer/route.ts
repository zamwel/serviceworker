import { updateTransfer } from "@/app/actions/database";
  import { NextResponse } from "next/server";
  
  export async function PUT(req: Request) {
    try {
      const body = await req.json();
      //const params = {}; // TODO: parse URL or headers if needed
      const result = await updateTransfer(body.userId, body.id, body);
      return NextResponse.json({ result }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }