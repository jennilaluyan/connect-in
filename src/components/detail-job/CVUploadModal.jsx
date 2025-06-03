// src/components/detail-job/CVUploadModal.jsx
import React, { useState, useEffect } from 'react';
import uploadIcon from '../../assets/upload-icon.png'; // Pastikan path ini benar

const CVUploadModal = ({ isOpen, onClose, onSubmit, isSubmitting, submitMessage }) => {
    const [file, setFile] = useState(null);
    const [coverLetter, setCoverLetter] = useState(''); // State untuk cover letter
    const [isAnimating, setIsAnimating] = useState(false);
    const [internalSubmitMessage, setInternalSubmitMessage] = useState('');

    // Sinkronkan submitMessage dari prop ke state internal untuk ditampilkan
    useEffect(() => {
        setInternalSubmitMessage(submitMessage);
    }, [submitMessage]);

    // Reset state saat modal dibuka/ditutup
    useEffect(() => {
        if (isOpen) {
            setFile(null);
            setCoverLetter('');
            setInternalSubmitMessage(''); // Reset pesan internal saat modal dibuka
        }
    }, [isOpen]);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            // Validasi ukuran file (contoh: maks 5MB)
            if (selectedFile.size > 5 * 1024 * 1024) {
                setInternalSubmitMessage("Ukuran file CV tidak boleh lebih dari 5MB.");
                setFile(null); // Reset file jika terlalu besar
                return;
            }
            // Validasi tipe file
            const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowedTypes.includes(selectedFile.type)) {
                setInternalSubmitMessage("Format file CV harus PDF, DOC, atau DOCX.");
                setFile(null); // Reset file jika tipe tidak sesuai
                return;
            }
            setFile(selectedFile);
            setInternalSubmitMessage(''); // Bersihkan pesan error jika file valid
        }
    };

    const handleCoverLetterChange = (e) => {
        setCoverLetter(e.target.value);
    };

    const handleSubmit = () => {
        if (file && !isSubmitting) { // Hanya submit jika ada file dan tidak sedang submitting
            onSubmit(file, coverLetter); // Kirim file dan cover letter
        } else if (!file) {
            setInternalSubmitMessage("Silakan pilih file CV Anda terlebih dahulu.");
        }
    };

    const handleClose = () => {
        if (isSubmitting) return; // Jangan tutup jika sedang submit
        setIsAnimating(true);
        setTimeout(() => {
            onClose();
            setIsAnimating(false);
            setFile(null); // Reset file saat modal ditutup
            setCoverLetter('');
            setInternalSubmitMessage('');
        }, 300);
    };

    if (!isOpen && !isAnimating) return null;

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay 
            ${isOpen ? 'modal-open' : 'modal-close'}`}
        >
            <div
                className={`bg-white rounded-lg shadow-xl w-full max-w-lg relative modal-content 
                ${isOpen ? 'modal-content-open' : 'modal-content-close'}`}
            >
                <button
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                    aria-label="Close"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="p-6 flex flex-col">
                    <h2 className="text-xl font-semibold mb-6 text-center text-gray-800">Unggah CV untuk Melamar</h2>

                    {/* Area Upload CV */}
                    <div className="mb-4">
                        <label htmlFor="cv-upload" className="block text-sm font-medium text-gray-700 mb-1">File CV (PDF, DOC, DOCX - Max 5MB)</label>
                        <div
                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center 
                            hover:border-blue-500 transition-colors duration-300"
                        >
                            <div className="flex justify-center mb-3">
                                <img src={uploadIcon} alt="Upload" className="w-12 h-12" />
                            </div>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                className="hidden"
                                id="cv-upload"
                                onChange={handleFileChange}
                                disabled={isSubmitting}
                            />
                            <label
                                htmlFor="cv-upload"
                                className={`cursor-pointer ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                            >
                                <p className="text-blue-600 font-medium">
                                    {file ? "Ganti File" : "Unggah file atau tarik dan lepas"}
                                </p>
                                {!file && <p className="text-xs text-gray-500 mt-1">Pilih file CV Anda</p>}
                            </label>
                            {file && (
                                <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-700 truncate">
                                    {file.name}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Area Cover Letter (Opsional) */}
                    <div className="mb-6">
                        <label htmlFor="cover-letter" className="block text-sm font-medium text-gray-700 mb-1">
                            Surat Lamaran (Opsional)
                        </label>
                        <textarea
                            id="cover-letter"
                            rows="4"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Tuliskan pesan singkat atau ringkasan tentang diri Anda..."
                            value={coverLetter}
                            onChange={handleCoverLetterChange}
                            disabled={isSubmitting}
                        ></textarea>
                    </div>

                    {/* Pesan Submit */}
                    {internalSubmitMessage && (
                        <p className={`mb-4 text-sm p-3 rounded ${internalSubmitMessage.toLowerCase().includes("gagal") || internalSubmitMessage.toLowerCase().includes("error") ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                            {internalSubmitMessage}
                        </p>
                    )}


                    <div className="mt-auto flex space-x-3">
                        <button
                            onClick={handleClose}
                            disabled={isSubmitting}
                            className="flex-1 py-2.5 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors disabled:opacity-50"
                        >
                            Batal
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!file || isSubmitting}
                            className={`flex-1 py-2.5 px-4 rounded-md text-white transition-colors
                                ${!file || isSubmitting
                                    ? 'bg-blue-300 cursor-not-allowed'
                                    : 'bg-blue-600 hover:bg-blue-700'
                                }`}
                        >
                            {isSubmitting ? 'Mengirim...' : 'Lamar Sekarang'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CVUploadModal;
