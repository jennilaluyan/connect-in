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
      name: "Stevanus",
      role: "AI Engineer",
      text: "\"Dulu susah cari kerja di Manado, tapi lewat Connect IN, saya langsung dapat kesempatan di perusahaan lokal!\"",
      imageRight: true,
      delay: 0,
    },
    {
      image: Dortea,
      name: "Ribka",
      role: "HR PT Nocture",
      text: "\"Sebagai HR, saya merasa terbantu karena bisa menjangkau kandidat potensial lebih cepat dan mudah melalui platform ini.\"",
      imageRight: false,
      delay: 200,
    },
    {
      image: Jenni,
      name: "Elisabeth",
      role: "Frontend Developer",
      text: "\"Waktu pertama coba Connect IN, langsung suka sama UI-nya—simple, bersih, dan enak dipakai. Semua fitur jalan lancar, dan nyari lowongan kerja di Manado jadi jauh lebih gampang.\"",
      imageRight: true,
      delay: 400,
    },
  ];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="py-12 md:py-24 bg-[#D6E6FF] text-center px-4 sm:px-8 md:px-12"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          ref={headingRef}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 opacity-0 transform translate-y-8 transition-all duration-700"
        >
          Apa Kata Mereka?
        </h2>
        <p
          ref={descriptionRef}
          className="text-sm sm:text-base text-gray-600 mb-8 md:mb-12 max-w-2xl mx-auto opacity-0 transform translate-y-8 transition-all duration-700"
        >
          Profesional di Sulawesi Utara telah merasakan manfaat dari platform ini. Simak pengalaman mereka!
        </p>
        <div className="flex flex-col gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
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