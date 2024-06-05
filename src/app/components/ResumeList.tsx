// src/app/components/ResumeList.tsx
import React from 'react';

interface ResumeListProps {
  resumes: any[];
}

const ResumeList: React.FC<ResumeListProps> = ({ resumes }) => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-2 text-gray-800">Uploaded Resumes</h3>
      {resumes.length > 0 ? (
        <ul>
          {resumes.map((resume, index) => (
            <li key={index} className="mb-2">
              <a href={resume.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                {resume.name}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-500">No resumes uploaded for this job yet.</div>
      )}
    </div>
  );
};

export default ResumeList;
