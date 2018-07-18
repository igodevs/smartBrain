import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit}) => {
	
	return (
		<div className = 'link-form' >
			<p className = 'text'>
			{'This Magic Brain will detect faces in your pictures. Get it a try.'}
			</p>
			<div className = 'container-link'>
					<div className ='wrap-input100 '>
						<input className= "input100" type = 'tex' onChange = {onInputChange}/>
					</div>
					<div className = "container-link100-form-btn">
						<button className = 'link100-form-btn'
							onClick = {onButtonSubmit}
						>Detect</button>
					</div>
			</div>
		</div>
	);
}

export default ImageLinkForm;