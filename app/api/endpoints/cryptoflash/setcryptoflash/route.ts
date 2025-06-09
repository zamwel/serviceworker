/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { setCryptoFlash } from '@/app/actions/cryptoflash';
import { NextResponse } from 'next/server';



export async function POST(request: Request) {
    try {
        const body = await request.json();
        const res = await setCryptoFlash(body);
        return NextResponse.json({ message: 'Success', data: res }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
