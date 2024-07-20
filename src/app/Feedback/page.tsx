'use client';
import React, { useState } from 'react';
import Link from 'next/link';

const FeedbackPage: React.FC = () => {
    const [selectedUser, setSelectedUser] = useState('');
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

    const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedUser(e.target.value);
        setFeedbackSubmitted(false); // Reset feedback submission status when user changes
    };

    const handleSubmitFeedback = () => {
        // Simulate feedback submission
        setFeedbackSubmitted(true);
    };

    return (
        <div className="bg-gradient-to-r from-blue-200 to-white min-h-screen text-gray-800">
            <main className="container mx-auto py-16">
                <div className="flex items-center justify-center">
                    <div className="max-w-4xl w-full">
                        <h1 className="text-6xl font-bold mb-4 transform transition duration-500 hover:scale-110" style={{color: '#0266FA'}}>
                            Review Application
                        </h1>
                        <p className="text-gray-700 text-lg mb-8">
                            Provide your feedback for the user's resume and application profile. Your insights help us ensure the best matches for our opportunities.
                        </p>
                        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                            <h2 className="text-4xl font-bold mb-4" style={{color: '#0266FA'}}>Select User</h2>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="userSelect">
                                    User
                                </label>
                                <select id="userSelect" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" value={selectedUser} onChange={handleUserChange}>
                                    <option value="">Select a user</option>
                                    <option value="user1">User 1</option>
                                    <option value="user2">User 2</option>
                                    <option value="user3">User 3</option>
                                </select>
                            </div>
                            {selectedUser && (
                                <>
                                    <h2 className="text-4xl font-bold mb-4" style={{color: '#0266FA'}}>User Profile</h2>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="userName">
                                            Name
                                        </label>
                                        <input id="userName" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" type="text" placeholder="User Name" value={selectedUser} disabled />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="userEmail">
                                            Email
                                        </label>
                                        <input id="userEmail" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" type="email" placeholder="User Email" disabled />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="userExperience">
                                            Experience
                                        </label>
                                        <textarea id="userExperience" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" rows={4} placeholder="User Experience" disabled></textarea>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="userSkills">
                                            Skills
                                        </label>
                                        <textarea id="userSkills" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" rows={3} placeholder="User Skills" disabled></textarea>
                                    </div>
                                    <div className="mb-4">
                                        <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="resume">
                                            Resume
                                        </label>
                                        <textarea id="resume" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" rows={10} placeholder="User Resume" disabled></textarea>
                                    </div>
                                </>
                            )}
                        </div>
                        {selectedUser && (
                            <div className="bg-white p-8 rounded-lg shadow-md">
                                <h2 className="text-4xl font-bold mb-4" style={{color: '#0266FA'}}>Feedback</h2>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="rating">
                                        Rating
                                    </label>
                                    <select id="rating" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500">
                                        <option value="">Select a rating</option>
                                        <option value="1">1 - Poor</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="3">3 - Good</option>
                                        <option value="4">4 - Very Good</option>
                                        <option value="5">5 - Excellent</option>
                                    </select>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="comments">
                                        Comments
                                    </label>
                                    <textarea id="comments" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" rows={5} placeholder="Enter your comments here"></textarea>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-lg font-bold mb-2" htmlFor="recommendation">
                                        Recommendation
                                    </label>
                                    <textarea id="recommendation" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500" rows={5} placeholder="Enter your recommendation here"></textarea>
                                </div>
                                <div className="flex justify-end">
                                    <button onClick={handleSubmitFeedback} className="px-6 py-3 rounded-lg transition-colors duration-300 transform transition-duration-500 hover:scale-110" style={{backgroundColor: '#0266FA', color: 'white'}}>
                                        Submit Feedback
                                    </button>
                                </div>
                                {feedbackSubmitted && (
                                    <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                                        Feedback submitted successfully!
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default FeedbackPage;

