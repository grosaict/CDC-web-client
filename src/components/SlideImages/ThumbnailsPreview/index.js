import React, { useState } from 'react';

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const ThumbnailsPreview = (props) => {

    const { images, handleCurrentImage } = props;

    const [nextIndex, setNextIndex] = useState(null);
    const [prevIndex, setPrevIndex] = useState(null);

    const changeImage = (e) => {
        const index = parseInt(e.currentTarget.getAttribute('data-index'));
        handleCurrentImage(images[index].url);        
    }
    

    return (
        <>
            <div className="thumbnails-preview">
                <div className="arrows-container">
                    <button type="button" onClick={changeImage} data-prev={nextIndex}>
                        <ArrowBackIosIcon />
                    </button>

                    <button type="button" onClick={changeImage} data-next={prevIndex}>
                        <ArrowForwardIosIcon />
                    </button>
                </div>
                
                <div className="thumbnails-container">
                    {images.map((image, index) =>(
                        <button  key={`img-thumbnails-${index}`} data-index={index} type="button" onClick={changeImage}>
                            <img src={image.url} alt="Imagem thumbnail"/>
                        </button>
                    ))}
                </div>

            </div>
        </>
    )


};

export default ThumbnailsPreview;