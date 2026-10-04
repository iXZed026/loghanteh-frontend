"use client"
import AppLink from "@/components/ui/AppLink"
import { cn } from "@/lib/utils/cn"
import { useLocale } from "next-intl"
import { dashboardNavLinks } from "../data/profile-dashboard-nav-links"
import { getLocalizedValue } from "@/lib/utils/getLocalizedValue"
import { usePathname } from "next/navigation"

interface IProfileDashboardLinks {
    UnActiveDashboardHandler?: () => void
}

function ProfileDashboardLinks({
    UnActiveDashboardHandler
}: IProfileDashboardLinks
) {

    const locale = useLocale()
    const pathname = usePathname()


    return (
        <div>
            <ul className='fcol gap-3'>
                {dashboardNavLinks.map(link => (
                    <li key={link.id}>
                        <AppLink
                            className={cn(
                                "font-medium",
                                "rounded-lg",
                                "flex items-center",
                                "p-3",
                                "active:pl-1",
                                "gap-3",
                                "transition-all duration-300",
                                "hover:pl-7",
                                `/${locale}/profile${link.href}` === pathname &&
                                "bg-[#5C212733]"
                            )}
                            href={`/profile${link.href}`}
                            onClick={UnActiveDashboardHandler}
                        >
                            <link.icon
                                className='size-6 text-crimson'
                            />
                            {getLocalizedValue(link.name, locale)}
                        </AppLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProfileDashboardLinks