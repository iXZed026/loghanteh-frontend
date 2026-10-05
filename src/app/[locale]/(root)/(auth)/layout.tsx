import FadeUp from "@/components/animations/FadeUp";
import AuthHeader from "@/features/loghante(root)/auth/components/AuthHeader";

import { cn } from "@/lib/utils/cn";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full min-h-screen sm:py-10 bg-crimson fcc">
            <FadeUp className={cn(
                "sm:h-auto min-h-screen sm:w-130 w-full",
                "md:px-15 sm:px-10 px-5 py-15",
                "bg-white-utility",
                "sm:rounded-xl"
            )}>
                <div>
                    <AuthHeader />
                    <main>
                        {children}
                    </main>
                </div>
            </FadeUp>
        </div>
    );
}