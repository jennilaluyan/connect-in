import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Default from "../../assets/Anonymous.png"

const ProfileEditPage = () => {
    const [profileImage, setProfileImage] = useState(Default);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        position: '',
        email: '',
        location: ''
    });

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSave = () => {
        // TODO: Implement save logic
        console.log('Form Data:', formData);
    };

    return (
        <div id='profil' className="h-[90vh] bg-gray-100 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-xl bg-white rounded-xl shadow-lg"
            >
                {/* Profile Header */}
                <div className="relative bg-blue-500 h-32 rounded-t-xl">
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                        <div className="relative">
                            <motion.img
                                src={profileImage}
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-white object-cover"
                                whileHover={{ scale: 1.05 }}
                            />
                            <label
                                htmlFor="imageUpload"
                                className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 0011.586 3H8.414a1 1 0 00-.707.293L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                                </svg>
                            </label>
                            <input
                                type="file"
                                id="imageUpload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />
                        </div>
                    </div>
                </div>

                {/* Profile Form */}
                <div className="pt-20 px-6 pb-6">
                    {/* Informasi Dasar Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Informasi Dasar</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Depan</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    placeholder="Masukkan nama depan"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nama Belakang</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    placeholder="Masukkan nama belakang"
                                    value={formData.lastName}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Posisi saat ini</label>
                            <input
                                type="text"
                                name="position"
                                placeholder="Masukkan posisi Anda"
                                value={formData.position}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </motion.div>

                    {/* Informasi Kontak Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-6"
                    >
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Informasi Kontak</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Masukkan alamat email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Lokasi</label>
                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Masukkan kota atau lokasi"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Save Button */}
                    <motion.button
                        onClick={handleSave}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full mt-6 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Simpan
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfileEditPage;