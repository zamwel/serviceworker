import { deleteTransfer } from "@/app/actions/database";
  import { NextResponse } from "next/server";
  
  export async function DELETE(req: Request) {
    try {    
         const {userId, id} = await req.json()
      const result = await deleteTransfer(userId, id);
      return NextResponse.json({ result }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }