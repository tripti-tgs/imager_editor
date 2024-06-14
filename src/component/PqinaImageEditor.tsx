import React, { useState ,useRef} from "react";
import { PinturaEditor  } from "@pqina/react-pintura";
import { getEditorDefaults } from "@pqina/pintura";
import img from "../images/XZHPZ.jpg"

import "@pqina/pintura/pintura.css";

// Define the type for the process result
type ProcessResult = {
  dest: Blob;
};

const PqinaImageEditor: React.FC = () => {
  const [inlineResult, setInlineResult] = useState<string>();


  const handleProcess = (res: ProcessResult) => {
    const tmpLink = document.createElement('a');
    tmpLink.download ="";
    tmpLink.href = URL.createObjectURL(res.dest);
    document.body.appendChild(tmpLink);
    tmpLink.click();
    document.body.removeChild(tmpLink);
  };

  return (
    <div style={{ height: "80vh" }}>
     
      <PinturaEditor
        {...getEditorDefaults()}
        src={img}
        onProcess={handleProcess}
     
      />

      {/* {inlineResult && <img src={inlineResult} alt="" />} */}
    </div>
  );
};

export default PqinaImageEditor;
