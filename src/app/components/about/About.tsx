import React from 'react';
import product from '../../assets/about/product.jpg';
import bottle from '../../assets/about/bottle.jpg';
import Image from 'next/image';

const About = () => {
  const title = 'About BiFlow';
  const heading1 = 'What is BiFlow?';
  const description1 =
    'We are platform that allow customers to send our products anonymously to someone by providing the details of the targeted person. While our product itself is in the form of “Flower” with a different variance and different colors.';
  const heading2 = 'Why us?';
  const description2 =
    'The touch of a costumized bottled text which could create a long lasting impression and memory.';
  return (
    <section className={`bg-background py-8`} id="about">
      <div className={`max-w-5xl mx-auto m-8`}>
        <h1
          className={`w-full my-2 text-5xl font-bold leading-tight text-center text-black font-handwritten`}
        >
          {title.split(' ').map((word, index) => (
            <span
              key={index}
              className={index % 2 ? 'text-pink-500' : 'text-border'}
            >
              {word}{' '}
            </span>
          ))}
        </h1>
        <div className={`flex flex-wrap`}>
          <div className={`w-5/6 sm:w-1/2 p-6`}>
            <h3
              className={`text-3xl text-gray-800 font-bold leading-none mb-3`}
            >
              {heading1}
            </h3>
            <p className={`text-gray-600`}>{description1}</p>
          </div>
          <div className={`w-full sm:w-1/2 sm:p-6`}>
            <Image className="h-6/6" src={product} alt="title" />
          </div>
        </div>
        <div className={`flex flex-wrap flex-col-reverse sm:flex-row`}>
          <div className={`w-full sm:w-1/2 p-6`}>
            <Image className="h-6/6" src={bottle} alt="title" />
          </div>
          <div className={`w-full sm:w-1/2 p-6`}>
            <div className={`align-middle`}>
              <h3
                className={`text-3xl text-gray-800 font-bold leading-none mb-3`}
              >
                {heading2}
              </h3>
              <p className={`text-gray-600 mb-8`}>{description2}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
