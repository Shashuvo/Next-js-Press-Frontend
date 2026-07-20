"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const LoginForm = () => {
    return (
        <form className="space-y-4">
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
