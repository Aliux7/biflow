import Image from 'next/image';
import React from 'react';
import heroimage from '../../assets/about/hero.webp';

const MainHeroImage = () => {
  return (
    <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
      <Image
        className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
        src={heroimage}
        alt="happy team image"
      />
    </div>
  );
};

export default MainHeroImage;
