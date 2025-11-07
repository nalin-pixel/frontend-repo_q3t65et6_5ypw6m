import React, { useState } from 'react';

const initialForm = {
  npm: '',
  name: '',
  email: '',
  file: null,
};

const RegistrationForm = () => {
  const [form, setForm] = useState(initialForm);
  const [previewName, setPreviewName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file') {
      const f = files && files[0];
      setForm({ ...form, file: f || null });
      setPreviewName(f ? f.name : '');
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    try {
      const fd = new FormData();
      fd.append('npm', form.npm);
      fd.append('name', form.name);
      fd.append('email', form.email);
      if (form.file) fd.append('payment_proof', form.file);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/registrations`, {
        method: 'POST',
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Gagal mengirim data');
      setMessage({ type: 'success', text: 'Pendaftaran berhasil! Silakan cek dashboard riwayat tes.' });
      setForm(initialForm);
      setPreviewName('');
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-6 rounded-xl bg-white shadow-sm ring-1 ring-black/5">
          <h2 className="text-xl font-semibold text-gray-800">Registrasi Mahasiswa</h2>
          <p className="text-gray-500 text-sm mt-1">Masukkan NPM, nama, email, dan unggah bukti pembayaran QRIS.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">NPM</label>
              <input name="npm" value={form.npm} onChange={handleChange} required
                     className="mt-1 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama</label>
              <input name="name" value={form.name} onChange={handleChange} required
                     className="mt-1 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" name="email" value={form.email} onChange={handleChange} required
                     className="mt-1 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Bukti Pembayaran (JPG/PNG/PDF)</label>
              <input type="file" name="file" accept="image/*,application/pdf" onChange={handleChange} required
                     className="mt-1 w-full rounded-lg border border-dashed border-gray-300 p-2" />
              {previewName && (
                <p className="text-xs text-gray-500 mt-1">File: {previewName}</p>
              )}
            </div>
            <button type="submit" disabled={submitting}
                    className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:opacity-60">
              {submitting ? 'Mengirim...' : 'Daftar & Unggah'}
            </button>
            {message && (
              <div className={`text-sm p-3 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {message.text}
              </div>
            )}
          </form>
        </div>

        <div className="p-6 rounded-xl bg-gradient-to-br from-blue-50 to-sky-50 ring-1 ring-blue-100">
          <h3 className="text-lg font-semibold text-blue-900">Alur Singkat</h3>
          <ol className="mt-4 space-y-3 text-blue-900/80 text-sm list-decimal list-inside">
            <li>Isi data dan unggah bukti pembayaran QRIS.</li>
            <li>Tunggu verifikasi manual oleh admin.</li>
            <li>Jadwalkan/ikuti tes EPIC.</li>
            <li>Lihat hasil di dashboard. Jika lulus, unduh sertifikat PDF.</li>
          </ol>

          <div className="mt-6">
            <h4 className="text-sm font-medium text-blue-900">Contoh Struktur Database Sederhana</h4>
            <pre className="mt-2 text-xs bg-white/60 backdrop-blur p-3 rounded-lg ring-1 ring-blue-100 overflow-auto">
{`collections:
- student { npm, name, email, created_at }
- payment { npm, file_url, status: 'pending|approved|rejected', verified_by, verified_at }
- test { npm, attempt: number, score, status: 'pass|fail', taken_at }
- certificate { npm, attempt, pdf_url, issued_at }`}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationForm;
