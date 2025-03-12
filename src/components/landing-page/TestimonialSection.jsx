import TestimonialCard from "./TestimonialCard";
import Andi from "../../assets/Andi.png";
import Hana from "../../assets/Hana.png";
import Taylor from "../../assets/Taylor.png";

const TestimonialsSection = () => {
  const testimonials = [
    {
      image: Andi,
      name: "Andi",
      role: "Mahasiswa Teknik Informatika",
      text: "Sebagai mahasiswa, saya lebih mudah menemukan peluang magang yang sesuai dengan jurusan saya. Terima kasih Connect IN!",
      imageRight: true
    },
    {
      image: Hana,
      name: "Hana",
      role: "HR PT Semangat Skripsi",
      text: "Senang bisa berbagi pengalaman dan membuka peluang bagi mahasiswa UNSRAT yang ingin magang di perusahaan kami!",
      imageRight: false
    },
    {
      image: Taylor,
      name: "Taylor",
      role: "HR PT Skripsi Jaya Jaya",
      text: "Senang bisa berbagi pengalaman dan membuka peluang bagi mahasiswa UNSRAT yang ingin magang di perusahaan kami!",
      imageRight: true
    }
  ];

  return (
    <section className="py-12 md:py-24 bg-[#D6E6FF] text-center px-16 md:px-12" id="testimonials">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Mereka?</h2>
      <p className="text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto">
        Mahasiswa dan alumni UNSRAT telah merasakan manfaat dari platform ini. Simak pengalaman mereka!
      </p>
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSection;