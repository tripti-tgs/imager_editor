import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TuiImageEditorComponent from "./component/TuiImageEditor";
import FilerobotImageEditorCom from "./component/FilerobotImageEditor";
import SyncfusionImageEditor from "./component/SyncfusionImageEditor";
import PqinaImageEditor from "./component/PqinaImageEditor";
import AvatarImageEditor from "./component/AvatarImageEditor";


import Navbar from "./component/Navbar";
function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<TuiImageEditorComponent />} />
          <Route path="/filerobot" element={<FilerobotImageEditorCom />} />
          <Route path="/syncfusion" element={<SyncfusionImageEditor />} />
          <Route path="/pqina" element={<PqinaImageEditor />} />
          <Route path="/avatareditor" element={<AvatarImageEditor />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
