import { cn } from '@/lib/utils/cn'
import React, { ReactNode } from 'react'

function Container({
    children
}: {
    children: ReactNode
}) {
    return (
        <div
            className={cn(
                "sm:w-[90%] w-[95%]",
                "mx-auto",
            )}
        >
            {children}
        </div>
    )
}

export default Container