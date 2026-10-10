import Container from '@/components/shared/Container'
import AboutCafeMenuSection from '@/features/loghante(root)/cafe-menu/components/sections/AboutCafeMenuSection'
import CafeMenuHero from '@/features/loghante(root)/cafe-menu/components/sections/CafeMenuHeroSection'
import CafeMenusSections from '@/features/loghante(root)/cafe-menu/components/sections/CafeMenusSection'

interface CafeMenuPageDetailProps {
    params: Promise<{
        id: string
    }>
}

async function CafeMenuPageDetail({
    params,
}: CafeMenuPageDetailProps) {
    const { id } = await params
    const cafeId = Number(id)

    return (
        <div>
            <CafeMenuHero cafeId={cafeId} />

            <Container>
                <AboutCafeMenuSection cafeId={cafeId} />
                <CafeMenusSections cafeId={cafeId} />
            </Container>
        </div>
    )
}

export default CafeMenuPageDetail
