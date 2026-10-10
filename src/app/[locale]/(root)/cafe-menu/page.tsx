import Container from '@/components/shared/Container'
import AboutCafeMenuSection from '@/features/loghante(root)/cafe-menu/components/sections/AboutCafeMenuSection'
import CafeMenuHero from '@/features/loghante(root)/cafe-menu/components/sections/CafeMenuHeroSection'
import CafeMenusSections from '@/features/loghante(root)/cafe-menu/components/sections/CafeMenusSection'

interface CafeMenuPageProps {
    searchParams: Promise<{
        cafeId?: string
    }>
}

async function CafeMenu({
    searchParams,
}: CafeMenuPageProps) {
    const { cafeId: cafeIdParam } = await searchParams

    const parsedCafeId = Number(cafeIdParam ?? 1)

    const cafeId =
        Number.isInteger(parsedCafeId) && parsedCafeId > 0
            ? parsedCafeId
            : 1

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

export default CafeMenu