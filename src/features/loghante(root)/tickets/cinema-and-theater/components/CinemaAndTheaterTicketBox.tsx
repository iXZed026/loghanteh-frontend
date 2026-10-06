"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    useLocale,
    useTranslations,
} from "next-intl";

import {
    useRouter,
} from "next/navigation";

import {
    FaRegClock,
    FaTicket,
} from "react-icons/fa6";

import {
    MdOutlineEventSeat,
} from "react-icons/md";

import AppImage from "@/components/ui/AppImage";
import Button from "@/components/ui/Button";

import {
    cn,
} from "@/lib/utils/cn";

import {
    useHall,
} from "@/features/loghante(root)/halls/context/HallProvider";

import type {
    CinemaAndTheaterSession,
} from "@/lib/api/ticket/cinema-and-theater";

interface CinemaAndTheaterTicketBoxProps {
    event: CinemaAndTheaterSession;
}

function CinemaAndTheaterTicketBox({
    event,
}: CinemaAndTheaterTicketBoxProps) {

    const locale =
        useLocale();

    const router =
        useRouter();

    const {
        setHallData,
    } = useHall();

    const ticketBoxT =
        useTranslations(
            "cinemaAndTheater.ticket-box",
        );

    const [
        currentTime,
        setCurrentTime,
    ] = useState<Date | null>(null);

    useEffect(() => {

        const updateTime = () => {
            setCurrentTime(
                new Date(),
            );
        };

        updateTime();

        const interval =
            setInterval(
                updateTime,
                60_000,
            );

        return () =>
            clearInterval(interval);

    }, []);

    const isCinema =
        Boolean(
            event.cinemaDetails,
        );

    const imageURL =
        event.images?.[0]?.imageUrl ||
        "/images/loghanteh-cafe.jpg";

    /*
     * Session start and end time.
     */

    const startAt =
        new Date(event.startAt);

    const endAt =
        new Date(
            startAt.getTime() +
            event.duration * 60 * 1000,
        );

    /*
     * Session status.
     */

    const isInProgress =
        Boolean(
            currentTime &&
            currentTime >= startAt &&
            currentTime < endAt,
        );

    const isFinished =
        Boolean(
            currentTime &&
            currentTime >= endAt,
        );

    const isUnavailable =
        isInProgress ||
        isFinished;

    /*
     * Button content.
     */

    const buttonContent =
        isInProgress
            ? ticketBoxT("in-progress")
            : isFinished
                ? ticketBoxT("ended")
                : ticketBoxT("book-button");

    /*
     * Start date & time.
     */

    const formattedTime =
        startAt.toLocaleTimeString(
            locale === "fa"
                ? "fa-IR"
                : "en-US",
            {
                hour: "2-digit",
                minute: "2-digit",
                hour12: locale !== "fa",
            },
        );

    /*
     * Booking.
     */

    function bookingHandler() {

        if (isUnavailable) {
            return;
        }

        setHallData({
            eventData: {
                sessionId:
                    event.sessionId,

                eventId:
                    event.eventId,

                hallId:
                    event.hallId,

                title:
                    event.name,

                description:
                    event.description,

                duration:
                    event.duration,

                startAt:
                    event.startAt,

                imageURL,

                price:
                    event.price ?? undefined,

                cinemaDetails:
                    event.cinemaDetails
                        ? {
                            eventId:
                                event.cinemaDetails.eventId,

                            releaseYear:
                                event.cinemaDetails.releaseYear ??
                                "",

                            director:
                                event.cinemaDetails.director,

                            country:
                                event.cinemaDetails.country,

                            filmDuration:
                                event.cinemaDetails.filmDuration,

                            genre:
                                event.cinemaDetails.genre,

                            imdbScore:
                                event.cinemaDetails.imdbScore ??
                                0,
                        }
                        : undefined,

                theaterDetails:
                    event.theaterDetails
                        ? {
                            eventId:
                                event.theaterDetails.eventId,

                            director:
                                event.theaterDetails.director,

                            writer:
                                event.theaterDetails.writer,

                            duration:
                                event.theaterDetails.duration,

                            releaseYear:
                                "",
                        }
                        : undefined,
            },
        });

        router.push(
            `/${locale}/hall/${event.hallId}`,
        );
    }

    return (
        <div
            className={cn(
                "md:col-span-6",
                "col-span-12",
                "group",
                "relative",
                "overflow-hidden",
                "rounded-2xl",
                "border",
                "border-black-opacity",
                "bg-white",
                "shadow-lg",
                "transition-all",
                "duration-500",
                "hover:shadow-2xl",

                isInProgress &&
                "border-crimson/40",

                isFinished &&
                "opacity-75",
            )}
        >

            {/* Image */}

            <div
                className="
                    relative
                    h-64
                    w-full
                    overflow-hidden
                    bg-[var(--black-light-color)]
                "
            >

                <AppImage
                    src={imageURL}
                    alt={event.name}
                    width={900}
                    height={550}
                    className="
                        h-full
                        w-full
                        object-cover
                        transition-transform
                        duration-700
                        group-hover:scale-105
                    "
                />

                <div
                    className={cn(
                        "absolute",
                        "inset-0",
                        "bg-gradient-to-t",
                        "from-black/85",
                        "via-black/20",
                        "to-transparent",

                        isInProgress &&
                        "from-crimson/80",

                        isFinished &&
                        "from-black/90",
                    )}
                />

                {/* Type */}

                <div
                    className={cn(
                        "absolute",
                        "left-4",
                        "top-4",
                        "rounded-full",
                        "border",
                        "border-white/20",
                        "px-4",
                        "py-1.5",
                        "text-xs",
                        "font-bold",
                        "backdrop-blur-md",
                        "text-white-utility",

                        isCinema
                            ? "bg-crimson/90"
                            : "bg-gold-utility/90",
                    )}
                >
                    {isCinema
                        ? ticketBoxT("cinema")
                        : ticketBoxT("theater")}
                </div>

                {/* Time */}

                <div
                    className="
                        absolute
                        right-4
                        top-4
                        flex
                        items-center
                        gap-2
                        rounded-full
                        bg-black/55
                        px-4
                        py-1.5
                        text-sm
                        font-semibold
                        text-white
                        backdrop-blur-md
                    "
                >
                    <FaRegClock
                        className="size-3.5"
                    />

                    <span>
                        {formattedTime}
                    </span>
                </div>

                {/* Session Status */}

                {(isInProgress || isFinished) && (
                    <div
                        className="
                            absolute
                            bottom-5
                            left-5
                            flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-white/20
                            bg-black/60
                            px-4
                            py-2
                            text-xs
                            font-bold
                            text-white
                            backdrop-blur-md
                        "
                    >
                        {isInProgress && (
                            <span
                                className="
                                    size-2
                                    animate-pulse
                                    rounded-full
                                    bg-white
                                "
                            />
                        )}

                        <span>
                            {isInProgress
                                ? ticketBoxT(
                                    "in-progress",
                                )
                                : ticketBoxT(
                                    "ended",
                                )}
                        </span>
                    </div>
                )}

                {/* Name */}

                <div
                    className={cn(
                        "absolute",
                        "left-5",
                        "right-5",
                        isInProgress || isFinished
                            ? "bottom-14"
                            : "bottom-5",
                    )}
                >
                    <h3
                        className="
                            text-xl
                            font-bold
                            text-white
                            drop-shadow-lg
                        "
                    >
                        {event.name}
                    </h3>

                    {isCinema &&
                        event.cinemaDetails
                            ?.genre && (
                            <span
                                className="
                                    mt-1
                                    inline-block
                                    text-sm
                                    text-white/75
                                "
                            >
                                {
                                    event.cinemaDetails
                                        .genre
                                }
                            </span>
                        )}
                </div>

            </div>

            {/* Information */}

            <div
                className="
                    fbc
                    gap-4
                    px-6
                    py-8
                "
            >

                {/* Duration */}

                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >
                    <div
                        className="
                            fcc
                            size-10
                            rounded-full
                            bg-[var(--white-light-color)]
                            text-crimson
                        "
                    >
                        <MdOutlineEventSeat
                            className="size-5"
                        />
                    </div>

                    <div className="fcol">

                        <span
                            className="
                                text-xs
                                text-black-light-utility
                            "
                        >
                            {ticketBoxT(
                                "duration",
                            )}
                        </span>

                        <span className="font-bold">
                            {event.duration}{" "}
                            {ticketBoxT("minutes")}
                        </span>

                    </div>
                </div>

                {/* Price */}

                <div
                    className="
                        rounded-full
                        bg-crimson/10
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-crimson
                    "
                >
                    {event.price !== null
                        ? `${event.price.toLocaleString()} ${ticketBoxT("currency")}`
                        : ticketBoxT("free")}
                </div>

            </div>

            {/* Book Ticket */}

            <div className="px-6 pb-6">

                <Button
                    type="button"
                    disabled={isUnavailable}
                    className={cn(
                        "flex",
                        "w-full",
                        "items-center",
                        "justify-center",
                        "gap-2",
                        "rounded-xl",
                        "px-5",
                        "py-3",
                        "font-semibold",
                        "transition-all",
                        "duration-300",

                        isUnavailable
                            ? [
                                "cursor-not-allowed",
                                "bg-black/10",
                                "text-black/40",
                            ]
                            : [
                                "bg-crimson",
                                "text-white",
                                "hover:bg-[var(--crimson-opacity-color)]",
                                "click-scale",
                            ],
                    )}
                    onClick={bookingHandler}
                >

                    {isInProgress ? (
                        <>
                            <span
                                className="
                                    size-2
                                    animate-pulse
                                    rounded-full
                                    bg-current
                                "
                            />

                            {buttonContent}
                        </>
                    ) : isFinished ? (
                        buttonContent
                    ) : (
                        <>
                            <FaTicket
                                className="size-3.5"
                            />

                            {buttonContent}
                        </>
                    )}

                </Button>

            </div>

        </div>
    );
}

export default CinemaAndTheaterTicketBox;

