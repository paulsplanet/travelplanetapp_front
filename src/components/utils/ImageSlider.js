import { Carousel } from "antd";
import React from "react";

function ImageSlider(props) {
    return (
        <div>
            <Carousel autoplay>
                {props.images.map((image, index) => (
                    <div key={index}>
                        <img style={{ width: '100%', maxHeight: '150px' }} 
                            src={`https://travelplanetserver.herokuapp.com/${image}`} 
                            alt="destination's landscape"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default ImageSlider;