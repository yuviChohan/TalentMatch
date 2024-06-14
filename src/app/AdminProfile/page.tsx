"use client";
import React, { useState } from 'react';

const AdminProfile: React.FC = () => {
  const [profilePic, setProfilePic] = useState<string>('/path/to/admin-icon.png');
  const [linkedInUrl, setLinkedInUrl] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [jobTitle, setJobTitle] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [skills, setSkills] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [interests, setInterests] = useState<string>('');
  const [education, setEducation] = useState<{ degree: string; institution: string; graduationYear: string }[]>([]);
  const [workExperience, setWorkExperience] = useState<{ jobTitle: string; company: string; duration: string }[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [certifications, setCertifications] = useState<string[]>([]);
  const [publications, setPublications] = useState<string[]>([]);
  const [references, setReferences] = useState<string[]>([]);
  const [visibility, setVisibility] = useState<boolean>(true); // true for public, false for private
  const [language, setLanguage] = useState<string>('English');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfilePicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Profile updated successfully!");
    }, 2000);
  };

  const handleReset = () => {
    setProfilePic('/path/to/admin-icon.png');
    setLinkedInUrl('');
    setEmail('');
    setMobileNumber('');
    setAddress('');
    setName('');
    setJobTitle('');
    setBio('');
    setOrganization('');
    setSkills('');
    setDob('');
    setGender('');
    setInterests('');
    setEducation([]);
    setWorkExperience([]);
    setLanguages([]);
    setCertifications([]);
    setPublications([]);
    setReferences([]);
    setVisibility(true);
    setLanguage('English');
    setErrors({});
    setSuccessMessage('');
  };

  return (
    <div className="w-full max-w-5xl shadow-2xl rounded-2xl p-12 bg-gradient-to-r from-blue-50 to-blue-100 transition-opacity duration-500 ease-in-out">
      <div className="flex justify-between items-center mb-10">
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 flex flex-col items-center border p-6 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 bg-white">
          <div className="w-36 h-36 mb-6 border-4 border-blue-300 rounded-full overflow-hidden shadow-md">
            <img src={profilePic} alt="Admin Icon" className="w-full h-full object-cover animate_animated animate_fadeIn" />
          </div>
          <input
            type="file"
            accept="image/*"
            id="profilePicInput"
            className="hidden"
            onChange={handleProfilePicChange}
          />
          <button
            className="rounded px-4 py-2 mt-4 bg-blue-600 text-white hover:bg-blue-700 transition duration-300 animate_animated animate_pulse"
            onClick={() => document.getElementById('profilePicInput')?.click()}
          >
            Update/Add Profile Picture
          </button>
          <input
            type="text"
            placeholder="LinkedIn Profile URL"
            className="border rounded p-2 mt-4 w-full bg-gray-50 focus:bg-white transition duration-300 text-black"
            value={linkedInUrl}
            onChange={(e) => setLinkedInUrl(e.target.value)}
          />
          {errors.linkedInUrl && <p className="text-sm text-red-500">{errors.linkedInUrl}</p>}
        </div>
        <div className="col-span-2 flex flex-col p-6 rounded-lg shadow-lg bg-white">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="border rounded p-2 mb-4 col-span-2 bg-gray-50 focus:bg-white transition duration-300 text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Job Title"
              className="border rounded p-2 mb-4 bg-gray-50 focus:bg-white transition duration-300 text-black"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <input
              type="text"
              placeholder="Organization"
              className="border rounded p-2 mb-4 bg-gray-50 focus:bg-white transition duration-300 text-black"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
            <input
              type="text"
              placeholder="Skills"
              className="border rounded p-2 mb-4 bg-gray-50 focus:bg-white transition duration-300 text-black"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          <textarea
            placeholder="Bio"
            className="border rounded p-2 mb-4 h-24 resize-none bg-gray-50 focus:bg-white transition duration-300 text-black"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="email"
              placeholder="Email"
              className="border rounded p-2 mb-4 bg-gray-50 focus:bg-white transition duration-300 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Mobile Number"
              className="border rounded p-2 mb-4 bg-gray-50 focus:bg-white transition duration-300 text-black"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <input
              type="text"
              placeholder="Address"
              className="border rounded p-2 mb-4 bg-gray-50 focus:bg-white transition duration-300 text-black"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              className="border rounded p-2 mb-4 bg-gray-50 focus:bg-white transition duration-300 text-black"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
            <select
              className="border rounded p-2 mb-4 bg-gray-50 focus:bg-white transition duration-300 text-black"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <input
              type="text"
              placeholder="Interests"
              className="border rounded p-2 mb-4 bg-gray-50 focus:bg-white transition duration-300 text-black"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Education</h2>
        {education.map((edu,          index) => (
          <div key={index} className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Degree"
              className="border rounded p-2 w-1/3 bg-gray-50 focus:bg-white transition duration-300 text-black"
              value={edu.degree}
              onChange={(e) => {
                const newEducation = [...education];
                newEducation[index].degree = e.target.value;
                setEducation(newEducation);
              }}
            />
            <input
              type="text"
              placeholder="Institution"
              className="border rounded p-2 w-1/3 mx-2 bg-gray-50 focus:bg-white transition duration-300 text-black"
              value={edu.institution}
              onChange={(e) => {
                const newEducation = [...education];
                newEducation[index].institution = e.target.value;
                setEducation(newEducation);
              }}
            />
            <input
              type="text"
              placeholder="Graduation Year"
              className="border rounded p-2 w-1/3 bg-gray-50 focus:bg-white transition duration-300 text-black"
              value={edu.graduationYear}
              onChange={(e) => {
                const newEducation = [...education];
                newEducation[index].graduationYear = e.target.value;
                setEducation(newEducation);
              }}
            />
            <button
              className="bg-red-500 text-white rounded px-4 py-2 ml-4 hover:bg-red-600 transition duration-300"
              onClick={() => {
                const newEducation = education.filter((_, i) => i !== index);
                setEducation(newEducation);
              }}
            >
              Delete
            </button>
          </div>
        ))}
        <button
          className="bg-green-500 text-white rounded px-6 py-2 hover:bg-green-600 transition duration-300"
          onClick={() => setEducation([...education, { degree: '', institution: '', graduationYear: '' }])}
        >
          Add Education
        </button>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Work Experience</h2>
        {workExperience.map((work, index) => (
          <div key={index} className="flex justify-between items-center mb-4">
            <input
              type="text"
              placeholder="Job Title"
              className="border rounded p-2 w-1/3 bg-gray-50 focus:bg-white transition duration-300 text-black"
              value={work.jobTitle}
              onChange={(e) => {
                const newWorkExperience = [...workExperience];
                newWorkExperience[index].jobTitle = e.target.value;
                setWorkExperience(newWorkExperience);
              }}
            />
            <input
              type="text"
              placeholder="Company"
              className="border rounded p-2 w-1/3 mx-2 bg-gray-50 focus:bg-white transition duration-300 text-black"
              value={work.company}
              onChange={(e) => {
                const newWorkExperience = [...workExperience];
                newWorkExperience[index].company = e.target.value;
                setWorkExperience(newWorkExperience);
              }}
            />
            <input
              type="text"
              placeholder="Duration"
              className="border rounded p-2 w-1/3 bg-gray-50 focus:bg-white transition duration-300 text-black"
              value={work.duration}
              onChange={(e) => {
                const newWorkExperience = [...workExperience];
                newWorkExperience[index].duration = e.target.value;
                setWorkExperience(newWorkExperience);
              }}
            />
            <button
              className="bg-red-500 text-white rounded px-4 py-2 ml-4 hover:bg-red-600 transition duration-300"
              onClick={() => {
                const newWorkExperience = workExperience.filter((_, i) => i !== index);
                setWorkExperience(newWorkExperience);
              }}
            >
              Delete
            </button>
          </div>
        ))}
        <button
          className="bg-green-500 text-white rounded px-6 py-2 hover:bg-green-600 transition duration-300"
          onClick={() => setWorkExperience([...workExperience, { jobTitle: '', company: '', duration: '' }])}
        >
          Add Work Experience
        </button>
      </div>
      <div className="flex justify-end mt-10">
        <button
          className="bg-gray-500 text-white rounded px-6 py-2 mr-4 hover:bg-gray-600 transition duration-300"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          className="rounded px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition duration-300"
          onClick={handleSubmit}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white"
                viewBox="0 0 24 24"
              ></svg>
              Submitting...
            </span>
          ) : (
            'Save Profile'
          )}
        </button>
      </div>
      {successMessage && (
        <div className="mt-4 text-center text-green-500 transition-opacity duration-500 ease-in-out">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
