import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
	
	return (
		<div className = 'box'>
			<div className = 'box-img'>
				<img id='inputimage' alt = '' src = {imageUrl} width ='500' height ='auto' />
				{boxes.map(box => {
					return <div key={box.topRow} className = 'bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>	
				})
				}
			</div>
		</div>	
	);
}

export default FaceRecognition;