'use client';
import React, { useState, useEffect } from 'react';
import { fireStore } from '../../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { getPickupLinesData, getRandomElement } from '@/app/utils/data';
import { Paintable } from '../Paintable/Paintable';
import TimeTable from './TimeTable';
import ToolTip from './ToolTip';

interface Addon {
  id: string;
  name: string;
  price: number;
}

export default function ProductForm({
  paintableRef,
  addons,
  setAddons,
  setSelectedAddonIds,
  selectedAddonIds,
  formData,
  handleInputChange,
  selectedOption,
  handleSelectChange,
  customInput,
  handleCustomInputChange,
  errors,
  imageResult,
  setImageResult,
}: any) {
  const [color, setColor] = useState('#ec4899');
  const [active, setActive] = useState(true);
  const [thickness, setThickness] = useState(5);
  const [useEraser, setUseEraser] = useState(false);
  const [paintableText, setPaintableText] = useState('');

  const handlePaintableInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaintableText(e.target.value);
  };

  const addText = () => {
    paintableRef.current?.addText(paintableText, '18px dancing script', color);
  };

  const randomText = () => {
    const text = getRandomElement(getPickupLinesData()).toString();
    setPaintableText(text);
    paintableRef.current?.addText(text, '18px dancing script', color);
  };

  // Fetch addons data from Firestore
  useEffect(() => {
    const fetchAddons = async () => {
      const addonsCollection = collection(fireStore, 'addons');
      const addonsSnapshot = await getDocs(addonsCollection);
      const addonsid: String[] = [];

      const addonsData: Addon[] = [];
      addonsSnapshot.forEach((doc) => {
        addonsData.push({ id: doc.id, ...doc.data() } as Addon);
        addonsid.push(doc.id);
      });

      // setSelectedAddonIds(addonsid);
      setAddons(addonsData);
    };

    fetchAddons();
  }, []);

  const handleAddonCheckboxChange = (addonId: string) => {
    setSelectedAddonIds((prevSelectedAddonIds: String[]) => {
      if (prevSelectedAddonIds.includes(addonId)) {
        // Remove the addonId if it's already selected
        return prevSelectedAddonIds.filter((id) => id !== addonId);
      } else {
        // Add the addonId if it's not selected
        return [...prevSelectedAddonIds, addonId];
      }
    });
  };

  const renderAddonCheckboxes = () => {
    return addons.map((addon: Addon) => (
      <div key={addon.id}>
        <div className="inline-flex items-center">
          <label
            className="relative flex cursor-pointer items-center rounded-full p-3"
            htmlFor={addon.id}
            data-ripple-dark="true"
          >
            <input
              type="checkbox"
              id={addon.id}
              checked={selectedAddonIds.includes(addon.id)}
              onChange={() => handleAddonCheckboxChange(addon.id)}
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
            htmlFor={addon.id}
          >
            {addon.name} (+Rp{addon.price})
          </label>
        </div>
      </div>
    ));
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full mx-2 flex-1 svelte-1l8159u">
          <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
            Qty<span className="text-red-500"> *</span>
          </div>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
            <input
              type="number"
              name="qty"
              id="qty"
              placeholder="1"
              min="1"
              value={formData.qty}
              onChange={handleInputChange}
              className="w-full md:w-24 appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-pink-600 focus:shadow-md"
            />
          </div>
        </div>
        <div className="w-full mx-2 md:flex-2 svelte-1l8159u">
          <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
            Color<span className="text-red-500"> *</span>
          </div>
          <div className="bg-white my-2 p-1 flex border border-gray-200 rounded svelte-1l8159u">
            <select
              className="w-full md:w-64 md:flex-1 appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-pink-600 focus:shadow-md"
              value={selectedOption}
              onChange={handleSelectChange}
            >
              <option value="" disabled>
                Select color
              </option>
              <option value="random">Random</option>
              <option value="red">Red</option>
              <option value="blue">Blue</option>
              <option value="pink">Pink</option>
              <option value="white">White</option>
              <option value="purple">Purple</option>
              <option value="others">*others</option>
            </select>

            {selectedOption === 'others' && (
              <input
                type="text"
                className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-pink-600 focus:shadow-md"
                placeholder="red, green, blue"
                value={customInput}
                onChange={handleCustomInputChange}
              />
            )}
          </div>
        </div>
      </div>
      <div className="text-red-500 text-xs mt-1">{errors.qtyAndColor}</div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full mx-2 md:flex-2 svelte-1l8159u">
          <div className="font-bold h-6 mt-3 text-gray-600 text-xs leading-8 uppercase">
            Addons
          </div>
          {renderAddonCheckboxes()}
        </div>
      </div>
      <div className="flex flex-col md:flex-row">
        {selectedAddonIds.includes('bottle') && (
          <div className="w-full mx-2 md:flex-2 svelte-1l8159u">
            <div className="flex font-bold h-6 mt-3 mb-2 text-gray-600 text-xs leading-8 uppercase">
              Handsign/drawing/etc{'  '}
              <ToolTip content="Add a handsign or message for a receiver" />
            </div>
            <div className="bg-white text-black">
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <div className="flex gap-2 justify-center">
                  <button
                    className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => paintableRef.current?.clear()}
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
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </button>
                  <button
                    className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => paintableRef.current?.undo()}
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
                        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                      />
                    </svg>
                  </button>
                  <button
                    className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => paintableRef.current?.redo()}
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
                        d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3"
                      />
                    </svg>
                  </button>
                  <button
                    className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => setUseEraser(!useEraser)}
                  >
                    {useEraser ? (
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
                          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        className="w-6 h-6"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
                      </svg>
                    )}
                  </button>
                </div>
                <div className="flex gap-2 items-center w-full px-2">
                  <input
                    className=""
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                  <input
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    type="range"
                    defaultValue={5}
                    onChange={(e) => setThickness(Number(e.target.value))}
                    min={1}
                    max={30}
                    step={1}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row">
                <div className="w-full px-2 flex-1 svelte-1l8159u">
                  <div className="bg-white my-2 flex border border-gray-200 rounded flex-row gap-2">
                    <input
                      type="text"
                      name="paintable_text"
                      id="paintable_text"
                      placeholder="add text"
                      value={paintableText}
                      onChange={handlePaintableInputChange}
                      className="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-base font-medium text-[#6B7280] outline-none focus:border-pink-600 focus:shadow-md"
                    />
                    <button
                      className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                      onClick={addText}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-plus-lg"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"
                        />
                      </svg>
                    </button>
                    <button
                      className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
                      onClick={randomText}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-dice-3"
                        viewBox="0 0 16 16"
                      >
                        <path d="M13 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h10zM3 0a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3H3z" />
                        <path d="M5.5 4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm8 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-4-4a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center mt-2 rounded-lg">
                <Paintable
                  width={250}
                  height={150}
                  active={active}
                  color={color}
                  thickness={thickness}
                  useEraser={useEraser}
                  ref={paintableRef}
                  image={
                    imageResult
                      ? imageResult
                      : 'data:image/png;base64,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'
                  }
                  onSave={(image: string) => {
                    setImageResult(image);
                  }}
                ></Paintable>
              </div>
            </div>
          </div>
        )}
      </div>
      <TimeTable formData={formData} handleInputChange={handleInputChange} />
      <div className="text-red-500 text-xs mt-1">{errors.time}</div>
    </div>
  );
}
