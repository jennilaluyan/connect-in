import { useEffect, useRef } from "react";

const HeadingBangunKoneksi = () => {
  const headingRef = useRef(null); // Create a ref to attach to the heading element

  useEffect(() => {
    const heading = headingRef.current;
    if (heading) {
      // Add animation class after a delay
      setTimeout(() => {
        heading.classList.add("heading-animate");
      }, 100);
    }
  }, []);

  return (
    <h2 
      ref={headingRef}
      className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-center opacity-0 transform translate-y-6 transition-all duration-1000"
    >
      Bangun Koneksi, Buka Peluang di Connect IN
      <style jsx>{`
        .heading-animate {
          opacity: 1;
          transform: translateY(0); // Animation to make the element visible and move it to its original position
        }
      `}</style>
    </h2>
  );
};

export default HeadingBangunKoneksi;