import React from 'react';
import ProfileCard from "./ProfileCard";
import Cobie from '../../../assets/Cobie.jpeg';

export default function AdminProfilePage() {
  // Admin profile configuration
  const adminConfig = {
    name: "Cobie Smulders",
    location: "Jakarta, DKI Jakarta",
    role: "HRD PT Shield",
    imageUrl: Cobie
  };

  return (
    <>
      <ProfileCard
        name={adminConfig.name}
        location={adminConfig.location}
        role={adminConfig.role}
        imageUrl={adminConfig.imageUrl}
      />
    </>
  );
}