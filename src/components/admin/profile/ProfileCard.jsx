// components/ProfileCard.jsx
import React from 'react';

const ProfileCard = ({ name, location, position }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden max-w-4xl mx-auto mb-6">
            {/* Cover dan Profile Image */}
            <div className="relative">
                <div className="bg-blue-500 h-32"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
                    <div className="bg-white rounded-full p-1">
                        <img
                            src="/api/placeholder/120/120"
                            alt="Profile"
                            className="w-32 h-32 rounded-full"
                        />
                    </div>
                </div>
            </div>

            {/* Profile Info */}
            <div className="pt-20 px-6 pb-6">
                <div className="flex justify-between items-start mb-4">
                    <h2 className="text-3xl font-bold">{name}</h2>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                        Edit Profil
                    </button>
                </div>

                <p className="text-gray-600 mb-2">{location}</p>
                <a href="#" className="text-blue-500 hover:underline block mb-4">Informasi kontak</a>
                <p className="text-gray-800 font-medium">{position}</p>
            </div>
        </div>
    );
};

export default ProfileCard;