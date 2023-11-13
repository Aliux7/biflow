import React from 'react';
import product from '../../assets/about/product.png';
import bottle from '../../assets/about/bottle.png';
import Image from 'next/image';

const About = () => {
  const title = 'About BiFlow';
  const heading1 = 'What is BiFlow?';
  const description1 =
    'Biflow is an online platform that allows you to send flower anonymously. It is designed to help people express their feelings through the beauty of flowers, without revealing their identity. The service includes a variety of flower in different colors and styles. Each flower comes with a customized bottled text, which contains a "secret hand sign" from the sender, adding an element of intrigue and fun. The goal of Biflow is to assist in sharing happiness and help people deliver their feelings in a mysterious yet romantic way.';
  const heading2 = 'Why Choose Biflow?';
  const description2 =
    'Anonymity: At Biflow, we understand the beauty of mystery. Our service allows you to express your feelings through flowers while maintaining your anonymity. Customization: Each of our flowers comes with a customized bottled text, adding a personal touch to your gift. This small detail can create a lasting impression and memory for the receiver. Express Feelings: Biflow is not just about sending flowers; it’s about sharing happiness and encouraging people to express their feelings. Whether it’s love, gratitude, or friendship, we help you convey your emotions in a unique and memorable way.Fun and Intrigue: The inclusion of a “secret hand sign” in the bottled text adds an element of fun and intrigue. It’s not just about receiving flowers; it’s about guessing who the sender might be!';
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
