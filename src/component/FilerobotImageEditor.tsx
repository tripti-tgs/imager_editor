import React, { useEffect, useState, useRef } from "react";
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from "react-filerobot-image-editor";
import img from "../images/XZHPZ.jpg";

const FilerobotImageEditorCom: React.FC = () => {
  const [isImgEditorShown, setIsImgEditorShown] = useState<boolean>(true);
  const editorRef = useRef(null);
  const openImgEditor = () => {
    setIsImgEditorShown(true);
  };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };

  useEffect(() => {
    // Function to hide opacity option
    const hideOpacityOption = () => {
      const textTool = document.querySelector(".FIE_text-tool-options");
      if (textTool) {
        let opacityOptions = textTool.querySelectorAll('[title="Opacity"]');
        opacityOptions.forEach((opacityOption) => {
          if (opacityOption.tagName === "DIV") {
            const opacityElement = opacityOption as HTMLElement;
            opacityElement.style.display = "none";
          }
        });
      }
    };
    // Function to add custom buttom
    const addButtonToTopBar = () => {
      const topBar = document.querySelector(".FIE_topbar-buttons-wrapper");
      if (topBar) {
        const customButton = document.createElement("button");
        customButton.textContent = "Custom Button";
        customButton.className = "custom-button";
        customButton.onclick = () => {
          alert("Custom button clicked!");
        };
        topBar.appendChild(customButton);
      }
    };

    // hideOpacityOption();
    // addButtonToTopBar();
  }, []);
  return (
    <div className="w-50 d-flex flex-column justify-content-center">
      <div>
        <div className="jumbotron">
          <h1 className="display-4">Hello, world!</h1>
          <p className="lead">
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <hr className="my-4" />
          <p>
            It uses utility classNamees for typography and spacing to space
            content out within the larger container.
          </p>
          <a className="btn btn-primary btn-lg" href="#" role="button">
            Learn more
          </a>
        </div>
      </div>
      <div style={{height:"600px"}}>
      {isImgEditorShown ? (
        <FilerobotImageEditor
          source={img}
          onSave={(imageInfo: any, designState: any): any => {
            const tmpLink = document.createElement("a");
            tmpLink.download = imageInfo.fullName;
            tmpLink.href = imageInfo.imageBase64;
            document.body.appendChild(tmpLink);
            tmpLink.click();
            document.body.removeChild(tmpLink);
          }}
          onClose={closeImgEditor}
          annotationsCommon={{
            fill: "#ff0000",
          }}
          Polygon={{
            sides: 5,
          }}
          Text={{
            text: "Filerobot...",
            fontSize: 40,
            fonts: [
              { label: "Arial", value: "Arial" },
              "Tahoma",
              "Sans-serif",
              "Serif",
              "Times New Roman",
              "Monospace",
              { label: "Comic Sans", value: "Comic-sans" },
            ],
          }}
          // translations= {{null}}
          useBackendTranslations={false}
          language="en"
          Rotate={{ angle: 90, componentType: "slider" }}
          Crop={{
            presetsItems: [
              {
                titleKey: "classicTv",
                descriptionKey: "4:3",
                ratio: 4 / 3,
              },
              {
                titleKey: "cinemascope",
                descriptionKey: "21:9",
                ratio: 21 / 9,
              },
            ],
            presetsFolders: [
              {
                titleKey: "socialMedia",
                groups: [
                  {
                    titleKey: "facebook",
                    items: [
                      {
                        titleKey: "profile",
                        width: 180,
                        height: 180,
                        descriptionKey: "fbProfileSize",
                      },
                      {
                        titleKey: "coverPhoto",
                        width: 820,
                        height: 312,
                        descriptionKey: "fbCoverPhotoSize",
                      },
                    ],
                  },
                ],
              },
            ],
          }}
          tabsIds={[
            TABS.ADJUST,
            TABS.FINETUNE,
            TABS.ANNOTATE,
            TABS.WATERMARK,
            TABS.RESIZE,
            TABS.FILTERS,
          ]}
          defaultTabId={TABS.ANNOTATE}
          savingPixelRatio={1}
          previewPixelRatio={1}
          defaultToolId={TOOLS.TEXT}
        />
      ) : (
        <>No Image !</>
      )}
      </div>
   
    </div>
  );
};

export default FilerobotImageEditorCom;
