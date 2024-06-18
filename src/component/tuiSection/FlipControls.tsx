import React from "react";

interface FlipControlsProps {
  handleClick: (action: string, value: any) => void;
  CountTotalNumberOfFlip: number;
}

const FlipControls: React.FC<FlipControlsProps> = ({
  handleClick,
  CountTotalNumberOfFlip,
}) => {
  return (
    <div>
      <button
        className="btn btn-secondary m-1"
        onClick={() => handleClick("flipX", "")}
      >
        FlipX
      </button>
      <button
        className="btn btn-secondary m-1"
        onClick={() => handleClick("flipY", "")}
      >
        FlipY
      </button>

      <button
        className="btn btn-secondary m-1"
        disabled={CountTotalNumberOfFlip == 0 ? true : false}
        onClick={() => handleClick("resetflip", "")}
      >
        Reset
      </button>
    </div>
  );
};

export default FlipControls;
