import { useEffect, useRef } from "react";

const CallToAction = () => {
  const ctaRef = useRef(null);

  useEffect(() => {
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
  }, []);

  return (
    <div ref={ctaRef} className="cta text-center opacity-0 transform translate-y-10 transition-all duration-1000">
      <p className="mt-16 mb-12 text-lg w-full sm:w-3/4 mx-auto">
        Jadilah bagian dari jaringan profesional Universitas Sam Ratulangi
        dan dapatkan kesempatan terbaik untuk kariermu.
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