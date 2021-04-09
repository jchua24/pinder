import React from "react";
import ImageUploading from "react-images-uploading";

import { Button } from "react-bootstrap";

import "./InfoSection.css";
import RcSlider from "rc-slider";
import "rc-slider/assets/index.css";

class InfoSection extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="infoSection">
        <h6 className="infoElement">Email: {this.props.user.email} </h6>
        <h6 className="infoElement">Address: {this.props.user.address}</h6>
        <h6 className="infoElement">City: {this.props.user.city}</h6>
        <h6 className="infoElement">Province: {this.props.user.province}</h6>

        <ImageUploading
          value={this.props.profilePic}
          onChange={this.props.onProfilePicChange}
          maxNumber={1}
          dataURLKey="data_url"
          className="infoElement"
        >
          {({ onImageUpload, onImageRemoveAll, isDragging, dragProps }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <Button
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              >
                Add/Change Profile Pic
              </Button>

              <Button onClick={onImageRemoveAll}>Remove Profile Pic</Button>
            </div>
          )}
        </ImageUploading>
      </div>
    );
  }
}

export default InfoSection;
