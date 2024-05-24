import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface JobCardProps {
  title: string;
  location: string;
  salary: string;
  type: string;
  description: string;
}

const JobCard: React.FC<JobCardProps> = ({ title, location, salary, type, description }) => {
  const { frontColor, textColor, accentColor } = useTheme();

  return (
    <div className={`bg-${frontColor} p-4 rounded shadow-md text-${textColor}`}>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-sm text-gray-500">{location}</p>
      <div className="flex items-center mt-2">
        <span className={`bg-${accentColor} text-white rounded-full px-2 py-1 text-xs font-semibold`}>
          {salary}
        </span>
        <span className="ml-2 text-xs">{type}</span>
      </div>
      <p className="mt-2 text-sm">{description}</p>
    </div>
  );
};

export default JobCard;