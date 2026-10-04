import Container from '@/components/shared/Container'
import AboutCafeMenuSection from '@/features/loghante(root)/cafe-menu/components/sections/AboutCafeMenuSection'
import CafeMenuHero from '@/features/loghante(root)/cafe-menu/components/sections/CafeMenuHeroSection'
import CafeMenusSections from '@/features/loghante(root)/cafe-menu/components/sections/CafeMenusSection'

function CafeMenu() {
    return (
        <div>
            <CafeMenuHero />
            <Container>
                <AboutCafeMenuSection />
                <CafeMenusSections />
            </Container>
        </div>
    )
}

export default CafeMenu