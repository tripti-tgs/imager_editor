import React from "react";

interface IconComponentProps {
  handleIcon: (e: React.MouseEvent<HTMLButtonElement>) => void; // Callback function triggered when a button is clicked
  setIconFill: React.Dispatch<React.SetStateAction<string>>; // Setter function to update the icon fill color state
  iconFill: string; // Current icon fill color
  handleChangeIconColorStyle: () => void; // Callback function to handle changes in icon color style
  seticonSymbol: React.Dispatch<React.SetStateAction<string>>; // Setter function to update the icon symbol state
  setActionIcon:React.Dispatch<React.SetStateAction<boolean>>;
}

const IconComponent: React.FC<IconComponentProps> = ({
  handleIcon,
  iconFill,
  setIconFill,
  seticonSymbol,
  handleChangeIconColorStyle,
  setActionIcon
}) => (
  <div>
    {/* Button for Arrow icon */}
    <button
      className="btn btn-secondary m-1"
      onClick={(e) => {
        setActionIcon(true)
        seticonSymbol("arrow"); // Set the icon symbol state to "arrow"
        handleIcon(e); // Trigger the handleIcon callback function with the click event
      }}
    >
      Arrow
    </button>
    
    {/* Button for Cancel icon */}
    <button
      className="btn btn-secondary m-1"
      onClick={(e) => {
        setActionIcon(true)

        seticonSymbol("cancel"); // Set the icon symbol state to "cancel"
        handleIcon(e); // Trigger the handleIcon callback function with the click event
      }}
    >
      Cancel
    </button>
    
    {/* Button for Custom Arrow icon */}
    <button
      className="btn btn-secondary m-1"
      onClick={(e) => {
        setActionIcon(true)

        seticonSymbol("customArrow"); // Set the icon symbol state to "customArrow"
        handleIcon(e); // Trigger the handleIcon callback function with the click event
      }}
    >
      Custom
    </button>
    
    {/* Input for choosing icon fill color */}
    <input
      type="color"
      className="form-control form-control-color  mt-4"
      id="iconFill"
      value={iconFill} // Current value of the icon fill color
      title="Choose a color"
      onChange={(e) => {
        setIconFill(e.target.value); // Update the icon fill color state with the chosen color
        handleChangeIconColorStyle(); // Trigger the handleChangeIconColorStyle callback function
      }}
    />
  </div>
);

export default IconComponent;
