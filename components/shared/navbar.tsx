"use client"

import { useEffect, useState } from "react"
import {
    LayoutDashboard,
    FolderKanban,
    Users,
    BarChart3,
    User,
    Settings,
    CreditCard,
    LifeBuoy,
    LogOut,
    Menu,
    X,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { logout } from "@/service/logout"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

const navItems = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { label: "Projects", href: "/projects", icon: FolderKanban },
    { label: "Team", href: "/team", icon: Users },
    { label: "Analytics", href: "/analytics", icon: BarChart3 },
]

const userMenuItems = [
    { label: "Profile", icon: User },
    { label: "Settings", icon: Settings },
    { label: "Billing", icon: CreditCard },
    { label: "Support", icon: LifeBuoy },
]

type IUser = {
    success: boolean,
    statusCode: number,
    message: string,
    data: {
        profile: {
            id: string,
            name: string,
            email: string,
            activeStatus: string,
            role: string,
            createdAt: string,
            updatedAt: string,
            profile: {
                id: string,
                profilePhoto: string,
                bio: string | null,
                userId: string,
                createdAt: string,
                updatedAt: string,
            }
        }
    }
}

type NavbarProps = {
    user: IUser
}

export function Navbar({ user }: NavbarProps) {
    const [activeHref, setActiveHref] = useState("/")
    const [mobileOpen, setMobileOpen] = useState(false)
    // const [isLogout, setIsLogout] = useState(false)
    const router = useRouter()

    const handleUserMenuAction = async (action: string) => {
        if (action === "logout") {
            await logout();
            // setIsLogout(true);
            toast.success("User logged out successfully.")
            router.push("/login")
        }
    }

    // useEffect(() => {
    //     if (isLogout) {
    //         toast.success("User logged out successfully.")
    //         router.push("/login")
    //     }
    // }, [isLogout, router])

    return (
        <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
                    <span className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                        N
                    </span>
                    <span className="tracking-tight">NextJS Press</span>
                </Link>

                {/* Desktop nav links */}
                <ul className="hidden items-center gap-1 md:flex">
                    {navItems.map((item) => {
                        const Icon = item.icon
                        const isActive = activeHref === item.href
                        return (
                            <li key={item.href}>
                                <a
                                    href={item.href}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        setActiveHref(item.href)
                                    }}
                                    className={cn(
                                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-accent text-accent-foreground"
                                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                    )}
                                >
                                    <Icon className="size-4" />
                                    {item.label}
                                </a>
                            </li>
                        )
                    })}
                </ul>

                {/* Right side: user dropdown + mobile toggle */}
                <div className="flex items-center gap-2">
                    {
                        user.success ?
                            (<DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        className="relative size-9 rounded-full p-0"
                                        aria-label="Open user menu"
                                    >
                                        <Avatar className="size-9">
                                            <AvatarImage src={user.data?.profile.profile.profilePhoto || "/placeholder.svg"} alt={user.data?.profile.name} />
                                            <AvatarFallback>
                                                {user.data?.profile.name || "John Doe"
                                                    .split(" ")
                                                    .map((n) => n[0])
                                                    .join("")}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuGroup>
                                        <DropdownMenuLabel>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-sm font-medium text-foreground">{user.data?.profile.name || "John Doe"}</span>
                                                <span className="text-xs font-normal text-muted-foreground">{user.data?.profile.email || "JohnDoe@email.com"}</span>
                                            </div>
                                        </DropdownMenuLabel>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        {userMenuItems.map((item) => {
                                            const Icon = item.icon
                                            return (
                                                <DropdownMenuItem key={item.label} onClick={() => console.log("[v0] menu:", item.label)}>
                                                    <Icon />
                                                    {item.label}
                                                </DropdownMenuItem>
                                            )
                                        })}
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem variant="destructive" onClick={async () => {
                                        await handleUserMenuAction("logout");
                                    }}>
                                        <LogOut />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>) :
                            <Link href={"/login"}>
                                <Button>Login</Button>
                            </Link>
                    }

                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileOpen}
                        onClick={() => setMobileOpen((v) => !v)}
                    >
                        {mobileOpen ? <X /> : <Menu />}
                    </Button>
                </div>
            </nav>

            {/* Mobile nav links */}
            {mobileOpen && (
                <div className="border-t border-border md:hidden">
                    <ul className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:px-6">
                        {navItems.map((item) => {
                            const Icon = item.icon
                            const isActive = activeHref === item.href
                            return (
                                <li key={item.href}>
                                    <a
                                        href={item.href}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            setActiveHref(item.href)
                                            setMobileOpen(false)
                                        }}
                                        className={cn(
                                            "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                            isActive
                                                ? "bg-accent text-accent-foreground"
                                                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                                        )}
                                    >
                                        <Icon className="size-4" />
                                        {item.label}
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            )}
        </header>
    )
}
