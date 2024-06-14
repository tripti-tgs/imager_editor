import React from "react";

interface TextControlsProps {
  textFill: string;
  fontSize: number;
  fontWeight: string;
  fontFamily: string;
  textAlign: string;
  textDecoration: string;
  fontStyle: string;
  setTextFill: React.Dispatch<React.SetStateAction<string>>;
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
  setFontWeight: React.Dispatch<React.SetStateAction<string>>;
  setFontFamily: React.Dispatch<React.SetStateAction<string>>;
  setFontStyle: React.Dispatch<React.SetStateAction<string>>;
  setTextDecoration: React.Dispatch<React.SetStateAction<string>>;
  setTextAlign: React.Dispatch<React.SetStateAction<string>>;
  handleChangeTextStyle: (
    textFill: string,
    fontSize: number,
    fontWeight: string,
    fontFamily: string,
    textAlign: string,
    textDecoration: string,
    fontStyle: string
  ) => void;
}

const TextControls: React.FC<TextControlsProps> = ({
  setTextFill,
  setFontSize,
  setFontWeight,
  setFontFamily,
  setFontStyle,
  setTextDecoration,
  setTextAlign,
  textFill,
  fontSize,
  fontWeight,
  fontFamily,
  textAlign,
  textDecoration,
  fontStyle,
  handleChangeTextStyle,
}) => {
  const handleFontWeight = () => {
    const newFontWeight = fontWeight === "bold" ? "normal" : "bold";
    setFontWeight(newFontWeight);
    handleChangeTextStyle(
      textFill,
      fontSize,
      newFontWeight,
      fontFamily,
      textAlign,
      textDecoration,
      fontStyle
    );
  };

  const handleFontStyle = () => {
    const newFontStyle = fontStyle === "italic" ? "normal" : "italic";
    setFontStyle(newFontStyle);
    handleChangeTextStyle(
      textFill,
      fontSize,
      fontWeight,
      fontFamily,
      textAlign,
      textDecoration,
      newFontStyle
    );
  };

  const handleTextDecoration = () => {
    const newTextDecoration = textDecoration === "underline" ? "none" : "underline";
    setTextDecoration(newTextDecoration);
    handleChangeTextStyle(
      textFill,
      fontSize,
      fontWeight,
      fontFamily,
      textAlign,
      newTextDecoration,
      fontStyle
    );
  };

  return (
    <div className="d-flex fs-4 gap-5">
      <button className="btn btn-secondary m-1" onClick={handleFontWeight}>
        Bold
      </button>
      <button className="btn btn-secondary m-1" onClick={handleFontStyle}>
        Italic
      </button>
      <button className="btn btn-secondary m-1" onClick={handleTextDecoration}>
        Underline
      </button>
      <button className="btn btn-secondary m-1" onClick={() => setTextAlign("left")}>
        Left
      </button>
      <button className="btn btn-secondary m-1" onClick={() => setTextAlign("center")}>
        Center
      </button>
      <button className="btn btn-secondary m-1" onClick={() => setTextAlign("right")}>
        Right
      </button>
      <input
        type="range"
        className="form-range"
        id="fontSize"
        min="8"
        max="1000"
        value={fontSize}
        onChange={(e) => {
          const newFontSize = Number(e.target.value);
          setFontSize(newFontSize);
          handleChangeTextStyle(
            textFill,
            newFontSize,
            fontWeight,
            fontFamily,
            textAlign,
            textDecoration,
            fontStyle
          );
        }}
      />
      <input
        type="color"
        className="form-control form-control-color"
        id="textFill"
        value={textFill}
        title="Choose a color"
        onChange={(e) => {
          const newTextFill = e.target.value;
          setTextFill(newTextFill);
          handleChangeTextStyle(
            newTextFill,
            fontSize,
            fontWeight,
            fontFamily,
            textAlign,
            textDecoration,
            fontStyle
          );
        }}
      />
    </div>
  );
};

export default TextControls;
