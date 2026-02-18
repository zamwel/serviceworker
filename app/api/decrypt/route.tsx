import { ImageResponse } from 'next/og';
import { NextRequest, NextResponse } from 'next/server';
import { parseDecryptedText } from '@/lib/parser';
import { LOGO_SRC, PASSPORT_SRC, QR_SRC } from '@/lib/assets';
import { decryptText, encryptText } from '@/app/actions/crypto';
import { html } from 'satori-html';
import { template } from '@/app/actions/template';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { encryptedText, country, scansMode } = body;

        if (!encryptedText) {
            return NextResponse.json(
                { error: 'encryptedText is required' },
                { status: 400 }
            );
        }

        const isGhana = country?.toLowerCase() === 'ghana';
        if (!isGhana) {
            return NextResponse.json(
                { error: 'Country not supported' },
                { status: 400 }
            );
        }

        const result = await decryptText(encryptedText);
        const data = parseDecryptedText(result);

        return NextResponse.json(result)
    } catch (error: any) {
        console.error("API Error", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
