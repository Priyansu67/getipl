import React, { useState } from "react";

const DragAndDrop = () => {
  const [url, setUrl] = useState("");
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
    const imageFile = e.dataTransfer.files[0];
    console.log(imageFile);
    const name = Date.now() + e.dataTransfer.files[0]["name"];

    const reader = new FileReader();
    reader.readAsDataURL(e.dataTransfer.files[0]);
    reader.onload = function () {
      const img = new Image();
      img.src = reader.result;
      img.onload = function () {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        const link = document.createElement("a");
        link.download = name;
        link.href = canvas.toDataURL("image/jpeg");
        link.click();
      };
    };
  };

  const handleUrl = (url) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const link = document.createElement("a");
      link.download = "image.jpg";
      link.href = canvas.toDataURL("image/jpeg");
      link.click();
    };
  };

  return (
    <>
      <input
        type="text"
        placeholder="Enter Image Url"
        onChange={(e) => setUrl(e.target.value)}
      />
      <button onClick={handleUrl(url)}>Submit</button>

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
