"use client";

import FadeUp from "@/components/animations/FadeUp";
import { DayOfTheWeek } from "@/data/days-of-the-week";
import {
  dayOfTheWeeksVariant,
} from "@/features/loghante(root)/animations/loghante.variants";
import { fastTransitionOut } from "@/lib/animations/transitions";

import { getLocalizedValue } from "@/lib/utils/getLocalizedValue";
import { cn } from "@/lib/utils/cn";
import { useLocale } from "next-intl";
import { formatMonthDay } from "@/lib/utils/date";

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
  // const today = new Date("2026-10-12T00:00:00");


  function getDateByOffset(
    offset: number
  ) {

    const date =
      new Date(today);

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
      {
        DayOfTheWeek.map(
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
                variants={
                  dayOfTheWeeksVariant
                }
                transition={
                  fastTransitionOut
                }
                once={true}
                key={day.id}
                onClick={() =>
                  onDateChange(
                    currentDate
                  )
                }
                className={cn(
                  "col-span-1",
                  "min-w-0",
                  "py-6 px-2",
                  "fcol justify-center items-center gap-5",
                  "border-[1px]",
                  "border-black-opacity",
                  "shadow-xl",
                  "rounded-xl",
                  "text-center md:text-base text-sm",
                  "click-scale",
                  "cursor-pointer",
                  "select-none",

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

                <span className="font-bold text-lg">
                  {
                    getLocalizedValue(
                      day.dayOTWeek,
                      locale
                    )
                  }
                </span>

                <span>
                  {
                    formatMonthDay(
                      currentDate,
                      locale
                    )
                  }
                </span>

              </FadeUp>
            );
          }
        )
      }
    </>
  );
}

export default DayOfWeekBox;