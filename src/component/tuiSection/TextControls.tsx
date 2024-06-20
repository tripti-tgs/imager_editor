import React from "react";
import FormatBoldSharpIcon from "@mui/icons-material/FormatBoldSharp";
import FormatItalicSharpIcon from "@mui/icons-material/FormatItalicSharp";
import FormatUnderlinedSharpIcon from "@mui/icons-material/FormatUnderlinedSharp";
import FormatAlignLeftSharpIcon from "@mui/icons-material/FormatAlignLeftSharp";
import FormatAlignCenterSharpIcon from "@mui/icons-material/FormatAlignCenterSharp";
import FormatAlignRightSharpIcon from "@mui/icons-material/FormatAlignRightSharp";

// Props interface for TextControls component
interface TextControlsProps {
  textFill: string; // Current text color
  fontSize: number; // Current font size
  fontWeight: string; // Current font weight (bold or normal)
  fontFamily: string; // Current font family
  textAlign: string; // Current text alignment (left, center, right)
  textDecoration: string; // Current text decoration (underline or none)
  fontStyle: string; // Current font style (italic or normal)
  setTextFill: React.Dispatch<React.SetStateAction<string>>; // Setter for text color
  setFontSize: React.Dispatch<React.SetStateAction<number>>; // Setter for font size
  setFontWeight: React.Dispatch<React.SetStateAction<string>>; // Setter for font weight
  setFontFamily: React.Dispatch<React.SetStateAction<string>>; // Setter for font family
  setFontStyle: React.Dispatch<React.SetStateAction<string>>; // Setter for font style
  setTextDecoration: React.Dispatch<React.SetStateAction<string>>; // Setter for text decoration
  setTextAlign: React.Dispatch<React.SetStateAction<string>>; // Setter for text alignment
  handleChangeTextStyle: (
    // Function to handle text style changes
    textFill: string,
    fontSize: number,
    fontWeight: string,
    fontFamily: string,
    textAlign: string,
    textDecoration: string,
    fontStyle: string
  ) => void;
}

// TextControls functional component
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
  // Function to toggle font weight between bold and normal
  const handleFontWeight = () => {
    const newFontWeight = fontWeight === "bold" ? "normal" : "bold";
    setFontWeight(newFontWeight); // Update font weight state
    handleChangeTextStyle(
      textFill,
      fontSize,
      newFontWeight,
      fontFamily,
      textAlign,
      textDecoration,
      fontStyle
    ); // Notify parent component of the style change
  };

  // Function to toggle font style between italic and normal
  const handleFontStyle = () => {
    const newFontStyle = fontStyle === "italic" ? "normal" : "italic";
    setFontStyle(newFontStyle); // Update font style state
    handleChangeTextStyle(
      textFill,
      fontSize,
      fontWeight,
      fontFamily,
      textAlign,
      textDecoration,
      newFontStyle
    ); // Notify parent component of the style change
  };

  // Function to toggle text decoration between underline and none
  const handleTextDecoration = () => {
    const newTextDecoration =
      textDecoration === "underline" ? "none" : "underline";
    setTextDecoration(newTextDecoration); // Update text decoration state
    handleChangeTextStyle(
      textFill,
      fontSize,
      fontWeight,
      fontFamily,
      textAlign,
      newTextDecoration,
      fontStyle
    ); // Notify parent component of the style change
  };

  return (
    <div className="cm-editor-child cm-editor-side-menu">
      <h2 className="heading-title">Text</h2>
      <div className="cm-btn-group d-flex flex-column align-items-center">
        {/* Button for toggling bold font weight */}
        <button className="btn btn-secondary" onClick={handleFontWeight}>
          <svg width="28" height="28" viewBox="0 0 32 32">
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0h32v32H0z" />
              <path fill="#434343" d="M7 2h2v2H7zM7 28h2v2H7z" />
              <path
                stroke="#434343"
                strokeWidth="2"
                d="M9 3v12h9a6 6 0 1 0 0-12H9zM9 15v14h10a7 7 0 0 0 0-14H9z"
              />
            </g>
          </svg>
          <p className="m-0">Bold</p>
        </button>
        {/* Button for toggling italic font style */}
        <button className="btn btn-secondary" onClick={handleFontStyle}>
          <svg width="28" height="28" viewBox="0 0 32 32">
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0h32v32H0z" />
              <path
                fill="#434343"
                d="M15 2h5v1h-5zM11 29h5v1h-5zM17 3h1l-4 26h-1z"
              />
            </g>
          </svg>
          <p className="m-0">Italic</p>
        </button>
        {/* Button for toggling underline text decoration */}
        <button className="btn btn-secondary" onClick={handleTextDecoration}>
          <svg width="28" height="28" viewBox="0 0 32 32">
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0h32v32H0z" />
              <path
                fill="#434343"
                d="M8 2v14a8 8 0 1 0 16 0V2h1v14a9 9 0 0 1-18 0V2h1zM3 29h26v1H3z"
              />
              <path fill="#434343" d="M5 2h5v1H5zM22 2h5v1h-5z" />
            </g>
          </svg>
          <p className="m-0">Underline</p>
        </button>
        {/* Button for left text alignment */}
        <button
          className="btn btn-secondary"
          onClick={() => setTextAlign("left")}
        >
          <svg width="28" height="28" viewBox="0 0 32 32">
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0h32v32H0z" />
              <path
                fill="#434343"
                d="M2 5h28v1H2zM2 12h16v1H2zM2 19h28v1H2zM2 26h16v1H2z"
              />
            </g>
          </svg>
          <p className="m-0">Left</p>
        </button>
        {/* Button for center text alignment */}
        <button
          className="btn btn-secondary"
          onClick={() => setTextAlign("center")}
        >
          <svg width="28" height="28" viewBox="0 0 32 32">
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0h32v32H0z" />
              <path
                fill="#434343"
                d="M2 5h28v1H2zM8 12h16v1H8zM2 19h28v1H2zM8 26h16v1H8z"
              />
            </g>
          </svg>
          <p className="m-0">Center</p>
        </button>
        {/* Button for right text alignment */}
        <button
          className="btn btn-secondary m-1"
          onClick={() => setTextAlign("right")}
        >
          <svg width="28" height="28" viewBox="0 0 32 32">
            <g fill="none" fill-rule="evenodd">
              <path d="M0 0h32v32H0z" />
              <path
                fill="#434343"
                d="M2 5h28v1H2zM14 12h16v1H14zM2 19h28v1H2zM14 26h16v1H14z"
              />
            </g>
          </svg>
          <p className="m-0">Right</p>
        </button>
        {/* Font size range input */}
        <div className="cm-pagination">
          <input
            type="range"
            className="form-range"
            id="fontSize"
            min="8"
            max="1000"
            value={fontSize}
            onChange={(e) => {
              const newFontSize = Number(e.target.value);
              setFontSize(newFontSize); // Update font size state
              handleChangeTextStyle(
                textFill,
                newFontSize,
                fontWeight,
                fontFamily,
                textAlign,
                textDecoration,
                fontStyle
              ); // Notify parent component of the style change
            }}
          />
          {/* Text color input */}
          <input
            type="color"
            className="form-control form-control-color mt-4"
            id="textFill"
            value={textFill}
            title="Choose a color"
            onChange={(e) => {
              const newTextFill = e.target.value;
              setTextFill(newTextFill); // Update text color state
              setTextFill(newTextFill); // Update text color state
              handleChangeTextStyle(
                newTextFill,
                fontSize,
                fontWeight,
                fontFamily,
                textAlign,
                textDecoration,
                fontStyle
              ); // Notify parent component of the style change
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TextControls;
