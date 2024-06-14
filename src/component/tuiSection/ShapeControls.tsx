import React from "react";

interface ShapeControlsProps {
  handleClickShape: (action: string, value: any,strokeWidth:any) => void;
  fill: string;
  stroke: string;
  strokeWidth: number;
  setFill: React.Dispatch<React.SetStateAction<string>>;
  setStroke: React.Dispatch<React.SetStateAction<string>>;
  setStrokeWidth: React.Dispatch<React.SetStateAction<number>>;
  ClickshapeValue: string;
  handleChangeShape :(fill:any,stroke:any,strokeWidth:any) =>void;
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
    <div>
      <button
        className="btn btn-secondary m-1"
        onClick={() =>
          handleClickShape("circle", {
            fill,
            stroke,
            strokeWidth,
            rx: 10,
            ry: 100,
          },strokeWidth)
        }
      >
        circle
      </button>
      <button
        className="btn btn-secondary m-1"
        onClick={() =>
          handleClickShape("triangle", {
            fill,
            stroke,
            strokeWidth,
            rx: 10,
            ry: 1000,
          },strokeWidth)
        }
      >
        triangle
      </button>
      <button
        className="btn btn-secondary m-1"
        onClick={() =>
          handleClickShape("rect", {
            fill,
            stroke,
            strokeWidth,
            width: 600,
            height: 600,
          },strokeWidth)
        }
      >
        rect
      </button>

      <div>
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
            setStrokeWidth(strokeWidth);
            handleChangeShape(
              fill,
              stroke,
              strokeWidth
             );
          }}
        />
        <label htmlFor="stroke">Stroke Color</label>
        <input
          type="color"
          className="form-control form-control-color"
          id="stroke"
          value={stroke}
          title="Choose a color"
          onChange={(e) => {
            let stroke = e.target.value;
            setStroke(stroke);
            handleChangeShape(
              fill,
              stroke,
              strokeWidth
             );
          }}
        />
        <label htmlFor="fill">Fill Color</label>
        <input
          type="color"
          className="form-control form-control-color"
          id="fill"
          value={fill}
          title="Choose a color"
          onChange={(e) => {
            let fill = e.target.value;
            setFill(fill);
            handleChangeShape(
              fill,
              stroke,
              strokeWidth
             );
          }}
        />
      </div>
    </div>
  );
};

export default ShapeControls;
