import React, { Component } from "react";
import "./styles.css";

export class UploadComponent extends Component {
  state = {};

  componentDidMount() {
    const dropArea = document.getElementById("drop-area");
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, this.preventDefaults, false);
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      dropArea.addEventListener(eventName, this.highlight, false);
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropArea.addEventListener(eventName, this.unHightLight, false);
    });

    dropArea.addEventListener("drop", this.handleDrop, false);
  }
  componentWillUnmount() {
    const dropArea = document.getElementById("drop-area");
    ["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
      dropArea.removeEventListener(eventName, this.preventDefaults, false);
    });

    ["dragenter", "dragover"].forEach((eventName) => {
      dropArea.removeEventListener(eventName, this.highlight, false);
    });

    ["dragleave", "drop"].forEach((eventName) => {
      dropArea.removeEventListener(eventName, this.unHightLight, false);
    });

    dropArea.removeEventListener("drop", this.handleDrop, false);
  }
  preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  highlight = () => {
    const ele = document.querySelector(".upload-label");
    if (ele) {
      ele.style.backgroundColor = "#e9e9e9";
      ele.style.border = "2px dotted #000";
    }
  };

  unHightLight = () => {
    const ele = document.querySelector(".upload-label");
    if (ele) {
      ele.style.backgroundColor = "#f6f6f6";
      ele.style.border = "unset";
    }
  };

  handleDrop = (e) => {
    const dt = e.dataTransfer;
    const { files } = dt;
    this.handleFiles(files);
  };

  handleFiles = (files) => {
    let reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = function () {
      let img = document.createElement("img");
      img.src = reader.result;
      img.className = "image";
      document.getElementById("drop-area").appendChild(img);
    };
  };

  render() {
    return (
      <div id="drop-area" style={{ border: "5px doted #000" }}>
        <input
          type="file"
          id="fileElem"
          accept="image/*"
          onChange={(e) => {
            this.handleFiles(e.target.files);
          }}
        />
        <label className="upload-label" htmlFor="fileElem">
          <div className="upload-text">Drag Image here or click to upload</div>
        </label>
        <div className="image" />
      </div>
    );
  }
}

export default UploadComponent;
