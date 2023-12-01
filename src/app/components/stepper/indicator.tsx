'use client';
import React, { useState, useEffect } from 'react';

export default function Indicator({ step, changeStep }: any) {
  return (
    <div className="flex items-center">
      <div
        className={`flex items-center cursor-pointer relative ${
          step >= 1
            ? step == 1
              ? 'text-white'
              : 'text-pink-600'
            : 'text-gray-500'
        }`}
        onClick={() => changeStep(1)}
      >
        <div
          className={`flex items-center justify-center rounded-full transition duration-100 ease-in-out h-12 w-12 py-3 border-2 ${
            step == 1 ? 'bg-pink-600' : ''
          } ${step >= 1 ? 'border-pink-600' : 'border-gray-300'}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
            />
          </svg>
        </div>
        <div
          className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
            step >= 1 ? 'text-pink-600' : 'text-gray-500'
          }`}
        >
          Product
        </div>
      </div>
      <div
        className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
          step >= 2 ? 'border-pink-600' : 'border-gray-300'
        }`}
      ></div>
      <div
        className={`flex cursor-pointer items-center relative ${
          step >= 2
            ? step == 2
              ? 'text-white'
              : 'text-pink-600'
            : 'text-gray-500'
        }`}
        onClick={() => changeStep(2)}
      >
        <div
          className={`flex items-center justify-center rounded-full transition duration-100 ease-in-out h-12 w-12 py-3 border-2 ${
            step == 2 ? 'bg-pink-600' : ''
          } ${step >= 2 ? 'border-pink-600' : 'border-gray-300'}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        </div>
        <div
          className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase ${
            step >= 2 ? 'text-pink-600' : 'text-gray-500'
          }`}
        >
          Details
        </div>
      </div>
      <div
        className={`flex-auto border-t-2 transition duration-500 ease-in-out border-gray-300  ${
          step >= 3 ? 'border-pink-600' : 'border-gray-300'
        }`}
      ></div>
      <div
        className={`flex cursor-pointer items-center relative ${
          step >= 3
            ? step == 3
              ? 'text-white'
              : 'text-pink-600'
            : 'text-gray-500'
        }`}
        onClick={() => changeStep(3)}
      >
        <div
          className={`flex items-center justify-center rounded-full transition duration-100 ease-in-out h-12 w-12 py-3 border-2 ${
            step == 3 ? 'bg-pink-600' : ''
          } ${step >= 3 ? 'border-pink-600' : 'border-gray-300'}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
            />
          </svg>
        </div>
        <div
          className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-xs font-medium uppercase text-gray-500 ${
            step >= 3 ? 'text-pink-600' : 'text-gray-500'
          }`}
        >
          Recipient
        </div>
      </div>
    </div>
  );
}
