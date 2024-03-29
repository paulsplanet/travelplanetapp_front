import React, { useState } from "react";
import Dropzone from "react-dropzone";
import { Icon } from "antd";
import axios from "axios";

function FileUpload (props) {
    const [images, setImages] = useState([]);

    const dropHandler = (files) => {
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/fomr-data'}
        }
        formData.append("file", files[0]);

        axios.post('https://travelplanetserver.herokuapp.com/api/product/image', formData, config)
            .then(response => {
                if(response.data.success) {
                    // console.log(response.data)
                    setImages([...images, response.data.filePath]);
                    props.refreshFunction([...images, response.data.filePath])
                } else {
                    alert('Failed to save the image.')
                }
            })
    }
    
    const deleteHandler = (image) => {
        const currentIndex = images.indexOf(image);
        let newImages = [...images];
        newImages.splice(currentIndex, 1);
        setImages(newImages);
        props.refreshFunction(newImages);
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone onDrop={dropHandler}>
                {({ getRootProps, getInputProps }) => (
                    <div style={{ width: 200, height: 200, border: '1px solid lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem'}} />
                    </div>
                )}
            </Dropzone>
            <div style={{ display: 'flex', width: '450px', height: '200px', overflowX: 'auto' }}>
                {images.map((image, index) => (
                    <div onClick={() => deleteHandler(image)} key={index}>
                        <img style={{ minWidth: '300px', width: '300px', height: '200px' }} 
                            src={`https://travelplanetserver.herokuapp.com/${image}`}
                            alt="your upload file"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
};

export default FileUpload;