import FeatureCard from "./FeatureCard";
import CallToAction from "./CallToAction";
import HeadingBangunKoneksi from "./HeadingBangunKoneksi";

const FeaturesSection = () => {
  return (
    <section id="feature-section" className="features p-8 text-center my-24">
      <HeadingBangunKoneksi />
      <div className="flex flex-col md:flex-row justify-center gap-6 max-w-4xl mx-auto my-28">
        <FeatureCard
          title="Terhubung dengan Alumni & Mahasiswa"
          description="Jalin relasi dengan sesama mahasiswa dan alumni untuk memperluas kesempatan profesional."
        />
        <FeatureCard
          title="Temukan Peluang Kerja di Sekitar Anda"
          description="Akses berbagai lowongan kerja yang sesuai dengan bidang dan keahlianmu."
          isHighlighted
        />
        <FeatureCard
          title="Posting Lowongan dengan Mudah"
          description="Bagikan informasi lowongan kerja dan berkontribusi dalam dunia profesional UNSRAT."
        />
      </div>
      <CallToAction />
    </section>
  );
};

export default FeaturesSection;
