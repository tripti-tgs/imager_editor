import { useRef, useEffect,useState } from "react";
import { ImageEditorComponent } from "@syncfusion/ej2-react-image-editor";
import { Browser, isNullOrUndefined, getComponent,registerLicense  } from "@syncfusion/ej2-base";
import img from "../images/XZHPZ.jpg"

// import "./default.css";
registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF1cXmhOYVdpR2Nbe05zflZEalxYVAciSV9jS3pTcEVnWXtbcHdSQmNUVQ==');
// Define the types for the slider component
interface SliderComponent {
  refreshTooltip: (target: HTMLElement) => void;
  tooltipTarget: HTMLElement;
}

const SyncfusionImageEditor: React.FC = () => {
  const imgObj = useRef<ImageEditorComponent>(null);
  const [result, setResult] = useState<any|undefined>("");
  const imageEditorCreated = () => {
    const imagePath = Browser.isDevice
      ? img
      : img
    imgObj.current?.open(imagePath);
    const urlTheme = window.location.href.split("#")[1]?.split("/")[1];
    if (imgObj.current?.theme && urlTheme) {
      imgObj.current.theme = urlTheme;
    }
  };

  useEffect(() => {
    const rightPane:any = document.getElementById("right-pane");
    const onScroll = () => {
      const sliderWrapper = document.getElementById(
        "image-editor_sliderWrapper"
      );
      if (sliderWrapper) {
        const slider = getComponent(sliderWrapper, "slider") as SliderComponent;
        slider.refreshTooltip(slider.tooltipTarget);
      }
    };

    if (!isNullOrUndefined(rightPane)) {
      rightPane.addEventListener("scroll", onScroll);
      return () => rightPane.removeEventListener("scroll", onScroll);
    }
  }, []);

  return (
    <div className="control-pane">
      <div className="control-section">
        <div className="row">
          <div className="col-lg-12 control-section">
            <div className="e-img-editor-sample">
              <ImageEditorComponent
                id="image-editor"
                ref={imgObj}
                created={imageEditorCreated}
                // onProcess={({ dest }) => setResult(URL.createObjectURL(dest))}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SyncfusionImageEditor;
