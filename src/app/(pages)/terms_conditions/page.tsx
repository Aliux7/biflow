import Contact from '@/app/components/contact/Contact';
import Footer from '@/app/components/footer/Footer';
import Header from '@/app/components/header/Header';
import React from 'react';
import '../../globals.css';

const page = () => {
  return (
    <>
      <div className={`relative bg-white`}>
        <div className="max-w-7xl mx-auto">
          <div className={`relative z-10 bg-white lg:max-w-2xl lg:w-full`}>
            <Header />
          </div>
        </div>
      </div>
      <main className="max-w-screen-xl mx-auto gap-y-16 p-16">
        <h1 className="font-handwritten text-5xl text-center pb-4">
          Syarat dan Ketentuan Pembelian{' '}
          <span className="text-pink-500">BiFlow</span>
        </h1>

        <h2>Penerimaan Pesanan:</h2>
        <ul className="list-disc mb-4">
          <li>
            Kami menerima pesanan bunga secara daring maupun secara langsung.
          </li>
          <li>
            Kami menerima pesanan bunga dengan pengiriman dengan nama yang akan
            dirahasiakan.
          </li>
          <li>
            Pesanan dapat dilakukan melalui situs web kami, form maupun langsung
            di toko fisik atau booth kami.
          </li>
        </ul>

        <h2>Pembayaran:</h2>
        <ul className="list-disc mb-4">
          <li>Pembayaran pesanan harus dilakukan sebelum pengiriman.</li>
          <li>
            Kami menerima pembayaran melalui beberapa metode yaitu transfer
            bank, dan pembayaran tunai.
          </li>
        </ul>

        <h2>Harga:</h2>
        <ul className="list-disc mb-4">
          <li>
            Harga bunga dan layanan pengiriman akan tertera di situs web atau
            dapat disediakan oleh tim kami saat pemesanan.
          </li>
          <li>
            Harga dapat berubah tanpa pemberitahuan sebelumnya, tetapi harga
            yang dipesan akan tetap berlaku.
          </li>
        </ul>

        <h2>Pengiriman:</h2>
        <ul className="list-disc mb-4">
          <li>Pengiriman akan dilakukan sesuai dengan instruksi pelanggan.</li>
          <li>
            Kami tidak bertanggung jawab atas keterlambatan pengiriman yang
            disebabkan oleh keadaan tak terduga seperti kelainan jadwal, cuaca
            buruk, lalu lintas, atau masalah lain yang di luar kendali kami.
          </li>
        </ul>

        <h2>Privasi dan Rahasia:</h2>
        <ul className="list-disc mb-4">
          <li>
            Kami menghormati privasi pelanggan dan menjaga kerahasiaan pesanan
            pengiriman bunga rahasia.
          </li>
          <li>
            Informasi pelanggan akan dijaga kerahasiaannya dan tidak akan
            dibagikan kepada pihak ketiga tanpa izin pelanggan.
          </li>
        </ul>

        <h2>Kebijakan Pengembalian dan Penukaran:</h2>
        <ul className="list-disc mb-4">
          <li>
            Kami akan berusaha memberikan pelayanan terbaik, namun jika terdapat
            masalah dengan pesanan, kami akan segera menghubungi pembeli, dan
            pembeli dapat mengambil produk yang dipesan di toko atau booth kami.
          </li>
          <li>
            Kami akan mempertimbangkan penukaran variasi produk sesuai dengan
            kebijakan yang berlaku.
          </li>
        </ul>

        <h2>Penolakan Layanan:</h2>
        <ul className="list-disc mb-4">
          <li>
            Kami berhak menolak pesanan jika ada indikasi penyalahgunaan atau
            pelanggaran hukum.
          </li>
          <li>
            Kami berhak menolak pesanan jika ada indikasi penyalahgunaan
            identitas atau adanya tindakan stalking.
          </li>
          <li>
            Kami tidak akan melayani pesanan yang melanggar hukum setempat.
          </li>
        </ul>

        <h2>Perubahan Syarat dan Ketentuan:</h2>
        <ul className="list-disc mb-4">
          <li>
            Kami berhak untuk mengubah syarat dan ketentuan ini tanpa
            pemberitahuan sebelumnya.
          </li>
          <li>
            Perubahan akan diberlakukan sejak tanggal diumumkan di situs web
            kami.
          </li>
        </ul>

        <h2>Kontak:</h2>
        <ul className="list-disc mb-4">
          <li>
            Untuk pertanyaan atau komplain, silakan hubungi kami melalui
            informasi kontak yang tertera di situs web atau toko fisik kami.
          </li>
        </ul>
      </main>
      <Footer />
    </>
  );
};

export default page;
