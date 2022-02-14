import React from "react";
import './faceRecognition.css'

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className={'center ma'}>
            <div className={'absolute mt2'}>
                <img id={'inputImage'} src={ imageUrl } alt={imageUrl} width={'500px'} height={'auto'}/>
                <div className={'bounding-box'}
                     style={{
                         top: box.topRow,
                         right: box.rightColumn,
                         bottom: box.bottomRow,
                         left: box.leftColumn}}>
                </div>
            </div>
        </div>
    );
}

export default FaceRecognition;
