import React from 'react';

interface CropComponentProps {
  handleCropApply: () => void;   // Function to handle apply crop action
  handleCropCancel: () => void;  // Function to handle cancel crop action
}

const CropComponent: React.FC<CropComponentProps> = ({ handleCropApply, handleCropCancel }) => (
  <div className="cm-editor-child cm-editor-side-menu">
    {/* Crop Component Title */}
    <h2 className="heading-title">Crop</h2>
    {/* Button group for Apply and Cancel */}
    <div className="cm-btn-group d-flex items-center">
      {/* Apply button */}
      <button className="btn btn-primary cm-btn m-1" onClick={handleCropApply}>
        Apply
      </button>
      {/* Cancel button */}
      <button className="btn btn-outline-primary m-1" onClick={handleCropCancel}>
        Cancel
      </button>
    </div>
  </div>
);

export default CropComponent;
