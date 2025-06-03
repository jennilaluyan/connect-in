import { Routes, Route, Link, Navigate } from "react-router-dom";
import PekerjaanDiposting from "./PekerjaanDiposting";
import Pelamar from "./Pelamar";

const AkunPostingPekerjaan = () => {
  return (
    <div className="p-4">
      {/* Navbar / sidebar navigasi */}
      <nav className="mb-4">
        <Link to="/hr/pekerjaan-diposting" className="mr-4">
          Pekerjaan Diposting
        </Link>
        <Link to="pelamar">Pelamar</Link>
      </nav>

      {/* Area konten yang berubah */}
      <Routes>
        {/* Kalau path kosong, langsung redirect ke pekerjaan-diposting */}
        <Route index element={<Navigate to="/hr/pekerjaan-diposting" replace />} />

        <Route path="/hr/pekerjaan-diposting" element={<PekerjaanDiposting />} />
        <Route path="/hr/pelamar" element={<Pelamar />} />
      </Routes>
    </div>
  );
};

export default AkunPostingPekerjaan;
