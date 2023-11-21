export interface PaintableOptions {
  width: number;
  height: number;
  active: boolean;
  scaleFactor?: number;
  useEraser?: boolean;
  thicknessEraser?: number;
  thickness?: number;
  color?: string;
  image?: string;
  onLongPress?: () => void;
  onSave?: (image: string) => void;
}
export declare class Paintable {
  private canvas;
  bounding: DOMRect;
  context: CanvasRenderingContext2D;
  private active;
  private width;
  private height;
  private scaleFactor;
  private useEraser;
  private thicknessEraser;
  private thickness;
  private color;
  private onLongPress;
  private onSave;
  private undoList;
  private redoList;
  private longPressTimer;
  private lastPoint;
  private usedLineWidth;
  private canvasSaved;
  constructor(canvas: HTMLCanvasElement, initialOptions: PaintableOptions);
  setColor(color: string): void;
  setActive(active: boolean): void;
  setScaleFactor(scaleFactor: number): void;
  setUseEraser(useEraser: boolean): void;
  setThickness(thickness: number): void;
  setThicknessEraser(thicknessEraser: number): void;
  private setImage;
  undo(): void;
  redo(): void;
  save(): void;
  addText(text: String, font: String, color: String): void;
  clearCanvas(): void;
  private setStyle;
  private registerEvents;
  private setDrawOptions;
  private onDrawStart;
  private onDrawMove;
  private onDrawEnd;
  private startLongPressTimer;
  private stopLongPressTimer;
  private distanceBetween;
  private angleBetween;
  private saveImage;
  private getMousePosition;
  private restoreCanvas;
  private isCanvasBlank;
}
