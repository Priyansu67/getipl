import React, { useState } from "react";
import Upscaler from "upscaler";
import { x2, x4, x8 } from "@upscalerjs/esrgan-thick";
const upscaler = new Upscaler();

const DragAndDrop = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [modelLoading, setModelLoading] = useState('');
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

  const handleUpscaleUrl = async (url) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    setLoading(true);
    await upscaler
      .upscale(url)
      .then((res) => {
        setLoading(false);
        img.src = res;
        img.onload = function () {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const link = document.createElement("a");
          link.download = Date.now().toString() + ".jpg";
          link.href = canvas.toDataURL("image/jpeg");
          link.click();
        };
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleUpscaleByUrl = async (url, model) => {
    const up = new Upscaler({
      model: model,
    });
    const img = new Image();
    img.crossOrigin = "anonymous";
    if(model === x2) {
        setModelLoading('2x');
    } else if(model === x4) {
        setModelLoading('4x');
    } else if(model === x8) {
        setModelLoading('8x');
    }
    await up
      .upscale(url)
      .then((res) => {
        setModelLoading('');
        img.src = res;
        img.onload = function () {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const link = document.createElement("a");
          link.download = Date.now().toString() + ".jpg";
          link.href = canvas.toDataURL("image/jpeg");
          link.click();
        };
      })
      .catch((err) => {
        setLoading(false);
        setModelLoading('');
        console.log(err);
      });
  };

  const handleFixUrl = async (url) => {
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
      link.download = Date.now().toString() + ".jpg";
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
      <button 
      className="fix"
      onClick={() => handleFixUrl(url)} disabled={loading}>
        Fix
      </button>
      <br /><br />
      <button onClick={() => handleUpscaleUrl(url)} disabled={loading}>
        {loading ? "Upscaling..." : "Normal Upscale"}
      </button>

      <button onClick={() => handleUpscaleByUrl(url, x2)} disabled={loading}>
        {modelLoading === '2x' ? "Upscaling..." : "2x Upscale"}
      </button>

      <button onClick={() => handleUpscaleByUrl(url, x4)} disabled={loading}>
        {modelLoading === '4x' ? "Upscaling..." : "4x Upscale"}
      </button>

      <button onClick={() => handleUpscaleByUrl(url, x8)} disabled={loading}>
        {modelLoading === '8x' ? "Upscaling..." : "8x Upscale"}
      </button>

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
