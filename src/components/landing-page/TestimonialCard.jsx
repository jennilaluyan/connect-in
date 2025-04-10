import { useEffect, useRef } from "react";

const TestimonialCard = ({ image, name, role, text, imageRight = false, delay = 0 }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("card-animate");
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-lg overflow-hidden shadow-lg opacity-0 transform translate-y-10 transition-all duration-700 hover:shadow-xl"
    >
      {/* Mobile layout - always image on top, text below */}
      <div className="block md:hidden">
        <div className="relative w-full md:h-80 lg:h-64">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-3 rounded-lg name-box w-3/4 max-w-xs"
          >
            <div className="font-medium text-center">{name}</div>
            <div className="text-sm text-center">{role}</div>
          </div>
        </div>
        <div className="bg-blue-500 text-white p-6 text-box">
          <p className="text-lg mb-4">{text}</p>
          <div className="flex items-center gap-1">
            {Array(5).fill().map((_, i) => (
              <span key={i} className="text-yellow-400 animate-pulse">★</span>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop layout - alternating layout based on imageRight */}
      <div className="hidden md:flex flex-row items-stretch h-64">
        {!imageRight && (
          <div className="w-64 h-full relative flex-shrink-0 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg transition-transform duration-300 hover:translate-y-1 w-4/5">
              <div className="font-medium text-center">{name}</div>
              <div className="text-sm text-center">{role}</div>
            </div>
          </div>
        )}

        <div className="bg-blue-500 text-white p-6 flex-1 flex flex-col justify-center text-box">
          <p className="text-left text-lg mb-4 w-3/4">{text}</p>
          <div className="flex items-center gap-1">
            {Array(5).fill().map((_, i) => (
              <span key={i} className="text-yellow-400 animate-pulse">★</span>
            ))}
          </div>
        </div>

        {imageRight && (
          <div className="w-64 h-full relative flex-shrink-0 overflow-hidden">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-6 py-3 rounded-lg transition-transform duration-300 hover:translate-y-1 w-4/5">
              <div className="font-medium text-center">{name}</div>
              <div className="text-sm text-center">{role}</div>
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for extra small screens */}
      <style jsx>{`
        @media (max-width: 425px) {
          .name-box {
            position: static !important;
            margin: 0 !important;
            border-radius: 0 !important;
            width: 100% !important;
            transform: none !important;
            left: 0 !important;
          }
          .name-box div {
            font-size: smaller !important;
          }
          .text-box p {
            font-size: 0.85rem !important;
          }
          .text-box {
            padding: 1rem !important;
          }
        }
        .card-animate {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default TestimonialCard;