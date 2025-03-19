import { useEffect, useRef } from "react";

const CallToAction = () => {
  const ctaRef = useRef(null); // Create a ref to attach to the CTA element

  useEffect(() => {
    // Create an IntersectionObserver to observe when the CTA element is in view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add animation class when the element is in view
            entry.target.classList.add("cta-animate");
            observer.unobserve(entry.target); // Stop observing once the animation is triggered
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is in view
    );

    if (ctaRef.current) {
      observer.observe(ctaRef.current); // Start observing the CTA element
    }

    return () => {
      if (ctaRef.current) {
        observer.unobserve(ctaRef.current); // Clean up the observer on component unmount
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
          transform: translateY(0); // Animation to make the element visible and move it to its original position
        }
      `}</style>
    </div>
  );
};

export default CallToAction;