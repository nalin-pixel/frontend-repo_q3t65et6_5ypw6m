import React, { useEffect, useState } from 'react';
import { Clock, CheckCircle2, XCircle } from 'lucide-react';

const StatusBadge = ({ status }) => {
  const map = {
    pending: 'bg-yellow-50 text-yellow-700 ring-yellow-200',
    approved: 'bg-green-50 text-green-700 ring-green-200',
    rejected: 'bg-red-50 text-red-700 ring-red-200',
    pass: 'bg-green-50 text-green-700 ring-green-200',
    fail: 'bg-red-50 text-red-700 ring-red-200',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ring-1 ${map[status] || 'bg-gray-50 text-gray-700 ring-gray-200'}`}>
      {status}
    </span>
  );
};

const StudentDashboard = () => {
  const [npm, setNpm] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHistory = async () => {
    if (!npm) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL || ''}/students/${npm}/history`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.detail || 'Gagal memuat riwayat');
      setHistory(data?.tests || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // no auto fetch
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <div className="p-6 rounded-xl bg-white shadow-sm ring-1 ring-black/5">
        <div className="flex flex-col sm:flex-row sm:items-end gap-3">
          <div className="grow">
            <label className="block text-sm font-medium text-gray-700">Cari Riwayat Tes berdasarkan NPM</label>
            <input value={npm} onChange={(e) => setNpm(e.target.value)} placeholder="Masukkan NPM"
                   className="mt-1 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500" />
          </div>
          <button onClick={fetchHistory} className="px-4 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700">Lihat Riwayat</button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2 pr-4">Attempt</th>
                <th className="py-2 pr-4">Nilai</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Tanggal</th>
                <th className="py-2 pr-4">Sertifikat</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr><td colSpan={5} className="py-6 text-center text-gray-500"><Clock className="inline w-4 h-4 mr-1"/> Memuat...</td></tr>
              )}
              {!loading && history.length === 0 && (
                <tr><td colSpan={5} className="py-6 text-center text-gray-500">Belum ada data</td></tr>
              )}
              {!loading && history.map((t) => (
                <tr key={t.attempt} className="border-t">
                  <td className="py-2 pr-4">Tes {t.attempt}</td>
                  <td className="py-2 pr-4">{t.score ?? '-'}</td>
                  <td className="py-2 pr-4"><StatusBadge status={t.status} /></td>
                  <td className="py-2 pr-4">{t.taken_at ? new Date(t.taken_at).toLocaleString() : '-'}</td>
                  <td className="py-2 pr-4">
                    {t.status === 'pass' && t.certificate_url ? (
                      <a href={t.certificate_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">Unduh PDF</a>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
        </div>
      </div>
    </section>
  );
};

export default StudentDashboard;
