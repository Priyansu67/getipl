import React from "react";
//import axios from "axios";
//import Jimp from "jimp";
//const client = axios.create();

const DragAndDrop = () => {
  const [base64Image, setBase64Image] = React.useState(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    console.log(e.dataTransfer.files[0]);
    const name =  + Date.now() + e.dataTransfer.files[0]["name"]
    console.log(name);

    const reader = new FileReader();
    reader.readAsArrayBuffer(e.dataTransfer.files[0]);

    // Set the onloadend function to handle the file data
    reader.onloadend = function () {
      // Get the buffer data from the reader result
      const bufferData = reader.result;

      // Convert the ArrayBuffer data to a binary string
      const binaryString = String.fromCharCode.apply(
        null,
        new Uint8Array(bufferData)
      );

      // Convert the binary string to base64 using the Buffer module
      const base64String = Buffer.from(binaryString, "binary").toString(
        "base64"
      );

      setBase64Image(base64String);
      downloadImage(base64String, name);
    };
  };

  function downloadImage(base64String, fileName) {
    const a = document.createElement("a");
    a.href = `data:image/jpeg;base64,${base64String}`;
    a.download = fileName;
    a.click();
  }

  return (
    <>
      {base64Image && (
        <img src={`data:image/jpg;base64,${base64Image}`} alt="IPL20" />
      )}

      <div
        className="drag-drop-zone inside-drag-area"
        onDrop={(e) => handleDrop(e)}
        onDragOver={(e) => handleDragOver(e)}
        onDragEnter={(e) => handleDragEnter(e)}
        onDragLeave={(e) => handleDragLeave(e)}
      >
        <p>Drag Image Here To Fix</p>
      </div>
    </>
  );
};

export default DragAndDrop;
