import React from 'react';
import ProfileCard from "./ProfileCard";
import Cobie from '../../../assets/Cobie.jpeg';

function AdminProfilePage() {
  // Admin profile configuration
  const adminConfig = {
    name: "Cobie Smulders",
    location: "Jakarta, DKI Jakarta",
    role: "HRD PT Shield",
    imageUrl: Cobie
  };

  return (
    <>
      <NavbarAdmin />
      <ProfileCard
        name={adminConfig.name}
        location={adminConfig.location}
        role={adminConfig.role}
        imageUrl={adminConfig.imageUrl}
      />
    </>
  );
}

export default AdminProfilePage;