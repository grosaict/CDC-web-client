import React, { useState } from 'react';

import ImagePreview from './ImagePreview'
import ThumbnailsPreview from './ThumbnailsPreview'

const SlideImages = (props) => {

    const { images } = props;

    const [ currentImage, setCurrentImage ] = useState(images[0].url);

    const handleCurrentImage = (current) => {
        setCurrentImage(current);
    }
    
    return (
        <>
            <ImagePreview currentImage={currentImage} />
            <ThumbnailsPreview images={images} handleCurrentImage={handleCurrentImage} />
        </>
    )


};

export default SlideImages;