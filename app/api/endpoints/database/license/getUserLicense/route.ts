import { getUserLicense } from "@/app/actions/database";
  import { NextResponse } from "next/server";
  
  export async function GET(req: Request) {
    try {    
         const {userId} = await req.json()
      const result = await getUserLicense(userId);
      return NextResponse.json({ result }, { status: 200 });
    } catch (error: any) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
  }