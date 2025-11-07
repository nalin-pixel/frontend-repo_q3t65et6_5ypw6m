import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [pending, setPending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const loadPending = async () => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/admin/pending`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Gagal memuat data');
      setPending(data?.payments || []);
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPending();
  }, []);

  const verify = async (id, status) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/admin/verify/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Gagal memverifikasi');
      setMessage({ type: 'success', text: 'Status pembayaran diperbarui' });
      loadPending();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  const submitResult = async (npm, attempt, score, status) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/admin/result`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ npm, attempt, score, status }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Gagal menyimpan hasil');
      setMessage({ type: 'success', text: 'Hasil tes tersimpan' });
      loadPending();
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    }
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <div className="p-6 rounded-xl bg-white shadow-sm ring-1 ring-black/5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard Admin</h2>
          <button onClick={loadPending} className="px-3 py-2 rounded-lg bg-blue-600 text-white">Refresh</button>
        </div>
        <p className="text-gray-500 text-sm mt-1">Verifikasi pembayaran dan input hasil tes.</p>

        {message && (
          <div className={`mt-3 text-sm p-3 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {message.text}
          </div>
        )}

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2 pr-4">NPM</th>
                <th className="py-2 pr-4">Nama</th>
                <th className="py-2 pr-4">Email</th>
                <th className="py-2 pr-4">Bukti</th>
                <th className="py-2 pr-4">Verifikasi</th>
                <th className="py-2 pr-4">Input Hasil</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={6} className="py-6 text-center text-gray-500">Memuat...</td></tr>
              )}
              {!loading && pending.length === 0 && (
                <tr><td colSpan={6} className="py-6 text-center text-gray-500">Tidak ada pembayaran pending</td></tr>
              )}
              {!loading && pending.map((p) => (
                <tr key={p._id} className="border-t">
                  <td className="py-2 pr-4 font-medium">{p.npm}</td>
                  <td className="py-2 pr-4">{p.name}</td>
                  <td className="py-2 pr-4">{p.email}</td>
                  <td className="py-2 pr-4">
                    {p.file_url ? <a href={p.file_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Lihat</a> : '-'}
                  </td>
                  <td className="py-2 pr-4 space-x-2">
                    <button onClick={() => verify(p._id, 'approved')} className="px-2.5 py-1.5 rounded bg-green-600 text-white">Approve</button>
                    <button onClick={() => verify(p._id, 'rejected')} className="px-2.5 py-1.5 rounded bg-red-600 text-white">Reject</button>
                  </td>
                  <td className="py-2 pr-4">
                    <div className="flex items-center gap-2">
                      <input placeholder="Attempt" type="number" className="w-20 rounded border-gray-300" id={`att-${p._id}`} />
                      <input placeholder="Nilai" type="number" className="w-24 rounded border-gray-300" id={`score-${p._id}`} />
                      <select className="rounded border-gray-300" id={`status-${p._id}`}>
                        <option value="pass">Lulus</option>
                        <option value="fail">Tidak Lulus</option>
                      </select>
                      <button
                        onClick={() => {
                          const attempt = parseInt(document.getElementById(`att-${p._id}`).value || '1', 10);
                          const score = parseFloat(document.getElementById(`score-${p._id}`).value || '0');
                          const status = document.getElementById(`status-${p._id}`).value;
                          submitResult(p.npm, attempt, score, status);
                        }}
                        className="px-2.5 py-1.5 rounded bg-blue-600 text-white"
                      >Simpan</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
