import FadeUp from "@/components/animations/FadeUp";
import Container from "@/components/shared/Container";
import PaymentTicketInfo from "@/features/loghante(root)/payment/components/PaymentTicketInfo";
import PaymentGuard from "@/features/loghante(root)/payment/components/PaymentGuard";
import { cn } from "@/lib/utils/cn";
import PaymentDetails from "@/features/loghante(root)/payment/components/PaymentDetails";
import CheckAuthorized from "@/components/shared/auth/CheckAuthorized";

function PaymentPage() {

    return (
        <CheckAuthorized>

            <PaymentGuard>

                <FadeUp>

                    <Container>

                        <div
                            className={cn(
                                "grid",
                                "grid-cols-12",
                                "lg:gap-8",
                                "gap-5",
                                "w-full",
                                "max-w-full",
                                "min-w-0",
                                "overflow-x-hidden",
                                "py-7.5",
                            )}
                        >

                            <PaymentTicketInfo />
                            <PaymentDetails />

                        </div>

                    </Container>

                </FadeUp>

            </PaymentGuard>
        </CheckAuthorized>

    );
}

export default PaymentPage;