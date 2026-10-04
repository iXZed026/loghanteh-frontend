import FadeIn from "@/components/animations/FadeIn";
import FadeUp from "@/components/animations/FadeUp";
import {
  slowTransitionOut,
  verySlowTransitionOut,
} from "@/lib/animations/transitions";
import { cn } from "@/lib/utils/cn";
import AppImage from "@/components/ui/AppImage";

interface ITicketHeaderBoxProps {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
}

function TicketHeaderBox({
  title,
  description,
  image,
  imageAlt = "",
}: ITicketHeaderBoxProps) {

  return (
    <div
      className={cn(
        "w-full",
        "bg-crimson",
        "rounded-xl",
        "md:py-7 py-15",
        "xl:px-15 px-10",
        "text-white-utility",
        "grid grid-cols-12",
        "md:gap-3 gap-y-8",
      )}
    >

      {/* Image */}
      <FadeIn
        transition={slowTransitionOut}
        once={true}
        className={cn(
          "md:col-span-6 col-span-12",
          "fec",
          "order-1 md:order-2",
        )}
      >
        <div
          className={cn(
            "md:w-100 md:h-100",
            "h-60 w-full",
            "bg-white-utility",
            "rounded-xl",
            "overflow-hidden",
          )}
        >
          <AppImage
            src={image}
            alt={imageAlt}
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </FadeIn>

      {/* Content */}
      <div
        className={cn(
          "overflow-hidden",
          "md:col-span-6 col-span-12",
          "fcol justify-center gap-7.5",
          "md:px-0 md:text-start text-center",
          "order-2 md:order-1",
        )}
      >
        <FadeIn
          transition={verySlowTransitionOut}
          once={true}
        >
          <h2 className="font-wulkan md:text-4xl text-2xl font-bold">
            {title}
          </h2>
        </FadeIn>

        <FadeUp
          transition={verySlowTransitionOut}
          once={true}
        >
          <p className="text-base leading-relaxed">
            {description}
          </p>
        </FadeUp>
      </div>

    </div>
  );
}

export default TicketHeaderBox;