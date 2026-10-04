"use client"
import AppLink from '@/components/ui/AppLink'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils/cn'
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

function AuthRoutes() {

    const routesT = useTranslations("authRoutes")

    const pathname = usePathname();
    //Cheking Routes for activing bg
    const checkActiveRoute = (
        route: string) => {
        if (pathname.includes(route)) {
            return true
        }
        return false
    }

    return (
        <div
            className={cn(
                "fbc gap-2",
                "px-3 py-2",
                "font-bold text-[14px]",
                "rounded-3xl",
                "bg-[#5C212763]"
            )}
        >
            <AppLink
                href="/register"
                className="w-full"
            >
                <Button
                    className={cn(
                        "w-full",
                        "py-1",
                        "rounded-3xl",
                        checkActiveRoute("register") && "bg-crimson"
                    )}
                >
                    <span>{routesT("routes.register")}</span>
                </Button>
            </AppLink>

            <AppLink
                href="/login"
                className="w-full"
            >
                <Button
                    className={cn(
                        "w-full",
                        "py-1",
                        "rounded-3xl",
                        checkActiveRoute("login") && "bg-crimson"
                    )}
                >
                    <span>{routesT("routes.login")}</span>
                </Button>
            </AppLink>
        </div>
    );
}

export default AuthRoutes;