import React, { useState } from 'react';
import uploadIcon from '../../assets/upload-icon.png'

const CVUploadModal = ({ isOpen, onClose, onSubmit }) => {
    const [file, setFile] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const handleSubmit = () => {
        if (file) {
            onSubmit(file);
        }
    };

    const handleClose = () => {
        setIsAnimating(true);
        setTimeout(() => {
            onClose();
            setIsAnimating(false);
        }, 300); // Match the animation duration
    };

    if (!isOpen && !isAnimating) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center modal-overlay 
            ${isOpen ? 'modal-open' : 'modal-close'}`}
        >
            <div
                className={`bg-white rounded-lg shadow-xl w-[700px] h-[500px] relative modal-content 
                ${isOpen ? 'modal-content-open' : 'modal-content-close'}`}
            >
                {/* Close button */}
                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Modal Content */}
                <div className="p-6 flex flex-col h-full">
                    <h2 className="text-xl font-bold mb-4 text-center">Masukkan CV</h2>

                    <div
                        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center 
                        hover:border-blue-500 transition-colors duration-300 flex-grow flex flex-col justify-center"
                    >
                        <div className="flex justify-center mb-4">
                            <img src={uploadIcon} alt="" />
                        </div>

                        <input
                            type="file"
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                            id="cv-upload"
                            onChange={handleFileChange}
                        />

                        <label
                            htmlFor="cv-upload"
                            className="cursor-pointer"
                        >
                            <p className="text-blue-500 font-medium">Unggah file atau tarik dan lepas</p>
                            <p className="text-sm text-gray-500 mt-2">PDF, DOC, DOCX (Max 5MB)</p>
                        </label>

                        {file && (
                            <div className="mt-4 p-2 bg-blue-50 rounded flex items-center justify-between">
                                <span className="text-sm truncate">{file.name}</span>
                                <button
                                    onClick={() => setFile(null)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex space-x-4">
                        <button
                            onClick={handleClose}
                            className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
                        >
                            Batalkan
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!file}
                            className={`flex-1 py-2 px-4 rounded ${file
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'bg-blue-300 text-white cursor-not-allowed'
                                }`}
                        >
                            Lamar Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CVUploadModal;