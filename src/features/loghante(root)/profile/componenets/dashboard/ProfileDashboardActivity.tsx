import { cn } from '@/lib/utils/cn'
import { TranslationFunction } from '@/types/translations'
import { FaRegCalendarAlt } from 'react-icons/fa'
import { GoBookmark } from 'react-icons/go'
import { LuTicketSlash } from 'react-icons/lu'

interface IProfileDashboardActivity {
  dashboardPageT: TranslationFunction
}

function ProfileDashboardActivity({
  dashboardPageT,
}: IProfileDashboardActivity) {
  return (
    <div className="grid grid-cols-12 xl:gap-10 gap-5">
      {/* Upcoming Visit */}
      <div
        className={cn(
          'xl:col-span-4 col-span-12',
          'py-5 px-5',
          'border-1 border-[var(--crimson-opacity-color)]',
          'rounded-lg',
          'fcc',
        )}
      >
        <div className="fcc w-full">
          <div className="bg-[#d2af6d4f] rounded-full p-4">
            <FaRegCalendarAlt className="size-8 text-[var(--gold-color)]" />
          </div>
        </div>

        <div className="fcol gap-2 w-full text-sm">
          <span>{dashboardPageT('activity.upcoming-visit.title')}</span>

          <span className="font-semibold text-xl text-crimson">
            12 Aug 2026
          </span>

          <span>Loghanteh Museum Tour</span>
        </div>
      </div>

      {/* Tickets */}
      <div
        className={cn(
          'xl:col-span-4 col-span-12',
          'py-5 px-5',
          'border-1 border-[var(--crimson-opacity-color)]',
          'rounded-lg',
          'fcc',
        )}
      >
        <div className="fcc w-full">
          <div className="bg-[#d2af6d4f] rounded-full p-4">
            <LuTicketSlash className="size-8 text-[var(--gold-color)]" />
          </div>
        </div>

        <div className="fcol gap-2 w-full text-sm">
          <span>{dashboardPageT('activity.tickets.title')}</span>

          <span className="font-semibold text-xl text-crimson">
            4
          </span>

          <span>Purchased tickets</span>
        </div>
      </div>

      {/* Collections */}
      <div
        className={cn(
          'xl:col-span-4 col-span-12',
          'py-5 px-5',
          'border-1 border-[var(--crimson-opacity-color)]',
          'rounded-lg',
          'fcc',
        )}
      >
        <div className="fcc w-full">
          <div className="bg-[#d2af6d4f] rounded-full p-4">
            <GoBookmark className="size-8 text-[var(--gold-color)]" />
          </div>
        </div>

        <div className="fcol gap-2 w-full text-sm">
          <span>{dashboardPageT('activity.collections.title')}</span>

          <span className="font-semibold text-xl text-crimson">
            8
          </span>

          <span>Saved items</span>
        </div>
      </div>
    </div>
  )
}

export default ProfileDashboardActivity