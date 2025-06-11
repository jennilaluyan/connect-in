// L:\money-money\Web\Never Surrender\connect-in\src\components\profil\ProfileEditPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { getUser, getToken, setUser as setAuthUser } from '../../utils/auth';
import DefaultAvatar from "../../assets/Default.jpg"; // Pastikan path ini benar
import axios from 'axios';

// Log VITE_API_BASE_URL sekali saat modul dimuat
console.log('FE DEBUG Initial: VITE_API_BASE_URL value:', import.meta.env.VITE_API_BASE_URL);
if (typeof import.meta.env.VITE_API_BASE_URL === 'string') {
    for (let i = 0; i < import.meta.env.VITE_API_BASE_URL.length; i++) {
        console.log(`FE DEBUG Initial: VITE_API_BASE_URL Char at ${i}: '${import.meta.env.VITE_API_BASE_URL[i]}' Code: https://connect-in-backend-production.up.railway.app`);
    }
}


const ProfileEditPage = () => {
    const navigate = useNavigate();
    const currentUser = getUser();
    const token = getToken();

    const [profileImageDisplay, setProfileImageDisplay] = useState(DefaultAvatar);
    const [profileImageFile, setProfileImageFile] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        position: '',
        email: '',
        locationCity: '',
        locationProvince: '',
        companyName: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (currentUser) {
            const nameParts = currentUser.name ? currentUser.name.split(' ') : ['', ''];
            const firstName = nameParts[0] || '';
            const lastName = nameParts.slice(1).join(' ') || '';

            setFormData({
                firstName: firstName,
                lastName: lastName,
                position: currentUser.headline || (currentUser.role === 'hr' ? (currentUser.role_name || 'HR Department') : ''),
                email: currentUser.email || '',
                locationCity: currentUser.city || '',
                locationProvince: currentUser.province || '',
                companyName: currentUser.company_name || '',
            });

            let initialDisplayUrl = DefaultAvatar;
            if (currentUser.avatar_img_url) {
                // Bersihkan URL dari localStorage jika ada ZWSP atau kutip
                let cleanedInitialUrl = currentUser.avatar_img_url;
                if (typeof cleanedInitialUrl === 'string') {
                    cleanedInitialUrl = cleanedInitialUrl.replace(/\u200B/g, '').trim().replace(/^"|"$/g, '');
                }
                // Pastikan URL absolut
                if (typeof cleanedInitialUrl === 'string' && cleanedInitialUrl.startsWith('storage')) {
                    initialDisplayUrl = `${import.meta.env.VITE_API_BASE_URL}${cleanedInitialUrl}`;
                } else if (typeof cleanedInitialUrl === 'string' && cleanedInitialUrl.startsWith('http')) {
                    initialDisplayUrl = cleanedInitialUrl;
                }
            }
            setProfileImageDisplay(initialDisplayUrl);
            console.log("FE DEBUG useEffect: Initial profileImageDisplay set to:", initialDisplayUrl);

        } else {
            navigate('/masuk');
        }
    }, []);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        console.log('FE: File selected:', file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImageDisplay(reader.result);
                console.log('FE: Preview image updated (base64).');
            };
            reader.readAsDataURL(file);
            setProfileImageFile(file);
            console.log('FE: profileImageFile state SET:', file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
        if (error) setError(null);
        if (successMessage) setSuccessMessage('');
    };

    const handleSave = async () => {
        setIsLoading(true);
        setError(null);
        setSuccessMessage('');

        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            setError("Nama depan dan nama belakang tidak boleh kosong.");
            setIsLoading(false);
            return;
        }
        const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
        const dataToSubmit = new FormData();
        dataToSubmit.append('name', fullName);
        dataToSubmit.append('headline', formData.position);
        dataToSubmit.append('city', formData.locationCity);
        dataToSubmit.append('province', formData.locationProvince);
        if (currentUser?.role === 'hr') {
            dataToSubmit.append('company_name', formData.companyName);
        }
        if (profileImageFile) {
            dataToSubmit.append('avatar_img', profileImageFile, profileImageFile.name);
        }

        console.log("FE DEBUG: ---- Analisis URL Saat Simpan ----");
        const viteApiBaseUrlForSave = import.meta.env.VITE_API_BASE_URL; // Ambil sekali
        console.log("FE DEBUG: VITE_API_BASE_URL for save:", JSON.stringify(viteApiBaseUrlForSave));


        try {
            const apiUrl = `${viteApiBaseUrlForSave}api/profile`;
            const response = await axios.post(apiUrl, dataToSubmit, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                }
            });

            if (response.data && response.data.user) {
                const updatedUser = response.data.user;
                setAuthUser(updatedUser);
                setSuccessMessage('Profil berhasil diperbarui!');
                setProfileImageFile(null);

                console.log("FE DEBUG: Raw avatar_img_url from backend response:", updatedUser.avatar_img_url);
                console.log("FE DEBUG: Full updatedUser object from backend:", JSON.stringify(updatedUser, null, 2));

                let finalImageUrl = DefaultAvatar;
                if (updatedUser.avatar_img_url) {
                    let rawUrlFromBackend = updatedUser.avatar_img_url;
                    let cleanedUrlSegment = DefaultAvatar;

                    if (typeof rawUrlFromBackend === 'string') {
                        cleanedUrlSegment = rawUrlFromBackend.replace(/\u200B/g, '').trim().replace(/^"|"$/g, '');
                        console.log("FE DEBUG: URL segment setelah sanitasi ZWSP & kutip:", JSON.stringify(cleanedUrlSegment));
                    }

                    if (typeof cleanedUrlSegment === 'string' && cleanedUrlSegment.startsWith('storage')) {
                        finalImageUrl = `${viteApiBaseUrlForSave}${cleanedUrlSegment}`;
                        console.log("FE DEBUG: Mengkonstruksi URL absolut dari path relatif (setelah sanitasi):", finalImageUrl);
                    } else if (typeof cleanedUrlSegment === 'string' && cleanedUrlSegment.startsWith('http')) {
                        finalImageUrl = cleanedUrlSegment;
                        console.log("FE DEBUG: Menggunakan URL absolut yang sudah bersih dari backend:", finalImageUrl);
                    } else {
                        console.log("FE DEBUG: Path tidak valid atau DefaultAvatar, menggunakan DefaultAvatar untuk finalImageUrl.");
                    }
                }

                let displayUrlWithTimestamp = finalImageUrl;
                if (finalImageUrl !== DefaultAvatar && typeof finalImageUrl === 'string' && finalImageUrl.startsWith('http')) {
                    const trulyCleanedFinalAbsoluteUrl = finalImageUrl.replace(/\u200B/g, '').trim().replace(/^"|"$/g, '');
                    displayUrlWithTimestamp = `${trulyCleanedFinalAbsoluteUrl}?t=${new Date().getTime()}`;
                    console.log("FE DEBUG: URL akhir dengan timestamp (untuk display):", JSON.stringify(displayUrlWithTimestamp));
                } else {
                    console.log("FE DEBUG: Tidak menambahkan timestamp (URL default atau tidak valid):", JSON.stringify(finalImageUrl));
                }

                setProfileImageDisplay(displayUrlWithTimestamp);
                console.log("FE DEBUG: setProfileImageDisplay dipanggil dengan:", JSON.stringify(displayUrlWithTimestamp));

                const nameParts = updatedUser.name ? updatedUser.name.split(' ') : ['', ''];
                setFormData({
                    firstName: nameParts[0] || '',
                    lastName: nameParts.slice(1).join(' ') || '',
                    position: updatedUser.headline || (updatedUser.role === 'hr' ? (updatedUser.role_name || '') : ''),
                    email: updatedUser.email || '',
                    locationCity: updatedUser.city || '',
                    locationProvince: updatedUser.province || '',
                    companyName: updatedUser.company_name || '',
                });
            } else {
                setError(response.data.message || 'Gagal memperbarui profil.');
            }
        } catch (err) {
            // ... (error handling seperti sebelumnya)
            console.error('Error saving profile:', err);
            let errorMessage = 'Terjadi kesalahan saat menyimpan profil.';
            if (err.response) {
                console.error('Backend Error Response Data:', err.response.data);
                if (err.response.data?.errors) {
                    const errors = err.response.data.errors;
                    const firstErrorKey = Object.keys(errors)[0];
                    if (firstErrorKey && errors[firstErrorKey].length > 0) {
                        errorMessage = errors[firstErrorKey][0];
                    }
                } else if (err.response.data?.message) {
                    errorMessage = err.response.data.message;
                } else {
                    errorMessage = `Error ${err.response.status}: ${err.response.statusText}`;
                }
            } else if (err.request) {
                errorMessage = 'Tidak ada respons dari server.';
            } else {
                errorMessage = `Terjadi kesalahan: ${err.message}`;
            }
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    if (!currentUser) {
        return <div className="text-center p-10">Memuat data...</div>;
    }

    return (
        <div id='profil-edit' className="min-h-[calc(100vh-var(--navbar-height,64px)-var(--footer-height,56px))] bg-gray-100 flex items-center justify-center p-4 py-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-xl bg-white rounded-xl shadow-lg overflow-hidden"
            >
                <div className="relative bg-blue-500 h-32 rounded-t-xl">
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                        <div className="relative">
                            <motion.img
                                key={profileImageDisplay} // PENTING untuk re-render
                                src={profileImageDisplay}
                                alt="Profile"
                                className="w-32 h-32 rounded-full border-4 border-white object-cover"
                                whileHover={{ scale: 1.05 }}
                                onError={(e) => {
                                    console.error(`FE: Gagal memuat gambar dari src: '${e.target.src}'. Kembali ke avatar default.`);
                                    if (profileImageDisplay !== DefaultAvatar) {
                                        setProfileImageDisplay(DefaultAvatar);
                                    }
                                }}
                            />
                            <label htmlFor="imageUpload" className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-gray-100" title="Ubah foto profil">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 0011.586 3H8.414a1 1 0 00-.707.293L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                            </label>
                            <input type="file" id="imageUpload" className="hidden" accept="image/jpeg, image/png, image/jpg" onChange={handleImageUpload} />
                        </div>
                    </div>
                </div>
                <div className="pt-20 px-6 pb-6">
                    {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}
                    {successMessage && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">{successMessage}</div>}
                    <motion.form onSubmit={(e) => { e.preventDefault(); handleSave(); }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Informasi Dasar</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">Nama Depan <span className="text-red-500">*</span></label>
                                <input id="firstName" type="text" name="firstName" placeholder="Masukkan nama depan" value={formData.firstName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                            <div>
                                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Nama Belakang <span className="text-red-500">*</span></label>
                                <input id="lastName" type="text" name="lastName" placeholder="Masukkan nama belakang" value={formData.lastName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">{currentUser?.role === 'hr' ? 'Jabatan di Perusahaan' : 'Posisi / Headline'}</label>
                            <input id="position" type="text" name="position" placeholder={currentUser?.role === 'hr' ? 'Contoh: HR Manager' : 'Contoh: UI/UX Designer'} value={formData.position} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        {currentUser?.role === 'hr' && (
                            <div className="mt-4">
                                <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Nama Perusahaan (tanpa 'PT')</label>
                                <input id="companyName" type="text" name="companyName" placeholder="Contoh: Shield Indonesia" value={formData.companyName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        )}
                    </motion.form>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Informasi Kontak</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input id="email" type="email" name="email" value={formData.email} readOnly className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none bg-gray-100 cursor-not-allowed" title="Email tidak dapat diubah" />
                            </div>
                            <div>
                                <label htmlFor="locationCity" className="block text-sm font-medium text-gray-700 mb-1">Kota</label>
                                <input id="locationCity" type="text" name="locationCity" placeholder="Contoh: Manado" value={formData.locationCity} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="locationProvince" className="block text-sm font-medium text-gray-700 mb-1">Provinsi</label>
                            <input id="locationProvince" type="text" name="locationProvince" placeholder="Contoh: Sulawesi Utara" value={formData.locationProvince} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                    </motion.div>
                    <motion.button onClick={handleSave} type="button" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} disabled={isLoading} className={`w-full mt-8 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors duration-150 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                        {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
                    </motion.button>
                </div>
            </motion.div>
        </div>
    );
};

export default ProfileEditPage;