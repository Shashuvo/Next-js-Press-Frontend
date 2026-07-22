"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { loginAction } from "../_actions/authActions"

const LoginForm = () => {
    return (
        <form action={loginAction} className="space-y-4">
            <Card className="p-5 space-y-4">
                <input type="email" name="email" placeholder="Enter Your Email" required />
                <input type="password" name="password" placeholder="Enter Your Password" required />
                <Button type="submit">
                    Login
                </Button>
            </Card>
        </form>
    )
}

export default LoginForm
