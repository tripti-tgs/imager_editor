// Utility function to handle flip actions (flipX, flipY, resetFlip) on the editor instance
export const handleClickFlipUtils = (
  editorInstance: any,
  action: string,
  CountTotalNumberOfFlip: number,
  setCountTotalNumberOfFlip: any
) => {
  switch (action) {
    case "flipX":
      // Perform flipX action on the editor instance
      editorInstance
        .flipX()
        .then((status: any) => {
          // Increment flip count on successful flip
          setCountTotalNumberOfFlip(CountTotalNumberOfFlip + 1);
        })
        .catch((message: Error) => {
          console.error("error: ", message);
        });
      break;
    case "flipY":
      // Perform flipY action on the editor instance
      editorInstance
        .flipY()
        .then((status: any) => {
          // Increment flip count on successful flip
          setCountTotalNumberOfFlip(CountTotalNumberOfFlip + 1);
        })
        .catch((message: Error) => {
          console.error("error: ", message);
        });
      break;
    case "resetflip":
      // Perform resetFlip action on the editor instance
      editorInstance
        .resetFlip()
        .then((status: any) => {
          // Decrement flip count on successful reset
          setCountTotalNumberOfFlip(CountTotalNumberOfFlip - 1);
        })
        .catch((message: Error) => {
          console.error("error: ", message);
        });
      break;
    default:
      break;
  }
};

// Utility function to handle rotation action on the editor instance
export const handleClickRoateUtils = (editorInstance: any, value: string) => {
  editorInstance.rotate(value);
};

// Utility function to handle drawing actions (e.g., drawing shapes, lines) on the editor instance
export const handleClickDrawingUtils = (
  editorInstance: any,
  action: string,
  value: any,
  setClickDrawValue: any,
  setActiveObject: any
) => {
  // Set the current drawing action
  setClickDrawValue(action);
  if (editorInstance) {
    // Stop any previous drawing mode and start the new one
    editorInstance.stopDrawingMode();
    editorInstance.startDrawingMode(action, value);
    // Listen for the object activation event
    editorInstance.on("objectActivated", (objectProps: any) => {
      setActiveObject(objectProps);
    });
  }
};

// Utility function to handle shape drawing on the editor instance
export const handleClickShapeUtils = (
  editorInstance: any,
  setClickshapeValue: any,
  setActiveObject: any,
  action: string,
  value: any
) => {
  // Set the current shape drawing action
  setClickshapeValue(action);
  if (editorInstance) {
    console.log(editorInstance)
    // Stop any previous drawing mode and start the shape drawing mode
    editorInstance.stopDrawingMode();
    editorInstance.startDrawingMode("SHAPE");
    // Listen for the object activation event
    editorInstance.on({
      objectActivated: function (objectProps: any) {
        setActiveObject(objectProps);
      },
    });
    // Set the specific shape type and properties
    editorInstance.setDrawingShape(action, value);
  }
};

// Utility function to handle changes in shape properties (e.g., fill color, stroke color, stroke width) on the editor instance
export const handleChangeShapeUtils = (
  editorInstance: any,
  fill: any,
  stroke: any,
  strokeWidth: any,
  activeObject: any
) => {
  try {
    let id: any = activeObject.id;
    // Change shape properties using the editor instance
    editorInstance.changeShape(id, {
      fill: fill,
      stroke: stroke,
      strokeWidth: strokeWidth,
    });
  } catch (err) {
    console.error(err);
  }
};

// Utility function to handle adding text to the canvas on the editor instance
export const handleClickAddTextUtils = (
  e: any,
  textFill: string,
  fontSize: number,
  fontWeight: string,
  fontFamily: string,
  textAlign: string,
  textDecoration: string,
  fontStyle: string,
  setActiveObject: any,
  editorInstance: any,
  setobjectMovedValueText: any,
  objectMovedValueText: any
) => {
  e.preventDefault();

  // Get canvas size and calculate normalized coordinates for text placement
  const canvasSize = editorInstance.getCanvasSize();
  const canvasWidth = canvasSize.width;
  const canvasHeight = canvasSize.height;
  const container = editorInstance.ui._editorElement;
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const normalizedX = (x / rect.width) * canvasWidth;
  const normalizedY = (y / rect.height) * canvasHeight;

  // Listen for the object moved event
  editorInstance.on("objectMoved", function (props: any) {
    setobjectMovedValueText(props);
  });

  // Add text to the canvas if no text object has been moved
  if (!objectMovedValueText) {
    addTextfunction(
      textFill,
      fontSize,
      fontWeight,
      fontFamily,
      textAlign,
      textDecoration,
      fontStyle,
      editorInstance,
      normalizedX,
      normalizedY,
      setActiveObject
    );
  }
};

// Helper function to add text to the canvas with specified properties
function addTextfunction(
  textFill: string,
  fontSize: number,
  fontWeight: string,
  fontFamily: string,
  textAlign: string,
  textDecoration: string,
  fontStyle: string,
  editorInstance: any,
  normalizedX: any,
  normalizedY: any,
  setActiveObject: any
) {
    editorInstance.stopDrawingMode();
  editorInstance
    .addText("init text", {
      styles: {
        fill: textFill,
        fontSize: fontSize,
        fontWeight: fontWeight,
        textAlign: textAlign,
        textDecoration: textDecoration,
        fontStyle: fontStyle,
      },
      position: {
        x: normalizedX,
        y: normalizedY,
      },
    })
    .then((objectProps: any) => {
      // Set the newly added text object as active
      setActiveObject(objectProps);
    });
}

// Utility function to handle changes in text style properties on the editor instance
export const handleChangeTextStyleUtils = (
  textFill: string,
  fontSize: number,
  fontWeight: string,
  fontFamily: string,
  textAlign: string,
  textDecoration: string,
  fontStyle: string,
  activeObject: any,
  editorInstance: any
) => {
  try {
    let id: any = activeObject.id;
    // Change text style properties using the editor instance
    editorInstance.changeTextStyle(id, {
      fontWeight: fontWeight,
      fontFamily: fontFamily,
      fill: textFill,
      fontSize: fontSize,
      fontStyle: fontStyle,
      textAlign: textAlign,
      textDecoration: textDecoration,
    });
  } catch (err) {
    console.error(err);
  }
};

// Utility function to handle zoom in action on the editor instance
export const handleClickZoomInUtils = (
  e: any,
  setZoomLevel: any,
  editorInstance: any,
  zoomLevel: number
) => {
  // Increment zoom level
  setZoomLevel(zoomLevel + 0.1);

  // Get canvas size and calculate normalized coordinates for zoom center
  const canvasSize = editorInstance.getCanvasSize();
  const canvasWidth = canvasSize.width;
  const canvasHeight = canvasSize.height;
  const container = editorInstance.ui._editorElement;
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const normalizedX = (x / rect.width) * canvasWidth;
  const normalizedY = (y / rect.height) * canvasHeight;

  // Apply zoom on the editor instance
  editorInstance.zoom(
    { x: normalizedX, y: normalizedY, zoomLevel },
    normalizedX,
    normalizedY,
    zoomLevel
  );
};

// Utility function to handle zoom out action on the editor instance
export const handleZoomOutUtils = (
  setZoomLevel: any,
  editorInstance: any,
  zoomLevel: number,
  SetZoomInValue: any,
  zoomInvalue: any
) => {
  // Get canvas size
  const canvasSize = editorInstance.getCanvasSize();
  const canvasWidth = canvasSize.width;
  const canvasHeight = canvasSize.height;

  // Decrement zoom level
  setZoomLevel(zoomLevel - 0.1);

  // Apply zoom out if the zoom level is greater or equal to 1
  if (zoomLevel >= 1) {
    editorInstance.zoom({
      x: canvasWidth / 2,
      y: canvasHeight / 2,
      zoomLevel: zoomLevel,
    });
  }

  // Toggle zoom-in value
  SetZoomInValue(!zoomInvalue);
};

// Utility function to handle deletion of an active object from the canvas on the editor instance
export const handleDeleteUtils = (
  editorInstance: any,
  activeObject: any,
  setActiveObject: any
) => {
  if (activeObject) {
    try {
      let id = activeObject.id;
      // Remove the active object from
      editorInstance.removeObject(parseInt(id));
      setActiveObject(null); // Clear the active object after removal
    } catch (err) {
      console.error(err);
    }
  }
};

// Utility function to start the cropping mode on the editor instance
export const handleCropUtils = (
  editorInstanceRef: any,
  setshowCropButton: any,
  showCropButton: any
) => {
  const editorInstance = editorInstanceRef?.current;
  try {
    // Start the cropping mode
    editorInstance.startDrawingMode("CROPPER");
    editorInstance.setCropzoneRect(1, 1, 1, 1); // Set initial cropzone rectangle
    setshowCropButton(!showCropButton); // Toggle showCropButton state
  } catch (err) {
    console.error(err);
  }
};

// Utility function to apply the crop action on the editor instance
export const handleCropApplyUtils = (editorInstanceRef: any) => {
  const editorInstance = editorInstanceRef.current;
  editorInstance.crop(editorInstance.getCropzoneRect()); // Perform crop action using current cropzone rectangle
};

// Utility function to cancel the cropping mode on the editor instance
export const handleCropCancelUtils = (
  editorInstanceRef: any,
  setshowCropButton: any
) => {
  const editorInstance = editorInstanceRef.current;
  editorInstance.stopDrawingMode(); // Stop the drawing mode (cropping)
  setshowCropButton(false); // Hide the crop button
};

// Utility function to handle actions after the image editor is loaded
export const handleImageEditorLoadUtils = (editorInstanceRef: any) => {
  const editorInstance = editorInstanceRef.current;
  if (editorInstance) {
    editorInstance.on("objectMoved", () => {
      // Log crop rectangle position when an object is moved
      const cropRect =
        editorInstance._graphics && editorInstance._graphics.getCropzoneRect
          ? editorInstance._graphics.getCropzoneRect()
          : null;
      console.info(cropRect);
    });
  }
};

// Utility function to apply mask filter on an image object
export const handleMaskApplyUtils = (
  editorInstanceRef: any,
  activeObject: any
) => {
  const editorInstance = editorInstanceRef.current;
  if (editorInstance && activeObject) {
    if (activeObject.type == "image") {
      let id: any = activeObject.id;
      // Apply mask filter on the selected image object
      editorInstance
        .applyFilter("mask", {
          maskObjId: id,
        })
        .then((result: any) => {
          console.info(result);
        });
    }
  }
};

// Utility function to handle loading of a mask image and applying it on the editor instance
export const handleLoadMaskImageChangeUtils = (
  e: any,
  editorInstanceRef: any,
  supportingFileAPI: boolean,
  setActiveObject: any
) => {
  const editorInstance = editorInstanceRef.current;
  if (!supportingFileAPI) {
    alert("This browser does not support file-api");
    return;
  }

  const file = e.target.files?.[0];

  if (file) {
    const imgUrl = URL.createObjectURL(file);
    if (editorInstance) {
      editorInstance
        .loadImageFromURL(editorInstance.toDataURL(), "FilterImage")
        .then(() => {
          if (editorInstance) {
            editorInstance.addImageObject(imgUrl).then((objectProps: any) => {
              URL.revokeObjectURL(file);

              setActiveObject(objectProps); // Set the newly added image object as active
            });
          }
        });
    }
  }
};

// Utility function to handle change in canvas width input
export const handleOnChangeWidthUtils = (
  e: React.ChangeEvent<HTMLInputElement>,
  setCanvasWidth: any,
  editorInstanceRef: any,
  canvasWidth: any,
  canvasHeight: any
) => {
  setCanvasWidth(parseInt(e.target.value)); // Update canvas width state
  resizeCanvasDimension(editorInstanceRef, canvasWidth, canvasHeight); // Resize canvas dimensions
};

// Utility function to handle change in canvas height input
export const handleOnChangeHeightUtils = (
  e: React.ChangeEvent<HTMLInputElement>,
  setCanvasHeight: any,
  editorInstanceRef: any,
  canvasWidth: any,
  canvasHeight: any
) => {
  setCanvasHeight(parseInt(e.target.value)); // Update canvas height state
  resizeCanvasDimension(editorInstanceRef, canvasWidth, canvasHeight); // Resize canvas dimensions
};

// Utility function to apply resized canvas dimensions
export const handleResizeApplyUtils = (
  editorInstanceRef: any,
  canvasWidth: any,
  canvasHeight: any,
  setActiveTab: any,
  activeTab: any
) => {
  resizeCanvasDimension(editorInstanceRef, canvasWidth, canvasHeight); // Resize canvas dimensions
  setActiveTab(activeTab == "RESIZE" ? null : null);
};

// Helper function to resize canvas dimensions using editor instance
const resizeCanvasDimension = (
  editorInstanceRef: any,
  canvasWidth: any,
  canvasHeight: any
) => {
  const editorInstance = editorInstanceRef.current;
  if (editorInstance && canvasWidth && canvasHeight) {
    const newCanvasDimensions = { width: canvasWidth, height: canvasHeight };
    // Resize canvas using editor instance
    editorInstance
      .resize(newCanvasDimensions)
      .then(() => {
        console.info(
          `Canvas resized to width: ${canvasWidth}, height: ${canvasHeight}`
        );
      })
      .catch((err: Error) => {
        console.error("Error resizing canvas:", err);
      });
  }
};

// Utility function to handle adding icons to the canvas on the editor instance
export const handleIconUtils = (
  e: any,
  editorInstanceRef: any,
  setobjectMovedValueIcon: any,
  objectMovedValueIcon: any,
  setActiveObject: any,
  iconSymbol: string,
  iconFill: string
) => {
  const editorInstance = editorInstanceRef.current;

  // Get canvas size and calculate normalized coordinates for icon placement
  const canvasSize = editorInstance.getCanvasSize();
  const canvasWidth = canvasSize.width;
  const canvasHeight = canvasSize.height;
  const container = editorInstance.ui._editorElement;
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const normalizedX = (x / rect.width) * canvasWidth;
  const normalizedY = (y / rect.height) * canvasHeight;

  // Listen for the object moved event
  editorInstance.on("objectMoved", function (props: any) {
    setobjectMovedValueIcon(props);
  });

  // Add icon to the canvas if no icon object has been moved
  if (!objectMovedValueIcon) {
    addicon(
      editorInstance,
      normalizedX,
      normalizedY,
      setActiveObject,
      iconSymbol,
      iconFill
    );
  }
};

// Helper function to add icon to the canvas with specified properties
function addicon(
  editorInstance: any,
  normalizedX: any,
  normalizedY: any,
  setActiveObject: any,
  iconSymbol: string,
  iconFill: string
) {
  try {
    // Register custom icons (if needed)
    editorInstance.registerIcons({
      customArrow: "M 60 0 L 120 60 H 90 L 75 45 V 180 H 45 V 45 L 30 60 H 0 Z",
    });
    editorInstance.on("objectAdded", function (props: any) {
      console.info("props", props);
    });
  } catch (err) {
    console.error(err);
  }

  // Add icon to the canvas
  editorInstance
    .addIcon(iconSymbol, {
      fill: iconFill,
      left: normalizedX,
      top: normalizedY,
    })
    .then((objectProps: any) => {
      console.info(objectProps);
      setActiveObject(objectProps); // Set the newly added icon object as active
    })
    .catch((err: Error) => {
      console.error("Error Icon canvas:", err);
    });
}

// Utility function to handle changes in icon color style on the editor instance
export const handleChangeIconColorStyleUtils = (
  editorInstanceRef: any,
  activeObject: any,
  iconFill: string
) => {
  const editorInstance = editorInstanceRef.current;
  try {
    if (activeObject && activeObject.type == "icon") {
      let id: any = activeObject.id;
      // Change icon color style using the editor instance
      editorInstance.changeIconColor(id, iconFill);
    }
  } catch (err) {
    console.error(err);
  }
};

// Utility function to apply or remove filters on the editor instance
export const applyOrRemoveFilterUtils = (
  editorInstanceRef: any,
  applying: boolean | number | string,
  type: string,
  options: any
) => {
  const editorInstance = editorInstanceRef.current;
  if (applying) {
    // Apply filter on the editor instance
    editorInstance
      .applyFilter(type, options)
      .then((result: any) => {
        console.info(result);
      })
      .catch((message: any) => {
        console.error("error: ", message);
      });
  } else {
    // Remove filter from the editor instance
    editorInstance.removeFilter(type);
  }
};
