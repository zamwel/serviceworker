/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { PaymentID, setCookieData } from '@/lib/functions';
import { CryptoPaymentStatus, PaymentList } from '@/lib/interface';
import prisma from '@/lib/prisma';

const flwkeys = process.env.LIVE_FLW_SK!



export const bankpyment = async (id: string, amount: number, rate: number) => {
    const txRef = id;
    const email = "appdevlap@gmai.com";
    const headers = {
        accept: 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Bearer ${flwkeys}`,
    };

    const data = {
        tx_ref: txRef,
        amount: amount * rate,
        currency: "NGN",
        payment_type: "bank_transfer",
        email: email,
        redirect_url: "https://your-redirect-url.com/",
    };
    //console.log(txRef)

    try {
        const response = await fetch("https://api.flutterwave.com/v3/charges?type=bank_transfer", {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            if (result.status === "success") {
                return { ...result, txRef }
            } else {
                throw new Error("Payment Failed");
            }
        } else {
            throw new Error("first level error:" + response.statusText);
        }
    } catch (error: any) {
        throw new Error(error.message);
    }

}

export const momopayment = async (id: string, amount: number, rate: number, phoneNumber: string, network: string) => {
    const txRef = id
    const curr = 'GHS';

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${flwkeys}`,
    };

    const data = {
        tx_ref: txRef,
        amount: amount * rate,
        currency: curr,
        payment_type: "mobilemoney",
        phone_number: phoneNumber,
        network: network,
        email: "appdevlap@gmail.com",
    };

    try {
        const response = await fetch(`https://api.flutterwave.com/v3/charges?type=mobile_money_ghana`, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const result = await response.json();
            if (result.status === "success") {
                if (result.meta?.authorization?.mode === "redirect") {
                    return { url: result.meta.authorization.redirect, txRef };
                } else {
                    throw new Error("Payment Successful");
                }
            } else {
                throw new Error("Payment Failed");
            }
        } else {
            throw new Error("Error Occurred");
        }
    } catch (error: any) {
        throw new Error(error.message!.toString());
    }
}

export const verifyMoMoOtp = async (url: string, otp: string) => {
    //console.log(url, otp)
    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${flwkeys}`,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        "Referer": url,
    };

    try {
        const response = await fetch(`${url}?solution=${otp}`, {
            method: 'POST',
            headers: headers,
        });

        const result = await response.json();
        return result
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const checkTransactionStatus = async (txRef: string) => {
    if (!flwkeys) throw new Error("API key is missing.");
    const headers = {
        "accept": 'application/json',
        "Content-Type": "application/json",
        "Authorization": `Bearer ${flwkeys}`,
    };

    try {
        const response = await fetch(`https://api.flutterwave.com/v3/transactions/verify_by_reference?tx_ref=${txRef}`, {
            method: 'GET',
            headers: headers,
        });

        const result = await response.json();
        //console.log('result', result)

        if (result.message === "No transaction was found for this id")
            throw new Error("Waiting for your transaction")
        return result;

    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const createcryptoPayment = async (list: PaymentList): Promise<CryptoPaymentStatus> => {
    const pkey = process.env.CPAY as string;

    const { amount, coin } = list;
    //console.log('Amount: ', amount, 'Coin: ', coin, 'key', pkey);

    const myHeaders = new Headers();
    myHeaders.append("x-api-key", pkey);
    myHeaders.append("Content-Type", "application/json");



    const raw = JSON.stringify({
        "price_amount": amount,
        "price_currency": "usd",
        "pay_currency": coin,
        "ipn_callback_url": "https://nowpayments.io",
        "order_id": 'DMT-' + PaymentID(8).toUpperCase(),
        "is_fee_paid_by_user": false,
        "is_fixed_rate": true,
        "order_description": `This payment will enable the tools to be set in order for the transaction process to be completed. Pay exactly the actual amount to avoid any issues.`
    });

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    try {

        const data = await fetch("https://api.nowpayments.io/v1/payment", requestOptions);
        const result = await data.json();
        //console.log(result);
        return getcryptopaymentStatus(result.payment_id);

    } catch (error: any) {
        throw new Error(error.message);
    }


};

export const isPaymentServed = async (paymentId: string) => {
    try {
        const ispayexits = await prisma.dridexTransaction.findFirst({ where: { paymentId } });
        return ispayexits
    } catch (error: any) {
        throw new Error(error.message)
    }

}

export const getcryptopaymentStatus = async (pid: string) => {
    const myHeaders = new Headers();
    myHeaders.append("x-api-key", process.env.CPAY as string);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
    try {
        const res = await fetch(`https://api.nowpayments.io/v1/payment/${pid}`, requestOptions)
        return res.json();
    }
    catch (error: any) {
        throw new Error(error.message);
    }
}

export const updateBalance = async (id: string, balance: number, record?: any) => {
    try {
        const update = await prisma.dridexUser.update({
            where: { id },
            data: { balance },
        });


        if (record) {
            try {

                await prisma.dridexTransaction.create({
                    data: record,
                });
            } catch (error: any) {
                throw new Error(error.message)
            }
        }

        const newBalance = await prisma.dridexUser.findUnique({
            where: { id },
        });



        return { update, newBalance }
    } catch (error: any) {
        throw new Error(error.message);
    } finally {
        await prisma.$disconnect();
    }
};
