'use server'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { setCookieData } from "@/lib/functions";
import prisma from "@/lib/prisma"

export const setTransaction = async (data: any) => {
    try {
        await prisma.dridexTransaction.create({ data: data })
        return "Your item has been added to your collection"
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const getTransaction = async (userId: string, id: string) => {
    try {
        const transaction = await prisma.dridexTransaction.findFirst({
            where: {
                userId, id
            }
        })
        return transaction
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const getAllTransaction = async () => {
    try {
        const transactions = await prisma.dridexTransaction.findMany()
        return transactions
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const getUserTransaction = async (userId: string) => {
    try {
        const transactions = await prisma.dridexTransaction.findMany({ where: { userId } })
        return transactions
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const updateTransaction = async (userId: string, id: string, data: any) => {
    try {
        const transaction = await prisma.dridexTransaction.update({
            where: {
                userId,
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

export const deleteTransaction = async (userId: string, id: string) => {
    try {
        const transaction = await prisma.dridexTransaction.delete({
            where: {
                userId,
                id,
            }
        })
        return transaction.id
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}


export const setTransfer = async (data: any) => {
    try {
        await prisma.dridexTransfer.create({ data: data })
        return "Your item has been added to your collection"
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const getTransfer = async (userId: string, id: string) => {
    try {
        const Transfer = await prisma.dridexTransfer.findFirst({
            where: {
                userId, id
            }
        })
        return Transfer
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const getAllTransfer = async () => {
    try {
        const Transfers = await prisma.dridexTransfer.findMany()
        return Transfers
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const getUserTransfer = async (userId: string) => {
    try {
        const Transfers = await prisma.dridexTransfer.findMany({ where: { userId } })
        return Transfers
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const updateTransfer = async (userId: string, id: string, data: any) => {
    try {
        const Transfer = await prisma.dridexTransfer.update({
            where: {
                userId,
                id,
            },
            data: data,
        })
        return Transfer.id
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteTransfer = async (userId: string, id: string) => {
    try {
        const Transfer = await prisma.dridexTransfer.delete({
            where: {
                userId,
                id,
            }
        })
        return Transfer.id
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}


export const setLicense = async (data: any) => {
    try {
        await prisma.dridexLicense.create({ data: data })
        return "Your item has been added to your collection"
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const getLicense = async (userId: string, id: string) => {
    try {
        const License = await prisma.dridexLicense.findFirst({
            where: {
                userId, id
            }
        })
        return License
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const getAllLicense = async () => {
    try {
        const Licenses = await prisma.dridexLicense.findMany()
        return Licenses
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const getUserLicense = async (userId: string) => {
    try {
        const Licenses = await prisma.dridexLicense.findMany({ where: { userId } })
        return Licenses
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const updateLicense = async (userId: string, id: string, data: any) => {
    try {
        const License = await prisma.dridexLicense.update({
            where: {
                userId,
                id,
            },
            data: data,
        })
        return License.id
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteLicense = async (userId: string, id: string) => {
    try {
        const License = await prisma.dridexLicense.delete({
            where: {
                userId,
                id,
            }
        })
        return License.id
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}


export const setUser = async (data: any) => {
    try {
        await prisma.dridexUser.create({ data: data })
        return "New User added"
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }

}

export const getUser = async (id: string) => {
    try {

        const user = await prisma.dridexUser.findFirst({ where: { id } })
        return user

    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const geAlltUsers = async () => {
    try {
        const users = await prisma.dridexUser.findMany()
        return users
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const updateUser = async (id: string, data: any) => {
    try {
        const user = await prisma.dridexUser.update({
            where: {
                id,
            },
            data: data,
        })
        return user.id
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const deleteUser = async (id: string) => {
    try {
        const user = await prisma.dridexUser.delete({
            where: {
                id,
            }
        })
        return user.id
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

