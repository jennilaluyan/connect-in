import { useEffect, useRef } from "react";

const CallToAction = ({ animate = true }) => {
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!animate) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("cta-animate");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current);
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current);
      }
    };
  }, [animate]);

  return (
    <div
      ref={ctaRef}
      className={`transition-all duration-1000 transform ${
        animate ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
      }`}
    >
      <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 max-w-2xl mx-auto px-4">
        Jadilah bagian dari jaringan profesional dan dapatkan kesempatan terbaik untuk kariermu.
      </p>
      <button className="bg-lime-400 text-black font-bold py-3 px-6 rounded-lg hover:bg-lime-500 hover:scale-105 transition duration-300 transform">
        Bergabung Sekarang
      </button>

      <style jsx>{`
        .cta-animate {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default CallToAction;
