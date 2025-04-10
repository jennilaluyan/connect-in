import FeatureCard from "./FeatureCard";
import CallToAction from "./CallToAction";
import HeadingBangunKoneksi from "./HeadingBangunKoneksi";

const FeaturesSection = () => {
  return (
    <section id="feature-section" className="features p-8 text-center my-24">
      <HeadingBangunKoneksi /> {/* Section heading */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto my-28">
        <FeatureCard
          title="Temukan Lowongan Pekerjaan"
          description="Akses berbagai peluang kerja yang sesuai dengan keahlianmu"
          animationDelay={0}
        />
        <FeatureCard
          title="Bangun Jaringan Profesional"
          description="Terhubung dengan rekan kerja & bisnis di Sulut"
          isHighlighted
          animationDelay={200}
        />
        <FeatureCard
          title="Posting Lowongan dengan Mudah"
          description="HRD dapat mempublikasikan lowongan kerja dan mengelola rekrutmen dengan efisien"
          animationDelay={400}
        />
      </div>
      <CallToAction /> {/* Call to action button */}
    </section>
  );
};

export default FeaturesSection;