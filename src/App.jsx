import React from 'react';
import HeaderBrand from './components/HeaderBrand';
import RegistrationForm from './components/RegistrationForm';
import StudentDashboard from './components/StudentDashboard';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-gray-800">
      <HeaderBrand />
      <RegistrationForm />
      <StudentDashboard />
      <AdminDashboard />

      <footer className="border-t mt-10">
        <div className="max-w-6xl mx-auto px-6 py-8 text-sm text-gray-600">
          <p>
            Warna dan identitas menggunakan nuansa biru untuk menyesuaikan brand Politeknik Negeri Lampung.
            Aplikasi responsif dan mudah digunakan di perangkat mobile maupun desktop.
          </p>
          <div className="mt-4">
            <h4 className="font-medium text-gray-800">Flowchart Sederhana</h4>
            <pre className="mt-2 bg-white p-3 rounded-lg ring-1 ring-black/5 overflow-auto">
{`Mahasiswa -> Isi Form -> Unggah Bukti -> [Status: Pending]
Admin -> Verifikasi (Approve/Reject)
Jika Approve -> Mahasiswa mengikuti tes -> Admin input hasil (pass/fail + skor)
Jika pass -> Sistem menyediakan link download sertifikat PDF
Mahasiswa -> Dashboard -> Unduh Sertifikat`}
            </pre>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
