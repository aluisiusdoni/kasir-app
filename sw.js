/* ============================================================
 *  SERVICE WORKER — "pembantu latar belakang" PWA
 *  Tugasnya: simpan bekas app (halaman ini + ikon) dalam tablet,
 *  supaya app tetap boleh dibuka & tunjuk mesej "Tiada internet"
 *  walaupun WiFi putus. Kasir sebenar (Apps Script) TIDAK disimpan.
 *
 *  Kalau ubah index.html, naikkan nombor VERSI di bawah (v1 → v2)
 *  supaya tablet ambil versi baru.
 * ============================================================ */
const VERSI = 'gm-kasir-v1';
const FAIL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png', './apple-touch-icon.png'];

// Pasang: simpan fail bekas app
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSI).then(c => c.addAll(FAIL)).then(() => self.skipWaiting()));
});

// Aktif: buang simpanan versi lama
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSI).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Ambil fail: cuba internet dulu; kalau gagal, guna simpanan
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return; // kasir Google: biar terus ke internet
  e.respondWith(
    fetch(e.request)
      .then(res => { const copy = res.clone(); caches.open(VERSI).then(c => c.put(e.request, copy)); return res; })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html')))
  );
});
