import React, { useState } from "react";

interface DrawControlsProps {
  handleClickDrawing: (action: string, value: any) => void; // Function to handle drawing actions (e.g., free drawing, line drawing)
  handleClickDrawingArrow: (action: string, value: any) => void; // Function to handle drawing arrow actions
  width: number; // Current width of the drawing tool
  color: string; // Current color selected for drawing
  setWidth: React.Dispatch<React.SetStateAction<number>>; // Setter function for width state
  setColor: React.Dispatch<React.SetStateAction<string>>; // Setter function for color state
  ClickDrawValue: string; // Current drawing action value (e.g., "FREE_DRAWING", "LINE_DRAWING")
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
  // Handler for changing the width of the drawing tool
  const handleWidthChange = (event: any) => {
    const newWidth = Number(event.target.value);
    setWidth(newWidth);
    handleClickDrawing(ClickDrawValue, { width: newWidth, color });
    // Uncomment below to include arrow type
    // handleClickDrawingArrow(ClickDrawValue, { width: newWidth, color, arrowType: { tail: 'triangle' } });
  };

  // Handler for changing the color of the drawing tool
  const handleColorChange = (event: any) => {
    const newHexColor = event.target.value;
    setColor(newHexColor);
    handleClickDrawing(ClickDrawValue, { width, color: newHexColor });
    // Uncomment below to include arrow type
    // handleClickDrawingArrow(ClickDrawValue, { width, color: newHexColor, arrowType: { tail: 'triangle' } });
  };

  return (
    <div className="cm-editor-child cm-editor-side-menu">
      {/* Draw Controls Title */}
      <h2 className='heading-title'>Draw</h2>
      <div className="cm-btn-group">
        <div className="d-flex flex flex-column">
          {/* Button for Free Drawing */}
          <button
            className="btn btn-secondary m-1"
            onClick={() => handleClickDrawing("FREE_DRAWING", { width, color })}
          >
            <svg width="28" height="28" viewBox="0 0 30 30">
              <g fill="none" fill-rule="evenodd">
                <path stroke="#434343" d="M2.5 20.929C2.594 10.976 4.323 6 7.686 6c5.872 0 2.524 19 7.697 19s1.89-14.929 6.414-14.929 1.357 10.858 5.13 10.858c1.802 0 2.657-2.262 2.566-6.786" />
              </g>
            </svg>
            <p className='m-0'> FREE</p> {/* Free drawing button label */}
          </button>
          {/* Button for Line Drawing */}
          <button
            className="btn btn-secondary m-1"
            onClick={() => handleClickDrawing("LINE_DRAWING", { width, color })}
          >
            <svg  width="28" height="28" viewBox="0 0 30 30">
              <g fill="none" fill-rule="evenodd">
                <path stroke="#434343" d="M2 15.5h28" />
              </g>
            </svg>
            <p className='m-0'> LINE </p> {/* Line drawing button label */}
          </button>
        </div>
        {/* Additional options (e.g., arrow type) */}
        {/* <button className="btn btn-secondary m-1" onClick={() => handleClickDrawingArrow('LINE_DRAWING', { width, color, arrowType: { tail: 'triangle' } })}>Arrow</button> */}
        {/* Width and Color Controls */}
        <div className='cm-pagination'>
          {/* Range input for adjusting width */}
          <input
            type="range"
            className="form-range"
            id="customRange2"
            min="5"
            max="30"
            value={width}
            onChange={handleWidthChange}
          />
          <p className="cm-pagination-value text-center mt-4">{width}</p> {/* Display current width value */}
          <div className="d-flex flex-column align-items-center mt-2 justify-content-space-between">
            {/* Color picker for selecting drawing color */}
            <input
              type="color"
              className="form-control form-control-color"
              id="myColor"
              value={color}
              onChange={handleColorChange}
              title="Choose a color"
            />
            <p className="cm-pagination-value">  Color: {color}</p> {/* Display selected color */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawControls;
