
import FadeUp from "@/components/animations/FadeUp"
import AuthHeader from "@/features/loghante(root)/auth/components/AuthHeader"
import { cn } from "@/lib/utils/cn"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div
            className={cn(
                "flex min-h-dvh w-full items-center justify-center",
                "bg-crimson",
                "sm:py-10",
            )}
        >
            <FadeUp
                className={cn(
                    "w-full sm:w-130",
                    "min-h-dvh sm:min-h-0",
                    "px-5 py-10 sm:px-10 sm:py-15 md:px-15",
                    "bg-white-utility",
                    "sm:rounded-xl",
                )}
            >
                <div className="flex min-h-full flex-col">
                    <AuthHeader />

                    <main className="flex-1">
                        {children}
                    </main>
                </div>
            </FadeUp>
        </div>
    )
}
