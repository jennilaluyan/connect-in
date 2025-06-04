// L:\money-money\Web\Never Surrender\connect-in\src\components\admin\profile\AdminProfilePage.jsx
import React, { useEffect, useState } from 'react';
import ProfileCard from "./ProfileCard";
import { getUser } from '../../../utils/auth';
import DefaultProfilePic from '../../../assets/Default.jpg';
import { useLocation } from 'react-router-dom'; // 1. IMPORT useLocation

export default function AdminProfilePage() {
  const location = useLocation(); // 2. DAPATKAN objek location
  const [adminConfig, setAdminConfig] = useState({
    name: "Loading...",
    location: "Loading...",
    role: "Loading...",
    imageUrl: DefaultProfilePic,
    isAdmin: true,
  });

  useEffect(() => {
    console.log('AdminProfilePage: useEffect berjalan, path:', location.pathname);
    const currentUser = getUser();
    console.log('AdminProfilePage: currentUser dari getUser():', currentUser);

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

      let imageUrl = DefaultProfilePic;
      if (currentUser.avatar_img_url) {
        let cleanedUrl = currentUser.avatar_img_url;
        if (typeof cleanedUrl === 'string') {
          cleanedUrl = cleanedUrl.replace(/\u200B/g, '').trim().replace(/^"|"$/g, ''); // Sanitasi
        }
        if (typeof cleanedUrl === 'string' && cleanedUrl.startsWith('/storage')) {
          imageUrl = `${import.meta.env.VITE_API_BASE_URL}${cleanedUrl}`;
        } else if (typeof cleanedUrl === 'string' && cleanedUrl.startsWith('http')) {
          imageUrl = cleanedUrl;
        }
        console.log("AdminProfilePage: Final imageUrl for display:", imageUrl);
      }

      setAdminConfig({
        name: currentUser.name || "Nama Admin Belum Diatur",
        location: locationDisplay,
        role: roleDisplay,
        imageUrl: imageUrl, // Gunakan URL yang sudah diproses
        isAdmin: true,
      });
    } else {
      console.log("AdminProfilePage: Tidak ada currentUser, mungkin perlu redirect ke login.");
      // navigate('/masuk'); // Jika diperlukan
    }
  }, [location]); // 3. TAMBAHKAN location sebagai dependency

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