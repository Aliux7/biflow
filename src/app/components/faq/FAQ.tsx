'use client';
import React, { useState } from 'react';

const FAQ = () => {
  const faqItems = [
    {
      question: 'How can I pay for my appointment ?',
      answer:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni, eum quae. Harum officiis reprehenderit ex quia ducimus minima id provident molestias optio nam vel, quidem iure voluptatem, repellat et ipsa.',
    },
    {
      question: 'What can I expect at my first consultation ?',
      answer: 'Answer 2',
    },
    {
      question: 'What are your opening hours ?',
      answer: 'Answer 3',
    },
    {
      question: 'Do I need a referral ?',
      answer: 'Answer 4',
    },
    {
      question:
        'Is the cost of the appointment covered by private health insurance ?',
      answer: 'Answer 5',
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
