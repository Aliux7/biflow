import React, { ReactNode } from 'react';
import { PaintableOptions } from './PaintableOptions';
interface Props extends PaintableOptions {
  children?: ReactNode;
}
export interface PaintableRef {
  undo: () => void;
  redo: () => void;
  clear: () => void;
  addText: (text: String, font: String, color: String) => void;
  save: () => void;
}
export declare const Paintable: React.ForwardRefExoticComponent<
  Props & React.RefAttributes<PaintableRef>
>;
export {};
