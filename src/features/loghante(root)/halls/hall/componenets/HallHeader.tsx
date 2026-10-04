"use client";

import React from "react";

import { useHall } from "../../context/HallProvider";

import { cn } from "@/lib/utils/cn";

function HallHeader() {
    const { hallData } = useHall();

    if (!hallData) {
        return null;
    }

    const {
        title,
        description,
        imageURL,
        cinemaDetails,
        theaterDetails,
    } = hallData.eventData;

    return (
        <div
            className={cn(
                "flex",
                "flex-col",
                "gap-6",
                "rounded-2xl",
                "text-white-utility",
                "border",
                "border-black-opacity",
                "p-9",
                "lg:flex-row",
                "lg:items-center",
                "bg-crimson"
            )}
        >
            <div
                className={cn(
                    "h-52",
                    "w-full",
                    "shrink-0",
                    "overflow-hidden",
                    "rounded-xl",
                    "lg:w-72",
                )}
            >
                <img
                    src={imageURL}
                    alt={title}
                    className="size-full object-cover"
                />
            </div>

            <div className="fcol gap-4 lg:w-3/5 w-full">
                <div className="fcol gap-y-5">
                    <div>
                        <h1 className="text-4xl font-bold font-wulkan">
                            {title}
                        </h1>
                    </div>

                    {cinemaDetails && (
                        <div
                            className={cn(
                                "flex",
                                "flex-wrap",
                                "gap-x-6",
                                "gap-y-3",
                                "text-sm",
                            )}
                        >
                            <span>
                                Director:{" "}
                                {cinemaDetails.director}
                            </span>

                            <span>
                                Country:{" "}
                                {cinemaDetails.country}
                            </span>

                            <span>
                                Genre:{" "}
                                {cinemaDetails.genre}
                            </span>

                            <span>
                                IMDb:{" "}
                                {cinemaDetails.imdbScore}
                            </span>
                        </div>
                    )}

                    {theaterDetails && (
                        <div
                            className={cn(
                                "flex",
                                "flex-wrap",
                                "gap-x-6",
                                "gap-y-3",
                                "text-sm",
                            )}
                        >
                            <span>
                                Director:{" "}
                                {theaterDetails.director}
                            </span>

                            <span>
                                Writer:{" "}
                                {theaterDetails.writer}
                            </span>

                            <span>
                                Duration:{" "}
                                {theaterDetails.duration} min
                            </span>
                        </div>
                    )}

                    <div>

                        <p className="text-sm leading-6 text-white-light-utility">
                            {description}
                        </p>
                    </div>
                </div>


            </div>
        </div >
    );
}

export default HallHeader;