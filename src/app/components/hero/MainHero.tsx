'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import logoname from '../../assets/logo/logo-name.svg';
import Image from 'next/image';

const MainHero = () => {
  const router = useRouter();

  const handleOrderClick = () => {
    router.push('/shop');
  };

  const handleHistoryClick = () => {
    router.push('/history');
  };

  return (
    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
      <div className="sm:text-center lg:text-left">
        <h1 className="text-4xl sm:flex md:inline-block justify-center tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <Image alt="logo" className="h-16 w-auto" src={logoname} />
        </h1>
        <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
          the “Secret Flower Sender & Shop”, delivers anonymous, creating a
          unique, mysterious, and memorable experience for both the sender and
          receiver.
        </p>
        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
          <div className="rounded-md shadow">
            <button
              onClick={handleOrderClick}
              className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-500 hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
            >
              Order
            </button>
          </div>
          <div className="mt-3 sm:mt-0 sm:ml-3">
            <button
              onClick={handleHistoryClick}
              className={`w-full flex items-center justify-center px-8 py-3 border border-black text-base font-medium rounded-md border-primary text-black bg-white hover:bg-border hover:text-primary md:py-4 md:text-lg md:px-10`}
            >
              History
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainHero;
