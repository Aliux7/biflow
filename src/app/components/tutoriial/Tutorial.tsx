import React from 'react';
import HowTo from '../../assets/about/how-it-works.webp';
import Image from 'next/image';

const Tutorial = () => {
  return (
    <section className={`mb-10`} id="tutorial">
      <h1 className="text-5xl font-semibold text-black lg:text-5xl font-handwritten text-center mb-10">
        How it <span className="text-pink-500">Works</span>
      </h1>
      <Image className="px-4 md:px-20" alt="how it works" src={HowTo}></Image>
    </section>
  );
};

export default Tutorial;
