'use client';
import React, { useState } from 'react';

const FAQ = () => {
  const faqItems = [
    {
      question: 'What is Biflow?',
      answer:
        'Biflow is an online platform that allows you to send flower bouquets anonymously. It’s a unique way to express your feelings through the beauty of flowers.',
    },
    {
      question: 'How does Biflow maintain anonymity?',
      answer:
        'When you choose to send a flower through Biflow, your identity remains hidden. The receiver gets a beautiful flower and a bottled text with a secret hand sign, but they won’t know who it’s from unless you choose to reveal yourself.',
    },
    {
      question: 'What is the “bottled text”?',
      answer:
        'The bottled text is a small, customized message that comes with each flower. It contains a secret hand sign from the sender, adding a personal touch and an element of intrigue to the gift.',
    },
    {
      question: 'What types of flowers can I send?',
      answer:
        'Biflow offers a wide range of flower bouquets in different colors and styles. You can choose the one that best expresses your feelings.',
    },
    {
      question: 'What if the recipient can’t guess who the flowers are from?',
      answer:
        'That’s part of the fun! The secret hand sign in the bottled text provides a clue, but it’s up to the receiver to guess who their secret admirer might be.',
    },
    {
      question: 'Can I reveal my identity later?',
      answer:
        'Absolutely! While Biflow provides a platform for anonymous gifting, the decision to reveal your identity at a later time is entirely up to you.',
    },
  ];

  const [openItemIndex, setOpenItemIndex] = useState(-1);

  const toggleAccordion = (index: number) => {
    if (openItemIndex === index) {
      // Clicking on the open item again will close it
      setOpenItemIndex(-1);
    } else {
      setOpenItemIndex(index);
    }
  };

  return (
    <section className="bg-white">
      <div className="px-4 sm:px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-black lg:text-5xl font-handwritten text-center">
          Frequently Asked <span className="text-pink-500">Questions</span>
        </h1>

        <hr className="my-6 border-gray-200" />

        <div>
          {faqItems.map((item, index) => (
            <div key={index}>
              <button
                className="flex items-center focus:outline-none"
                onClick={() => toggleAccordion(index)}
              >
                <svg
                  className={`flex-shrink-0 w-6 h-6 text-pink-500 ${
                    openItemIndex === index ? 'transform rotate-90' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 12H4"
                  ></path>
                </svg>

                <h1 className="mx-4 text-xl text-gray-700 text-left">
                  {item.question}
                </h1>
              </button>

              {openItemIndex === index && (
                <div className="flex mt-8 md:mx-10">
                  <span className="border border-pink-500"></span>

                  <p className="max-w-3xl px-4 text-gray-500">{item.answer}</p>
                </div>
              )}

              <hr className="my-8 border-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
