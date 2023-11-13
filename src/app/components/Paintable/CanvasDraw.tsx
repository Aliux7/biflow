'use client';
import React, { useRef, useState } from 'react';
import { Paintable } from './paintable';
import { PaintableRef } from './PaintableRef';
import styles from './App.module.css';
import '../../globals.css';

const CanvasDraw = () => {
  const paintableRef = useRef<PaintableRef>(null);
  const [color, setColor] = useState('#0000FF');
  const [active, setActive] = useState(true);
  const [thickness, setThickness] = useState(5);
  const [useEraser, setUseEraser] = useState(false);

  return (
    <>
      <div>
        <div>
          <button onClick={() => paintableRef.current?.clear()}>Clear</button>
          <button onClick={() => paintableRef.current?.undo()}>Undo</button>
          <button onClick={() => paintableRef.current?.redo()}>Redo</button>
          <button
            onClick={() => {
              // setUseEraser(false);
              // setActive(!active);
              paintableRef.current?.save();
            }}
          >
            {active ? 'save' : 'edit'}
          </button>
          <button onClick={() => setUseEraser(!useEraser)}>
            {useEraser ? 'use pencil' : 'use eraser'}
          </button>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            type="range"
            defaultValue={5}
            onChange={(e) => setThickness(Number(e.target.value))}
            min={1}
            max={30}
            step={1}
          />
        </div>

        <Paintable
          width={400}
          height={768}
          active={active}
          color={color}
          thickness={thickness}
          useEraser={useEraser}
          ref={paintableRef}
          image={undefined}
          onSave={(image: string) => console.log(image)}
        >
          <div className={styles['canvas-inner']}>Test</div>
        </Paintable>
      </div>
    </>
  );
};

export default CanvasDraw;
