// src/utils/auth.js

// Mengambil token dari localStorage
export const getToken = () => localStorage.getItem('token');

// Mengambil data user dari localStorage dan parse sebagai JSON
export const getUser = () => {
    const userString = localStorage.getItem('user');
    try {
        return userString ? JSON.parse(userString) : null;
    } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        return null;
    }
};

// Fungsi untuk menyimpan atau memperbarui data user di localStorage
export const setUser = (userData) => {
    if (userData) {
        // Pastikan semua field yang mungkin ada di-handle
        const userToStore = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            role_name: userData.role_name || (userData.role === 'hr' ? 'HR Department' : userData.role === 'user' ? 'User' : 'Super Admin'), // Fallback role_name
            is_hr_approved_by_sa: userData.is_hr_approved_by_sa,
            avatar_img: userData.avatar_img, // path asli dari backend
            avatar_img_url: userData.avatar_img_url, // URL lengkap dari backend
            company_name: userData.company_name,
            headline: userData.headline,
            city: userData.city,
            province: userData.province,
            // tambahkan field lain jika ada
        };
        localStorage.setItem('user', JSON.stringify(userToStore));
    } else {
        localStorage.removeItem('user');
    }
};


// Mengecek apakah pengguna sudah terautentikasi (ada token)
export const isAuthenticated = () => !!getToken();

// Fungsi Logout
export const logout = (navigate) => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (navigate) {
        navigate('/');
    } else {
        window.location.href = '/'; // Fallback jika navigate tidak tersedia
    }
};

// Mengecek apakah pengguna adalah Super Admin
export const isSuperAdmin = () => {
    const user = getUser();
    return isAuthenticated() && user && user.role === 'superadmin';
};

// Mengecek apakah pengguna adalah HR yang sudah diapprove
export const isApprovedHr = () => {
    const user = getUser();
    return isAuthenticated() && user && user.role === 'hr' && user.is_hr_approved_by_sa === true;
};

// Mengecek apakah pengguna adalah HR yang masih menunggu approval
export const isPendingHr = () => {
    const user = getUser();
    return isAuthenticated() && user && user.role === 'hr' && user.is_hr_approved_by_sa === false;
};

// Mengecek apakah pengguna adalah user biasa
export const isRegularUser = () => {
    const user = getUser();
    return isAuthenticated() && user && user.role === 'user';
};