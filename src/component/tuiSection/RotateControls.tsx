import React, { useState } from 'react';

interface RotateControlsProps {
  handleClick: (action: string, value: any) => void;
}

const RotateControls: React.FC<RotateControlsProps> = ({ handleClick }) => {
  const [rangeValue, setRangeValue] = useState<number>(0);

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setRangeValue(value);
    handleClick('rotate', value);
  };

  return (
    <div className="d-flex px-5 fs-4 gap-5 ">
      <button className="btn btn-secondary m-1" onClick={() => handleClick('rotate', 30)}>30</button>
      <button className="btn btn-secondary m-1" onClick={() => handleClick('rotate', -30)}>-30</button>
      <div>
        <input type="range" className="form-range" id="customRange1" min="-360" max="360" value={rangeValue} onChange={handleRangeChange} />
        <p className="bg-light">{rangeValue}</p>
      </div>
    </div>
  );
};

export default RotateControls;
