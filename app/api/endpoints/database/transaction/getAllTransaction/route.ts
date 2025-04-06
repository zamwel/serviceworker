import { getAllTransaction } from "@/app/actions/database";
  import { NextResponse } from "next/server";
  
  export async function GET(req: Request) {
    try {    
         
      const result = await getAllTransaction();
      return NextResponse.json({ result }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }