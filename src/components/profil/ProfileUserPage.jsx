// L:\money-money\Web\Never Surrender\connect-in\src\components\profil\ProfileUserPage.jsx
import React, { useEffect, useState } from 'react';
import ProfileCard from "../admin/profile/ProfileCard";
import { getUser } from '../../utils/auth';
import DefaultProfilePic from '../../assets/Default.jpg';
import { useLocation } from 'react-router-dom'; // 1. IMPORT useLocation

function ProfileUserPage() {
  const location = useLocation(); // 2. DAPATKAN objek location
  const [userConfig, setUserConfig] = useState({
    name: "Loading...",
    location: "Loading...",
    role: "Loading...",
    imageUrl: DefaultProfilePic,
    isAdmin: false,
  });

  useEffect(() => {
    console.log('ProfileUserPage: useEffect berjalan, path:', location.pathname);
    const currentUser = getUser();
    console.log('ProfileUserPage: currentUser dari getUser():', currentUser);

    if (currentUser) {
      let roleDisplay = currentUser.headline || currentUser.role_name || (currentUser.role === 'user' ? 'Pengguna Terdaftar' : 'Peran Belum Diatur');

      let locationDisplay = 'Lokasi Belum Diatur';
      if (currentUser.city && currentUser.province) {
        locationDisplay = `${currentUser.city}, ${currentUser.province}`;
      } else if (currentUser.city) {
        locationDisplay = currentUser.city;
      } else if (currentUser.province) {
        locationDisplay = currentUser.province;
      }

      let imageUrl = DefaultProfilePic;
      if (currentUser.avatar_img_url) {
        let cleanedUrl = currentUser.avatar_img_url;
        if (typeof cleanedUrl === 'string') {
          cleanedUrl = cleanedUrl.replace(/\u200B/g, '').trim().replace(/^"|"$/g, ''); // Sanitasi
        }
        if (typeof cleanedUrl === 'string' && cleanedUrl.startsWith('storage')) {
          imageUrl = `${import.meta.env.VITE_API_BASE_URL}${cleanedUrl}`;
        } else if (typeof cleanedUrl === 'string' && cleanedUrl.startsWith('http')) {
          imageUrl = cleanedUrl;
        }
        console.log("ProfileUserPage: Final imageUrl for display:", imageUrl);
      }


      setUserConfig({
        name: currentUser.name || "Nama Pengguna Belum Diatur",
        location: locationDisplay,
        role: roleDisplay,
        imageUrl: imageUrl, // Gunakan URL yang sudah diproses
        isAdmin: false,
      });
    } else {
      console.log("ProfileUserPage: Tidak ada currentUser, mungkin perlu redirect ke login.");
      // navigate('/masuk'); // Jika diperlukan
    }
  }, [location]); // 3. TAMBAHKAN location sebagai dependency

  return (
    <>
      <ProfileCard
        name={userConfig.name}
        location={userConfig.location}
        role={userConfig.role}
        imageUrl={userConfig.imageUrl}
        isAdmin={userConfig.isAdmin}
      />
    </>
  );
}

export default ProfileUserPage;