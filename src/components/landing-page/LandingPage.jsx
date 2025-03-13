import Navbar from './Navbar';
import Hero from './Hero';
import FeaturesSection from './FeaturesSection';
import TestimonialsSection from './TestimonialSection';
import HeadingBangunKoneksi from './HeadingBangunKoneksi';
import CallToAction from './CallToAction';
import Footer from './Footer';

function LandingPage() {
    return (
        <>
            <Navbar />
            <Hero />
            <FeaturesSection />
            <TestimonialsSection />
            <HeadingBangunKoneksi />
            <CallToAction />
            <Footer />
        </>
    )
}

export default LandingPage;