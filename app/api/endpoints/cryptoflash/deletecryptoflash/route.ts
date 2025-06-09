/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { deleteCryptoFlash } from '@/app/actions/cryptoflash';
import { NextResponse } from 'next/server';


export async function DELETE(request: Request) {
    try {
        const { id } = await request.json();
        await deleteCryptoFlash(id);
        return NextResponse.json({ message: 'Deleted' }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

