
import AppImage from "@/components/ui/AppImage";

export default function LoadingPageComponenet() {
    return (
        <main
            className="fixed inset-0 z-50 flex min-h-screen w-full items-center justify-center bg-crimson"
            role="status"
            aria-label="Loading page"
        >
            <AppImage
                width={80}
                height={80}
                src="/images/Loghanteh-logo.svg"
                alt="Loghanteh logo"
                className="h-16 w-16 brightness-0 invert md:h-20 md:w-20"
            />
        </main>
    );
}
