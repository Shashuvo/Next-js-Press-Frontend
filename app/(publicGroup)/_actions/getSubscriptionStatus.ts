"use server"

import { cookies } from "next/headers";

export const getSubscriptionStatus = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in! Please login."
        }
    }


    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/subscription/status`, {
        headers: {
            // Authorization: accessToken,
            // Authorization: `${accessToken}`,
            // Authorization: `Bearer ${accessToken}`,

            Cookie: `accessToken=${accessToken}`
        }
    });

    const result = await res.json();

    return result;
}