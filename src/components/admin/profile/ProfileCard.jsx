import React from 'react';

const ProfileCard = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#F0F2F5] pt-10">
      
      {/* WRAPPER MAX WIDTH */}
      <div className="w-full max-w-2xl flex flex-col items-center">
        
        {/* HEADER: Biru & Putih nyambung */}
        <div className="relative w-full">
          {/* Bagian Biru */}
          <div className="bg-[#4A90E2] h-36 rounded-t-2xl"></div>

          {/* Bagian Putih */}
          <div className="bg-white h-36 w-full rounded-b-2xl"></div>

          {/* Foto profil di tengah */}
          <div className="absolute inset-x-0 top-16 flex justify-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Profile"
              className="w-40 h-40 rounded-full border-[6px] border-white object-cover shadow-md"
            />
          </div>
        </div>

       {/* CARD ISI KONTEN */}
        <div className="bg-white w-full h-80 rounded-2xl shadow-md px-8 py-8 mt-10 flex items-center">
        <div className="w-full flex justify-between items-start flex-wrap">
            <div>
            <h2 className="text-3xl font-bold text-black">Jhon Doe</h2>
            <p className="text-gray-500 mt-1">Manado, Sulawesi Utara</p>
            <a href="#" className="text-blue-500 hover:underline block mt-1">
                Informasi kontak
            </a>
            <p className="text-black font-medium mt-3">
                HRD PT Skripsi Jaya Jaya
            </p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md mt-4 sm:mt-0">
            Edit Profil
            </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
