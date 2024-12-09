"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

const ErrorModal: React.FC<{ errors: string[], onClose: () => void }> = ({ errors, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white p-6 rounded shadow-lg z-10 w-3/4 max-w-lg">
        <h2 className="text-xl font-bold mb-4">Error</h2>
        <ul className="list-disc list-inside text-red-700 mb-4">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

const PostJob: React.FC = () => {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [description, setDescription] = useState('');
  const [requiredSkills, setRequiredSkills] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState('');
  const [jobType, setJobType] = useState('FULL');
  const [active, setActive] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [jobId, setJobId] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state
  const { uid } = useAuth();

  const validateForm = () => {
    const newErrors: string[] = [];
    if (!title) newErrors.push('Job title is required');
    if (!company) newErrors.push('Company is required');
    if (!description) newErrors.push('Description is required');
    if (!requiredSkills) newErrors.push('Required skills are required');
    if (!applicationDeadline) newErrors.push('Application deadline is required');
    if (!location) newErrors.push('Location is required');
    if (!salary) newErrors.push('Salary is required');

    // Check if the application deadline is in the future
    const today = new Date();
    const deadlineDate = new Date(applicationDeadline);
    if (deadlineDate <= today) newErrors.push('Application deadline must be a future date');

    return newErrors;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File change event:', e.target.files); // For testing purposes
    if (e.target.files) {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
  
      setLoading(true); // Start loading

      try {
        const response = await fetch(`https://resumegraderapi.onrender.com/jobs/${uid}`, {
          method: 'POST',
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error('Failed to upload file');
        }
  
        const data = await response.json();
        console.log('File upload response:', data); // For testing purposes
        // Set the form fields with the response data
        const { year, month, day } = data.application_deadline;
        let formattedApplicationDeadline;
        if (year === 0 && month === 0 && day === 0) {
          const today = new Date();
          formattedApplicationDeadline = today.toISOString().split('T')[0]; // Format YYYY-MM-DD
        } else {
          formattedApplicationDeadline = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }
        setTitle(data.title);
        setCompany(data.company);
        setDescription(data.description);
        setRequiredSkills(data.required_skills.join(', ')); // Assuming required_skills is an array of strings
        setApplicationDeadline(formattedApplicationDeadline);
        setLocation(data.location);
        setSalary(data.salary.toString());
        setJobType(data.job_type);
        setActive(data.active);
        setJobId(data.job_id); // Assuming you want to store the job_id as well
  
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('An error occurred while uploading the file.');
      } finally {
        setLoading(false); // Stop loading
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (formErrors.length > 0) {
      setErrors(formErrors);
      return;
    }

    setErrors([]);
    setLoading(true); // Start loading

    // Format the application deadline to "DDMMYYYY"
    const deadlineParts = applicationDeadline.split('-');
    const applicationDeadlineFormatted = `${deadlineParts[2]}${deadlineParts[1]}${deadlineParts[0]}`;

    const jobData = {
      title,
      company,
      description,
      application_deadline: applicationDeadlineFormatted,
      location,
      salary: parseFloat(salary),
      job_type: jobType,
      active,
      auth_uid: uid || "default-uid",
    };

    try {
      const postResponse = await fetch(`https://resumegraderapi.onrender.com/jobs/?title=${title}&company=${company}&description=${description}&application_deadline=${applicationDeadlineFormatted}&location=${location}&salary=${salary}&job_type=${jobType}&active=${active}&auth_uid=${uid || "default-uid"}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(jobData)
      });

      const postData = await postResponse.json();

      if (postResponse.ok) {
        const jobId = postData.job_id;
        setJobId(jobId);

        if (file) {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('auth_uid', uid || "default-uid");

          const fileResponse = await fetch(`https://resumegraderapi.onrender.com/jobs/${jobId}/upload`, {
            method: 'POST',
            body: formData
          });

          if (!fileResponse.ok) {
            throw new Error('Failed to upload file');
          }
        }

        alert('Job posted successfully');
        window.location.href = '/Jobs';
      } else {
        console.error('Create Job Response:', postData);
        setErrors([postData.detail || 'Failed to create job']);
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert('An error occurred while posting the job.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <main className="flex flex-col items-center p-6 bg-gradient-to-r from-indigo-300 via-purple-200 to-pink-300 min-h-screen">
      {errors.length > 0 && <ErrorModal errors={errors} onClose={() => setErrors([])} />}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-900 border-solid rounded-full animate-spin"></div> {/* Spinner */}
          <span className="ml-4 text-gray-700">Loading...</span>
        </div>
      )}
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Post a New Job</h1>
          <Link href="/Jobs">
            <span className="bg-indigo-500 text-white rounded px-4 py-2 cursor-pointer hover:bg-indigo-600 transition-colors">
              Back to Jobs
            </span>
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Job Title</label>
            <input
              type="text"
              className="border border-gray-300 rounded p-3 w-full text-gray-800"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Company</label>
            <input
              type="text"
              className="border border-gray-300 rounded p-3 w-full text-gray-800"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              className="border border-gray-300 rounded p-3 w-full text-gray-800"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Required Skills (comma separated)</label>
            <input
              type="text"
              className="border border-gray-300 rounded p-3 w-full text-gray-800"
              value={requiredSkills}
              onChange={(e) => setRequiredSkills(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Application Deadline</label>
            <input
              type="date"
              className="border border-gray-300 rounded p-3 w-full text-gray-800"
              value={applicationDeadline}
              onChange={(e) => setApplicationDeadline(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Location</label>
            <input
              type="text"
              className="border border-gray-300 rounded p-3 w-full text-gray-800"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Salary</label>
            <input
              type="number"
              className="border border-gray-300 rounded p-3 w-full text-gray-800"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              min="0"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Job Type</label>
            <select
              className="border border-gray-300 rounded p-3 w-full text-gray-800"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
            >
              <option value="FULL">Full-time</option>
              <option value="PART">Part-time</option>
              <option value="CONT">Contract</option>
              <option value="UNKN">Unknown</option>
            </select>
          </div>
          <div className="mb-6 flex items-center">
            <label className="block text-gray-700 font-semibold mb-2 mr-4">Active</label>
            <input
              type="checkbox"
              className="border border-gray-300 rounded p-3"
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Upload File</label>
            <input
              type="file"
              className="border border-gray-300 rounded p-3 w-full text-gray-800"
              onChange={handleFileChange}
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
