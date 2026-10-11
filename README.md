# GM Kasir — PWA

Bekas (wrapper) PWA untuk kasir Gudeg Menoreh. Kasir sebenar berjalan di Google Apps Script;
repo ini hanya berisi ikon, nama app dan halaman yang memaparkan kasir dalam skrin penuh.

**Tiada token, tiada kod kasir, tiada data jualan di sini.** Staf tetap perlu PIN untuk masuk.

| Fail | Guna |
|---|---|
| index.html | Halaman app. Tetapan satu sahaja: `KASIR_URL` (link …/exec) |
| manifest.json | Kad pengenalan app: nama, warna, ikon |
| sw.js | Service worker — app boleh dibuka & tunjuk "Tiada internet" bila offline |
| icon-*.png, apple-touch-icon.png | Ikon app (logo original GM) |

Kalau ubah index.html, naikkan `VERSI` dalam sw.js (contoh `gm-kasir-v2`).
