/* eslint-disable @typescript-eslint/no-explicit-any */
import { setLicense } from "@/app/actions/database";
  import { NextResponse } from "next/server";
  
  export async function POST(req: Request) {
    try {    
         const {data} = await req.json()
      const result = await setLicense(data);
      return NextResponse.json({ result }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }