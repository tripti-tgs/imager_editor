import React, { useEffect, useRef, useState } from "react";
import ImageEditor from "tui-image-editor";
import "tui-image-editor/dist/tui-image-editor.css";
import img from "../images/XZHPZ.jpg";
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
  const [fontWeight, setFontWeight] = useState<string>("bold");
  const [fontFamily, setFontFamily] = useState<string>("Georgia, serif");
  const [fontStyle, setFontStyle] = useState<string>("normal");
  const [textAlign, setTextAlign] = useState<string>("left");
  const [textDecoration, setTextDecoration] = useState<string>("");

  const [activeObject, setActiveObject] = useState<any>();

  const handleClick = (action: string, value: any) => {
    const editorInstance = editorInstanceRef.current;
    if (editorInstance) {
      switch (action) {
        case "flipX":
          editorInstance.flipX();
          break;
        case "flipY":
          editorInstance.flipY();
          break;
        case "resetflip":
          editorInstance.resetFlip();
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
    let id: any = activeObject.id;
    editorInstance.changeShape(id, {
      fill: fill,
      stroke: stroke,
      strokeWidth: strokeWidth,
    });
  };
  const handleClickAddText = (
    textFill: string,
    fontSize: number,
    fontWeight: string,
    fontFamily: string,
    textAlign: string,
    textDecoration: string,
    fontStyle: string
  ) => {
    const editorInstance = editorInstanceRef.current;
    if (editorInstance) {
      editorInstance.stopDrawingMode();
      editorInstance.startDrawingMode("TEXT");
      editorInstanceRef.current.on({
        addText: function (pos: any) {
          editorInstance
            .addText("hello", {
              position: pos.originPosition,
              styles: {
                fill: textFill,
                fontSize: fontSize,
                fontWeight: fontWeight,
                // fontFamily: fontFamily,
                fontStyle: fontStyle,
                textAlign: textAlign,
                textDecoration: textDecoration,
              },
            })
            .then(function (objectProps: any) {
              console.log(objectProps);
            })
            .catch(function (err: Error) {
              console.log(err);
            });
        },

        objectActivated: function (objectProps: any) {
          console.info(objectProps);
          setActiveObject(objectProps);
        },
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
      handleClickAddText(
        textFill,
        fontSize,
        fontWeight,
        fontFamily,
        textAlign,
        textDecoration,
        fontStyle
      );
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
          menu: ["shape", "text"],
          // initMenu: "filter",
          uiSize: {
            height: `100vh`,
            width: "100%",
          },
          menuBarPosition: "top",
        },
        cssMaxWidth: 1000,
        cssMaxHeight: 700,
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

  return (
    <div>
      <div>
        <button className="btn btn-primary m-1" onClick={handleSaveImage}>
          Save Image
        </button>
        <button
          className="btn btn-primary m-1"
          onClick={() => setFlipShow(!flipshow)}
        >
          Flip
        </button>
        <button
          className="btn btn-primary m-1"
          onClick={() => setRotateShow(!rotateshow)}
        >
          Rotate
        </button>
        <button
          className="btn btn-primary m-1"
          onClick={() => setdrawShow(!drawshow)}
        >
          Draw
        </button>
        <button
          className="btn btn-primary m-1"
          onClick={() => setShapeShow(!shapeshow)}
        >
          Shape
        </button>
        <button
          className="btn btn-primary m-1"
          onClick={(e) => {
            handleClickAddText(
              textFill,
              fontSize,
              fontWeight,
              fontFamily,
              textAlign,
              textDecoration,
              fontStyle
            );
            setTextShow((prevTextShow) => !prevTextShow);
          }}
        >
          Text
        </button>

        {flipshow && <FlipControls handleClick={handleClick} />}
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
      <div ref={editorRef} />

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
