import { useEffect, useRef } from "react";

const FeatureCard = ({ title, description, isHighlighted, animationDelay = 0 }) => {
  const cardRef = useRef(null); // Create a ref to attach to the card element

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      // Add animation class after a delay
      setTimeout(() => {
        card.classList.add("card-animate");
      }, animationDelay);
    }
  }, [animationDelay]);

  return (
    <div
      ref={cardRef}
      className={`p-6 shadow-md text-center transform translate-y-8 opacity-0 transition-all duration-700 hover:scale-105 ${
        isHighlighted ? "bg-blue-500 text-white" : "bg-blue-100"
      }`}
    >
      <h3 className={`text-left text-lg font-bold mb-6`}>{title}</h3>
      <p className="text-left text-sm">{description}</p>
      <style jsx>{`
        .card-animate {
          transform: translateY(0);
          opacity: 1; // Animation to make the element visible and move it to its original position
        }
      `}</style>
    </div>
  );
};

export default FeatureCard;