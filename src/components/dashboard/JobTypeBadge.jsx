// Reusable badge component for job types
const JobTypeBadge = ({ type }) => {
  // Badge color based on job type
  const getBadgeColor = (type) => {
    switch (type.toUpperCase()) {
      case "FULL TIME":
        return "bg-blue-100 text-blue-800";
      case "PART-TIME":
        return "bg-purple-100 text-purple-800";
      case "INTERNSHIP":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span className={`text-xs font-medium px-2.5 py-0.5 rounded ${getBadgeColor(type)}`}>
      {type}
    </span>
  );
};

export default JobTypeBadge;