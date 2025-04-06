/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'
import { setCookieData } from "@/lib/functions";
/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { set } from "date-fns";

import { cookies } from "next/headers";

export const userlogout = async () => {
    try {
        const cookie = await cookies();
        cookie.delete('user')
        return "User has successfully signed out of this account"

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const userlogin = async (userdata: { email: string, password: string }) => {
    try {
        const { email, password } = userdata;

        // Check if user exists with the provided email
        const user = await prisma.dridexUser.findUnique({ where: { email } });

        if (!user) {
            throw new Error("Invalid user credentials. Your email address is incorrect");
        }

        // Verify the password
        const isCorrectPassword = await bcrypt.compare(password, user.password);
        if (!isCorrectPassword) {
            throw new Error("Invalid user credentials. Your password is incorrect");
        }

        // Prepare the authenticated user data
        const authUser = {
            ...user,
            password: "****************"
        };

        return { user: authUser, message: "User authenticated successfully", status: "success" };
    } catch (error: any) {
        throw new Error(error.message);
    } finally {
        await prisma.$disconnect();
    }
};

export const userregister = async (userdata: { email: string, password: string, username: string }) => {
    try {
        const { email, password, username } = userdata;

        // Check if email already exists
        const existingUseremail = await prisma.dridexUser.findUnique({ where: { email } });
        if (existingUseremail) {
            throw new Error("User email already exists");
        }

        const existingUsername = await prisma.dridexUser.findFirst({ where: { username } });
        if (existingUsername) {
            throw new Error("Username already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.dridexUser.create({
            data: {
                email,
                password: hashedPassword,
                
                username
            },
        });

        const currentUser = {
            ...newUser,
            password: "****************"
        };


        return { user: currentUser, message: "User registered successfully", status: "success" };
    } catch (error: any) {
        throw new Error(error.message);
    } finally {
        await prisma.$disconnect();
    }
};

export const currentUserStatus = async (email: string) => {
    try {

        const user = await prisma.dridexUser.findUnique({ where: { email } });

        if (!user) {
            return null
        }
        const authUser = {
            ...user,
            password: "****************"
        };
        return authUser
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}

export const updateUserProfile = async (id: string, data: any) => {
    try {
        const usercred = await prisma.dridexUser.findUnique({ where: { id } });
        const isCorrectPassword = await bcrypt.compare(data.oldpassword, usercred!.password);
        if (data.password && !isCorrectPassword) {
            throw new Error("Invalid user credentials. Your password is incorrect");
        }

        const { oldpassword, ...rest } = data
        const hashedPassword = await bcrypt.hash(rest.password, 10);

        let updatedData: { username?: string; email?: string; password?: string } = {}

        if (data.username.length > 4 && data.username !== usercred?.username) {
            updatedData = {
                username: data.username
            }
        }
        else if (data.email && data.email.length > 5 && data.email !== usercred?.email) {
            updatedData = {
                username: data.username,
                email: data.email
            }
        }
        else if (data.password && hashedPassword) {
            updatedData = {
                username: data.username,
                email: data.email,
                password: hashedPassword
            }
        }

        if (updatedData.username || updatedData.email || updatedData.password) {
            const user = await prisma.dridexUser.update({
                where: {
                    id,
                },
                data: updatedData,
            })
            setCookieData("user", user);
            return user.id
        } else {
            console.log("Updated data:", updatedData)
            throw new Error("No changes made to the user profile")
        }
    } catch (error: any) {
        throw new Error(error.message)
    } finally {
        await prisma.$disconnect();
    }
}