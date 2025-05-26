import React from 'react';
import ProfileCard from "../admin/profile/ProfileCard";
import Anna from '../../assets/Anna.jpeg';

function ProfileUserPage() {
  // User profile configuration
  const userConfig = {
    name: "Anna Kendrick",
    location: "Manado, Sulawesi Utara",
    role: "UI/UX Designer",
    imageUrl: Anna
  };

  return (
    <>
      <ProfileCard
        name={userConfig.name}
        location={userConfig.location}
        role={userConfig.role}
        imageUrl={userConfig.imageUrl}
      />
    </>
  );
}

export default ProfileUserPage;