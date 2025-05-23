import HeroSection from '@/components/homeContent/HeroSection'
import CardSection from '@/components/homeContent/CardSection'

export default function Home() {
  return (
    <>
    <section className="flex flex-col">
      <HeroSection/>
    </section>
    <section>
      <CardSection/>
    </section>
    </>
  )
}