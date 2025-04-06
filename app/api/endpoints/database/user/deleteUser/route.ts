import { deleteUser } from "@/app/actions/database";
  import { NextResponse } from "next/server";
  
  export async function DELETE(req: Request) {
    try {
      
      //const params = {}; // TODO: parse URL or headers if needed
      const result = await deleteUser(body.id);
      return NextResponse.json({ result }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }