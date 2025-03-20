// Reusable button with icon
const IconButton = ({ icon, label, onClick, variant = "default", isActive = false }) => {
  // Variant styles
  const variantClasses = {
    default: isActive 
      ? "bg-[#D5FD8C] text-black" 
      : "text-gray-700 hover:bg-gray-100",
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "border border-gray-300 text-gray-700 hover:bg-gray-50"
  };

  return (
    <button
      onClick={onClick}
      className={`flex items-center px-3 py-1 rounded-md transition-colors ${variantClasses[variant]}`}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {label && <span>{label}</span>}
    </button>
  );
};

export default IconButton;