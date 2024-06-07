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
    <div className="w-full max-w-4xl shadow-xl rounded-xl p-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Admin Profile</h1>
      </div>
      <div className="grid grid-cols-2 gap-8">
        <div className="flex flex-col items-center border p-6 rounded-lg shadow-md">
          <div className="w-32 h-32 mb-4 border-4 rounded-full overflow-hidden">
            <img src={profilePic} alt="Admin Icon" className="w-full h-full object-cover" />
          </div>
          <input
            type="file"
            accept="image/*"
            id="profilePicInput"
            className="hidden"
            onChange={handleProfilePicChange}
          />
          <button
            className="rounded px-4 py-2 mt-4 hover:bg-blue-600 transition duration-300"
            onClick={() => document.getElementById('profilePicInput')?.click()}
            style={{ color: 'black' }}
          >
            Update/Add Profile Picture
          </button>
          <input
            type="text"
            placeholder="LinkedIn Profile URL"
            className="border rounded p-2 mt-4 w-full"
            value={linkedInUrl}
            onChange={(e) => setLinkedInUrl(e.target.value)}
            style={{ color: 'black' }}
          />
          {errors.linkedInUrl && <p className="text-sm">{errors.linkedInUrl}</p>}
          <button
            className="bg-black text-white rounded px-4 py-2 mt-4 hover:bg-gray-800 transition duration-300"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
        <div className="flex flex-col p-6 rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Name"
            className="border rounded p-2 mb-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ color: 'black' }}
          />
          <input
            type="text"
            placeholder="Job Title"
            className="border rounded p-2 mb-4"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            style={{ color: 'black' }}
          />
          <textarea
            placeholder="Bio"
            className="border rounded p-2 mb-4 h-24 resize-none"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            style={{ color: 'black' }}
          />
          <input
            type="text"
            placeholder="Organization"
            className="border rounded p-2 mb-4"
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            style={{ color: 'black' }}
          />
          <input
            type="text"
            placeholder="Skills"
            className="border rounded p-2 mb-4"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            style={{ color: 'black' }}
          />
          {/* Additional inputs */}
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          className="bg-gray-500 text-white rounded px-6 py-2 mr-2 hover:bg-gray-600 transition duration-300"
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
                className="animate-spin h-5 w-5 mr-3 border-t-2 border-b -2"
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
        <div className="mt-4 text-center">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default AdminProfile;

