"use client";
import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Link from 'next/link';

interface WorkHistoryEntry {
  company: string;
  role: string;
  startDate: string;
  endDate: string;
  currentlyWorking: boolean;
  isSaved: boolean;
  isExpanded: boolean;
  description: string;
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
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [resume, setResume] = useState<File | null>(null);
  const [workHistory, setWorkHistory] = useState<WorkHistoryEntry[]>([
    { company: '', role: '', startDate: '', endDate: '', currentlyWorking: false, isSaved: false, isExpanded: true, description: ''}
  ]);
  const [educationHistory, setEducationHistory] = useState<EducationEntry[]>([
    { institution: '', course: '', startDate: '', endDate: '', isSaved: false, isExpanded: true }
  ]);
  const [skills, setSkills] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);

  const currentDate = new Date().toISOString().split('T')[0];
  const minDate = new Date(new Date().setFullYear(new Date().getFullYear() - 50)).toISOString().split('T')[0];
  const { uid, user } = useAuth();

  const checkCompletion = () => {
    // Check if workHistory, educationHistory, and skills are filled
    const workFilled = workHistory.every(item => 
      item.company.trim() !== '' &&
      item.role.trim() !== '' &&
      item.startDate.trim() !== '' &&
      (item.currentlyWorking || item.endDate.trim() !== '') &&
      item.description.trim() !== ''
    );
  
    const educationFilled = educationHistory.every(entry =>
      entry.institution.trim() !== '' &&
      entry.course.trim() !== '' &&
      entry.startDate.trim() !== '' &&
      entry.endDate.trim() !== ''
    );
  
    const skillsFilled = skills.length > 0;
  
    if (workFilled && educationFilled && skillsFilled) {
      setLoading(false);
    }
  };
  

  const fetchAndAutofillResume = async () => {
    try {
      const response = await fetch(`https://resumegraderapi.onrender.com/resumes/${uid}`, {
        method: 'GET',
        headers: {
          'accept': 'application/json'
        }
      });
  
      if (!response.ok) {
        if (response.status === 404) {
          console.log('No existing resume found.');
        } else {
          throw new Error('Failed to fetch resume');
        }
        return;
      }
  
      const result = await response.json();
      console.log('Resume fetched successfully:', result);
      setSkills(result.skills);
  
      const newWorkHistory = result.experience.map((exp: any) => ({
        company: exp.company_name,
        role: exp.title,
        startDate: exp.start_date.year ? `${exp.start_date.year}-${String(Math.max(1, exp.start_date.month)).padStart(2, '0')}-${String(Math.max(1, exp.start_date.day)).padStart(2, '0')}` : '',
        endDate: exp.end_date.year ? `${exp.end_date.year}-${String(Math.max(1, exp.end_date.month)).padStart(2, '0')}-${String(Math.max(1, exp.end_date.day)).padStart(2, '0')}` : '',
        currentlyWorking: !exp.end_date.year,
        isSaved: true,
        isExpanded: false,
        description: exp.description || '',
      }));
      setWorkHistory(newWorkHistory);
  
      const newEducationHistory = result.education.map((edu: any) => ({
        institution: edu.institution,
        course: edu.course_name,
        startDate: edu.start_date.year ? `${edu.start_date.year}-${String(Math.max(1, edu.start_date.month)).padStart(2, '0')}-${String(Math.max(1, edu.start_date.day)).padStart(2, '0')}` : '',
        endDate: edu.end_date.year ? `${edu.end_date.year}-${String(Math.max(1, edu.end_date.month)).padStart(2, '0')}-${String(Math.max(1, edu.end_date.day)).padStart(2, '0')}` : '',
        isSaved: true,
        isExpanded: false,
      }));
      setEducationHistory(newEducationHistory);
  
    } catch (error) {
      console.error('Error fetching resume:', error);
    }
  };

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
        startDate: exp.start_date.year ? `${exp.start_date.year}-${String(Math.max(1, exp.start_date.month)).padStart(2, '0')}-${String(Math.max(1, exp.start_date.day)).padStart(2, '0')}` : '',
        endDate: exp.end_date.year ? `${exp.end_date.year}-${String(Math.max(1, exp.end_date.month)).padStart(2, '0')}-${String(Math.max(1, exp.end_date.day)).padStart(2, '0')}` : '',
        currentlyWorking: !exp.end_date.year,
        isSaved: true,
        isExpanded: false,
        description: exp.description || '',
        }));
      setWorkHistory(newWorkHistory);

      const newEducationHistory = result.education.map((edu: any) => ({
        institution: edu.institution,
        course: edu.course_name,
        startDate: edu.start_date.year ? `${edu.start_date.year}-${String(Math.max(1, edu.start_date.month)).padStart(2, '0')}-${String(Math.max(1, edu.start_date.day)).padStart(2, '0')}` : '',
        endDate: edu.end_date.year ? `${edu.end_date.year}-${String(Math.max(1, edu.end_date.month)).padStart(2, '0')}-${String(Math.max(1, edu.end_date.day)).padStart(2, '0')}` : '',
        isSaved: true,
        isExpanded: false,
      }));
      setEducationHistory(newEducationHistory);

      setLoading(false);

    } catch (error) {
      console.error('Error uploading resume:', error);
    }
  };

  const handleUpdateUserInfo = async () => {
    const [year, month, day] = dateOfBirth.split('-').map(num => parseInt(num));

    const formattedDOB = `${day.toString().padStart(2, '0')}${month.toString().padStart(2, '0')}${year}`;


    const userInfo = {
      uid: uid,
      first_name: firstName,
      last_name: lastName,
      dob: formattedDOB,
      phone_number: phoneNumber,
      email: email,
    };
  
    try {
      const response = await fetch(`https://resumegraderapi.onrender.com/users/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });
      console.log('userInfo:', userInfo);
  
      if (response.ok) {
        alert('User info updated successfully.');
      } else {
        console.error('Error updating user info:', response.statusText);
        alert('Failed to update user info.');
      }
    } catch (error) {
      console.error('Error updating user info:', error);
      alert('Failed to update user info.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setResume(file);
      setLoading(true); // Start loading
      uploadResume(file); // Call the function to handle the upload
    }
  };
  

  const validateProfile = () => {
    const missingFields: (string | never)[] = [];

    // Check Work History for empty or null fields
    for (const entry of workHistory) {
      if (!entry.company) missingFields.push('Company in Work History');
      if (!entry.role) missingFields.push('Role in Work History');
      if (!entry.startDate) missingFields.push('Start Date in Work History');
      if (!entry.endDate && !entry.currentlyWorking) missingFields.push('End Date or Currently Working in Work History');
    }
  
    // Assuming there's a similar loop for Education History
    // Add similar checks for Education History fields
    for (const entry of educationHistory) {
      if (!entry.institution) missingFields.push('Institution in Education History');
      if (!entry.course) missingFields.push('Course in Education History');
      if (!entry.startDate) missingFields.push('Start Date in Education History');
      if (!entry.endDate) missingFields.push('End Date in Education History');
    }

    // If there are any missing fields, alert the user and return false
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields before saving your profile. Missing: ${missingFields.join(', ')}.`);
      return false;
    }

    // All entries are valid
    return true;
  };

  const handleRemoveResume = () => setResume(null);

  const handleSaveWorkHistory = (index: number) => {
    const newWorkHistory = [...workHistory];
    const entry = newWorkHistory[index];
    if (entry.company && entry.role && entry.startDate && (entry.endDate || entry.currentlyWorking)) {
      entry.isSaved = true;
      entry.isExpanded = false;
      setWorkHistory(newWorkHistory);
      checkCompletion();
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
      checkCompletion();
    } else {
      alert('Please fill in all fields before saving.');
    }
  };

  const handleAddWorkHistory = () => {
    setWorkHistory([...workHistory, { company: '', role: '', startDate: '', endDate: '', currentlyWorking: false, isSaved: false, isExpanded: true, description: '' }]);
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
      checkCompletion();
    }
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
    checkCompletion();
  };

  const handleSaveProfile = async () => {
    // Validate profile before saving
    if (!validateProfile()) {
      alert('Please fill in all required fields before saving your profile.');
      return; // Stop execution if validation fails
    }
    const getTodayDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const year = today.getFullYear();
      return `${year}-${month}-${day}`;
    };

    const savedWorkHistory = workHistory.map((entry, index) => {
      // If currentlyWorking is true, set endDate to today's date
      if (entry.currentlyWorking) {
        entry.endDate = getTodayDate();
      } else {
        // Assign today's date if endDate is empty or null and not currently working
        entry.endDate = entry.endDate || getTodayDate();
      }

      if (!entry.isSaved && entry.company && entry.role && entry.startDate && (entry.endDate || entry.currentlyWorking)) {
        handleSaveWorkHistory(index);
      }
      return entry;
    });
  
    const savedEducationHistory = educationHistory.map((entry, index) => {
      // Assign today's date if startDate or endDate is empty or null
      entry.startDate = entry.startDate || getTodayDate();
      entry.endDate = entry.endDate || getTodayDate();

      if (!entry.isSaved && entry.institution && entry.course && entry.startDate && entry.endDate) {
        handleSaveEducationHistory(index);
      }
      return entry;
    });
  
    setWorkHistory(savedWorkHistory);
    setEducationHistory(savedEducationHistory);
  
    const formattedExperience = savedWorkHistory.map(entry => ({
      start_date: {
        day: parseInt(entry.startDate.split('-')[2]),
        month: parseInt(entry.startDate.split('-')[1]),
        year: parseInt(entry.startDate.split('-')[0]),
      },
      end_date: entry.currentlyWorking ? {
        day: 0,
        month: 0,
        year: 0,
      } : {
        day: parseInt(entry.endDate.split('-')[2]),
        month: parseInt(entry.endDate.split('-')[1]),
        year: parseInt(entry.endDate.split('-')[0]),
      },
      title: entry.role,
      company_name: entry.company,
      description: entry.description || "",
    }));
  
    const formattedEducation = savedEducationHistory.map(entry => ({
      start_date: {
        day: parseInt(entry.startDate.split('-')[2]),
        month: parseInt(entry.startDate.split('-')[1]),
        year: parseInt(entry.startDate.split('-')[0]),
      },
      end_date: {
        day: parseInt(entry.endDate.split('-')[2]),
        month: parseInt(entry.endDate.split('-')[1]),
        year: parseInt(entry.endDate.split('-')[0]),
      },
      institution: entry.institution,
      course_name: entry.course,
    }));
  
    const payload = {
      uid,
      skills,
      experience: formattedExperience,
      education: formattedEducation,
    };
    
    try {
      const response = await fetch(`https://resumegraderapi.onrender.com/resumes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        alert('Profile saved successfully.');
      } else {
        console.error('Error saving profile:', response.statusText);
        alert('Failed to save profile.');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile.');
    }
    console.log('Payload:', payload);
  };

  useEffect(() => {
    if (uid) {
      fetchAndAutofillResume();
    }
  }, [uid]);

  useEffect(() => {
    if (workHistory.length > 1) {
      const lastEntry = workHistory[workHistory.length - 1];
      if (!lastEntry.company && !lastEntry.role && !lastEntry.startDate && !lastEntry.endDate && !lastEntry.isSaved) {
        const newWorkHistory = workHistory.slice(0, -1);
        setWorkHistory(newWorkHistory);
      }
    }
    // Check if user is signed in and user data is available
    if (uid && user) {
    // Set the state for each field if the user data exists
    setFirstName(user.name.first_name || '');
    setLastName(user.name.last_name || '');
    setEmail(user.email || '');
    setPhoneNumber(user.phone_number || ''); // Assuming these fields exist on your user object
    // Format the date of birth as a string
    const dobString = `${user.dob.year}-${String(user.dob.month).padStart(2, '0')}-${String(user.dob.day).padStart(2, '0')}`;
    setDateOfBirth(dobString);
    }
  }, [workHistory, educationHistory, uid, user]); // Include uid and user in the dependency array

  return (
    <div className="w-full max-w-4xl bg-white shadow-xl rounded-xl p-10">
      <div className="flex justify-between items-center mb-4">
        <Link href="/YourApplication">
          <button className="bg-gray-500 text-white rounded px-4 py-2">
            Your Applications
          </button>
        </Link>
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
        <div>
          <label className="block text-gray-700 font-bold mb-2">Phone Number:</label>
          <input
            type="text"
            className="border border-gray-300 rounded p-2 w-full text-black"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-700 font-bold mb-2">Date of Birth:</label>
          <input
            type="text"
            className="border border-gray-300 rounded p-2 w-full text-black"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
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
        <button className="bg-green-500 text-white rounded px-4 py-2 w-28" onClick={() => handleUpdateUserInfo()}>Update</button>
        <div className="col-span-2">
          <label className="block text-gray-700 font-bold mb-2">Upload Resume:</label>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="spinner-border animate-spin border-t-2 border-b-2 border-gray-900 rounded-full w-8 h-8"></div>
              <span className="ml-2 text-gray-700">Uploading...</span>
            </div>
          ) : (
            <>
              <label className="block border border-gray-300 rounded p-4 text-center cursor-pointer hover:bg-gray-200">
                <input
                  type="file"
                  accept=".pdf, .doc, .docx"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <span className="text-gray-500">{resume ? resume.name : "Select a File"}</span>
              </label>
              {resume && <button className="text-red-500 mt-2" onClick={handleRemoveResume}>Remove</button>}
            </>
          )}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="block text-gray-700 font-bold mb-2">Work Experience:</h2>
        {workHistory.map((item, index) => (
          <div key={index} className="border border-gray-300 rounded p-4 mb-2 relative">
            <div className="flex justify-between items-center mb-2">
              {item.isSaved && !item.isExpanded && (
                <span className="text-md text-gray-700">{item.company}</span>
              )}
              {item.isSaved && (
                <button className="text-blue-500 absolute top-4 right-4" onClick={() => handleEditWorkHistoryField(index, 'isExpanded', !item.isExpanded)}>
                  {item.isExpanded ? 'Collapse' : 'Expand'}
                </button>
              )}
            </div>
            {item.isExpanded && (
              <>
                <label className="block text-gray-700 mb-2">Company Name:
                  <input
                    type="text"
                    className="border border-gray-300 rounded p-2 mb-2 w-full text-black"
                    value={item.company}
                    onChange={(e) => handleEditWorkHistoryField(index, 'company', e.target.value)}
                  />
                </label>
                <label className="block text-gray-700 mb-2">Role:
                  <input
                    type="text"
                    className="border border-gray-300 rounded p-2 mb-2 w-full text-black"
                    value={item.role}
                    onChange={(e) => handleEditWorkHistoryField(index, 'role', e.target.value)}
                  />
                </label>
                <div className="mb-2">
                  <label className="block text-gray-700 mb-2">Start Date:</label>
                  <input
                    type="date"
                    className="border border-gray-300 rounded p-2 w-full text-black"
                    value={item.startDate}
                    max={currentDate}
                    min="1900-01-01"
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
                <div className="mb-2">
                  <label className="block text-gray-700 mb-2">Description:</label>
                  <textarea
                    className="border border-gray-300 rounded p-2 mb-2 w-full text-black"
                    value={item.description}
                    onChange={(e) => handleEditWorkHistoryField(index, 'description', e.target.value)}
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
                  Remove
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
        <h2 className="block text-gray-700 font-bold mb-2">Education:</h2>
        {educationHistory.map((entry, index) => (
          <div key={index} className="border border-gray-300 rounded p-4 mb-2 relative">
            <div className="flex justify-between items-center mb-2">
              {entry.isSaved && !entry.isExpanded && (
                <span className="text-md text-gray-700">{entry.institution}</span>
              )}
              {entry.isSaved && (
                <button className="text-blue-500 absolute top-4 right-4" onClick={() => handleEditEducationField(index, 'isExpanded', !entry.isExpanded)}>
                  {entry.isExpanded ? 'Collapse' : 'Expand'}
                </button>
              )}
            </div>
            {entry.isExpanded && (
              <>
                <label className="block text-gray-700 mb-2">Institution:
                  <input
                    type="text"
                    value={entry.institution}
                    className="border border-gray-300 rounded p-2 mb-2 w-full text-black"
                    onChange={(e) => handleEditEducationField(index, 'institution', e.target.value)} />
                </label>
                <label className="block text-gray-700 mb-2">
                  Course:
                  <input
                    type="text"
                    value={entry.course}
                    className="border border-gray-300 rounded p-2 mb-2 w-full text-black"
                    onChange={(e) => handleEditEducationField(index, 'course', e.target.value)} />
                </label>
                <label className="block text-gray-700 mb-2">
                  Start Date:
                  <input
                    type="date"
                    value={entry.startDate}
                    min="1900-01-01"
                    max={currentDate}
                    className="border border-gray-300 rounded p-2 w-full text-black"
                    onChange={(e) => handleEditEducationField(index, 'startDate', e.target.value)} />
                </label>
                <label className="block text-gray-700 mb-2">
                  End Date:
                  <input
                    type="date"
                    value={entry.endDate}
                    min="1900-01-01"
                    max={currentDate}
                    className="border border-gray-300 rounded p-2 w-full text-black"
                    onChange={(e) => handleEditEducationField(index, 'endDate', e.target.value)} />
                </label>
                <button className="bg-green-500 text-white rounded px-4 py-2" onClick={() => handleSaveEducationHistory(index)}>Save</button>
                <button className="bg-red-500 text-white rounded px-4 py-2 ml-2" onClick={() => handleRemoveEducationHistoryFields(index)}>Remove</button>
              </>
            )}
          </div>
        ))}
        {educationHistory.every(entry => entry.isSaved) && (
          <button className="bg-blue-500 text-white rounded px-4 py-2" onClick={handleAddEducationHistory}>
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