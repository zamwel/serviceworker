/* eslint-disable @typescript-eslint/no-explicit-any */


export interface ContextHookProps {
    currentuser: DridexUser | null
    setCurrentuser: (data: DridexUser | null) => void
    openConfirm: boolean
    setOpenConfirm: (item: boolean) => void
    loadingProducts: boolean
    setLoadingProducts: (item: boolean) => void

}


export interface DridexUser {
    [x: string]: any
    email: string;
    password: string;
    username: string;
    createdAt: Date;
    license: string

}


export interface DridexTransfer {
    [x: string]: any
    transferdata: string
    userId: string

}

export interface DridexTransaction {
    [x: string]: any
    createdAt?: Date;
    updatedAt?: Date;
    paymentId: string;
    paymentType: string;
    userId: string;
    amount: string

}

export interface DridexLicense {
    [x: string]: any
    userId: string
    licensedata: string
}

export interface PaymentList {
    amount: number;
    coin: string;
}

export interface CryptoPaymentStatus {
    [x: string]: any;
    payment_id: number;
    invoice_id: string | null;
    payment_status: string;
    pay_address: string;
    payin_extra_id: string | null;
    price_amount: number;
    price_currency: string;
    pay_amount: number;
    actually_paid: number;
    pay_currency: string;
    order_id: string;
    order_description: string;
    purchase_id: number;
    outcome_amount: number | null;
    outcome_currency: string;
    payout_hash: string | null;
    payin_hash: string | null;
    created_at: string;
    updated_at: string;
    burning_percent: string | null;
}