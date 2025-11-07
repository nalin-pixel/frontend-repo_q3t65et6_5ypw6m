import React from 'react';
import { GraduationCap, FileCheck2, ShieldCheck } from 'lucide-react';

const HeaderBrand = () => {
  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-sky-400 opacity-90" />
      <div className="relative max-w-6xl mx-auto px-6 py-12 text-white">
        <div className="flex items-center gap-4">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center ring-1 ring-white/20">
            <GraduationCap className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-white/80">Politeknik Negeri Lampung</p>
            <h1 className="text-2xl sm:text-3xl font-bold">EPIC Test Registration Portal</h1>
          </div>
        </div>

        <p className="mt-4 text-white/90 max-w-3xl">
          Portal pendaftaran dan manajemen tes EPIC berbasis web. Daftar dengan NPM, unggah bukti
          pembayaran QRIS, pantau riwayat tes, dan unduh sertifikat kelulusan. Admin dapat memverifikasi
          pembayaran serta input hasil tes.
        </p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur ring-1 ring-white/20">
            <div className="flex items-center gap-2 text-white font-medium">
              <ShieldCheck className="w-5 h-5" />
              Verifikasi Manual Admin
            </div>
            <p className="text-white/80 text-sm mt-1">Keamanan data dan kontrol penuh.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur ring-1 ring-white/20">
            <div className="flex items-center gap-2 text-white font-medium">
              <FileCheck2 className="w-5 h-5" />
              Sertifikat PDF Otomatis
            </div>
            <p className="text-white/80 text-sm mt-1">Unduh setelah dinyatakan lulus.</p>
          </div>
          <div className="p-4 rounded-xl bg-white/10 backdrop-blur ring-1 ring-white/20">
            <div className="flex items-center gap-2 text-white font-medium">
              <GraduationCap className="w-5 h-5" />
              Riwayat Tes Berkelanjutan
            </div>
            <p className="text-white/80 text-sm mt-1">Tes 1, 2, 3 dan seterusnya.</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderBrand;
