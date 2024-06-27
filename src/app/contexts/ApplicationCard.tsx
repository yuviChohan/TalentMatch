// src/app/components/ApplicationCard.tsx
import React from 'react';

interface ApplicationCardProps {
  title: string;
  description: string;
  date: string;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ title, description, date }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow duration-300">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <p className="text-gray-500 text-sm">{date}</p>
    </div>
  );
};

export default ApplicationCard;