// src/app/page.tsx
import UserLayout from '@/components/layout/UserLayout'
import HeroSection from '@/components/home/HeroSection'
import StatsSection from '@/components/home/StatsSection'
import FeaturedJobsSection from '@/components/home/FeaturedJobsSection'
import CategoriesSection from '@/components/home/CategoriesSection'
import LatestJobsSection from '@/components/home/LatestJobsSection'
import CTASection from '@/components/home/CTASection'

export default function HomePage() {
  return (
    <UserLayout>
      <HeroSection />
      <StatsSection />
      <CategoriesSection />
      <FeaturedJobsSection />
      <LatestJobsSection />
      <CTASection />
    </UserLayout>
  )
}
