import Navbar from "./Navbar";
import Hero from "./Hero";
import FeaturesSection from "./FeaturesSection";
import TestimonialsSection from "./TestimonialSection";
import TimKami from "./TimKami";
// import CallToAction from "./CallToAction";

function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturesSection />
      <TestimonialsSection />
      <TimKami />

      {/* Call To Action Section */}
      {/* <section className="w-full bg-[#D6E6FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-8 leading-relaxed">
            Bergabung Sekarang & Wujudkan Karier Impianmu!
          </h2>
          <CallToAction animate={false} />
        </div>
      </section> */}
    </>
  );
}

export default LandingPage;
