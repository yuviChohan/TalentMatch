"use client";
import React, { useState } from 'react';
import Link from 'next/link';

const PostJob: React.FC = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [active, setActive] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (parseFloat(salary) < 0) {
      alert("Salary cannot be negative");
      return;
    }

    const jobData = {
      job_id: Date.now(), // Assuming job_id is generated on the frontend
      title,
      company,
      description,
      required_skills: requiredSkills.split(',').map(skill => skill.trim()),
      application_deadline: new Date(applicationDeadline),
      location,
      salary: parseFloat(salary),
      job_type: jobType,
      active
    };

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)
      });

      if (response.ok) {
        alert('Job posted successfully');
        // Clear the form
        setTitle('');
        setCompany('');
        setDescription('');
        setRequiredSkills('');
        setApplicationDeadline('');
        setLocation('');
        setSalary('');
        setJobType('Full-time');
        setActive(true);
      } else {
        alert('Failed to post job');
      }
    } catch (error) {
      console.error('Error posting job:', error);
    }
  };

  return (
    <main className="flex flex-col items-center p-6 bg-gradient-to-r from-blue-200 via-blue-100 to-blue-400 min-h-screen">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Post a New Job</h1>
          <Link href="/Jobs">
            <span className="bg-gray-500 text-white rounded px-4 py-2 cursor-pointer hover:bg-gray-600 transition-colors">
              Back to Jobs
            </span>
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Job Title</label>
            <input
              type="text"
              className="border border-gray-300 rounded p-3 w-full text-gray-800"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Company</label>
            <input
              type="text"
              className="border border-gray-300 rounded p-3 w-full text-gray-800"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              className="border border-gray-300 rounded p-3 w-full text-gray-800"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows={5}
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Required Skills (comma separated)</label>
            <input
              type="text"
              className="border border-gray-300 rounded p-3 w-full text-gray-800"
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Application Deadline</label>
            <input
              type="date"
              className="border border-gray-300 rounded p-3 w-full text-gray-800"
              value={applicationDeadline}
              onChange={(e) => setApplicationDeadline(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Location</label>
            <input
              type="text"
              className="border border-gray-300 rounded p-3 w-full text-gray-800"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Salary</label>
            <input
              type="number"
              className="border border-gray-300 rounded p-3 w-full text-gray-800"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              min="0"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Job Type</label>
            <select
              className="border border-gray-300 rounded p-3 w-full text-gray-800"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Unknown">Unknown</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Active</label>
            <input
              type="checkbox"
              className="border border-gray-300 rounded p-3"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 via-green-500 to-green-600 text-white rounded p-4 text-xl font-bold hover:bg-green-700 transition-colors"
          >
            Post Job
          </button>
        </form>
      </div>
    </main>
  );
};

export default PostJob;
