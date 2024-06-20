import React from "react";

interface FlipControlsProps {
  handleClick: (action: string, value: any) => void; // Function to handle click events
  CountTotalNumberOfFlip: number; // Total number of flips
}

const FlipControls: React.FC<FlipControlsProps> = ({
  handleClick,
  CountTotalNumberOfFlip,
}) => {
  return (
    <div className="cm-editor-child cm-editor-side-menu">
      <h2 className="heading-title">Flip</h2>
      <div className="cm-btn-group d-flex flex-column align-items-center gap-4">
        {/* FlipX button */}
        <button
          className="btn btn-secondary p-0"
          onClick={() => handleClick("flipX", "")} // Handle flipX action
        >
          <svg width="28" height="28" viewBox="0 0 32 32">
            <g fill="none" fill-rule="evenodd">
              <path d="M32 32H0V0h32z" />
              <path
                fill="#434343"
                d="M17 32h-1V0h1zM27.167 11l.5 3h-1.03l-.546-3h1.076zm-.5-3h-1.122L25 5h-5V4h5.153a1 1 0 0 1 .986.836L26.667 8zm1.5 9l.5 3h-.94l-.545-3h.985zm1 6l.639 3.836A1 1 0 0 1 28.819 28H26v-1h3l-.726-4h.894zM23 28h-3v-1h3v1zM13 4v1H7L3 27h10v1H3.18a1 1 0 0 1-.986-1.164l3.666-22A1 1 0 0 1 6.847 4H13z"
              />
            </g>
          </svg>
          <p className="m-0">FlipX</p>
        </button>
        {/* FlipY button */}
        <button
          className="btn btn-secondary p-0"
          onClick={() => handleClick("flipY", "")} // Handle flipY action
        >
          <svg width="28" height="28" viewBox="0 0 32 32">
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0v32h32V0z" />
              <path
                fill="#434343"
                d="M0 16v1h32v-1zM11 27.167l3 .5v-1.03l-3-.546v1.076zm-3-.5v-1.122L5 25v-5H4v5.153a1 1 0 0 0 .836.986L8 26.667zm9 1.5l3 .5v-.94l-3-.545v.985zm6 1l3.836.639A1 1 0 0 0 28 28.82V26h-1v3l-4-.727v.894zM28 23v-3h-1v3h1zM4 13h1V7l22-4v10h1V3.18a1 1 0 0 0-1.164-.986l-22 3.667A1 1 0 0 0 4 6.847V13z"
              />
            </g>
          </svg>
          <p className="m-0">FlipY</p>
        </button>
        {/* Reset button */}
        <button
          className="btn btn-secondary p-0"
          disabled={CountTotalNumberOfFlip === 0} // Disable if no flips are available
          onClick={() => handleClick("resetflip", "")} // Handle resetflip action
        >
          <svg width="28" height="28" viewBox="0 0 24 24">
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0h24v24H0z" opacity=".5" />
              <path
                fill="#434343"
                d="M2 13v-1a7 7 0 0 1 7-7h13v1h-1v5h1v1a7 7 0 0 1-7 7H2v-1h1v-5H2zm7-7a6 6 0 0 0-6 6v6h12a6 6 0 0 0 6-6V6H9z"
              />
              <path
                stroke="#434343"
                strokeLinecap="square"
                d="M19 3l2.5 2.5L19 8M5 16l-2.5 2.5L5 21"
              />
            </g>
          </svg>
          <p className="m-0">Reset</p>
        </button>
      </div>
    </div>
  );
};

export default FlipControls;
