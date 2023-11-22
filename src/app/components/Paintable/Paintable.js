'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e };
}

var React__default = /*#__PURE__*/ _interopDefaultLegacy(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

/** @deprecated */
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++)
    s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++)
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
      r[k] = a[j];
  return r;
}

var Paintable = /** @class */ (function () {
  function Paintable(canvas, initialOptions) {
    this.canvas = canvas;
    //optional options
    this.scaleFactor = 1;
    this.useEraser = false;
    this.thicknessEraser = 40;
    this.thickness = 10;
    this.color = '#000000';
    this.onLongPress = function () {};
    this.onSave = function () {};
    // internal state
    this.undoList = [];
    this.redoList = [];
    this.longPressTimer = null;
    this.lastPoint = null;
    this.canvasSaved = false;
    this.bounding = this.canvas.getBoundingClientRect();
    this.context = this.canvas.getContext('2d');
    this.width = initialOptions.width;
    this.canvas.width = this.width;
    this.height = initialOptions.height;
    this.canvas.height = this.height;
    this.active = initialOptions.active;
    this.image = initialOptions.image;
    if (initialOptions.scaleFactor !== undefined) {
      this.scaleFactor = initialOptions.scaleFactor;
    }
    if (initialOptions.useEraser !== undefined) {
      this.setUseEraser(initialOptions.useEraser);
    }
    if (initialOptions.thicknessEraser !== undefined) {
      this.setThicknessEraser(initialOptions.thicknessEraser);
    }
    if (initialOptions.thickness !== undefined) {
      this.setThickness(initialOptions.thickness);
    }
    if (initialOptions.color !== undefined) {
      this.setColor(initialOptions.color);
    }
    if (initialOptions.image !== undefined) {
      this.setImage(initialOptions.image);
    }
    if (initialOptions.onLongPress !== undefined) {
      this.onLongPress = initialOptions.onLongPress;
    }
    if (initialOptions.onSave !== undefined) {
      this.onSave = initialOptions.onSave;
    }

    // Set the pixel ratio for high DPI displays
    var pixelRatio = window.devicePixelRatio || 1;
    canvas.width = this.width * pixelRatio;
    canvas.height = this.height * pixelRatio;
    canvas.style.width = this.width + 'px';
    canvas.style.height = this.height + 'px';
    this.context.scale(pixelRatio, pixelRatio);

    this.usedLineWidth = this.useEraser ? this.thicknessEraser : this.thickness;
    this.setStyle();
    this.registerEvents();
  }
  Paintable.prototype.setColor = function (color) {
    this.color = color;
  };
  Paintable.prototype.setActive = function (active) {
    var wasActive = this.active;
    this.active = active;
    this.canvas.style.zIndex = this.active ? '9999' : '-10';
    if (wasActive && !this.active) {
      this.saveImage();
    }
  };
  Paintable.prototype.setScaleFactor = function (scaleFactor) {
    this.scaleFactor = scaleFactor;
  };
  Paintable.prototype.setUseEraser = function (useEraser) {
    this.useEraser = useEraser;
  };
  Paintable.prototype.setThickness = function (thickness) {
    if (thickness > 1) {
      this.thickness = thickness;
    } else {
      console.warn(
        'Invalid thickness: thickness must be greater than 1. Received: ' +
          thickness
      );
    }
  };
  Paintable.prototype.setThicknessEraser = function (thicknessEraser) {
    if (thicknessEraser > 1) {
      this.thicknessEraser = thicknessEraser;
    } else {
      console.warn(
        'Invalid thicknessEraser: thicknessEraser must be greater than 1. Received: ' +
          thicknessEraser
      );
    }
  };
  Paintable.prototype.setImage = function (image) {
    this.restoreCanvas(image);
  };
  Paintable.prototype.undo = function () {
    var undoCopy = __spreadArrays(this.undoList);
    var lastItem = undoCopy.pop();
    if (lastItem) {
      this.undoList = undoCopy;
      this.redoList = __spreadArrays(this.redoList, [this.canvas.toDataURL()]);
      this.restoreCanvas(lastItem);
    }
  };
  Paintable.prototype.redo = function () {
    var redoCopy = __spreadArrays(this.redoList);
    var lastItem = redoCopy.pop();
    if (lastItem) {
      this.undoList = __spreadArrays(this.undoList, [this.canvas.toDataURL()]);
      this.redoList = redoCopy;
      this.restoreCanvas(lastItem);
    }
  };
  Paintable.prototype.clearCanvas = function () {
    if (!this.isCanvasBlank()) {
      this.undoList = __spreadArrays(this.undoList, [this.canvas.toDataURL()]);
      this.redoList = [];
      this.context.clearRect(0, 0, this.width, this.height);
      this.restoreCanvas(this.image);
    }
  };
  Paintable.prototype.setStyle = function () {
    this.canvas.style.position = 'absolute';
    this.canvas.style.zIndex = this.active ? '9999' : '-10';
    this.canvas.style.backgroundColor = 'transparent';
  };
  Paintable.prototype.registerEvents = function () {
    this.canvas.addEventListener('mousedown', this.onDrawStart.bind(this));
    this.canvas.addEventListener('mousemove', this.onDrawMove.bind(this));
    this.canvas.addEventListener('mouseup', this.onDrawEnd.bind(this));
    this.canvas.addEventListener('mouseout', this.onDrawEnd.bind(this));
    this.canvas.addEventListener('touchstart', this.onDrawStart.bind(this));
    this.canvas.addEventListener('touchmove', this.onDrawMove.bind(this));
    this.canvas.addEventListener('touchend', this.onDrawEnd.bind(this));
  };
  Paintable.prototype.disableScroll = function () {
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  };
  Paintable.prototype.enableScroll = function () {
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  };
  Paintable.prototype.addText = function (
    text,
    font = '12px Arial',
    color = '#000000'
  ) {
    this.undoList = __spreadArrays(this.undoList, [this.canvas.toDataURL()]);

    const maxWidth = this.width - 15; // Set maximum width based on canvas width
    const lineHeight = parseInt(font, 10); // Assuming the font size is the height
    const words = text.split(' ');
    let currentLine = '';
    let lines = [];

    this.context.font = font;
    this.context.fillStyle = color;

    for (const word of words) {
      const testLine =
        currentLine.length === 0 ? word : `${currentLine} ${word}`;
      const testWidth = this.context.measureText(testLine).width;

      if (testWidth > maxWidth) {
        // Start a new line
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    lines.push(currentLine);

    // Calculate the position to center the text vertically
    const textHeight = lines.length * lineHeight;
    const centerY = this.height / 2 - textHeight / 2 + lineHeight / 2 + 4; // Adjust for baseline

    lines.forEach((line, index) => {
      const textMetrics = this.context.measureText(line);
      const textWidth = textMetrics.width;
      const x = this.width / 2 - textWidth / 2;
      const y = centerY + index * lineHeight;

      this.context.fillText(line, x, y);
    });

    // Save the canvas state after adding text
    this.saveImage();
  };
  Paintable.prototype.setDrawOptions = function () {
    this.context.globalCompositeOperation = this.useEraser
      ? 'destination-out'
      : 'source-over';
    this.usedLineWidth = this.useEraser ? this.thicknessEraser : this.thickness;
    this.context.fillStyle = this.color;
  };
  Paintable.prototype.onDrawStart = function (e) {
    e.preventDefault();
    this.disableScroll();
    this.startLongPressTimer();
    if (this.active) {
      this.setDrawOptions();
      var mousePosition = this.getMousePosition(e);
      this.lastPoint = mousePosition;
    }
  };
  Paintable.prototype.onDrawMove = function (e) {
    e.preventDefault();
    this.disableScroll();
    if (this.lastPoint && this.active) {
      if (!this.canvasSaved) {
        this.undoList = __spreadArrays(this.undoList, [
          this.canvas.toDataURL(),
        ]);
        this.redoList = [];
        this.canvasSaved = true;
      }
      this.stopLongPressTimer();
      var mousePosition = this.getMousePosition(e);
      var dist = this.distanceBetween(this.lastPoint, mousePosition);
      var angle = this.angleBetween(this.lastPoint, mousePosition);
      for (var i = 0; i < dist; i += 1) {
        var x = this.lastPoint.x + Math.sin(angle) * i;
        var y = this.lastPoint.y + Math.cos(angle) * i;
        this.context.beginPath();
        this.context.arc(x, y, this.usedLineWidth / 2, 0, Math.PI * 2, false);
        this.context.closePath();
        this.context.fill();
      }
      this.lastPoint = mousePosition;
    }
  };
  Paintable.prototype.onDrawEnd = function () {
    this.enableScroll();
    if (this.active) {
      this.stopLongPressTimer();
      this.lastPoint = null;
      this.canvasSaved = false;
    }
  };
  Paintable.prototype.startLongPressTimer = function () {
    var _this = this;
    var timerId = setTimeout(function () {
      _this.longPressTimer = null;
      _this.onLongPress();
    }, 500);
    this.longPressTimer = timerId;
  };
  Paintable.prototype.stopLongPressTimer = function () {
    if (this.longPressTimer !== null) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = null;
    }
  };
  Paintable.prototype.distanceBetween = function (point1, point2) {
    return Math.sqrt(
      Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
    );
  };
  Paintable.prototype.angleBetween = function (point1, point2) {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
  };
  Paintable.prototype.saveImage = function () {
    // this.undoList = [];
    // this.redoList = [];
    var image = this.canvas.toDataURL();
    this.onSave(image);
  };
  Paintable.prototype.getMousePosition = function (e) {
    var rect = this.canvas.getBoundingClientRect();
    // use mouse as default
    var clientX = e.clientX;
    var clientY = e.clientY;
    // use first touch if available
    if (e.changedTouches && e.changedTouches.length > 0) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    }
    // return mouse/touch position inside canvas
    return {
      x: ((clientX || 0) - rect.left) / this.scaleFactor,
      y: ((clientY || 0) - rect.top) / this.scaleFactor,
    };
  };
  Paintable.prototype.restoreCanvas = function (base64Image) {
    var _this = this;
    if (base64Image) {
      var image_1 = new Image();
      image_1.onload = function () {
        _this.context.globalCompositeOperation = 'source-over';
        _this.context.clearRect(0, 0, _this.width, _this.height);

        // Disable image smoothing for sharp rendering
        _this.context.imageSmoothingEnabled = false;

        _this.context.drawImage(image_1, 0, 0);
      };
      image_1.src = base64Image;
    }
  };
  Paintable.prototype.isCanvasBlank = function () {
    var pixelBuffer = new Uint32Array(
      this.context.getImageData(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      ).data.buffer
    );
    return !pixelBuffer.some(function (color) {
      return color !== 0;
    });
  };
  return Paintable;
})();

var Paintable$1 = React.forwardRef(function (props, ref) {
  var canvas = React.useRef(null);
  var _a = React.useState(null),
    paintable = _a[0],
    setPaintable = _a[1];
  var width = props.width,
    height = props.height,
    active = props.active,
    scaleFactor = props.scaleFactor,
    useEraser = props.useEraser,
    thicknessEraser = props.thicknessEraser,
    thickness = props.thickness,
    color = props.color,
    image = props.image,
    onLongPress = props.onLongPress,
    onSave = props.onSave;
  React.useImperativeHandle(ref, function () {
    return {
      undo: function () {
        undo();
      },
      redo: function () {
        redo();
      },
      clear: function () {
        clear();
      },
      addText: function (text, font, color) {
        addText(text, font, color);
      },
      save: function () {
        save();
      },
    };
  });
  React.useEffect(
    function () {
      if (canvas.current) {
        var instance = new Paintable(canvas.current, {
          width: width,
          height: height,
          active: active,
          scaleFactor: scaleFactor,
          useEraser: useEraser,
          thicknessEraser: thicknessEraser,
          thickness: thickness,
          color: color,
          image: image,
          onLongPress: onLongPress,
          onSave: onSave,
        });
        setPaintable(instance);
      }
    },
    [canvas]
  );
  React.useEffect(
    function () {
      paintable === null || paintable === void 0
        ? void 0
        : paintable.setThickness(thickness);
    },
    [thickness]
  );
  React.useEffect(
    function () {
      paintable === null || paintable === void 0
        ? void 0
        : paintable.setUseEraser(useEraser);
    },
    [useEraser]
  );
  React.useEffect(
    function () {
      paintable === null || paintable === void 0
        ? void 0
        : paintable.setScaleFactor(scaleFactor);
    },
    [scaleFactor]
  );
  React.useEffect(
    function () {
      paintable === null || paintable === void 0
        ? void 0
        : paintable.setActive(active);
    },
    [active]
  );
  React.useEffect(
    function () {
      paintable === null || paintable === void 0
        ? void 0
        : paintable.setColor(color);
    },
    [color]
  );
  var undo = function () {
    paintable === null || paintable === void 0 ? void 0 : paintable.undo();
  };
  var redo = function () {
    paintable === null || paintable === void 0 ? void 0 : paintable.redo();
  };
  var clear = function () {
    paintable === null || paintable === void 0
      ? void 0
      : paintable.clearCanvas();
  };
  var save = function () {
    paintable.saveImage();
  };
  var addText = function (text, font, color) {
    paintable.addText(text, font, color);
  };
  return React__default['default'].createElement(
    React__default['default'].Fragment,
    null,
    React__default['default'].createElement('canvas', { ref: canvas }),
    React__default['default'].createElement(
      'div',
      {
        style: {
          width: width + 'px',
          height: height + 'px',
        },
      },
      props.children
    )
  );
});

exports.Paintable = Paintable$1;
