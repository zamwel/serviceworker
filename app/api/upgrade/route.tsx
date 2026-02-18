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
        const { country, scansMade, countryCode, upgradedResults, prevResults } = body;

        if (!upgradedResults) {
            return NextResponse.json(
                { error: 'upgradedResults is required' },
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

        let data;
        try {
            data = parseDecryptedText(upgradedResults);
        } catch (e: any) {
            console.error("Parsing Error:", e);
            return NextResponse.json(
                { error: 'Failed to parse data' },
                { status: 500 }
            );
        }


        const finalEncrypt = await encryptText(upgradedResults);

        const tempData = {
            indexNumber: data.indexNumber,
            candidateName: data.candidateName,
            examType: data.examType,
            center: data.center,
            subjects: data.subjects,
            country: country || 'GH', // Default or from request
            countryCode: countryCode,
            cardUse: scansMade || 'N/A',
            encryptedText: encodeURIComponent(finalEncrypt.replace(/\n/g, '|'))
        };

        let htmlString = template(tempData);

        return new Response(htmlString, {
            headers: { 'Content-Type': 'text/html' },
        });

    } catch (error: any) {
        console.error("API Error", error);
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
