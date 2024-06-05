import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface WorkHistoryEntry {
  company: string;
  role: string;
  startDate: Date | null;
  endDate: Date | null;
  isSaved: boolean;
  isExpanded: boolean;
}

const UserProfile: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [resume, setResume] = useState<File | null>(null);
  const [workHistory, setWorkHistory] = useState<WorkHistoryEntry[]>([{ company: '', role: '', startDate: null, endDate: null, isSaved: false, isExpanded: true }]);
  const [skills, setSkills] = useState<string[]>([]);
  const [appliedJobs, setAppliedJobs] = useState<{ title: string; company: string; status: string; }[]>([]);

  useEffect(() => {
    setAppliedJobs([
      { title: 'Software Engineer', company: 'Tech Solutions Inc.', status: 'Interview Scheduled' },
      { title: 'QA Technician', company: 'Starfield Industry Ltd.', status: 'Applied' },
      { title: 'Marketing Manager', company: 'Marketing Agency X', status: 'Rejected' },
    ]);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveResume = () => setResume(null);

  const handleSaveWorkHistory = (index: number) => {
    const newWorkHistory = [...workHistory];
    const entry = newWorkHistory[index];
    if (entry.company && entry.role && entry.startDate && entry.endDate) {
      entry.isSaved = true;
      entry.isExpanded = false;
      setWorkHistory(newWorkHistory);
    } else {
      alert('Please fill in all fields before saving.');
    }
  };

  const handleAddWorkHistory = () => {
    setWorkHistory([...workHistory, { company: '', role: '', startDate: null, endDate: null, isSaved: false, isExpanded: true }]);
  };

  const handleRemoveWorkHistoryFields = (index: number) => {
    const newWorkHistory = [...workHistory];
    newWorkHistory.splice(index, 1);
    setWorkHistory(newWorkHistory);
  };

  const handleToggleExpand = (index: number) => {
    const newWorkHistory = [...workHistory];
    newWorkHistory[index].isExpanded = !newWorkHistory[index].isExpanded;
    setWorkHistory(newWorkHistory);
  };

  const handleEditWorkHistoryField = (index: number, field: keyof WorkHistoryEntry, value: any) => {
    const newWorkHistory = [...workHistory];
    newWorkHistory[index] = { ...newWorkHistory[index], [field]: value };
    setWorkHistory(newWorkHistory);
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
    // Save all changes here, including work history and skills.
    const savedWorkHistory = workHistory.map((entry, index) => {
      if (!entry.isSaved && entry.company && entry.role && entry.startDate && entry.endDate) {
        handleSaveWorkHistory(index);
      }
      return entry;
    });

    setWorkHistory(savedWorkHistory);
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Email:', email);
    console.log('Resume:', resume);
    console.log('Work History:', savedWorkHistory);
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
    const lastEntry = workHistory[workHistory.length - 1];
    if (workHistory.length > 1 && workHistory.every(entry => entry.isSaved && entry.company && entry.role && entry.startDate && entry.endDate)) {
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
        <label className="block text-gray-700 font-bold mb-2">Add Work History:</label>
        {workHistory.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded p-4 mb-2 relative">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-bold text-gray-700">Work History {index + 1}</h2>
              {item.isSaved && (
                <button className="text-blue-500" onClick={() => handleToggleExpand(index)}>
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
                  <label className="block text-gray-700 font-bold mb-2">Start Date:</label>
                  <DatePicker
                    selected={item.startDate}
                    onChange={(date: Date | null) => handleEditWorkHistoryField(index, 'startDate', date)}
                    className="border border-gray-300 rounded p-2 w-full text-black"
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-gray-700 font-bold mb-2">End Date:</label>
                  <DatePicker
                    selected={item.endDate}
                    onChange={(date: Date | null) => handleEditWorkHistoryField(index, 'endDate', date)}
                    className="border border-gray-300 rounded p-2 w-full text-black"
                  />
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
