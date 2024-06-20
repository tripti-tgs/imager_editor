import React, { useState } from "react";

interface RotateControlsProps {
  handleClick: (value: any) => void;
}

const RotateControls: React.FC<RotateControlsProps> = ({ handleClick }) => {
  const [rangeValue, setRangeValue] = useState<number>(0);

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setRangeValue(value);
    handleClick(value);
  };

  return (
    <div className="cm-editor-child cm-editor-side-menu ">
      <h2 className="heading-title">Rotate</h2>
      <div className="cm-btn-group">
        <div className="d-flex flex flex-column">
          <button
            className="btn btn-secondary "
            onClick={() => handleClick(30)}
          >
            <svg width="26" height="26" viewBox="0 0 32 32">
              <g fill="none" fill-rule="evenodd">
                <path
                  fill="#434343"
                  d="M29 17h-.924c0 6.627-5.373 12-12 12-6.628 0-12-5.373-12-12C4.076 10.398 9.407 5.041 16 5V4C8.82 4 3 9.82 3 17s5.82 13 13 13 13-5.82 13-13z"
                />
                <path
                  stroke="#434343"
                  stroke-linecap="square"
                  d="M16 1.5l4 3-4 3"
                />
                <path fill="#434343" fill-rule="nonzero" d="M16 4h4v1h-4z" />
              </g>
            </svg>
            <p className="m-0"> 30</p>
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleClick(-30)}
          >
            <svg width="26" height="26" viewBox="0 0 32 32">
              <g fill="none" fill-rule="evenodd">
                <path
                  fill="#434343"
                  d="M3 17h.924c0 6.627 5.373 12 12 12 6.628 0 12-5.373 12-12 0-6.602-5.331-11.96-11.924-12V4c7.18 0 13 5.82 13 13s-5.82 13-13 13S3 24.18 3 17z"
                />
                <path fill="#434343" fill-rule="nonzero" d="M12 4h4v1h-4z" />
                <path
                  stroke="#434343"
                  stroke-linecap="square"
                  d="M16 1.5l-4 3 4 3"
                />
              </g>
            </svg>
            <p className="m-0"> -30</p>
          </button>
        </div>
        <div className="cm-pagination  text-center">
          <input
            type="range"
            className="form-range"
            id="customRange1"
            min="-360"
            max="360"
            value={rangeValue}
            onChange={handleRangeChange}
          />
          <p className=" cm-pagination-value">{rangeValue}</p>
        </div>
      </div>
    </div>
  );
};

export default RotateControls;
