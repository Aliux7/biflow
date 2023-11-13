'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Paintable, PaintableRef } from 'paintablejs/react';
import '../../globals.css';

interface ChildComponentProps {
  updateParentData: (newData: string) => void;
}

const CanvasDrawContainer: React.FC<ChildComponentProps> = ({
  updateParentData,
}) => {
  const paintableRef = useRef<PaintableRef>(null);
  const [color, setColor] = useState('#0000FF');
  const [active, setActive] = useState(true);
  const [thickness, setThickness] = useState(5);
  const [useEraser, setUseEraser] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSpanClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const [imageResult, setImageResult] = useState('');
  const save = () => {
    setActive(false);
    updateParentData(imageResult);
  };

  return (
    <>
      <div className="bg-white text-black min-h-screen">
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
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
              className="hidden"
              type="color"
              value={color}
              ref={inputRef}
              onChange={(e) => setColor(e.target.value)}
            />
            <span
              onClick={handleSpanClick}
              style={{ backgroundColor: color }}
              className="inline-block appearance-none w-6 h-6 rounded-full bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:bg-white"
            ></span>
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

        <div className="mx-auto my-8 border-4 border-gray-600 rounded-lg">
          <Paintable
            width={200}
            height={200}
            active={active}
            color={color}
            thickness={thickness}
            useEraser={useEraser}
            ref={paintableRef}
            image={undefined}
            onSave={(image: string) => setImageResult(image)}
          ></Paintable>
        </div>
      </div>
    </>
  );
};

export default CanvasDrawContainer;
