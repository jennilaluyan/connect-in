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
        // Hapus data user yang korup dari localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // Sebaiknya token juga dihapus jika data user korup
        return null;
    }
};

// Mengecek apakah pengguna sudah terautentikasi (ada token)
export const isAuthenticated = () => !!getToken();

// Fungsi Logout
export const logout = (navigate) => {
    // Opsional: Panggil API logout backend di sini jika perlu untuk invalidasi token di server
    // const token = getToken();
    // if (token) {
    //     axios.post('http://127.0.0.1:8000/api/logout', {}, {
    //         headers: { Authorization: `Bearer ${token}` }
    //     }).catch(error => console.error("Error calling backend logout:", error));
    // }

    localStorage.removeItem('token');
    localStorage.removeItem('user');
    if (navigate) {
        navigate('/'); // Arahkan ke halaman login setelah logout
    } else {
        // Jika navigate tidak tersedia, mungkin reload halaman untuk membersihkan state
        window.location.reload();
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