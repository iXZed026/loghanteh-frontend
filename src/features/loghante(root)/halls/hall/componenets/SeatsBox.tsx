"use client";

import {
    memo,
} from "react";

import {
    cn,
} from "@/lib/utils/cn";

interface SeatsBoxProps {
    seatNum: number;
    selected: boolean;
    reserved: boolean;
    disabled: boolean;
    onClick: () => void;
}

function SeatsBox({
    seatNum,
    selected,
    reserved,
    disabled,
    onClick,
}: SeatsBoxProps) {

    return (
        <button
            type="button"
            disabled={disabled}
            aria-label={`Seat ${seatNum}`}
            aria-pressed={selected}
            aria-disabled={
                reserved || disabled
            }
            onClick={onClick}
            className={cn(
                /*
                 * Mobile
                 */
                "size-7.5",
                "rounded-lg",
                "text-[8px]",

                /*
                 * Desktop
                 * Keep the original seat size.
                 */
                "sm:size-11",
                "sm:rounded-xl",
                "sm:text-sm",

                "shrink-0",
                "grow-0",

                "fcc",

                "font-medium",

                "transition-all",
                "duration-150",

                "select-none",

                /*
                 * Selected
                 */
                selected &&
                    !reserved &&
                    [
                        "bg-crimson",
                        "text-white",
                        "shadow-sm",
                        "shadow-crimson/20",
                        "ring-2",
                        "ring-crimson/20",
                    ],

                /*
                 * Available
                 */
                !selected &&
                    !reserved &&
                    [
                        "border",
                        "border-[var(--black-light-color)]",
                        "bg-white",
                        "text-black",
                        "hover:bg-[var(--crimson-opacity-color)]",
                        "click-scale",
                        "cursor-pointer"
                    ],

                /*
                 * Reserved
                 */
                reserved && [
                    "cursor-not-allowed",
                    "bg-gold-utility",
                    "text-white",
                    "line-through",
                    "opacity-80",
                ],

                /*
                 * Loading / disabled
                 */
                disabled &&
                    !reserved && [
                        "cursor-wait",
                        "opacity-60",
                    ],
            )}
        >
            {seatNum}
        </button>
    );
}

export default memo(SeatsBox);