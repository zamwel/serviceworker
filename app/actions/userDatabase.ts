'use server'
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import prisma from "@/lib/prisma";

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
