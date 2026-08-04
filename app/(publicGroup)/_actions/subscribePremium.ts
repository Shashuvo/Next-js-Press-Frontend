"use server"

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const subscribePremium = async () => {
    const cookieStore = await cookies();

    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
        return {
            success: false,
            message: "User not logged in! Please login."
        }
    }


    const res = await fetch(`${process.env.BACKEND_APP_URL}/api/subscription/checkout`, {
        method: "POST",
        headers: {
            // Authorization: accessToken,
            // Authorization: `${accessToken}`,
            // Authorization: `Bearer ${accessToken}`,

            Cookie: `accessToken=${accessToken}`
        }
    });

    const result = await res.json();

    if (result.success && result.data?.paymentURL) {
        redirect(result.data.paymentURL);
    }

    return result;
}