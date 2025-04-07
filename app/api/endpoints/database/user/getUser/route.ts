/* eslint-disable @typescript-eslint/no-explicit-any */
import { getUser } from "@/app/actions/database";
  import { NextResponse } from "next/server";
  
  export async function GET(req: Request) {
    try {    
         const {id} = await req.json()
      const result = await getUser(id);
      return NextResponse.json({ result }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }