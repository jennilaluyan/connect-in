import { useEffect, useRef } from "react";
import TestimonialCard from "./TestimonialCard";
import Vito from "../../assets/Vito.jpg";
import Dortea from "../../assets/Dortea.jpg";
import Jenni from "../../assets/Jenni.jpg";

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate heading first
            if (headingRef.current) {
              headingRef.current.classList.add("animate-fade-in");
            }
            
            // Then animate description
            setTimeout(() => {
              if (descriptionRef.current) {
                descriptionRef.current.classList.add("animate-fade-in");
              }
            }, 300);
            
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const testimonials = [
    {
      image: Vito,
      name: "Vito",
      role: "Mahasiswa Teknik Informatika",
      text: "Sebagai mahasiswa, saya lebih mudah menemukan peluang magang yang sesuai dengan jurusan saya. Terima kasih Connect IN!",
      imageRight: true,
      delay: 0,
    },
    {
      image: Dortea,
      name: "Dortea",
      role: "HR PT Semangat Skripsi",
      text: "Senang bisa berbagi pengalaman dan membuka peluang bagi mahasiswa UNSRAT yang ingin magang di perusahaan kami!",
      imageRight: false,
      delay: 200,
    },
    {
      image: Jenni,
      name: "Jenni",
      role: "HR PT Skripsi Jaya Jaya",
      text: "Senang bisa berbagi pengalaman dan membuka peluang bagi mahasiswa UNSRAT yang ingin magang di perusahaan kami!",
      imageRight: true,
      delay: 400,
    },
  ];

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className="py-12 md:py-24 bg-[#D6E6FF] text-center px-16 md:px-12"
    >
      <h2 
        ref={headingRef}
        className="text-3xl md:text-4xl font-bold mb-4 opacity-0 transform translate-y-8 transition-all duration-700"
      >
        Apa Kata Mereka?
      </h2>
      <p 
        ref={descriptionRef}
        className="text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto opacity-0 transform translate-y-8 transition-all duration-700"
      >
        Mahasiswa dan alumni UNSRAT telah merasakan manfaat dari platform ini. Simak pengalaman mereka!
      </p>
      <div className="flex flex-col gap-6 max-w-4xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard key={index} {...testimonial} />
        ))}
      </div>

      <style jsx>{`
        .animate-fade-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;