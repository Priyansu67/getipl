import React from "react";
import "./App.css";
import DragAndDrop from "./DragAndDrop";

function App() {
  return (
    <div className="App">
      <h1>IPLT20 Image Fixer and Upscaler</h1>
      <p className="desc">Website to fix or upscale IPLT20 Images</p>
      <p className="warning">
        WARNING: Upscaling uses your GPU power so the higher resolution will
        take longer time and {<br/>}might slow down your browser during the process.
      </p>
      <DragAndDrop />
      <h2 className="footer">Made by Priyansu Choudhury</h2>
    </div>
  );
}

export default App;
