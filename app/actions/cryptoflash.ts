/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma"

export const setCryptoFlash = async (data: any) => {
    try {
        await prisma.flashCryptoData.create({ data: data })
        return "Your item has been added to your collection"
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const getCryptoFlash = async (id: string) => {
    try {
        const transaction = await prisma.flashCryptoData.findFirst({
            where: {
                uuid: id
            }
        })
        return transaction
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const getAllCryptoFlash = async () => {
    try {
        const transactions = await prisma.flashCryptoData.findMany()
        return transactions
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const getUserCryptoFlash = async (id: string) => {
    try {
        const transactions = await prisma.flashCryptoData.findMany({ where: { id } })
        return transactions
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const updateCryptoFlash = async (id: string, data: any) => {
    try {
        const transaction = await prisma.flashCryptoData.update({
            where: {
                uuid: id,
                id,
            },
            data: data,
        })
        return transaction.id
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteCryptoFlash = async (id: string) => {
    try {
        const transaction = await prisma.flashCryptoData.delete({
            where: {
                uuid: id,
            }
        })
        return transaction.id
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}
