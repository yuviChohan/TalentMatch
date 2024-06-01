import React, { useState, useEffect } from 'react';
import JobCard from '../components/JobCard';
 
const Jobs: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [jobTitle, setJobTitle] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [jobType, setJobType] = useState<string>('');
  const [jobs, setJobs] = useState<any[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<any[]>([]);
  const [sortOrder, setSortOrder] = useState<string>('lowToHigh');
 
  const jobList = [
    {
      title: 'QA Technician',
      location: 'Calgary, Alberta',
      salary: 'From $21 an hour',
      type: 'Full-time',
      description: 'Starfield Industry Ltd. (The Starfield Group) - Performs in-house calibration of inspection and monitoring equipment, such as thermometers, scales, etc. Competitive pay and benefits. Positive and fun work environment.',
      details: 'Starfield Industry Ltd. (The Starfield Group) - Wage: $21/hour. Status: Full-time, Permanent. Hours/Shifts: 40 hours per week, 5 days per week on a shiftwork basis with 2 days off per week (may not be consecutive days). Must be available to work all 3 shifts - 5am-1:30pm, 9am-5:30pm, 2:30pm-11:00pm. Performs pre-operational inspection in accordance with food safety requirements, conducts CCP verifications, incoming material inspections, and in-process product inspections and finished product quality inspections. Ensures timely and accurate documentation and records keeping is performed.'
    },
    {
      title: 'Software Engineer',
      location: 'Vancouver, British Columbia',
      salary: 'From $40 an hour',
      type: 'Full-time',
      description: 'Tech Solutions Inc. - Develop and maintain software applications. Competitive pay and benefits. Positive and fun work environment.',
      details: 'Detailed description for Software Engineer.'
    },
    {
      title: 'Marketing Manager',
      location: 'Toronto, Ontario',
      salary: 'From $50 an hour',
      type: 'Full-time',
      description: 'Marketing Agency X - Lead marketing campaigns and strategies. Competitive pay and benefits. Collaborative work environment.',
      details: 'Detailed description for Marketing Manager.'
    },
    {
      title: 'Graphic Designer',
      location: 'Montreal, Quebec',
      salary: 'From $25 an hour',
      type: 'Part-time',
      description: 'Creative Studio Y - Design visual content for various projects. Flexible schedule. Creative and dynamic team.',
      details: 'Detailed description for Graphic Designer.'
    },
    // Add more jobs as needed
  ];  
 
  // Fetch jobs from backend API
  useEffect(() => {
    // Simulated fetch for demo purposes
    setJobs(jobList);
    setFilteredJobs(jobList);
  }, []);
 
  // Handle search functionality
  const handleSearch = async () => {
    let filtered = jobList.filter(job => {
      return (
        job.title.toLowerCase().includes(jobTitle.toLowerCase()) &&
        job.location.toLowerCase().includes(location.toLowerCase()) &&
        (jobType === '' || job.type === jobType)
      );
    });
    setFilteredJobs(filtered);
  };
 
  // Handle sorting by salary
  const sortBySalary = () => {
    const sorted = [...filteredJobs].sort((a, b) => {
      const salaryA = parseFloat(a.salary.split('$')[1]);
      const salaryB = parseFloat(b.salary.split('$')[1]);
      return sortOrder === 'lowToHigh' ? salaryA - salaryB : salaryB - salaryA;
    });
    setFilteredJobs(sorted);
    setSortOrder(sortOrder === 'lowToHigh' ? 'highToLow' : 'lowToHigh');
  };
 
  const handleApply = (job: any) => {
    // Implement your apply logic here
    console.log(`Applying for job: ${job.title}`);
  };
 
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
 
  return (
    <main className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <div className="w-full max-w-6xl bg-white shadow-md rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Jobs</h1>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Job Title"
              className="border border-gray-300 rounded p-2 text-gray-700"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <select
              className="border border-gray-300 rounded p-2 text-gray-700"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyPress={handleKeyPress}
            >
              <option value="">Select Location</option>
              <option value="Calgary, Alberta">Calgary, Alberta</option>
              <option value="Vancouver, British Columbia">Vancouver, British Columbia</option>
              <option value="Toronto, Ontario">Toronto, Ontario</option>
              <option value="Montreal, Quebec">Montreal, Quebec</option>
              <option value="Edmonton, Alberta">Edmonton, Alberta</option>
              <option value="Ottawa, Ontario">Ottawa, Ontario</option>
              <option value="Winnipeg, Manitoba">Winnipeg, Manitoba</option>
              <option value="Quebec City, Quebec">Quebec City, Quebec</option>
              <option value="Hamilton, Ontario">Hamilton, Ontario</option>
              <option value="Halifax, Nova Scotia">Halifax, Nova Scotia</option>
            </select>
            <select
              className="border border-gray-300 rounded p-2 text-gray-700"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              onKeyPress={handleKeyPress}
            >
              <option value="">Select Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
            <button onClick={handleSearch} className="bg-blue-500 text-white rounded px-4 py-2">Search</button>
            <button onClick={sortBySalary} className="bg-blue-500 text-white rounded px-4 py-2">
              Sort by Salary ({sortOrder === 'lowToHigh' ? 'Low to High' : 'High to Low'})
            </button>
          </div>
        </div>
 
        <div className="flex">
          <div className="w-2/5 p-4">
            {(filteredJobs.length > 0 ? filteredJobs : jobList).map((job, index) => (
              <div key={index} className="mb-4" onClick={() => setSelectedJob(job)}>
                <JobCard
                  title={job.title}
                  location={job.location}
                  salary={job.salary}
                  type={job.type}
                  description={job.description}
                />
                <button onClick={() => handleApply(job)} className="bg-green-500 text-white rounded px-4 py-2 mt-2">Apply</button>
              </div>
            ))}
          </div>
 
          <div className="w-3/5 p-4">
            {selectedJob && (
              <div className="bg-white p-6 rounded shadow-md">
                <h2 className="text-xl font-bold mb-4">{selectedJob.title}</h2>
                <p>{selectedJob.details}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
 
export default Jobs;