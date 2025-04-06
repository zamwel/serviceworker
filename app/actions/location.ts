/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export const generateipaddress = async (req: Request) => {
    try {
        const forwarded = req.headers.get('x-forwarded-for');
        const ip = forwarded ? forwarded.split(',')[0] : req.headers.get('remote-addr');
        return NextResponse.json({ ip }, { status: 200 });
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const geolocationdata = async (ip: string) => {
    try {

        const headersList = {
            "Accept": "*/*",
            "contentType": "application/json",
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Mobile Safari/537.36",
            "accept": "*/*",
            "accept-language": "en-US,en;q=0.9",
            "priority": "u=1, i",
            "sec-ch-ua": "\"Google Chrome\";v=\"131\", \"Chromium\";v=\"131\", \"Not_A Brand\";v=\"24\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-site"
        }
        const response = await fetch(`https://api.ipdata.co/${ip}?api-key=eca677b284b3bac29eb72f5e496aa9047f26543605efe99ff2ce35c9`, {
            method: 'GET',
            headers: headersList,
            referrer: "https://ipdata.co/",
            referrerPolicy: "strict-origin-when-cross-origin",
            body: null,
            mode: "cors",
            credentials: "omit"
        })


        if (response.ok) {
            const result = await response.json()
            return result
        }
        else {
            throw new Error(response.statusText)
        }

    } catch (error: any) {
        throw new Error(error.message)

    }
}


const getBaseUrl = async () => {
    const host = headers().then((value) => {
        const base = value.get("host") || "localhost:3000";
        return `http${base.includes("localhost") ? "" : "s"}://${base}`;
    })
    const baseurl = await host
    return baseurl
};

/* Calling */
export const getIp = async () => {
    try {
        const response = await fetch(await getBaseUrl() + '/api/address', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(error.message);
    }


}

export const GeoLocation = async () => {
    return await getIp().then(async (value) => {
        try {
            const response = await fetch(await getBaseUrl() + '/api/location', {

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ip: value.ip === "::1" ? "" : value.ip.replace(/:\d+$/, '') })
            });


            const data = await response.json();
            return data;
        } catch (error: any) {
            throw new Error(error.message);
        }
    })

}