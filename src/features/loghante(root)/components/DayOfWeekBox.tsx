"use client";

import FadeUp from "@/components/animations/FadeUp";
import { DayOfTheWeek } from "@/data/days-of-the-week";
import {
  dayOfTheWeeksVariant,
} from "@/features/loghante(root)/animations/loghante.variants";
import { fastTransitionOut } from "@/lib/animations/transitions";
import { cn } from "@/lib/utils/cn";
import { formatMonthDay } from "@/lib/utils/date";
import { getLocalizedValue } from "@/lib/utils/getLocalizedValue";
import { useLocale } from "next-intl";

interface DayOfWeekBoxProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

function DayOfWeekBox({
  selectedDate,
  onDateChange,
}: DayOfWeekBoxProps) {

  const locale = useLocale();

  const today = new Date();

  function getDateByOffset(
    offset: number
  ) {
    const date = new Date(today);

    date.setDate(
      today.getDate() + offset
    );

    return date;
  }

  function isSameDate(
    firstDate: Date,
    secondDate: Date
  ) {
    return (
      firstDate.getFullYear() ===
        secondDate.getFullYear() &&
      firstDate.getMonth() ===
        secondDate.getMonth() &&
      firstDate.getDate() ===
        secondDate.getDate()
    );
  }

  return (
    <>
      {DayOfTheWeek.map(
        (day, index) => {

          const currentDate =
            getDateByOffset(index);

          const isSelected =
            isSameDate(
              currentDate,
              selectedDate
            );

          return (
            <FadeUp
              key={day.id}
              variants={dayOfTheWeeksVariant}
              transition={fastTransitionOut}
              once
              onClick={() =>
                onDateChange(
                  currentDate
                )
              }
              className={cn(
                "col-span-1",
                "min-w-0",
                "aspect-square",
                "w-full",
                "p-2 sm:p-3 md:p-4",
                "fcol justify-center items-center",
                "gap-2 sm:gap-3 md:gap-5",
                "border border-black-opacity",
                "shadow-xl",
                "rounded-xl",
                "text-center",
                "text-xs sm:text-sm md:text-base",
                "click-scale",
                "cursor-pointer",
                "select-none",
                "transition-colors duration-300",

                isSelected
                  ? [
                      "bg-[var(--crimson-color)]",
                      "text-white",
                    ]
                  : [
                      "hover:bg-[var(--crimson-color)]",
                      "hover:text-white",
                    ]
              )}
            >

              <span className="font-bold text-sm sm:text-base md:text-lg">
                {getLocalizedValue(
                  day.dayOTWeek,
                  locale
                )}
              </span>

              <span className="text-xs sm:text-sm md:text-base">
                {formatMonthDay(
                  currentDate,
                  locale
                )}
              </span>

            </FadeUp>
          );
        }
      )}
    </>
  );
}

export default DayOfWeekBox;