# Ruang Trader

Ruang Trader adalah platform komunitas trading dan penyedia signal (Crypto & Forex) eksklusif. Proyek ini mencakup Landing Page modern, sistem Autentikasi Mock, Integrasi Payment Gateway Xendit, dan Dashboard Member Area untuk mengakses modul edukasi.

## Fitur Utama

- **Landing Page Modern**: Desain elegan dengan tema gelap (*dark mode*), animasi scroll, floating icon, dan responsif.
- **Autentikasi (Mock)**: Simulasi sistem pendaftaran dan login menggunakan `localStorage` browser.
- **Payment Gateway Integration**: Terintegrasi dengan **Xendit** untuk memproses pembayaran paket berlangganan dengan metode pembayaran BCA, DANA, dan GoPay.
- **Dashboard Member Area**: Akses eksklusif bagi member yang telah melakukan pembayaran untuk membaca PDF Modul Edukasi menggunakan embedded viewer.
- **Navigasi Dinamis**: Tombol "Login/Daftar" akan otomatis berubah menjadi tombol "Dashboard" ketika user sedang login.

## Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3 (Vanilla), JavaScript (Vanilla)
- **Backend**: Node.js, Express.js
- **Payment**: Xendit API v2
- **Deployment**: Vercel

## Cara Menjalankan Secara Lokal

1. **Clone repositori ini:**
   ```bash
   git clone https://github.com/ardian-bahri/ruang-trader.git
   ```

2. **Masuk ke folder proyek:**
   ```bash
   cd ruang-trader
   ```

3. **Install dependensi:**
   ```bash
   npm install
   ```

4. **Konfigurasi Environment Variable:**
   Buat file `.env` di root folder dan tambahkan Xendit Secret Key Anda:
   ```env
   XENDIT_SECRET_KEY=kunci_rahasia_xendit_anda
   ```

5. **Jalankan server lokal:**
   ```bash
   node server.js
   ```

6. Buka `http://localhost:3000` di browser Anda.

## Alur Penggunaan

1. Kunjungi halaman utama (Landing Page).
2. Klik tombol "Sign Up" di navigasi atas atau tombol "Pilih Paket" untuk mendaftar akun baru (data disimpan di *local storage*).
3. Lakukan Login.
4. Klik tombol "Pilih Paket Basic/Premium". Anda akan diarahkan ke Xendit Invoice.
5. Setelah pembayaran disimulasikan berhasil, Anda akan dialihkan ke halaman **Dashboard**.
6. Di dalam Dashboard, status Anda berubah menjadi "Member Aktif" dan Anda bisa mengakses menu "Modul Edukasi".

## Catatan Penting

* Sistem autentikasi saat ini adalah *mockup* menggunakan `localStorage`. Untuk tahap produksi (*production*), sebaiknya diintegrasikan dengan layanan database sungguhan seperti Supabase, Firebase, atau database SQL/NoSQL.
* File modul PDF yang tersedia di dalam folder `assets/modules/` saat ini adalah file simulasi (*dummy*).
* File `vercel.json` sudah dikonfigurasi untuk *deploy* mulus di platform Vercel.

---
*© 2026 Ruang Trader. All Rights Reserved.*
