import React, { useState } from "react";

interface DrawControlsProps {
  handleClickDrawing: (action: string, value: any) => void;
  handleClickDrawingArrow: (action: string, value: any) => void;
  width: number;
  color: string;
  setWidth: React.Dispatch<React.SetStateAction<number>>;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  ClickDrawValue: string;
}

const DrawControls: React.FC<DrawControlsProps> = ({
  handleClickDrawing,
  handleClickDrawingArrow,
  width,
  color,
  setWidth,
  setColor,
  ClickDrawValue,
}) => {
  const handleWidthChange = (event: any) => {
    const newWidth = Number(event.target.value);
    setWidth(newWidth);
    handleClickDrawing(ClickDrawValue, { width: newWidth, color });
    // handleClickDrawingArrow(ClickDrawValue, { width: newWidth, color, arrowType: { tail: 'triangle' } });
  };

  const handleColorChange = (event: any) => {
    const newHexColor = event.target.value;
    setColor(newHexColor);
    handleClickDrawing(ClickDrawValue, { width, color: newHexColor });
    // handleClickDrawingArrow(ClickDrawValue, { width, color: newHexColor, arrowType: { tail: 'triangle' } });
  };

  return (
    <div className="d-flex  fs-4 gap-5 ">
      <button
        className="btn btn-secondary m-1"
        onClick={() => handleClickDrawing("FREE_DRAWING", { width, color })}
      >
        FREE
      </button>
      <button
        className="btn btn-secondary m-1"
        onClick={() => handleClickDrawing("LINE_DRAWING", { width, color })}
      >
        LINE
      </button>
      {/* <button className="btn btn-secondary m-1" onClick={() => handleClickDrawingArrow('LINE_DRAWING', { width, color, arrowType: { tail: 'triangle' } })}>Arrow</button> */}
      <div>
        <input
          type="range"
          className="form-range"
          id="customRange2"
          min="5"
          max="30"
          value={width}
          onChange={handleWidthChange}
        />
        <p className="bg-light">{width}</p>
        <input
          type="color"
          className="form-control form-control-color"
          id="myColor"
          value={color}
          onChange={handleColorChange}
          title="Choose a color"
        />
        <p>Selected Color: {color}</p>
      </div>
    </div>
  );
};

export default DrawControls;
