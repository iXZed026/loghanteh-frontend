"use client"

import FadeUp from '@/components/animations/FadeUp'
import ProfileDashboardActivity from '@/features/loghante(root)/profile/componenets/dashboard/ProfileDashboardActivity'
import ProfileDiscoverMuseums from '@/features/loghante(root)/profile/componenets/dashboard/ProfileDiscoverMuseums'
import ProfileNextVisitBox from '@/features/loghante(root)/profile/componenets/dashboard/ProfileNextVisitBox'
import { useProfile } from '@/contexts/ProfileProvider'
import { useTranslations } from 'next-intl'

function Dashboard() {
  const dashboardPageT = useTranslations('profileDashboardPage')
  const { profile } = useProfile()

  if (!profile) {
    return null
  }

  return (
    <FadeUp>
      <div className="fcol gap-5">
        <div className="fcol gap-5">
          <h2 className="font-medium md:text-4xl text-2xl">
            {dashboardPageT('title')}
          </h2>

          <span className="lg:text-xl text-black-light-utility">
            {dashboardPageT('sub-title-first-section')}
            <span className="text-crimson"> {profile.full_name}</span>
            <span>
              {dashboardPageT('sub-title-second-section')}
            </span>
          </span>
        </div>

        <ProfileDashboardActivity
          dashboardPageT={dashboardPageT}
        />

        <div>
          <ProfileNextVisitBox
            dashboardPageT={dashboardPageT}
          />
        </div>

        <div className="xl:block hidden">
          <ProfileDiscoverMuseums
            dashboardPageT={dashboardPageT}
          />
        </div>
      </div>
    </FadeUp>
  )
}

export default Dashboard