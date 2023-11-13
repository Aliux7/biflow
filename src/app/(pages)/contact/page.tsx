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
      <main>
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default page;
