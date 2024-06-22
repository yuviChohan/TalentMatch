// src/app/UserProfile/page.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface WorkHistoryEntry {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  isSaved: boolean;
  isExpanded: boolean;
}

interface EducationEntry {
  institution: string;
  course: string;
  startDate: string;
  endDate: string;
  isSaved: boolean;
  isExpanded: boolean;
}

const UserProfile: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [resume, setResume] = useState<File | null>(null);
  const [workHistory, setWorkHistory] = useState<WorkHistoryEntry[]>([
    { company: '', role: '', startDate: '', endDate: '', currentlyWorking: false, isSaved: false, isExpanded: true }
  ]);
  const [educationHistory, setEducationHistory] = useState<EducationEntry[]>([
    { institution: '', course: '', startDate: '', endDate: '', isSaved: false, isExpanded: true }
  ]);
  const [skills, setSkills] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<{ title: string; company: string; status: string; }[]>([]);

  const currentDate = new Date().toISOString().split('T')[0];
  const minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 50)).toISOString().split('T')[0];
  const { uid } = useAuth();

  useEffect(() => {
    setAppliedJobs([
      { title: 'Software Engineer', company: 'Tech Solutions Inc.', status: 'Interview Scheduled' },
      { title: 'QA Technician', company: 'Starfield Industry Ltd.', status: 'Applied' },
      { title: 'Marketing Manager', company: 'Marketing Agency X', status: 'Rejected' },
    ]);

    if (!uid) {
      alert('Please sign in to view your profile.');

    }
  }, [uid]);

  const uploadResume = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch(`https://resumegraderapi.onrender.com/resumes/${uid}`, {
        method: 'POST',
        headers: {
          'accept': 'application/json'
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to upload resume');
      }

      const result = await response.json();
      console.log('Resume upload successful:', result);
      setSkills(result.skills);

      const newWorkHistory = result.experience.map((exp: any) => ({
        company: exp.company_name,
        role: exp.title,
        startDate: `${exp.start_date.year}-${String(exp.start_date.month).padStart(2, '0')}-${String(exp.start_date.day).padStart(2, '0')}`,
        endDate: exp.end_date ? `${exp.end_date.year}-${String(exp.end_date.month).padStart(2, '0')}-${String(exp.end_date.day).padStart(2, '0')}` : '',
        currentlyWorking: !exp.end_date,
        isSaved: true,
        isExpanded: false,
        }));
      setWorkHistory(newWorkHistory);

      const newEducationHistory = result.education.map((edu: any) => ({
        institution: edu.institution,
        course: edu.course_name,
        startDate: `${edu.start_date.year}-${String(edu.start_date.month).padStart(2, '0')}-${String(edu.start_date.day).padStart(2, '0')}`,
        endDate: `${edu.end_date.year}-${String(edu.end_date.month).padStart(2, '0')}-${String(edu.end_date.day).padStart(2, '0')}`,
        isSaved: true,
        isExpanded: false,
      }));
      setEducationHistory(newEducationHistory);

    } catch (error) {
      console.error('Error uploading resume:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setResume: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResume(file);
      uploadResume(file);
    }
  };

  const handleRemoveResume = () => setResume(null);

  const handleSaveWorkHistory = (index: number) => {
    const newWorkHistory = [...workHistory];
    const entry = newWorkHistory[index];
    if (entry.company && entry.role && entry.startDate && (entry.endDate || entry.currentlyWorking)) {
      entry.isSaved = true;
      entry.isExpanded = false;
      setWorkHistory(newWorkHistory);
    } else {
      alert('Please fill in all fields before saving.');
    }
  };

  const handleSaveEducationHistory = (index: number) => {
    const newEducationHistory = [...educationHistory];
    const entry = newEducationHistory[index];
    if (entry.institution && entry.course && entry.startDate && entry.endDate) {
      entry.isSaved = true;
      entry.isExpanded = false;
      setEducationHistory(newEducationHistory);
    } else {
      alert('Please fill in all fields before saving.');
    }
  };

  const handleAddWorkHistory = () => {
    setWorkHistory([...workHistory, { company: '', role: '', startDate: '', endDate: '', currentlyWorking: false, isSaved: false, isExpanded: true }]);
  };

  const handleRemoveWorkHistoryFields = (index: number) => {
    const newWorkHistory = [...workHistory];
    newWorkHistory.splice(index, 1);
    setWorkHistory(newWorkHistory);
  };

  const handleAddEducationHistory = () => {
    setEducationHistory([...educationHistory, { institution: '', course: '', startDate: '', endDate: '', isSaved: false, isExpanded: true }]);
  };

  const handleRemoveEducationHistoryFields = (index: number) => {
    const newEducationHistory = [...educationHistory];
    newEducationHistory.splice(index, 1);
    setEducationHistory(newEducationHistory);
  };

  const handleToggleExpandWorkHistory = (index: number) => {
    const newWorkHistory = [...workHistory];
    newWorkHistory[index].isExpanded = !newWorkHistory[index].isExpanded;
    setWorkHistory(newWorkHistory);
  };

  const handleToggleExpandEducationHistory = (index: number) => {
    const newEducationHistory = [...educationHistory];
    newEducationHistory[index].isExpanded = !newEducationHistory[index].isExpanded;
    setEducationHistory(newEducationHistory);
  };

  const handleEditWorkHistoryField = (index: number, field: keyof WorkHistoryEntry, value: string | boolean) => {
    const newWorkHistory = [...workHistory];
    newWorkHistory[index] = { ...newWorkHistory[index], [field]: value };
    setWorkHistory(newWorkHistory);
  };

  const handleEditEducationField = (index: number, field: keyof EducationEntry, value: string | boolean) => {
    const newEducationHistory = [...educationHistory];
    newEducationHistory[index] = { ...newEducationHistory[index], [field]: value };
    setEducationHistory(newEducationHistory);
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.currentTarget.value.trim() !== '') {
      setSkills([...skills, e.currentTarget.value.trim()]);
      e.currentTarget.value = '';
    }
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const handleSaveProfile = () => {
    const savedWorkHistory = workHistory.map((entry, index) => {
      if (!entry.isSaved && entry.company && entry.role && entry.startDate && (entry.endDate || entry.currentlyWorking)) {
        handleSaveWorkHistory(index);
      }
      return entry;
    });

    const savedEducationHistory = educationHistory.map((entry, index) => {
      if (!entry.isSaved && entry.institution && entry.course && entry.startDate && entry.endDate) {
        handleSaveEducationHistory(index);
      }
      return entry;
    });

    setWorkHistory(savedWorkHistory);
    setEducationHistory(savedEducationHistory);

    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Resume:', resume);
    console.log('Work History:', savedWorkHistory);
    console.log('Education History:', savedEducationHistory);
    console.log('Skills:', skills);
    console.log('Applied Jobs:', appliedJobs);
    // Add your save logic (e.g., API call to save the data)
    alert('Profile saved successfully.');
  };


  const handleCheckJobStatus = () => {
    alert('This will redirect to the job status page or open a modal with job status details.');
    // Add logic to redirect or open modal for job status
  };

  useEffect(() => {
    if (workHistory.length > 1) {
      const lastEntry = workHistory[workHistory.length - 1];
      if (!lastEntry.company && !lastEntry.role && !lastEntry.startDate && !lastEntry.endDate && !lastEntry.isSaved) {
        const newWorkHistory = workHistory.slice(0, -1);
        setWorkHistory(newWorkHistory);
      }
    }
  }, [workHistory]);

  return (
    <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-10">
      <div className="flex justify-between items-center mb-4">
        <button className="bg-gray-500 text-white rounded px-4 py-2" onClick={handleCheckJobStatus}>
          Your Applications
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 font-bold mb-2">First Name:</label>
          <input
            type="text"
            className="border border-gray-300 rounded p-2 w-full text-black"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Last Name:</label>
          <input
            type="text"
            className="border border-gray-300 rounded p-2 w-full text-black"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700 font-bold mb-2">Email:</label>
          <input
            type="email"
            className="border border-gray-300 rounded p-2 w-full text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700 font-bold mb-2">Add Resume:</label>
          <label className="block border border-gray-300 rounded p-4 text-center cursor-pointer hover:bg-gray-200">
            <input
              type="file"
              accept=".pdf, .doc, .docx"
              className="hidden"
              onChange={(e) => handleFileChange(e, setResume)}
            />
            <span className="text-gray-500">{resume ? resume.name : "Click to upload"}</span>
          </label>
          {resume && <button className="text-red-500 mt-2" onClick={handleRemoveResume}>Remove</button>}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="block text-gray-700 font-bold mb-2">Add Work History:</h2>
        {workHistory.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded p-4 mb-2 relative">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-gray-700">Work History {index + 1}</h2>
              {item.isSaved && (
                <button className="text-blue-500" onClick={() => handleToggleExpandWorkHistory(index)}>
                  {item.isExpanded ? 'Collapse' : 'Expand'}
                </button>
              )}
            </div>
            {item.isExpanded && (
              <>
                <input
                  type="text"
                  placeholder="Company"
                  className="border border-gray-300 rounded p-2 mb-2 w-full text-black"
                  value={item.company}
                  onChange={(e) => handleEditWorkHistoryField(index, 'company', e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Role"
                  className="border border-gray-300 rounded p-2 mb-2 w-full text-black"
                  value={item.role}
                  onChange={(e) => handleEditWorkHistoryField(index, 'role', e.target.value)}
                />
                <div className="mb-2">
                  <label className="block text-gray-700 mb-2">Start Date:</label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded p-2 w-full text-black"
                    value={item.startDate}
                    max={currentDate}
                    min={minDate}
                    onChange={(e) => handleEditWorkHistoryField(index, 'startDate', e.target.value)}
                  />
                </div>
                {!item.currentlyWorking && (
                  <div className="mb-2">
                    <label className="block text-gray-700 mb-2">End Date:</label>
                    <input
                      type="date"
                      className="border border-gray-300 rounded p-2 w-full text-black"
                      value={item.endDate}
                      max={currentDate}
                      min={item.startDate}
                      onChange={(e) => handleEditWorkHistoryField(index, 'endDate', e.target.value)}
                    />
                  </div>
                )}
                <div className="mb-2 flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={item.currentlyWorking}
                    onChange={(e) => handleEditWorkHistoryField(index, 'currentlyWorking', e.target.checked)}
                  />
                  <label className="text-gray-700">I currently work here</label>
                </div>
                <button
                  className="bg-green-500 text-white rounded px-4 py-2"
                  onClick={() => handleSaveWorkHistory(index)}
                >
                  Save
                </button>
                <button
                  className="bg-red-500 text-white rounded px-4 py-2 ml-2"
                  onClick={() => handleRemoveWorkHistoryFields(index)}
                >
                  Clear
                </button>
              </>
            )}
          </div>
        ))}
        {workHistory.every(item => item.isSaved) && (
          <button className="bg-blue-500 text-white rounded px-4 py-2" onClick={handleAddWorkHistory}>
            Add
          </button>
        )}
      </div>
      <div>
        <h2 className="block text-gray-700 font-bold mb-2">Education History:</h2>
        {educationHistory.map((entry, index) => (
          <div key={index} className="border border-gray-300 rounded p-4 mb-2 relative">
            {entry.isExpanded ? (
              <div className='mb-2'>
                <label className="block text-gray-700 mb-2">
                  Institution:
                  <input type="text" 
                  value={entry.institution} 
                  className="border border-gray-300 rounded p-2 mb-2 w-full text-black"
                  onChange={(e) => handleEditEducationField(index, 'institution', e.target.value)} />
                </label>
                <label className="block text-gray-700 mb-2">
                  Course:
                  <input type="text" 
                  value={entry.course} 
                  className="border border-gray-300 rounded p-2 mb-2 w-full text-black"
                  onChange={(e) => handleEditEducationField(index, 'course', e.target.value)} />
                </label>
                <label className="block text-gray-700 mb-2">
                  Start Date:
                  <input type="date" 
                  value={entry.startDate} 
                  min={minDate} 
                  max={currentDate}
                  className="border border-gray-300 rounded p-2 w-full text-black"
                  onChange={(e) => handleEditEducationField(index, 'startDate', e.target.value)} />
                </label>
                <label className="block text-gray-700 mb-2">
                  End Date:
                  <input type="date" value={entry.endDate} min={minDate} max={currentDate} onChange={(e) => handleEditEducationField(index, 'endDate', e.target.value)} />
                </label>
                <button className="bg-green-500 text-white rounded px-4 py-2" onClick={() => handleSaveEducationHistory(index)}>Save</button>
                <button className="bg-red-500 text-white rounded px-4 py-2 ml-2" onClick={() => handleRemoveEducationHistoryFields(index)}>Remove</button>
              </div>
            ) : (
              <div onClick={() => handleToggleExpandEducationHistory(index)}>
                <p>{entry.institution} - {entry.course}</p>
              </div>
            )}
          </div>
        ))}
        <button onClick={handleAddEducationHistory}>Add Education History</button>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Skills:</label>
        <div className="flex flex-wrap gap-2 mb-2">
          {skills.map((skill, index) => (
            <div key={index} className="bg-gray-200 rounded px-4 py-2 flex items-center">
              <span className="text-black">{skill}</span>
              <button
                className="text-red-500 ml-2"
                onClick={() => handleRemoveSkill(index)}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Add a skill and press Enter"
          className="border border-gray-300 rounded p-2 w-full text-black"
          onKeyPress={handleAddSkill}
        />
      </div>
      <div className="flex justify-center">
        <button className="bg-blue-500 text-white rounded px-4 py-2" onClick={handleSaveProfile}>
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfile;