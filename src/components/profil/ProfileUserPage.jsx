// L:\money-money\Web\Never Surrender\connect-in\src\components\profil\ProfileUserPage.jsx
import React, { useEffect, useState } from 'react';
import ProfileCard from "../admin/profile/ProfileCard";
import { getUser } from '../../utils/auth';
import DefaultProfilePic from '../../assets/Default.jpg';
import { useLocation } from 'react-router-dom';

function ProfileUserPage() {
  const location = useLocation();
  const [userConfig, setUserConfig] = useState({
    name: "Loading...",
    location: "Loading...",
    role: "Loading...",
    imageUrl: DefaultProfilePic,
    isAdmin: false,
  });

  useEffect(() => {
    const currentUser = getUser();

    if (currentUser) {
      let roleDisplay = currentUser.headline || currentUser.role_name || 'Pengguna Terdaftar';

      let locationDisplay = 'Lokasi Belum Diatur';
      if (currentUser.city && currentUser.province) {
        locationDisplay = `${currentUser.city}, ${currentUser.province}`;
      } else if (currentUser.city) {
        locationDisplay = currentUser.city;
      } else if (currentUser.province) {
        locationDisplay = currentUser.province;
      }

      // --- LOGIKA PERBAIKAN URL DIMULAI ---
      let imageUrl = DefaultProfilePic;
      if (currentUser.avatar_img_url && typeof currentUser.avatar_img_url === 'string') {
        const pathDariBackend = currentUser.avatar_img_url.trim();

        if (pathDariBackend.includes('storage/')) {
          const baseUrl = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
          const relativePath = pathDariBackend.startsWith('/') ? pathDariBackend.substring(1) : pathDariBackend;
          imageUrl = `${baseUrl}/${relativePath}`;
        } else if (pathDariBackend.startsWith('http')) {
          imageUrl = pathDariBackend;
        }
      }
      // --- LOGIKA PERBAIKAN URL SELESAI ---

      setUserConfig({
        name: currentUser.name || "Nama Pengguna Belum Diatur",
        location: locationDisplay,
        role: roleDisplay,
        imageUrl: imageUrl, // Gunakan URL yang sudah diperbaiki
        isAdmin: false,
      });
    } else {
      // navigate('/masuk'); // Jika diperlukan
    }
  }, [location]);

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