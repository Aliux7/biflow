'use client';
import React, { useEffect, useState } from 'react';

const Contact = () => {
  const [animate, setAnimate] = useState(true);
  useEffect(() => {
    setAnimate(false);
  }, []);
  return (
    <section className="flex flex-col p-4 items-center px-4 md:px-0">
      <div className="mb-4">
        <h2 className="text-4xl font-semibold">
          <a
            href="/"
            className="font-handwritten text-black hover:text-gray-500"
          >
            Contact <span className="text-red-500">Us</span>
          </a>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className={`flex flex-col p-4 items-center justify-center w-full h-64 border border-red-500 rounded ${
            animate ? 'animate' : ''
          }`}
        >
          <i className="uil uil-whatsapp-alt text-pink-500 text-6xl"></i>
          <h3>Whatsapp</h3>
          <p>+62 8588 7530 911</p>
        </div>
        <div
          className={`flex flex-col p-4 items-center justify-center w-full h-64 border border-red-500 rounded ${
            animate ? 'animate' : ''
          }`}
        >
          <i className="uil uil-line text-pink-500 text-6xl"></i>
          <h3>Line</h3>
          <p>TBA</p>
        </div>
        <div
          className={`flex flex-col p-4 items-center justify-center w-full h-64 border border-red-500 rounded ${
            animate ? 'animate' : ''
          }`}
        >
          <i className="uil uil-instagram-alt text-pink-500 text-6xl"></i>
          <h3>Instagram</h3>
          <p>@binusflower</p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
