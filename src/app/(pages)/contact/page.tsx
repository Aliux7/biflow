import Contact from "@/app/components/contact/Contact";
import Footer from "@/app/components/footer/Footer";
import Header from "@/app/components/header/Header";
import React from "react";
import '../../globals.css'

const page = () => {
  return (
    <>
      <Header/>
        <main>
          <Contact/>
        </main>
      <Footer/>
    </>
  );
};

export default page;
