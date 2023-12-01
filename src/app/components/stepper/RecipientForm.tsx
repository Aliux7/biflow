'use client';
import React, { useState, useEffect } from 'react';
import { fireStore } from '../../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { getPickupLinesData, getRandomElement } from '@/app/utils/data';
import { Paintable } from '../Paintable/Paintable';
import TimeTable from './TimeTable';

export default function RecipientForm({
  formData,
  agreed,
  setAgreed,
  selectedAddonIds,
  handleInputChange,
  errors,
}: any) {
  return (
    <div>
      {selectedAddonIds.includes('delivery') && (
        <div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full mx-2 flex-1 svelte-1l8159u">
              <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                Recipient Name<span className="text-red-500"> *</span>
              </div>
              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                <input
                  type="text"
                  name="recipient_name"
                  id="recipient_name"
                  placeholder="John Doe"
                  value={formData.recipient_name}
                  onChange={handleInputChange}
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-pink-600 focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="text-red-500 text-xs mt-1">
            {errors.recipient_name}
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="w-full mx-2 flex-1 svelte-1l8159u">
              <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                Recipient Phone Number<span className="text-red-500"> *</span>
              </div>
              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                <input
                  type="text"
                  name="recipient_phone"
                  id="recipient_phone"
                  placeholder="08XXXXXXXXXX"
                  value={formData.recipient_phone}
                  onChange={handleInputChange}
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-pink-600 focus:shadow-md"
                />
              </div>
            </div>
            <div className="w-full mx-2 flex-1 svelte-1l8159u">
              <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
                Recipient Class Room<span className="text-red-500"> *</span>
              </div>
              <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
                <input
                  type="text"
                  name="recipient_class"
                  id="recipient_class"
                  placeholder="A1305"
                  value={formData.recipient_class}
                  onChange={handleInputChange}
                  className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-pink-600 focus:shadow-md"
                />
              </div>
            </div>
          </div>
          <div className="text-red-500 text-xs mt-1">
            {errors.recipient_phoneAndRoom}
          </div>
        </div>
      )}
      <div className="inline-flex items-center">
        <label className="relative flex cursor-pointer items-center rounded-full p-3">
          <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-400 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
          />
          <div className="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
        </label>
        <label
          className="mt-px cursor-pointer select-none font-light text-gray-700"
          htmlFor="agree"
        >
          I agree to the{' '}
          <a
            href="/terms_conditions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500"
          >
            terms and conditions
          </a>
        </label>
      </div>
    </div>
  );
}
