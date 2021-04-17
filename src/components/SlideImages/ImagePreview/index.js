import React, { useEffect } from 'react';

const ImagePreview = (props) => {

    const { currentImage } = props;

    useEffect(() => {
        
    }, [currentImage]);

    return (
        <>
            <div className="image-preview">
                <img src={currentImage} alt="Imagem Principal" />
            </div>
        </>
    )


};

export default ImagePreview;