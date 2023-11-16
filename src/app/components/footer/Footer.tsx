import React from 'react';
import logo from '../../assets/logo/logo.svg';
import Image from 'next/image';

const Footer = () => {
  return (
    <div id="about" className="mx-auto xl:px-20 lg:px-12 sm:px-6 px-4 py-12">
      <div className="flex flex-col items-center justify-center">
        <div>
          <Image src={logo} alt="BiFlow" className="w-16 h-16" />
        </div>
        <div className="flex flex-wrap sm:gap-10 gap-8 items-center justify-center mt-4 h-12">
          <a
            href="/"
            className="hover:text-pink-500 text-base cursor-pointer leading-4 text-gray-800 dark:text-gray-400 dark:hover:text-white"
          >
            Home
          </a>
          <a
            href="/shop"
            className="hover:text-pink-500 text-base cursor-pointer leading-4 text-gray-800 dark:text-gray-400 dark:hover:text-white"
          >
            Shop
          </a>
          <a
            href="/contact"
            className="hover:text-pink-500 text-base cursor-pointer leading-4 text-gray-800 dark:text-gray-400 dark:hover:text-white"
          >
            Contact
          </a>
          <a
            href="/history"
            className="hover:text-pink-500 text-base cursor-pointer leading-4 text-gray-800 dark:text-gray-400 dark:hover:text-white"
          >
            History
          </a>
        </div>
        <div className="flex items-center gap-x-8 mt-6 h-8">
          <a
            aria-label="instagram"
            href="https://www.instagram.com/biflow.id"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center"
          >
            <i className="uil uil-instagram-alt text-pink-500 text-3xl"></i>
            <span className="font-handwritten text-xl">@biflow.id</span>
          </a>
        </div>
        <div className="flex items-center mt-6">
          <p className="mt-6 text-xs lg:text-sm leading-none text-gray-900 dark:text-gray-500">
            &copy; {new Date().getFullYear()}, BiFlow.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
