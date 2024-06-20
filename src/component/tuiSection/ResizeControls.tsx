import React from "react";

// Props interface for ResizeComponent
interface ResizeComponentProps {
  canvasWidth: any; // Current width of the canvas
  canvasHeight: any; // Current height of the canvas
  startcanvasWidth: any; // Starting width of the canvas
  startcanvasHeight: any; // Starting height of the canvas
  handleOnChangeWidth: (e: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle width input change
  handleOnChangeHeight: (e: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle height input change
  handleResizeApply: () => void; // Function to handle apply button click
  handleResizeCancel: () => void; // Function to handle cancel button click
}

// ResizeComponent functional component
const ResizeComponent: React.FC<ResizeComponentProps> = ({
  canvasWidth,
  canvasHeight,
  handleOnChangeWidth,
  handleOnChangeHeight,
  handleResizeApply,
  handleResizeCancel,
  startcanvasWidth,
  startcanvasHeight,
}) => (
  <div>
    {/* Range input for canvas width */}
    <input
      type="range"
      min="0"
      max={startcanvasWidth}
      value={canvasWidth}
      onChange={handleOnChangeWidth}
    />

    {/* Range input for canvas height */}
    <input
      type="range"
      min="0"
      max={startcanvasHeight}
      value={canvasHeight}
      onChange={handleOnChangeHeight}
    />

    {/* Number input for canvas width */}
    <input
      type="number"
      min="0"
      value={canvasWidth}
      onChange={handleOnChangeWidth}
    />

    {/* Number input for canvas height */}
    <input
      type="number"
      min="0"
      placeholder="height"
      value={canvasHeight}
      onChange={handleOnChangeHeight}
    />

    {/* Apply button */}
    <button onClick={handleResizeApply}>Apply</button>

    {/* Cancel button */}
    <button onClick={handleResizeCancel}>Cancel</button>
  </div>
);

export default ResizeComponent;
