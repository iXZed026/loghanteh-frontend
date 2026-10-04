import { cn } from "@/lib/utils/cn";

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
            onClick={onClick}
            disabled={disabled}
            aria-pressed={
                reserved
                    ? false
                    : selected
            }
            aria-label={
                reserved
                    ? `Seat ${seatNum} is reserved`
                    : `Seat ${seatNum}`
            }
            className={cn(
                "size-12",
                "shrink-0",
                "rounded-xl",
                "fcc",
                "border",
                "transition-all",
                "duration-200",

                reserved
                    ? [
                          "cursor-not-allowed",
                          "border-gold-utility",
                          "bg-gold-utility",
                          "text-white",
                          "line-through",
                      ]
                    : selected
                        ? [
                              "cursor-pointer",
                              "border-crimson",
                              "bg-crimson",
                              "text-white",
                              "scale-105",
                              "shadow-md",
                          ]
                        : [
                              "cursor-pointer",
                              "border-[var(--black-light-color)]",
                              "bg-white",
                              "hover:bg-[var(--crimson-opacity-color)]",
                              "hover:border-crimson",
                          ],

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

export default SeatsBox;