import React from "react";

// Props interface for MaskComponent
interface MaskComponentProps {
  handleLoadMaskImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Function to handle file input change
  handleMaskApply: () => void; // Function to handle mask apply button click
}

// MaskComponent functional component
const MaskComponent: React.FC<MaskComponentProps> = ({
  handleLoadMaskImageChange,
  handleMaskApply
}) => (
  <div>
    {/* File input to select a mask image */}
    <input type="file" onChange={handleLoadMaskImageChange} />

    {/* Button to apply the mask */}
    <button className="btn btn-secondary m-1" onClick={handleMaskApply}>
      Apply
    </button>
  </div>
);

export default MaskComponent;
