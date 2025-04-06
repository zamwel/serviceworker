/* eslint-disable @typescript-eslint/no-explicit-any */

import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie';


export const generateToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: "7d" });
}

export const verifyToken = (token: string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!)
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const PaymentID = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export const encrypt = (text: string): string => {
    const secretKey = process.env.NEXT_PUBLIC_SEEDPHRASE!;
    return CryptoJS.AES.encrypt(text, secretKey).toString();
};

export const decrypt = (text: string): string => {
    const secretKey = process.env.NEXT_PUBLIC_SEEDPHRASE!;
    const bytes = CryptoJS.AES.decrypt(text, secretKey);
    return bytes.toString(CryptoJS.enc.Utf8);
}

export const isValidCryptoAddress = (address: string): boolean => {
    const pattern = /^(1[a-zA-HJ-NP-Z0-9]{25,34}|3[a-zA-HJ-NP-Z0-9]{25,34}|bc1[a-zA-HJ-NP-Z0-9]{39,62}|0x[a-fA-F0-9]{40})$/;
    return pattern.test(address);
};

export const handlePaste = async () => {
    try {
        const clipboardText = await navigator.clipboard.readText();
        return clipboardText
    } catch (err) {
        console.error("Failed to read clipboard: ", err);
    }
};

export const UID = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export const waitForAWhile = async (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

export const closeDialog = () => {
    const dialog = document.querySelector("[data-state='open']");
    if (dialog) {
        (dialog as HTMLElement).click(); // Simulates a click to close the dialog
    }

}

export const setCookieData = async (id: string, datavalue: any) => {

    try {
        const jsonData = JSON.stringify(datavalue);
        if (jsonData.length > 4096) {
            throw new Error("Data is too big to be stored locally")
        } else {
            Cookies.set(id, encrypt(jsonData), { expires: 60 });
        }
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const getCookieData = (id: string) => {
    try {
        const item = Cookies.get(id);
        if (item) {
            return JSON.parse(decrypt(item));
        }
    } catch (error: any) {
        throw new Error(error.message)
    }

}

export const getDateRange = (): string => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    const formatDate = (date: Date): string =>
        date.toISOString().split('T')[0];

    const start_date = formatDate(yesterday);
    const end_date = formatDate(today);

    return `start_date=${start_date}&end_date=${end_date}`;
};

export const getCurrencyConversion = async (iso: string) => {
    try {
        const request = await fetch(`https://fxds-public-exchange-rates-api.oanda.com/cc-api/currencies?base=USD&quote=${iso}&data_type=general_currency_pair&${getDateRange()}`, {
            "headers": {
                "accept": "application/json, text/plain, */*",
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
            },
            "referrer": "https://www.oanda.com/",

        });

        const response = await request.json()
        return parseFloat((parseFloat(response.response[0].high_ask) * 1.1).toFixed(2))
    } catch (error: any) {
        throw new Error(error.message)
    }
};

export const getCryptoConversion = async (iso: string) => {
    try {
        const request = await fetch(`https://fxds-public-exchange-rates-api.oanda.com/cc-api/currencies?base=${iso}&quote=USD&data_type=general_currency_pair&${getDateRange()}`, {
            "headers": {
                "accept": "application/json, text/plain, */*",
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
            },
            "referrer": "https://www.oanda.com/",

        });

        const response = await request.json()
        return parseFloat(response.response[0].high_ask)
    } catch (error: any) {
        throw new Error(error.message)
    }
};
