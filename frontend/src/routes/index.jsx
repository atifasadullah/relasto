import { HeroSection } from "@/components/Landing/HeroSection";
import { createFileRoute } from "@tanstack/react-router";
import TrustSection from "@/components/Landing/TrustSection";
import CTASection from "@/components/Landing/CTASection";
import FeaturedProperties from "@/components/Landing/FeaturedProperties";
import HowItWorks from "@/components/Landing/HowItWorks";
import Testimonials from "@/components/Landing/Testimonials";

export const Route = createFileRoute("/")({
    component: HomePage,
});

function HomePage() {
    return (
        <>
            <HeroSection />
            <TrustSection />
            <FeaturedProperties />
            <HowItWorks />
            <Testimonials />
            <CTASection />
        </>
    );
}
