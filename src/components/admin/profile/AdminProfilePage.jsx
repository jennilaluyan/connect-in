// L:\money-money\Web\Never Surrender\connect-in\src\components\admin\profile\AdminProfilePage.jsx
import React, { useEffect, useState } from 'react';
import ProfileCard from "./ProfileCard";
import { getUser } from '../../../utils/auth';
import DefaultProfilePic from '../../../assets/Default.jpg';
import { useLocation } from 'react-router-dom';

export default function AdminProfilePage() {
  const location = useLocation();
  const [adminConfig, setAdminConfig] = useState({
    name: "Loading...",
    location: "Loading...",
    role: "Loading...",
    imageUrl: DefaultProfilePic,
    isAdmin: true,
  });

  useEffect(() => {
    const currentUser = getUser();

    if (currentUser) {
      let roleDisplay = currentUser.role_name || (currentUser.role === 'hr' ? 'HR Department' : 'Admin');
      if (currentUser.role === 'hr' && currentUser.company_name) {
        roleDisplay = `${roleDisplay} PT ${currentUser.company_name}`;
      }

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

      setAdminConfig({
        name: currentUser.name || "Nama Admin Belum Diatur",
        location: locationDisplay,
        role: roleDisplay,
        imageUrl: imageUrl, // Gunakan URL yang sudah diperbaiki
        isAdmin: true,
      });
    } else {
      // navigate('/masuk'); // Jika diperlukan
    }
  }, [location]);

  return (
    <>
      <ProfileCard
        name={adminConfig.name}
        location={adminConfig.location}
        role={adminConfig.role}
        imageUrl={adminConfig.imageUrl}
        isAdmin={adminConfig.isAdmin}
      />
    </>
  );
}