import { useState } from 'react';

export default function PostingPekerjaan() {
  const [formData, setFormData] = useState({
    position: '',
    company: '',
    location: '',
    jobType: '',
    minSalary: '',
    maxSalary: '',
    description: ''
  });

  const [logo, setLogo] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setLogo(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
    console.log('Logo:', logo);
    // Here you would typically send the data to your backend
  };

  return (
    <>
      <div id='postingPekerjaan' className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Posting Pekerjaan</h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="position" className="block text-lg font-medium mb-2">
              Posisi pekerjaan
            </label>
            <input
              type="text"
              id="position"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="logo" className="block text-lg font-medium mb-2">
                Logo Perusahaan
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center">
                <input
                  type="file"
                  id="logo"
                  name="logo"
                  onChange={handleLogoChange}
                  className="hidden"
                  accept="image/*"
                />
                <label htmlFor="logo" className="cursor-pointer text-center">
                  <div className="text-blue-500 mb-2 flex justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <span className="text-sm text-gray-500">Unggah gambar (klik atau drop files)</span>
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="company" className="block text-lg font-medium mb-2">
                Perusahaan
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="location" className="block text-lg font-medium mb-2">
                Lokasi Pekerjaan
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="jobType" className="block text-lg font-medium mb-2">
                Tipe Pekerjaan
              </label>
              <input
                type="text"
                id="jobType"
                name="jobType"
                value={formData.jobType}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2">
              Gaji
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="minSalary" className="block text-sm mb-1">
                  Minimal
                </label>
                <input
                  type="text"
                  id="minSalary"
                  name="minSalary"
                  value={formData.minSalary}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="maxSalary" className="block text-sm mb-1">
                  Maximal
                </label>
                <input
                  type="text"
                  id="maxSalary"
                  name="maxSalary"
                  value={formData.maxSalary}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="description" className="block text-lg font-medium mb-2">
              Deskripsi
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="10"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-md transition duration-300"
            >
              Posting Pekerjaan
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

