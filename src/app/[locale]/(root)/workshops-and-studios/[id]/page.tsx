import Container from '@/components/shared/Container'
import WorkshopsAndStudiosDetailCompBox from '@/features/loghante(root)/worshops-and-studios/componenets/workshops-and-studios-detail/WorkshopsAndStudiosDetailCompBox'
import WorkshopsAndStudiosDetailHeader from '@/features/loghante(root)/worshops-and-studios/componenets/workshops-and-studios-detail/WorkshopsAndStudiosDetailHeader'
import { workshopAndStudios } from '@/features/loghante(root)/worshops-and-studios/data/workshop-and-studios'
import { getLocalizedValue } from '@/lib/utils/getLocalizedValue'
import { notFound } from 'next/navigation'
import { cn } from '@/lib/utils/cn'
import CostomerRequestForm from '@/features/loghante(root)/worshops-and-studios/componenets/workshops-and-studios-detail/CostomerRequestForm'

interface IWorkshopAndStudiosDetail {
    params: Promise<{
        locale: string
        id: string
    }>
}

async function WorkshopAndStudiosDetail({
    params,
}: IWorkshopAndStudiosDetail) {

    const {
        locale,
        id,
    } = await params

    const workshopId = Number(id)

    const workshop = workshopAndStudios.find(
        (item) => item.id === workshopId
    )

    if (!workshop) {
        notFound()
    }

    const requestTitle = getLocalizedValue(
        workshop.title,
        locale
    )

    return (
        <Container>
            <div
                className={cn(
                    "min-h-screen",
                    "fcol gap-10",
                    "py-30",
                    "scroll-mt-30"
                )}
            >

                <WorkshopsAndStudiosDetailHeader
                    workshop={workshop}
                />

                {workshop.closeUps.map((closeUp, index) => (
                    <WorkshopsAndStudiosDetailCompBox
                        key={`${workshop.id}-${index}`}
                        closeUp={closeUp}
                        reverse={index % 2 === 0}
                    />
                ))}

                <CostomerRequestForm
                    Translation="workshopsAndStudios.page.inputs"
                    URLHash="workshops-and-studios-form"
                    requestTitle={requestTitle}
                />

            </div>
        </Container>
    )
}

export default WorkshopAndStudiosDetail