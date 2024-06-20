import React from "react";

interface ShapeControlsProps {
  // Function to handle shape click events
  handleClickShape: (action: string, value: any, strokeWidth: any) => void;
  // State variables for fill, stroke, and strokeWidth
  fill: string;
  stroke: string;
  strokeWidth: number;
  // State setters for fill, stroke, and strokeWidth
  setFill: React.Dispatch<React.SetStateAction<string>>;
  setStroke: React.Dispatch<React.SetStateAction<string>>;
  setStrokeWidth: React.Dispatch<React.SetStateAction<number>>;
  // State variable indicating the current selected shape
  ClickshapeValue: string;
  // Function to handle changes in shape attributes (fill, stroke, strokeWidth)
  handleChangeShape: (fill: any, stroke: any, strokeWidth: any) => void;
}

const ShapeControls: React.FC<ShapeControlsProps> = ({
  handleClickShape,
  fill,
  stroke,
  strokeWidth,
  handleChangeShape,
  setFill,
  setStroke,
  setStrokeWidth,
  ClickshapeValue,
}) => {
  return (
    <div className="cm-editor-child cm-editor-side-menu">
      {/* Title for the Shape controls */}
      <h2 className='heading-title'>Shape</h2>
      {/* Button group for shape selection */}
      <div className="cm-btn-group d-flex flex-column align-items-center">        
        {/* Button for Circle shape */}
        <button
          className="btn btn-secondary"
          onClick={() =>
            handleClickShape("circle", {
              fill,
              stroke,
              strokeWidth,
              rx: 10,
              ry: 100,
            }, strokeWidth)
          }
        >
          <svg width="28" height="28" viewBox="0 0 32 32">
            <g fill="none" fill-rule="evenodd">
              <circle cx="16" cy="16" r="14.5" stroke="#555555" />
            </g>
          </svg>
          <p className="m-0">circle</p>
        </button>
        {/* Button for Triangle shape */}
        <button
          className="btn btn-secondary"
          onClick={() =>
            handleClickShape("triangle", {
              fill,
              stroke,
              strokeWidth,
              rx: 10,
              ry: 1000,
            }, strokeWidth)
          }
        >
          <svg  width="28" height="28" viewBox="0 0 32 32">
            <g fill="none" fill-rule="evenodd">
              <path stroke="#434343" stroke-linecap="round" stroke-linejoin="round" d="M16 2.5l15.5 27H.5z" />
            </g>
          </svg>
          <p className="m-0">triangle</p>
        </button>
        {/* Button for Rectangle shape */}
        <button
          className="btn btn-secondary"
          onClick={() =>
            handleClickShape("rect", {
              fill,
              stroke,
              strokeWidth,
              width: 600,
              height: 600,
            }, strokeWidth)
          }
        >
          <svg  width="28" height="28" viewBox="0 0 32 32">
            <g fill="none" fill-rule="evenodd">
              <rect width="27" height="27" x="2.5" y="2.5" stroke="#434343" rx="1" />
            </g>
          </svg>
          <p className="m-0">  rect </p>
        </button>
        {/* Input for Stroke Width */}
        <div className="cm-label flex-column cm-pagination mb-4 mt-4">
          <label htmlFor="strokeWidth">Stroke Width</label>
          <input
            type="range"
            className="form-range"
            id="strokeWidth"
            min="8"
            max="100"
            value={strokeWidth}
            onChange={(e) => {
              const strokeWidth = parseInt(e.target.value);
              setStrokeWidth(strokeWidth); // Update strokeWidth state
              handleChangeShape(
                fill,
                stroke,
                strokeWidth
              ); // Notify parent component of the strokeWidth change
            }}
          />
        </div>
        {/* Input for Stroke Color */}
        <div className="cm-label flex-column cm-pagination">
          <label htmlFor="stroke">Stroke Color</label>
          <input
            type="color"
            className="form-control form-control-color"
            id="stroke"
            value={stroke}
            title="Choose a color"
            onChange={(e) => {
              let stroke = e.target.value;
              setStroke(stroke); // Update stroke color state
              handleChangeShape(
                fill,
                stroke,
                strokeWidth
              ); // Notify parent component of the stroke color change
            }}
          />
        </div>
        {/* Input for Fill Color */}
        <div className="cm-label flex-column cm-pagination">
          <label htmlFor="fill">Fill Color</label>
          <input
            type="color"
            className="form-control form-control-color"
            id="fill"
            value={fill}
            title="Choose a color"
            onChange={(e) => {
              let fill = e.target.value;
              setFill(fill); // Update fill color state
              handleChangeShape(
                fill,
                stroke,
                strokeWidth
              ); // Notify parent component of the fill color change
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShapeControls;
