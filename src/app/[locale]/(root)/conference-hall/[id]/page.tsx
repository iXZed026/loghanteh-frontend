import Container from '@/components/shared/Container'
import ConfrenceHallHeader from '@/features/loghante(root)/conference-hall/components/conference-hall-detail/componenets/ConfrenceHallHeader'
import CostomerRequestForm from '@/features/loghante(root)/worshops-and-studios/componenets/workshops-and-studios-detail/CostomerRequestForm'
import { conferenceHalls } from '@/features/loghante(root)/conference-hall/components/conference-hall-detail/data/conference-hall'
import { notFound } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'

interface ConfrenceHallDetailProps {
    params: Promise<{
        locale: string
        id: string
    }>
}

async function ConfrenceHallDetail({
    params,
}: ConfrenceHallDetailProps) {

    const { locale, id } = await params

    const conferenceHallId = Number(id)

    const conferenceHall = conferenceHalls.find(
        (item) => item.id === conferenceHallId
    )

    if (!conferenceHall) {
        notFound()
    }

    const title = getLocalizedValue(
        conferenceHall.title,
        locale
    )

    return (
        <Container>
            <div
                className={cn(
                    'min-h-screen',
                    'py-30',
                )}
            >
                <ConfrenceHallHeader
                    conferenceHall={conferenceHall}
                />

                <CostomerRequestForm
                    Translation='conferenceHall.page.inputs'
                    URLHash='confrence-hall-form'
                    requestTitle={title}
                />
            </div>
        </Container>
    )
}

export default ConfrenceHallDetail