"use client"
import AppImage from "../ui/AppImage";
import Button from "../ui/Button";
import Container from "../shared/Container";

import { poppins, rozname, wulkan } from "@/font";
import { cn } from "@/lib/utils/cn";
import { useRouter } from "next/navigation";

interface IErrorPage {
    statusCode: number | string;
    message: string;
    tryAgainButton?: boolean;
    onTryAgain?: () => void;
}

function ErrorPage({
    statusCode,
    message,
    tryAgainButton = false,
    onTryAgain,
}: IErrorPage) {

    const router = useRouter();

    const font = `${poppins.variable} ${wulkan.variable}`;

    return (
        <Container>
            <main
                className={cn(
                    "min-h-screen",
                    "fcc",
                    font,
                )}
            >
            <div className="min-h-[80vh] w-full fcol md:gap-3 gap-15">

                    {/* Loghanteh Logo */}
                    <div className="fcc">
                        <AppImage
                            width={80}
                            height={60}
                            src="/images/Loghanteh-logo.svg"
                            alt="Loghanteh logo"
                        />
                    </div>

                    {/* Errors Text */}
                    <div className="fcol items-center gap-15 text-center">

                        <span className="font-wulkan md:text-[200px] text-9xl font-bold text-crimson">
                            {statusCode}
                        </span>

                        <span className="md:text-3xl text-xl">
                            {message}
                        </span>

                        <div className="md:w-115 w-full fcc gap-8">

                            {/* Crimson Line */}
                            <div
                                className={cn(
                                    "w-full h-[2.5px] rounded-2xl",
                                    "bg-crimson"
                                )}
                            />

                            <div className="rotate-45">
                                <div
                                    className={cn(
                                        "border-4 border-[var(--crimson-color)]",
                                        "p-[3px]"
                                    )}
                                >
                                    <div
                                        className={cn(
                                            "bg-crimson",
                                            "p-1"
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Crimson Line */}
                            <div
                                className={cn(
                                    "w-full h-[2.5px] rounded-2xl",
                                    "bg-crimson"
                                )}
                            />

                        </div>
                        {tryAgainButton ? (
                            <Button
                                type="button"
                                className="rounded-sm bg-crimson px-6 py-2 text-sm font-semibold"
                                 onClick={onTryAgain}
                            >
                                Try Again
                            </Button>
                        ) : (
                            <>
                                <p className="font-light md:text-xl text-lg">
                                    Let’s get you back on the right path.
                                </p>
                                <Button
                                    type="button"
                                    className="rounded-sm bg-crimson px-6 py-2 text-sm font-semibold"
                                    onClick={() => router.back()}
                                >
                                    Back
                                </Button>
                            </>

                        )}

                    </div>
                </div>
            </main>
        </Container>
    );
}

export default ErrorPage;