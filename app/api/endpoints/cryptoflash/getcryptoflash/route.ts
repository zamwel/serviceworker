/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getCryptoFlash } from '@/app/actions/cryptoflash';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { id } = await request.json();
        const data = getCryptoFlash(id);

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
