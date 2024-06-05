// src/components/Home.tsx
import React from 'react';

const Home: React.FC = () => {
    return (
        <div className="bg-blue-100 min-h-screen">
            <main className="container mx-auto py-16">
                <div className="flex items-center justify-center">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl font-bold text-blue-600 mb-4">
                            TalentMatch: Bridging Talents and Opportunities
                        </h1>
                        <p className="text-gray-800 text-lg mb-8">
                            At TalentMatch, we specialize in matching the right talent with the right opportunities.
                            Our clients trust us to provide top-notch talent for their needs.
                            Whether you're a developer, designer, or marketer, we've got opportunities
                            for you.
                        </p>
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                            Get Started
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
