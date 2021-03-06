import React from "react";
import ImageUploading from 'react-images-uploading';

import "./InfoSection.css";
import RcSlider from 'rc-slider';
import 'rc-slider/assets/index.css';

class InfoSection extends React.Component {
  constructor() {
    super();
  }  

 
  render() {

    return (
        <div className="infoSection">
            <h3>User Info</h3>
            
            <h6>Email: {this.props.user.email} </h6> 
            <h6>Address: {this.props.user.address}</h6>
            <h6>City: {this.props.user.city}</h6>
            <h6>Province: {this.props.user.province}</h6>

            <ImageUploading
                value={this.props.profilePic}
                onChange={this.props.onProfilePicChange}
                maxNumber={1}
                dataURLKey="data_url"
            >
                {({
                onImageUpload,
                onImageRemoveAll,
                isDragging,
                dragProps,
                }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                    <button
                        style={isDragging ? { color: 'red' } : undefined}
                        onClick={onImageUpload}
                        {...dragProps}
                        >
                        Add/Change Profile Pic 
                    </button>
                
                    <button onClick={onImageRemoveAll}>Remove Profile Pic</button>
                </div>
                )}
            </ImageUploading>
        </div> 
    );
  }
}

export default InfoSection;
