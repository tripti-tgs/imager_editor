import React, { useEffect, useRef, useState } from "react";
import ImageEditor from "tui-image-editor"; // Importing tui-image-editor library
import SaveAltIcon from "@mui/icons-material/SaveAlt"; // Material-UI icons for UI buttons
import FlipIcon from "@mui/icons-material/Flip";
import DrawIcon from "@mui/icons-material/Draw";
import LoopIcon from "@mui/icons-material/Loop";
import ShapeLineSharpIcon from "@mui/icons-material/ShapeLineSharp";
import FormatColorTextSharpIcon from "@mui/icons-material/FormatColorTextSharp";
import UndoSharpIcon from "@mui/icons-material/UndoSharp";
import RedoSharpIcon from "@mui/icons-material/RedoSharp";
import ZoomInSharpIcon from "@mui/icons-material/ZoomInSharp";
import ZoomOutSharpIcon from "@mui/icons-material/ZoomOutSharp";
import RestartAltSharpIcon from "@mui/icons-material/RestartAltSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import CropFreeSharpIcon from "@mui/icons-material/CropFreeSharp";
import "tui-image-editor/dist/tui-image-editor.css"; // CSS for tui-image-editor
import img from "../images/XZHPZ.jpg"; // Sample image path
import myTheme from "./tuiSection/theme"; // Custom theme for tui-image-editor
import { fetchImages, saveImage } from "./tuiSection/imageService"; // Functions for fetching and saving images
import ImageList from "./tuiSection/ImageList"; // Component for rendering image list
import FlipControls from "./tuiSection/FlipControls"; // Controls for flipping images
import RotateControls from "./tuiSection/RotateControls"; // Controls for rotating images
import DrawControls from "./tuiSection/DrawControls"; // Controls for drawing shapes
import ShapeControls from "./tuiSection/ShapeControls"; // Controls for shapes (rectangles, circles, etc.)
import TextControls from "./tuiSection/TextControls"; // Controls for adding text
import CropComponent from "./tuiSection/CropControls"; // Controls for cropping images
import ResizeComponent from "./tuiSection/ResizeControls"; // Controls for resizing images
import MaskComponent from "./tuiSection/MarkControls"; // Controls for applying masks
import IconComponent from "./tuiSection/IconControls"; // Controls for adding icons
import FilterComponent from "./tuiSection/FilterControls"; // Controls for applying filters
import {
  handleClickFlipUtils,
  handleClickRoateUtils,
  handleClickDrawingUtils,
  handleClickShapeUtils,
  handleChangeShapeUtils,
  handleClickAddTextUtils,
  handleChangeTextStyleUtils,
  handleClickZoomInUtils,
  handleZoomOutUtils,
  handleDeleteUtils,
  handleCropUtils,
  handleCropApplyUtils,
  handleCropCancelUtils,
  handleImageEditorLoadUtils,
  handleMaskApplyUtils,
  handleLoadMaskImageChangeUtils,
  handleOnChangeWidthUtils,
  handleOnChangeHeightUtils,
  handleResizeApplyUtils,
  handleIconUtils,
  handleChangeIconColorStyleUtils,
  applyOrRemoveFilterUtils,
} from "./untily/TuiUntily"; // Utility functions for handling various editor actions

// Interface for props (currently empty)
interface ImageEditorComponentProps {}

// Enum defining different tabs for UI navigation
enum Tabs {
  ICON = "ICON",
  RESIZE = "RESIZE",
  MASK = "MASK",
  ZOOM = "ZOOM",
  SHAPE = "SHAPE",
  DRAW = "DRAW",
  FLIP = "FLIP",
  ROTATE = "ROTATE",
  TEXT = "TEXT",
  FILTER = "FILTER",
  CROP = "CROP",
}

// Functional component definition for the image editor
const TuiImageEditorComponent: React.FC<ImageEditorComponentProps> = () => {
  // Refs for accessing the editor DOM element and its instance
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<any>(null);

  // State variables for managing editor and image states
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageInfo, setImageInfo] = useState<any>(null);
  const [imageList, setImages] = useState<any>([]); // Array to hold fetched images
  const [imageURL, setImageURL] = useState<any>(null); // URL of selected image
  const [imageURLOri, setImageURLOri] = useState<any>(img); // Original image URL

  // State variables for drawing controls
  const [ClickDrawValue, setClickDrawValue] = useState<string>("FREE_DRAWING");
  const [width, setWidth] = useState(5); // Initial width for drawing tools
  const [color, setColor] = useState("#000"); // Initial color for drawing tools

  // State variables for shape drawing controls
  const [strokeWidth, setStrokeWidth] = useState<number>(12); // Initial stroke width for shapes
  const [fill, setFill] = useState<string>("#00ffff00"); // Initial fill color for shapes
  const [stroke, setStroke] = useState<string>("#000"); // Initial stroke color for shapes
  const [ClickshapeValue, setClickshapeValue] = useState<string>("rect"); // Initial shape type

  // State variables for text properties
  const [text, setText] = useState<string>("Sample Text"); // Initial text content
  const [textFill, setTextFill] = useState<string>("#000"); // Initial text color
  const [fontSize, setFontSize] = useState<number>(100); // Initial font size
  const [fontWeight, setFontWeight] = useState<string>("normal"); // Initial font weight
  const [fontFamily, setFontFamily] = useState<string>("Georgia, serif"); // Initial font family
  const [fontStyle, setFontStyle] = useState<string>("normal"); // Initial font style
  const [textAlign, setTextAlign] = useState<string>("left"); // Initial text alignment
  const [textDecoration, setTextDecoration] = useState<string>("overline"); // Initial text decoration

  // State variables for editor controls
  const [activeObject, setActiveObject] = useState<any>(); // Currently active object in the editor
  const [zoomLevel, setZoomLevel] = useState<number>(1.0); // Initial zoom level
  const [zoomInvalue, SetZoomInValue] = useState<boolean>(false); // Flag for zooming in
  const [showCropButton, setshowCropButton] = useState<boolean>(false); // Flag for showing crop controls

  // State variables for canvas dimensions
  const [startcanvasWidth, setStartCanvasWidth] = useState<number>(10); // Initial canvas width
  const [startcanvasHeight, setStartCanvasHeight] = useState<number>(10); // Initial canvas height
  const [canvasWidth, setCanvasWidth] = useState<any>(10); // Current canvas width
  const [canvasHeight, setCanvasHeight] = useState<any>(10); // Current canvas height

  // State variables for tracking flips
  const [CountTotalNumberOfFlip, setCountTotalNumberOfFlip] =
    useState<number>(0); // Total number of flips

  // State variables for moving objects (icons and text)
  const [objectMovedValueIcon, setobjectMovedValueIcon] = useState<any>();
  const [objectMovedValueText, setobjectMovedValueText] = useState<any>();

  // State variables for icon properties
  const [iconFill, setIconFill] = useState<string>("#000"); // Initial icon fill color
  const [iconSymbol, seticonSymbol] = useState<string>("arrow"); // Initial icon symbol

  // State variables for filter options
  const [filters, setFilters] = useState<any>({
    Grayscale: false,
    Invert: false,
    Sepia: false,
    Vintage: false,
    Blur: false,
    Sharpen: false,
    Emboss: false,
    removeColor: false,
    removeColorDistance: 140,
    Brightness: false,
    BrightnessValue: 127,
    Noise: false,
    NoiseValue: 50,
    Pixelate: false,
    PixelateValue: 50,
    Tint: false,
    TintColor: "#000",
    TintOpacity: 0.2,
    Multiply: false,
    MultiplyColor: "#000",
    Blend: false,
    BlendMode: "add",
    BlendColor: "#00FF00",
    ColorFilter: false,
    ColorFilterValue: 0,
  });

  // Flag indicating support for necessary File APIs
  const supportingFileAPI =
    !!window.File && !!window.FileReader && !!window.FileList && !!window.Blob;

  // State variable for active tab in the editor UI
  const [activeTab, setActiveTab] = useState<string | null>(null);

  useEffect(() => {
    // Initialize ImageEditor when editorRef is available
    if (editorRef.current) {
      const editorInstance = new ImageEditor(editorRef.current, {
        includeUI: {
          theme: myTheme,
          loadImage: {
            path: img,
            name: "SampleImage",
          },
          menu: ["shape", "text", "crop", "icon", "filter"],
          uiSize: {
            height: `100vh`,
            width: "100%",
          },
          menuBarPosition: "top",
        },
        cssMaxWidth: 700,
        cssMaxHeight: 900,
      });
      editorInstanceRef.current = editorInstance;

      // Function to check if image is loaded
      const checkImageLoaded = () => {
        if (editorInstanceRef.current && editorInstanceRef.current._graphics) {
          const canvasSize = editorInstance.getCanvasSize();
          const canvasWidth = canvasSize.width;
          const canvasHeight = canvasSize.height;
          setCanvasWidth(canvasHeight); // Set canvas width
          setCanvasHeight(canvasWidth); // Set canvas height
        }
      };

      // Check image load after 200ms
      const imageLoadInterval = setTimeout(checkImageLoaded, 200);
    }
  }, []);

  useEffect(() => {
    // Fetch images data on component mount
    fetchImagesData();
  }, []);

  const handleSaveImage = () => {
    // Handle saving edited image
    const editorInstance = editorInstanceRef.current;
    if (editorInstance) {
      const dataUrl = editorInstance.toDataURL(); // Get image data URL
      alert("save image!");
      saveImage(dataUrl); // Save image function
    }
  };

  const fetchImagesData = async () => {
    // Fetch images data asynchronously
    const images = await fetchImages();
    setImages(images); // Set fetched images to state
  };

  const handleImageChange = (url: string) => {
    // Update state with new image URL
    setImageURL(url);
    // Load the image into the editor instance from the provided URL
    editorInstanceRef.current.loadImageFromURL(url, "New Image");
  };

  const handleImageChangeOriginal = (url: string) => {
    // Update state with the original image URL
    setImageURLOri(url);
  };

  const handleDownloadImage = () => {
    const editorInstance = editorInstanceRef.current;
    if (editorInstance) {
      // Get the current edited image as a data URL
      const dataUrl = editorInstance.toDataURL();
      // Get the name of the image
      const imageName = editorInstance.getImageName();
      // Create a temporary link element to download the image
      const link = document.createElement("a");
      link.href = dataUrl; // Set the href attribute to the data URL
      link.download = imageName; // Set the download attribute to the image name
      link.click(); // Programmatically click the link to trigger the download
    }
  };

  const handleClickFlip = (action: string) => {
    const editorInstance = editorInstanceRef.current;
    // Handle flipping action using utility function
    handleClickFlipUtils(
      editorInstance,
      action,
      CountTotalNumberOfFlip,
      setCountTotalNumberOfFlip
    );
  };

  const handleClickRoate = (value: string) => {
    const editorInstance = editorInstanceRef.current;
    // Handle rotating action using utility function
    handleClickRoateUtils(editorInstance, value);
  };

  const handleClickDrawing = (action: string, value: any) => {
    const editorInstance = editorInstanceRef.current;
    // Handle drawing action using utility function
    handleClickDrawingUtils(
      editorInstance,
      action,
      value,
      setClickDrawValue,
      setActiveObject
    );
  };

  const handleClickDrawingArrow = (action: string, value: any) => {
    const editorInstance = editorInstanceRef.current;
    // Handle drawing arrow action using utility function (similar to handleClickDrawing)
    handleClickDrawingUtils(
      editorInstance,
      action,
      value,
      setClickDrawValue,
      setActiveObject
    );
  };

  const handleClickShape = (action: string, value: any) => {
    const editorInstance = editorInstanceRef.current;
    // Handle shape actions using utility function
    handleClickShapeUtils(
      editorInstance,
      setClickshapeValue,
      setActiveObject,
      action,
      value
    );
  };

  const handleChangeShape = (fill: any, stroke: any, strokeWidth: any) => {
    const editorInstance = editorInstanceRef.current;
    // Handle changing shape properties (fill, stroke, strokeWidth) using utility function
    handleChangeShapeUtils(
      editorInstance,
      fill,
      stroke,
      strokeWidth,
      activeObject
    );
  };

  const handleClickAddText = (
    e: any,
    textFill: string,
    fontSize: number,
    fontWeight: string,
    fontFamily: string,
    textAlign: string,
    textDecoration: string,
    fontStyle: string
  ) => {
    const editorInstance = editorInstanceRef.current;
    // Handle adding text using utility function
    handleClickAddTextUtils(
      e,
      textFill,
      fontSize,
      fontWeight,
      fontFamily,
      textAlign,
      textDecoration,
      fontStyle,
      setActiveObject,
      editorInstance,
      setobjectMovedValueText,
      objectMovedValueText
    );
  };

  const handleChangeTextStyle = (
    textFill: string,
    fontSize: number,
    fontWeight: string,
    fontFamily: string,
    textAlign: string,
    textDecoration: string,
    fontStyle: string
  ) => {
    const editorInstance = editorInstanceRef.current;
    // Handle changing text style using utility function
    handleChangeTextStyleUtils(
      textFill,
      fontSize,
      fontWeight,
      fontFamily,
      textAlign,
      textDecoration,
      fontStyle,
      editorInstance,
      activeObject
    );
  };

  const handleUndo = () => {
    const editorInstance = editorInstanceRef.current;
    // Check if undo stack is not empty and perform undo operation
    let undo = editorInstance.isEmptyUndoStack();
    if (!undo) {
      editorInstance
        .undo()
        .then((status: any) => {
          console.info("Undo status: ", status);
        })
        .catch((message: any) => {
          console.error("Undo error: ", message);
        });
    }
  };

  const handleRedo = () => {
    const editorInstance = editorInstanceRef.current;
    // Check if redo stack is not empty and perform redo operation
    let redo = editorInstance.isEmptyRedoStack();
    if (!redo) {
      editorInstance.redo();
    }
  };

  const handleRest = () => {
    const editorInstance = editorInstanceRef.current;
    // Clear all objects (shapes, text, etc.) from the editor canvas
    editorInstance.clearObjects();
  };

  const handleClickZoomIn = (e: any) => {
    const editorInstance = editorInstanceRef.current;
    // Handle zoom-in action using utility function
    handleClickZoomInUtils(e, setZoomLevel, editorInstance, zoomLevel);
  };

  const handleZoomOut = () => {
    const editorInstance = editorInstanceRef.current;
    // Handle zoom-out action using utility function
    handleZoomOutUtils(
      setZoomLevel,
      editorInstance,
      zoomLevel,
      SetZoomInValue,
      zoomInvalue
    );
  };

  const handleDelete = () => {
    const editorInstance = editorInstanceRef?.current;
    // Handle deletion of active object in the editor using utility function
    handleDeleteUtils(editorInstance, activeObject, setActiveObject);
  };

  const handleCrop = () => {
    // Handle showing/hiding crop options using utility function
    handleCropUtils(editorInstanceRef, setshowCropButton, showCropButton);
  };

  const handleCropApply = () => {
    // Apply crop action using utility function
    handleCropApplyUtils(editorInstanceRef);
  };

  const handleCropCancel = () => {
    // Cancel crop action using utility function
    handleCropCancelUtils(editorInstanceRef, setshowCropButton);
  };

  const handleImageEditorLoad = () => {
    // Handle actions after the image editor is loaded using utility function
    handleImageEditorLoadUtils(editorInstanceRef);
  };

  const handleMaskApply = () => {
    // Apply mask to active object using utility function
    handleMaskApplyUtils(editorInstanceRef, activeObject);
  };

  const handleLoadMaskImageChange = (e: any) => {
    // Handle loading mask image change using utility function
    handleLoadMaskImageChangeUtils(
      e,
      editorInstanceRef,
      supportingFileAPI,
      setActiveObject
    );
  };

  const handleOnChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle width change of editor canvas using utility function
    handleOnChangeWidthUtils(
      e,
      setCanvasWidth,
      editorInstanceRef,
      canvasWidth,
      canvasHeight
    );
  };

  const handleOnChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Handle height change of editor canvas using utility function
    handleOnChangeHeightUtils(
      e,
      setCanvasHeight,
      editorInstanceRef,
      canvasWidth,
      canvasHeight
    );
  };

  const handleResizeApply = () => {
    setActiveTab(activeTab == "RESIZE" ? null : null);
    // Handle apply resize action using utility function (commented out in the original code)
    // handleResizeApplyUtils(
    //   setActiveTab,
    //   activeTab,
    //   editorInstanceRef,
    //   canvasWidth,
    //   canvasHeight
    // );
  };

  const handleResizeCancel = () => {
    const editorInstance = editorInstanceRef.current;
    // Cancel resize action and reset canvas dimensions using utility function
    editorInstance.resize({
      width: startcanvasWidth,
      height: startcanvasHeight,
    });
    setActiveTab(activeTab == "RESIZE" ? null : null);
  };

  const handleIcon = (e: any) => {
    // Handle adding icon to editor canvas using utility function
    handleIconUtils(
      e,
      editorInstanceRef,
      setobjectMovedValueIcon,
      objectMovedValueIcon,
      setActiveObject,
      iconSymbol,
      iconFill
    );
  };

  const handleChangeIconColorStyle = () => {
    // Handle changing icon color style using utility function
    handleChangeIconColorStyleUtils(editorInstanceRef, activeObject, iconFill);
  };

  const applyOrRemoveFilter = (
    applying: boolean | number | string,
    type: string,
    options: any
  ) => {
    // Apply or remove filter to/from active object using utility function
    applyOrRemoveFilterUtils(editorInstanceRef, applying, type, options);
  };

  const handleTabClick = (tab: string) => {
    const editorInstance = editorInstanceRef.current;
    // Handle tab click action, update canvas dimensions and active tab state
    const canvasSize = editorInstance.getCanvasSize();
    const canvasWidth = canvasSize.width;
    const canvasHeight = canvasSize.height;
    setStartCanvasWidth(canvasHeight);
    setStartCanvasHeight(canvasWidth);
    SetZoomInValue(false);
    setActiveTab(activeTab === tab ? null : tab);
  };

  return (
    <div className="cm-image-editor-wrapper">
      <div className="cm-editor-parent">
        <div className="cm-editor-child cm-editor-left-panel">
          {/* Save button for saving the edited image */}
          <button className="btn" onClick={handleSaveImage}>
            <SaveAltIcon fontSize="large" />
          </button>
          {/* Download button for downloading the edited image */}
          <button className="btn" onClick={handleDownloadImage}>
            download
          </button>

          {/* Tab buttons for different editor functionalities */}
          <div>
            {/* Icon tab */}
            <button onClick={() => handleTabClick(Tabs.ICON)}>Icon</button>
            {activeTab === Tabs.ICON && (
              <div>
                {/* Component for handling icons */}
                <IconComponent
                  handleIcon={handleIcon}
                  setIconFill={setIconFill}
                  iconFill={iconFill}
                  seticonSymbol={seticonSymbol}
                  handleChangeIconColorStyle={handleChangeIconColorStyle}
                />
              </div>
            )}

            {/* Resize tab */}
            <button onClick={() => handleTabClick(Tabs.RESIZE)}>Resize</button>
            {activeTab === Tabs.RESIZE && (
              <div>
                {/* Component for resizing the canvas */}
                <ResizeComponent
                  canvasWidth={canvasWidth}
                  canvasHeight={canvasHeight}
                  startcanvasWidth={startcanvasWidth}
                  startcanvasHeight={startcanvasHeight}
                  handleOnChangeWidth={handleOnChangeWidth}
                  handleOnChangeHeight={handleOnChangeHeight}
                  handleResizeApply={handleResizeApply}
                  handleResizeCancel={handleResizeCancel}
                />
              </div>
            )}

            {/* Mask tab */}
            <button onClick={() => handleTabClick(Tabs.MASK)}>Mask</button>
            {activeTab === Tabs.MASK && (
              <div>
                {/* Component for masking an image */}
                <MaskComponent
                  handleLoadMaskImageChange={handleLoadMaskImageChange}
                  handleMaskApply={handleMaskApply}
                />
              </div>
            )}

            {/* Zoom In button */}
            <button onClick={() => SetZoomInValue(!zoomInvalue)}>
              Zoom In
            </button>

            {/* Zoom Out button */}
            <button className="btn" onClick={handleZoomOut}>
              Zoom Out
            </button>

            {/* Undo button */}
            <button className="btn" onClick={handleUndo}>
              Undo
            </button>

            {/* Redo button */}
            <button className="btn" onClick={handleRedo}>
              Redo
            </button>

            {/* Delete button */}
            <button className="btn" onClick={handleDelete}>
              Delete
            </button>

            {/* Crop button */}
            <button className="btn" onClick={handleCrop}>
              Crop
            </button>

            {/* Reset button */}
            <button className="btn" onClick={handleRest}>
              <RestartAltSharpIcon fontSize="large" />
            </button>

            {/* Shape tab */}
            <button onClick={() => handleTabClick(Tabs.SHAPE)}>Shape</button>
            {activeTab === Tabs.SHAPE && (
              <div>
                {/* Component for drawing shapes */}
                <ShapeControls
                  handleClickShape={handleClickShape}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  setFill={setFill}
                  setStroke={setStroke}
                  handleChangeShape={handleChangeShape}
                  setStrokeWidth={setStrokeWidth}
                  ClickshapeValue={ClickshapeValue}
                />
              </div>
            )}

            {/* Crop tab */}
            <button onClick={() => handleTabClick(Tabs.CROP)}>Crop</button>
            {activeTab === Tabs.CROP && (
              <div>
                {/* Component for cropping an image */}
                <CropComponent
                  handleCropApply={handleCropApply}
                  handleCropCancel={handleCropCancel}
                />
              </div>
            )}

            {/* Filter tab */}
            <button onClick={() => handleTabClick(Tabs.FILTER)}>filter</button>
            {activeTab === Tabs.FILTER && (
              <div>
                {/* Component for applying filters */}
                <FilterComponent
                  filters={filters}
                  setFilters={setFilters}
                  applyOrRemoveFilter={applyOrRemoveFilter}
                />
              </div>
            )}

            {/* Draw tab */}
            <button onClick={() => handleTabClick(Tabs.DRAW)}>Draw</button>
            {activeTab === Tabs.DRAW && (
              <div>
                {/* Component for drawing on the canvas */}
                <DrawControls
                  handleClickDrawing={handleClickDrawing}
                  handleClickDrawingArrow={handleClickDrawingArrow}
                  width={width}
                  color={color}
                  setWidth={setWidth}
                  setColor={setColor}
                  ClickDrawValue={ClickDrawValue}
                />
              </div>
            )}

            {/* Flip tab */}
            <button onClick={() => handleTabClick(Tabs.FLIP)}>Flip</button>
            {activeTab === Tabs.FLIP && (
              <div>
                {/* Component for flipping objects */}
                <FlipControls
                  CountTotalNumberOfFlip={CountTotalNumberOfFlip}
                  handleClick={handleClickFlip}
                />
              </div>
            )}

            {/* Rotate tab */}
            <button onClick={() => handleTabClick(Tabs.ROTATE)}>Rotate</button>
            {activeTab === Tabs.ROTATE && (
              <div>
                {/* Component for rotating objects */}
                <RotateControls handleClick={handleClickRoate} />
              </div>
            )}

            {/* Text tab */}
            <button onClick={() => handleTabClick(Tabs.TEXT)}>Text</button>
            {activeTab === Tabs.TEXT && (
              <div>
                {/* Component for adding and styling text */}
                <TextControls
                  textFill={textFill}
                  fontSize={fontSize}
                  fontWeight={fontWeight}
                  fontFamily={fontFamily}
                  fontStyle={fontStyle}
                  textAlign={textAlign}
                  handleChangeTextStyle={handleChangeTextStyle}
                  textDecoration={textDecoration}
                  setTextFill={setTextFill}
                  setFontSize={setFontSize}
                  setFontWeight={setFontWeight}
                  setFontFamily={setFontFamily}
                  setFontStyle={setFontStyle}
                  setTextDecoration={setTextDecoration}
                  setTextAlign={setTextAlign}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Editor canvas where interactions are handled */}
      <div
        onClick={
          zoomInvalue
            ? handleClickZoomIn
            : activeTab == Tabs.TEXT
            ? (e: any) =>
                handleClickAddText(
                  e,
                  textFill,
                  fontSize,
                  fontWeight,
                  fontFamily,
                  textAlign,
                  textDecoration,
                  fontStyle
                )
            : activeTab === Tabs.ICON
            ? (e: any) => handleIcon(e)
            : undefined
        }
        onLoad={handleImageEditorLoad}
        ref={editorRef}
      />

      {/* ImageList component for displaying and selecting images */}
      <div>
        <ImageList
          images={imageList}
          onImageChange={handleImageChange}
          onImageChangeOriginal={handleImageChangeOriginal}
        />
      </div>
    </div>
  );
};

export default TuiImageEditorComponent;
