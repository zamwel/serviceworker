/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { updateCryptoFlash } from '@/app/actions/cryptoflash';
import { NextResponse } from 'next/server';


export async function PUT(request: Request) {
    try {

        const { id, data } = await request.json();
        const res = await updateCryptoFlash(id, data);
        return NextResponse.json({ message: 'Updated', data: res }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
