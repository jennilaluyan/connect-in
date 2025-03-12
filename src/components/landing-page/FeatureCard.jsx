const FeatureCard = ({ title, description, isHighlighted }) => {
  return (
    <div
      className={`p-6 shadow-md text-center ${
        isHighlighted ? "bg-blue-500 text-white" : "bg-blue-100"
      }`}
    >
      <h3 className={`text-left text-lg font-bold ${isHighlighted ? "mb-11" : "mb-4"}`}>{title}</h3>
      <p className="text-left text-sm">{description}</p>
  </div>
  );
};

export default FeatureCard;
