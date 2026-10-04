import Loading from "@/components/ui/Loading";

export default function LoadingPage() {
    return (
        <main className="fcc min-h-[70vh]">
            <Loading
                size={55}
                className="h-screen w-full"
            />
        </main>
    )
}