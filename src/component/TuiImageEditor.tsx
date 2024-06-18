import React, { useEffect, useRef, useState } from "react";
import ImageEditor from "tui-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";
import img from "../images/shutterstock_1830102921.webp";
import myTheme from "./tuiSection/theme";
import { fetchImages, saveImage } from "./tuiSection/imageService";
import ImageList from "./tuiSection/ImageList";
import FlipControls from "./tuiSection/FlipControls";
import RotateControls from "./tuiSection/RotateControls";
import DrawControls from "./tuiSection/DrawControls";
import ShapeControls from "./tuiSection/ShapeControls";
import TextControls from "./tuiSection/TextControls";

interface ImageEditorComponentProps {}

const TuiImageEditorComponent: React.FC<ImageEditorComponentProps> = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<any>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [imageInfo, setImageInfo] = useState<any>(null);
  const [imageList, setImages] = useState<any>([]);
  const [imageURL, setImageURL] = useState<any>(null);
  const [imageURLOri, setImageURLOri] = useState<any>(img);
  const [flipshow, setFlipShow] = useState<boolean>(false);
  const [rotateshow, setRotateShow] = useState<boolean>(false);
  const [drawshow, setdrawShow] = useState<boolean>(false);

  const [ClickDrawValue, setClickDrawValue] = useState<string>("FREE_DRAWING");
  const [width, setWidth] = useState(5);
  const [color, setColor] = useState("#000");

  const [shapeshow, setShapeShow] = useState<boolean>(false);
  const [strokeWidth, setStrokeWidth] = useState<number>(12);
  const [fill, setFill] = useState<string>("#00ffff00");
  const [stroke, setStroke] = useState<string>("#000");
  const [ClickshapeValue, setClickshapeValue] = useState<string>("rect");

  const [textshow, setTextShow] = useState<boolean>(false);
  // State variables for text properties
  const [text, setText] = useState<string>("Sample Text");
  const [textFill, setTextFill] = useState<string>("#000");
  const [fontSize, setFontSize] = useState<number>(100);
  const [fontWeight, setFontWeight] = useState<string>("normal");
  const [fontFamily, setFontFamily] = useState<string>("Georgia, serif");
  const [fontStyle, setFontStyle] = useState<string>("normal");
  const [textAlign, setTextAlign] = useState<string>("left");
  const [textDecoration, setTextDecoration] = useState<string>("overline");

  const [activeObject, setActiveObject] = useState<any>();
  const [zoomLevel, setZoomLevel] = useState<number>(1.0);
  const [zoomInvalue, SetZoomInValue] = useState<boolean>(false);
  const [showCropButton, setshowCropButton] = useState<boolean>(false);
  const [showMaskSubMeun, setShowMaskSubMeun] = useState<boolean>(false);
  const [showResizeSubMenu, setShowResizeSubMenu] = useState<boolean>(false);
  const [canvasWidth, setCanvasWidth] = useState<number | undefined>(undefined);
  const [canvasHeight, setCanvasHeight] = useState<number | undefined>(
    undefined
  );
  const [CountTotalNumberOfFlip, setCountTotalNumberOfFlip] =
    useState<number>(0);

  // const[showHistory,setShowHistory] = useState<boolean>(false)

  const handleClick = (action: string, value: any) => {
    const editorInstance = editorInstanceRef.current;
    if (editorInstance) {
      switch (action) {
        case "flipX":
          editorInstance
            .flipX()
            .then((status: any) => {
              setCountTotalNumberOfFlip(CountTotalNumberOfFlip + 1);
            })
            .catch((message: Error) => {
              console.error("error: ", message);
            });
          break;
        case "flipY":
          editorInstance
            .flipY()

            .then((status: any) => {
              setCountTotalNumberOfFlip(CountTotalNumberOfFlip + 1);
            })
            .catch((message: Error) => {
              console.error("error: ", message);
            });
          break;
        case "resetflip":
          editorInstance
            .resetFlip()
            .then((status: any) => {
              setCountTotalNumberOfFlip(CountTotalNumberOfFlip - 1);
            })
            .catch((message: Error) => {
              console.error("error: ", message);
            });
          break;
        case "rotate":
          editorInstance.rotate(value);
          break;
        default:
          break;
      }
    }
  };

  const handleClickDrawing = (action: string, value: any) => {
    const editorInstance = editorInstanceRef.current;
    setClickDrawValue(action);
    if (editorInstance) {
      editorInstance.stopDrawingMode();
      editorInstance.startDrawingMode(action, value);
      editorInstance.on("objectActivated", (objectProps: any) => {
        // console.info(objectProps);
        setActiveObject(objectProps);
      });
    }
  };

  const handleClickDrawingArrow = (action: string, value: any) => {
    const editorInstance = editorInstanceRef.current;
    setClickDrawValue(action);
    if (editorInstance) {
      editorInstance.stopDrawingMode();
      editorInstance.startDrawingMode(action, value);
    }
  };

  const handleClickShape = (action: string, value: any) => {
    const editorInstance = editorInstanceRef.current;
    setClickshapeValue(action);
    if (editorInstance) {
      editorInstance.stopDrawingMode();
      editorInstance.startDrawingMode("SHAPE");
      editorInstance.on({
        objectActivated: function (objectProps: any) {
          console.info(objectProps);
          setActiveObject(objectProps);
        },
      });

      editorInstance.setDrawingShape(action, value);
    }
  };

  const handleChangeShape = (fill: any, stroke: any, strokeWidth: any) => {
    const editorInstance = editorInstanceRef.current;
    try {
      let id: any = activeObject.id;
      editorInstance.changeShape(id, {
        fill: fill,
        stroke: stroke,
        strokeWidth: strokeWidth,
      });
    } catch (err) {
      console.error(err);
    }
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

    const canvasSize = editorInstance.getCanvasSize();
    const canvasWidth = canvasSize.width;
    const canvasHeight = canvasSize.height;

    const container = editorInstance.ui._editorElement;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width) * canvasWidth;
    const normalizedY = (y / rect.height) * canvasHeight;
    console.log(textDecoration);
    if (editorInstance) {
      editorInstance
        .addText("init text", {
          styles: {
            fill: textFill,
            fontSize: fontSize,
            fontWeight: fontWeight,
            // fontFamily: fontFamily,
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
          console.log(objectProps);
          setActiveObject(objectProps);
        });
    }
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
    try {
      const editorInstance = editorInstanceRef.current;
      let id: any = activeObject.id;
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

  const handleSaveImage = () => {
    const editorInstance = editorInstanceRef.current;
    if (editorInstance) {
      const dataUrl = editorInstance.toDataURL();
      const file = dataURLtoFile(dataUrl, "image.png");

      saveImage(file);
    }
  };

  function dataURLtoFile(dataUrl: string, filename: string) {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  const fetchImagesData = async () => {
    const images = await fetchImages();
    setImages(images);
  };

  useEffect(() => {
    fetchImagesData();
  }, []);

  useEffect(() => {
    if (editorRef.current) {
      const editorInstance = new ImageEditor(editorRef.current, {
        includeUI: {
          theme: myTheme,
          loadImage: {
            path: imageURLOri,
            name: "SampleImage",
          },
          menu: ["shape", "text", "crop"],
          // initMenu: "filter",
          uiSize: {
            height: `100vh`,
            width: "100wh",
          },
          menuBarPosition: "top",
        },
        cssMaxWidth: 1000,
        cssMaxHeight: 1000,
      });
      editorInstanceRef.current = editorInstance;

      editorInstance.on("loadImage", () => {
        setImageLoaded(true);
      });
    }
  }, [imageURLOri]);

  const handleImageChange = (url: string) => {
    setImageURL(url);
    editorInstanceRef.current.loadImageFromURL(url, "New Image");
  };

  const handleImageChangeOriginal = (url: string) => {
    setImageURLOri(url);
  };
  const handleUndo = () => {
    const editorInstance = editorInstanceRef.current;
    let undo = editorInstance.isEmptyUndoStack();
    if (!undo) {
      editorInstance
        .undo()
        .then((status: any) => {
          console.log("angle: ", status);
        })
        .catch((message: any) => {
          console.log("error: ", message);
        });
    }
  };

  const handleRedo = () => {
    const editorInstance = editorInstanceRef.current;
    let redo = editorInstance.isEmptyRedoStack();
    if (!redo) {
      editorInstance.redo();
    }
  };

  const handleRest = () => {
    const editorInstance = editorInstanceRef.current;
    editorInstance.clearObjects();
  };

  const handleClickZoomIn = (e: any) => {
    setZoomLevel((prevZoom) => prevZoom + 0.1);
    const editorInstance = editorInstanceRef.current;

    // const canvas = editorInstance.current.getCanvas();

    // console.log(e);
    // console.log({ x: e.screenX, y: e.screenY, zoomLevel: 5.0 });

    const canvasSize = editorInstance.getCanvasSize();
    const canvasWidth = canvasSize.width;
    const canvasHeight = canvasSize.height;

    const container = editorInstance.ui._editorElement;
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normalizedX = (x / rect.width) * canvasWidth;
    const normalizedY = (y / rect.height) * canvasHeight;

    editorInstance.zoom(
      { x: normalizedX, y: normalizedY, zoomLevel },
      normalizedX,
      normalizedY,
      zoomLevel
    );
  };

  const handleZoomOut = () => {
    SetZoomInValue(!zoomInvalue);

    const editorInstance = editorInstanceRef.current;
    const canvasSize = editorInstance.getCanvasSize();
    const canvasWidth = canvasSize.width;
    const canvasHeight = canvasSize.height;
    setZoomLevel((prevZoom) => prevZoom - 0.1);
    if (zoomLevel >= 1) {
      editorInstance.zoom({
        x: canvasWidth / 2,
        y: canvasHeight / 2,
        zoomLevel: zoomLevel,
      });
    }
  };

  const handleDelete = () => {
    const editorInstance = editorInstanceRef.current;

    if (activeObject) {
      try {
        let id = activeObject.id;
        editorInstance.removeObject(parseInt(id));
        setActiveObject(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleHistory = () => {
    const editorInstance = editorInstanceRef.current;
    editorInstance._clearHistory();
  };

  const handleCrop = () => {
    const editorInstance = editorInstanceRef?.current;
    try {
      // editorInstance.stopDrawingMode();
      editorInstance.startDrawingMode("CROPPER");
      editorInstance.setCropzoneRect(1, 1, 1, 1);
      setshowCropButton(!showCropButton);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCropApply = () => {
    const editorInstance = editorInstanceRef.current;
    console.log(editorInstance.getCropzoneRect());
    editorInstance.crop(editorInstance.getCropzoneRect());

    // editorInstance.crop({
    //   left: 10,
    //   top: 10,
    //   width: 20,
    //   height: 20,
    // });
    // if (editorInstance) {
    //   try {

    //     // const cropRect = editorInstance.getCropzoneRect();
    //     // console.log(
    //     //   cropRect.left,
    //     //   cropRect.top,
    //     //   cropRect.width,
    //     //   cropRect.height
    //     // );
    //     // // //  const [imageURLOri, setImageURLOri] = useState<any>(img);
    //     // // //loadImageFromFile
    //     // const canvasSize = editorInstance.getCanvasSize();
    //     // const canvasWidth = canvasSize.width;
    //     // const canvasHeight = canvasSize.height;
    //     // console.log("1:", canvasWidth, canvasHeight);
    //     // // if (!cropRect) {
    //     // //   console.error('No crop rectangle found.');
    //     // //   return;
    //     // // }

    //     // editorInstance.crop({
    //     //   top: 0,
    //     //   left: 10,
    //     //   width: 200,
    //     //   height: 200,
    //     // });

    //     // if (cropRect) {
    //     //   editorInstance
    //     //     .crop(cropRect)
    //     //     .then((croppedImageData: any) => {
    //     //       editorInstance.stopDrawingMode();
    //     //       setshowCropButton(false);
    //     //     })
    //     //     .catch((err: Error) => {
    //     //       console.error("Crop error:", err);
    //     //     });
    //     // } else {
    //     //   console.error("No crop rectangle found.");
    //     // }
    //   } catch (err) {
    //     console.error("Error in handleCropApply:", err);
    //   }
    // } else {
    //   console.error("Editor instance is not available.");
    // }

    // const canvasSize1 = editorInstance.getCanvasSize();
    // const canvasWidth1 = canvasSize1.width;
    // const canvasHeight1 = canvasSize1.height;
    // console.log("2", canvasWidth1, canvasHeight1);
  };

  const handleCropCancel = () => {
    const editorInstance = editorInstanceRef.current;
    editorInstance.stopDrawingMode();
    setshowCropButton(false);
  };

  const handleImageEditorLoad = () => {
    const editorInstance = editorInstanceRef.current;
    if (editorInstance) {
      // Set up event listener for selection change
      editorInstance.on("objectMoved", () => {
        // Get the updated crop area
        const cropRect =
          editorInstance._graphics && editorInstance._graphics.getCropzoneRect
            ? editorInstance._graphics.getCropzoneRect()
            : null;
        console.log(cropRect);
      });
    }
  };

  const handleMaskApply = () => {
    const editorInstance = editorInstanceRef.current;
    if (editorInstance && activeObject) {
      if (activeObject.type == "image") {
        let id: any = activeObject.id;
        editorInstance
          .applyFilter("mask", {
            maskObjId: id,
          })
          .then((result: any) => {
            console.log(result);
          });
      }
    }
  };

  const supportingFileAPI =
    !!window.File && !!window.FileReader && !!window.FileList && !!window.Blob;

  const handleLoadMaskImageChange = (e: any) => {
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

                setActiveObject(objectProps);
              });
            }
          });
      }
    }
  };

  const handleOnChangeWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : undefined;
    setCanvasWidth(value);
    resizeCanvasDimension();
  };

  const handleOnChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : undefined;
    setCanvasHeight(value);
    resizeCanvasDimension();
  };

  const handleResizeApply = () => {
    resizeCanvasDimension();
    setShowResizeSubMenu(false);
  };

  const resizeCanvasDimension = () => {
    const editorInstance = editorInstanceRef.current;
    if (editorInstance && canvasWidth && canvasHeight) {
      const newCanvasDimensions = { width: canvasWidth, height: canvasHeight };
      editorInstance
        .resizeCanvasDimension(newCanvasDimensions)
        .then(() => {
          console.log(
            `Canvas resized to width: ${canvasWidth}, height: ${canvasHeight}`
          );
        })
        .catch((err: Error) => {
          console.error("Error resizing canvas:", err);
        });
    }
  };

  const handleResizeCancel = () => {
    const editorInstance = editorInstanceRef.current;

    const canvasSize = editorInstance.getCanvasSize();
    const canvasWidth = canvasSize.width;
    const canvasHeight = canvasSize.height;
    setCanvasWidth(canvasWidth);
    setCanvasHeight(canvasHeight);
    setShowResizeSubMenu(false);
  };
  return (
    <div>
      <div>
        <button className="btn btn-primary m-1" onClick={handleSaveImage}>
          Save Image
        </button>
        <button
          className="btn btn-primary m-1"
          onClick={() => {
            setFlipShow(!flipshow);
            setRotateShow(false);
            setdrawShow(false);
            setShapeShow(false);
            setTextShow(false);
            SetZoomInValue(false);
          }}
        >
          Flip
        </button>
        <button
          className="btn btn-primary m-1"
          onClick={() => {
            setRotateShow(!rotateshow);
            setFlipShow(false);
            setdrawShow(false);
            setShapeShow(false);
            setTextShow(false);
            SetZoomInValue(false);
          }}
        >
          Rotate
        </button>
        <button
          className="btn btn-primary m-1"
          onClick={() => {
            setdrawShow(!drawshow);
            setFlipShow(false);
            setRotateShow(false);
            setShapeShow(false);
            setTextShow(false);
            SetZoomInValue(false);
            handleClickDrawing("FREE_DRAWING", { width, color });
          }}
        >
          Draw
        </button>
        <button
          className="btn btn-primary m-1"
          onClick={() => {
            setShapeShow(!shapeshow);
            setdrawShow(false);
            setFlipShow(false);
            setRotateShow(false);
            setTextShow(false);
            SetZoomInValue(false);
            handleClickShape("triangle", {
              fill,
              stroke,
              strokeWidth,
              rx: 10,
              ry: 1000,
            });
          }}
        >
          Shape
        </button>
        <button
          className="btn btn-primary m-1"
          onClick={(e) => {
            setShapeShow(false);
            setdrawShow(false);
            setFlipShow(false);
            setRotateShow(false);
            SetZoomInValue(false);
            setTextShow((prevTextShow) => !prevTextShow);
          }}
        >
          Text
        </button>

        <button className="btn btn-primary m-1" onClick={handleUndo}>
          Undo
        </button>
        <button className="btn btn-primary m-1" onClick={handleRedo}>
          Redo
        </button>

        <button className="btn btn-primary m-1" onClick={handleRest}>
          Reset
        </button>

        <button
          className="btn btn-primary m-1"
          onClick={() => {
            SetZoomInValue(!zoomInvalue);
            setShapeShow(false);
            setdrawShow(false);
            setFlipShow(false);
            setRotateShow(false);
            setTextShow(false);
          }}
        >
          Zoom In
        </button>
        <button className="btn btn-primary m-1" onClick={handleZoomOut}>
          Zoom out
        </button>
        <button className="btn btn-primary m-1" onClick={handleDelete}>
          Delete
        </button>

        <button className="btn btn-primary m-1" onClick={handleCrop}>
          Crop
        </button>
        <button
          className="btn btn-primary m-1"
          onClick={() => setShowMaskSubMeun(!showMaskSubMeun)}
        >
          Mark
        </button>
        <button
          className="btn btn-primary m-1"
          onClick={() => {
            setShowResizeSubMenu(!showResizeSubMenu);
            const canvasSize = editorInstanceRef.current.getCanvasSize();
            const canvasWidth = canvasSize.width;
            const canvasHeight = canvasSize.height;
            setCanvasWidth(canvasWidth);
            setCanvasHeight(canvasHeight);
          }}
        >
          Resize
        </button>
        {showResizeSubMenu && (
          <>
            <div>
              <input
                type="range"
                min="0"
                max="1000"
                value={canvasWidth || ""}
                onChange={handleOnChangeWidth}
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={canvasHeight || ""}
                onChange={handleOnChangeHeight}
              />
            </div>
            <input
              type="number"
              min="0"
              value={canvasWidth || ""}
              onChange={handleOnChangeWidth}
            />
            <input
              type="number"
              min="0"
              placeholder="height"
              value={canvasHeight || ""}
              onChange={handleOnChangeHeight}
            />
            <button onClick={handleResizeApply}>Apply</button>
            <button onClick={handleResizeCancel}>Cancel</button>
          </>
        )}
        {showMaskSubMeun && (
          <>
            <input type="file" onChange={handleLoadMaskImageChange} />
            <button className="btn btn-secondary m-1" onClick={handleMaskApply}>
              Apply
            </button>

            {/* <button
              className="btn btn-secondary m-1"
              onClick={handleMaskCancel}
            >
              Cancel
            </button> */}
          </>
        )}
        {showCropButton && (
          <>
            <button className="btn btn-secondary m-1" onClick={handleCropApply}>
              Apply
            </button>

            <button
              className="btn btn-secondary m-1"
              onClick={handleCropCancel}
            >
              Cancel
            </button>
          </>
        )}
        {/* <button onClick={handleHistory}>History</button>
        {showHistory && (

        )} */}

        {flipshow && (
          <FlipControls
            handleClick={handleClick}
            CountTotalNumberOfFlip={CountTotalNumberOfFlip}
          />
        )}
        {rotateshow && <RotateControls handleClick={handleClick} />}
        {drawshow && (
          <DrawControls
            handleClickDrawing={handleClickDrawing}
            handleClickDrawingArrow={handleClickDrawingArrow}
            width={width}
            color={color}
            setWidth={setWidth}
            setColor={setColor}
            ClickDrawValue={ClickDrawValue}
          />
        )}
        {shapeshow && (
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
        )}
        {textshow && (
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
        )}
      </div>
      <div
        onClick={
          zoomInvalue
            ? handleClickZoomIn
            : textshow
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
            : undefined
        }
        onLoad={handleImageEditorLoad}
        ref={editorRef}
      />
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
