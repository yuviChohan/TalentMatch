import React from 'react';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: number;
  job_type: string;
  description: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const JobCard: React.FC<JobCardProps> = ({ title, company, location, salary, job_type, description, onEdit, onDelete }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white cursor-pointer hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-lg font-bold text-gray-700">{title}</h3>
      <h2 className="text-md font-bold text-gray-600">{company}</h2>
      <p className="text-sm text-gray-500">{location}</p>
      <div className="flex items-center mt-2">
        <span className="bg-blue-500 text-white rounded-full px-2 py-1 text-xs font-semibold">
          <p>${salary} per year</p>
        </span>
        <span className="ml-2 text-xs text-gray-600">{job_type}</span>
      </div>
      <p className="mt-2 text-sm text-gray-600">{description}</p>
      {onEdit && onDelete && (
        <div className="flex justify-between mt-4">
          <button className="bg-blue-500 text-white rounded px-4 py-2" onClick={onEdit}>Edit</button>
          <button className="bg-red-500 text-white rounded px-4 py-2" onClick={onDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default JobCard;