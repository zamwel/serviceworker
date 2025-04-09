/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllUsers } from "@/app/actions/database";
  import { NextResponse } from "next/server";
  
  export async function GET() {
    try {    
         
      const result = await getAllUsers();
      return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }