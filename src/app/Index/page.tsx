// src/components/Home.tsx
import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
    return (
        <div className="bg-gradient-to-r from-blue-200 to-white min-h-screen text-gray-800 p-6">
            <main className="container mx-auto py-16">
                <div className="flex items-center justify-center">
                    <div className="max-w-3xl">
                        <h1 className="text-6xl font-bold mb-4 transform transition duration-500 hover:scale-110" style={{color: '#0266FA'}}>
                            TalentMatch: Bridging Talents and Opportunities
                        </h1>
                        <p className="text-gray-700 text-lg mb-8">
                            At TalentMatch, we specialize in matching the right talent with the right opportunities.
                            Our clients trust us to provide top-notch talent for their needs.
                            Whether you're a developer, designer, or marketer, we've got opportunities
                            for you.
                        </p>
                        <Link href="/SignIn">
                        <button className="px-6 py-3 rounded-lg transition-colors duration-300 transform transition-duration-500 hover:scale-110" style={{backgroundColor: '#0266FA', color: 'white'}}>
                            Get Started
                        </button>
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
